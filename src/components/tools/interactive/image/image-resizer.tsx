"use client";

import * as React from "react";
import { UploadCloud, Download, RefreshCcw, XCircle, Loader2, Lock, Unlock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
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

const PRESETS = [25, 50, 75, 100];

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Couldn't load this image."));
    img.src = URL.createObjectURL(file);
  });
}

function formatFromMime(mime: string): Format {
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "jpeg";
}

function baseName(name: string): string {
  const idx = name.lastIndexOf(".");
  return idx > 0 ? name.slice(0, idx) : name;
}

export default function ImageResizer({ tool }: ToolComponentProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [img, setImg] = React.useState<HTMLImageElement | null>(null);
  const [format, setFormat] = React.useState<Format>("jpeg");
  const [originalWidth, setOriginalWidth] = React.useState(0);
  const [originalHeight, setOriginalHeight] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [lockAspect, setLockAspect] = React.useState(true);
  const [resizedBlob, setResizedBlob] = React.useState<Blob | null>(null);
  const [resizedUrl, setResizedUrl] = React.useState<string | null>(null);
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
      trackUrl(loaded.src);
      setFile(f);
      setImg(loaded);
      setFormat(formatFromMime(f.type));
      setOriginalWidth(loaded.naturalWidth);
      setOriginalHeight(loaded.naturalHeight);
      setWidth(loaded.naturalWidth);
      setHeight(loaded.naturalHeight);
      setResizedBlob(null);
      setResizedUrl(null);
      track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
    } catch {
      setError("Couldn't load this image. Try a different file.");
    }
  }

  function handleWidthChange(v: number) {
    setWidth(v);
    if (lockAspect && originalWidth > 0) {
      setHeight(Math.max(1, Math.round((v * originalHeight) / originalWidth)));
    }
  }

  function handleHeightChange(v: number) {
    setHeight(v);
    if (lockAspect && originalHeight > 0) {
      setWidth(Math.max(1, Math.round((v * originalWidth) / originalHeight)));
    }
  }

  function applyPreset(percent: number) {
    setWidth(Math.max(1, Math.round((originalWidth * percent) / 100)));
    setHeight(Math.max(1, Math.round((originalHeight * percent) / 100)));
  }

  React.useEffect(() => {
    if (!img || width <= 0 || height <= 0) return;
    setProcessing(true);
    const timer = setTimeout(() => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("no ctx");
        if (format === "jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, width, height);
        }
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            setProcessing(false);
            if (!blob) {
              setError("Couldn't resize this image. Try different dimensions.");
              return;
            }
            setResizedBlob(blob);
            setResizedUrl((prev) => {
              if (prev) URL.revokeObjectURL(prev);
              const url = URL.createObjectURL(blob);
              trackUrl(url);
              return url;
            });
            track({ name: "tool_completed", toolSlug: tool.slug, category: tool.category });
          },
          MIME[format],
          0.92
        );
      } catch {
        setProcessing(false);
        setError("Something went wrong while resizing this image.");
      }
    }, 150);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [img, width, height, format]);

  function handleChangeImage() {
    setFile(null);
    setImg(null);
    setResizedBlob(null);
    setResizedUrl(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleDownload() {
    if (!resizedBlob || !file) return;
    downloadBlob(resizedBlob, `${baseName(file.name)}-resized.${EXT[format]}`);
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
                {file?.name} · {originalWidth} × {originalHeight}px
              </p>
              <Button variant="ghost" size="sm" onClick={handleChangeImage}>
                <RefreshCcw /> Change image
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <Button key={p} variant="secondary" size="sm" onClick={() => applyPreset(p)}>
                  {p}%
                </Button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
              <div>
                <Label>Width (px)</Label>
                <Input
                  type="number"
                  min={1}
                  value={width}
                  onChange={(e) => handleWidthChange(Math.max(1, Number(e.target.value) || 1))}
                />
              </div>
              <div>
                <Label>Height (px)</Label>
                <Input
                  type="number"
                  min={1}
                  value={height}
                  onChange={(e) => handleHeightChange(Math.max(1, Number(e.target.value) || 1))}
                />
              </div>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setLockAspect((v) => !v)}
                title={lockAspect ? "Aspect ratio locked" : "Aspect ratio unlocked"}
              >
                {lockAspect ? <Lock /> : <Unlock />}
                {lockAspect ? "Locked" : "Unlocked"}
              </Button>
            </div>

            {error && (
              <p className="flex items-start gap-1.5 text-sm text-destructive">
                <XCircle className="mt-0.5 size-4 shrink-0" />
                {error}
              </p>
            )}

            <div>
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Preview{resizedBlob ? ` — ${formatBytes(resizedBlob.size)} · ${width} × ${height}px` : ""}
              </span>
              <div className="flex min-h-24 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-sunken p-2">
                {processing ? (
                  <Loader2 className="size-6 animate-spin text-muted-foreground" />
                ) : resizedUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={resizedUrl} alt="Resized preview" className="max-h-80 w-auto max-w-full object-contain" />
                ) : (
                  <span className="text-xs text-muted-foreground">Preview will appear here.</span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={handleDownload} disabled={!resizedBlob}>
                <Download /> Download resized image
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
