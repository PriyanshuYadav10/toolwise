"use client";

import * as React from "react";
import { UploadCloud, Download, RefreshCcw, XCircle, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
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

const FORMAT_OPTIONS = [
  { value: "jpeg", label: "JPG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
];

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Couldn't load this image."));
    img.src = URL.createObjectURL(file);
  });
}

function formatFromMime(mime: string): Format | null {
  if (mime === "image/jpeg") return "jpeg";
  if (mime === "image/webp") return "webp";
  if (mime === "image/png") return "png";
  return null;
}

function baseName(name: string): string {
  const idx = name.lastIndexOf(".");
  return idx > 0 ? name.slice(0, idx) : name;
}

export default function ImageCompressor({ tool }: ToolComponentProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [img, setImg] = React.useState<HTMLImageElement | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [quality, setQuality] = React.useState(80);
  const [format, setFormat] = React.useState<Format>("jpeg");
  const [compressedBlob, setCompressedBlob] = React.useState<Blob | null>(null);
  const [compressedUrl, setCompressedUrl] = React.useState<string | null>(null);
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
      setCompressedBlob(null);
      setCompressedUrl(null);
      const detected = formatFromMime(f.type);
      setFormat(detected === "png" ? "jpeg" : detected ?? "jpeg");
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
        if (format === "jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            setProcessing(false);
            if (!blob) {
              setError("Couldn't compress this image. Try a different file or format.");
              return;
            }
            setCompressedBlob(blob);
            setCompressedUrl((prev) => {
              if (prev) URL.revokeObjectURL(prev);
              const url = URL.createObjectURL(blob);
              trackUrl(url);
              return url;
            });
            track({ name: "tool_completed", toolSlug: tool.slug, category: tool.category });
          },
          MIME[format],
          quality / 100
        );
      } catch {
        setProcessing(false);
        setError("Something went wrong while compressing this image.");
      }
    }, 150);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [img, quality, format]);

  function handleChangeImage() {
    setFile(null);
    setImg(null);
    setOriginalUrl(null);
    setCompressedBlob(null);
    setCompressedUrl(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleDownload() {
    if (!compressedBlob || !file) return;
    downloadBlob(compressedBlob, `${baseName(file.name)}-compressed.${EXT[format]}`);
  }

  const originalSize = file?.size ?? 0;
  const compressedSize = compressedBlob?.size ?? 0;
  const percentSmaller = originalSize > 0 && compressedSize > 0 ? Math.floor(100 - (compressedSize / originalSize) * 100) : null;

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
              <p className="text-sm font-medium text-foreground truncate">{file?.name}</p>
              <Button variant="ghost" size="sm" onClick={handleChangeImage}>
                <RefreshCcw /> Change image
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <Label className="mb-0">Quality</Label>
                  <span className="text-sm font-semibold text-foreground">{quality}%</span>
                </div>
                <Slider
                  min={1}
                  max={100}
                  step={1}
                  value={quality}
                  onChange={setQuality}
                  disabled={format === "png"}
                />
                {format === "png" && (
                  <p className="mt-1 text-xs text-muted-foreground">Quality doesn&apos;t apply to PNG output.</p>
                )}
              </div>
              <div>
                <Label>Output format</Label>
                <Select
                  options={FORMAT_OPTIONS}
                  value={format}
                  onChange={(v) => setFormat(v as Format)}
                />
              </div>
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
                  Original — {formatBytes(originalSize)}
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
                  Compressed{compressedBlob ? ` — ${formatBytes(compressedSize)}` : ""}
                </span>
                <div className="flex min-h-24 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-sunken p-2">
                  {processing ? (
                    <Loader2 className="size-6 animate-spin text-muted-foreground" />
                  ) : compressedUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={compressedUrl} alt="Compressed" className="max-h-72 w-auto max-w-full object-contain" />
                  ) : (
                    <span className="text-xs text-muted-foreground">Preview will appear here.</span>
                  )}
                </div>
              </div>
            </div>

            {percentSmaller !== null && (
              <p className={cn("text-sm font-medium", percentSmaller >= 0 ? "text-success" : "text-foreground")}>
                {percentSmaller >= 0
                  ? `${percentSmaller}% smaller than the original.`
                  : "This output is larger than the original — try a lower quality or different format."}
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={handleDownload} disabled={!compressedBlob}>
                <Download /> Download compressed image
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
