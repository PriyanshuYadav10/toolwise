"use client";

import * as React from "react";
import { UploadCloud, Download, RefreshCcw, XCircle, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/download";
import { formatBytes, cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

type Format = "jpeg" | "png" | "webp";

const MIME: Record<Format, string> = {
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

const EXT: Record<Format, string> = {
  jpeg: "jpg",
  png: "png",
  webp: "webp",
};

const FORMAT_LABEL: Record<Format, string> = {
  jpeg: "JPG",
  png: "PNG",
  webp: "WebP",
};

const FORMAT_OPTIONS = [
  { value: "jpeg", label: "JPG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
];

function defaultFormatFor(slug: string): Format {
  switch (slug) {
    case "png-to-jpg":
      return "jpeg";
    case "jpg-to-png":
      return "png";
    case "jpg-to-webp":
      return "webp";
    case "webp-to-jpg":
      return "jpeg";
    default:
      return "jpeg";
  }
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Couldn't load this image."));
    img.src = URL.createObjectURL(file);
  });
}

function labelFromMime(mime: string): string {
  if (mime === "image/png") return "PNG";
  if (mime === "image/webp") return "WebP";
  if (mime === "image/jpeg") return "JPG";
  return mime.replace("image/", "").toUpperCase();
}

function baseName(name: string): string {
  const idx = name.lastIndexOf(".");
  return idx > 0 ? name.slice(0, idx) : name;
}

export default function ImageConverter({ tool }: ToolComponentProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [img, setImg] = React.useState<HTMLImageElement | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [targetFormat, setTargetFormat] = React.useState<Format>(() => defaultFormatFor(tool.slug));
  const [convertedBlob, setConvertedBlob] = React.useState<Blob | null>(null);
  const [convertedUrl, setConvertedUrl] = React.useState<string | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const objectUrls = React.useRef<Set<string>>(new Set());

  function trackUrl(url: string) {
    objectUrls.current.add(url);
    return url;
  }

  React.useEffect(() => {
    return () => {
      objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrls.current.clear();
    };
  }, []);

  async function handleFile(f?: File | null) {
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError("This doesn't look like a valid image file.");
      return;
    }
    setError(null);
    try {
      const loaded = await loadImage(f);
      const url = trackUrl(loaded.src);
      setFile(f);
      setImg(loaded);
      setOriginalUrl(url);
      setConvertedBlob(null);
      setConvertedUrl(null);
      track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
    } catch {
      setError("Couldn't load this image. Try a different file.");
    }
  }

  React.useEffect(() => {
    if (!img) return;
    setProcessing(true);
    const timer = setTimeout(() => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("no ctx");
        if (targetFormat === "jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            setProcessing(false);
            if (!blob) {
              setError("Couldn't convert this image. Try a different format.");
              return;
            }
            setConvertedBlob(blob);
            setConvertedUrl((prev) => {
              if (prev) URL.revokeObjectURL(prev);
              const url = URL.createObjectURL(blob);
              trackUrl(url);
              return url;
            });
            track({ name: "tool_completed", toolSlug: tool.slug, category: tool.category });
          },
          MIME[targetFormat],
          0.92
        );
      } catch {
        setProcessing(false);
        setError("Something went wrong while converting this image.");
      }
    }, 150);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [img, targetFormat]);

  function handleChangeImage() {
    setFile(null);
    setImg(null);
    setOriginalUrl(null);
    setConvertedBlob(null);
    setConvertedUrl(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleDownload() {
    if (!convertedBlob || !file) return;
    downloadBlob(convertedBlob, `${baseName(file.name)}.${EXT[targetFormat]}`);
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {!img ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFile(e.dataTransfer.files?.[0]);
            }}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-10 text-center transition-colors",
              dragging ? "border-primary bg-primary/5" : "border-border hover:border-border-strong"
            )}
          >
            <UploadCloud className="size-8 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">Drop your image here</p>
            <p className="text-xs text-muted-foreground">or click to browse</p>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground truncate">
                {file?.name} · {file ? labelFromMime(file.type) : ""} · {file ? formatBytes(file.size) : ""}
              </p>
              <Button variant="ghost" size="sm" onClick={handleChangeImage}>
                <RefreshCcw /> Change image
              </Button>
            </div>

            <div className="max-w-xs">
              <Label>Convert to</Label>
              <Select
                options={FORMAT_OPTIONS}
                value={targetFormat}
                onChange={(v) => setTargetFormat(v as Format)}
              />
            </div>

            {error && (
              <p className="flex items-start gap-1.5 text-sm text-destructive">
                <XCircle className="mt-0.5 size-4 shrink-0" />
                {error}
              </p>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Original — {file ? labelFromMime(file.type) : ""}
                </span>
                <div className="flex items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-sunken p-2">
                  {originalUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={originalUrl} alt="Original" className="max-h-72 w-auto max-w-full object-contain" />
                  )}
                </div>
              </div>
              <div>
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {FORMAT_LABEL[targetFormat]}
                  {convertedBlob ? ` — ${formatBytes(convertedBlob.size)}` : ""}
                </span>
                <div className="flex min-h-24 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-sunken p-2">
                  {processing ? (
                    <Loader2 className="size-6 animate-spin text-muted-foreground" />
                  ) : convertedUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={convertedUrl} alt="Converted" className="max-h-72 w-auto max-w-full object-contain" />
                  ) : (
                    <span className="text-xs text-muted-foreground">Preview will appear here.</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={handleDownload} disabled={!convertedBlob}>
                <Download /> Download {FORMAT_LABEL[targetFormat]}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
