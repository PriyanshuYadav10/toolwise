"use client";

import * as React from "react";
import { UploadCloud, Download, RefreshCcw, XCircle, Crop as CropIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ASPECT_OPTIONS: { label: string; value: number | null }[] = [
  { label: "Free", value: null },
  { label: "1:1", value: 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "16:9", value: 16 / 9 },
];

type Mode = "create" | "move" | "resize-nw" | "resize-ne" | "resize-sw" | "resize-se" | null;

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

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

export default function ImageCropper({ tool }: ToolComponentProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const displayImgRef = React.useRef<HTMLImageElement>(null);

  const [dragging, setDragging] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [imgSrc, setImgSrc] = React.useState<string | null>(null);
  const [naturalImg, setNaturalImg] = React.useState<HTMLImageElement | null>(null);
  const [format, setFormat] = React.useState<Format>("jpeg");
  const [aspect, setAspect] = React.useState<number | null>(null);
  const [selection, setSelection] = React.useState<Rect | null>(null);
  const [croppedBlob, setCroppedBlob] = React.useState<Blob | null>(null);
  const [croppedUrl, setCroppedUrl] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const objectUrls = React.useRef<Set<string>>(new Set());
  const modeRef = React.useRef<Mode>(null);
  const originRef = React.useRef<{ x: number; y: number; rect: Rect } | null>(null);

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
      setNaturalImg(loaded);
      setImgSrc(url);
      setFormat(formatFromMime(f.type));
      setSelection(null);
      setCroppedBlob(null);
      setCroppedUrl(null);
      track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
    } catch {
      setError("Couldn't load this image. Try a different file.");
    }
  }

  function handleChangeImage() {
    setFile(null);
    setImgSrc(null);
    setNaturalImg(null);
    setSelection(null);
    setCroppedBlob(null);
    setCroppedUrl(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function getBounds() {
    const el = displayImgRef.current;
    if (!el) return { width: 0, height: 0, left: 0, top: 0 };
    const rect = el.getBoundingClientRect();
    return { width: rect.width, height: rect.height, left: rect.left, top: rect.top };
  }

  function pointFromEvent(e: PointerEvent | React.PointerEvent) {
    const b = getBounds();
    return {
      x: clamp(e.clientX - b.left, 0, b.width),
      y: clamp(e.clientY - b.top, 0, b.height),
      w: b.width,
      h: b.height,
    };
  }

  function attachWindowListeners() {
    window.addEventListener("pointermove", onWindowMove);
    window.addEventListener("pointerup", onWindowUp);
  }

  function detachWindowListeners() {
    window.removeEventListener("pointermove", onWindowMove);
    window.removeEventListener("pointerup", onWindowUp);
  }

  function onWrapperPointerDown(e: React.PointerEvent) {
    if (e.target !== e.currentTarget) return;
    const { x, y } = pointFromEvent(e);
    originRef.current = { x, y, rect: { x, y, width: 0, height: 0 } };
    modeRef.current = "create";
    setSelection({ x, y, width: 0, height: 0 });
    attachWindowListeners();
  }

  function onSelectionPointerDown(e: React.PointerEvent) {
    e.stopPropagation();
    if (!selection) return;
    const { x, y } = pointFromEvent(e);
    originRef.current = { x, y, rect: selection };
    modeRef.current = "move";
    attachWindowListeners();
  }

  function onHandlePointerDown(corner: Exclude<Mode, "create" | "move" | null>) {
    return (e: React.PointerEvent) => {
      e.stopPropagation();
      if (!selection) return;
      const { x, y } = pointFromEvent(e);
      originRef.current = { x, y, rect: selection };
      modeRef.current = corner;
      attachWindowListeners();
    };
  }

  function onWindowMove(e: PointerEvent) {
    const mode = modeRef.current;
    const origin = originRef.current;
    if (!mode || !origin) return;
    const { x, y, w, h } = pointFromEvent(e);

    if (mode === "create") {
      const nx = Math.min(origin.x, x);
      let ny = Math.min(origin.y, y);
      let nw = Math.abs(x - origin.x);
      let nh = Math.abs(y - origin.y);
      if (aspect) {
        nh = nw / aspect;
        ny = y < origin.y ? origin.y - nh : origin.y;
      }
      nw = clamp(nw, 0, w - nx);
      nh = clamp(nh, 0, h - ny);
      setSelection({ x: nx, y: ny, width: nw, height: nh });
      return;
    }

    if (mode === "move") {
      const dx = x - origin.x;
      const dy = y - origin.y;
      const nx = clamp(origin.rect.x + dx, 0, w - origin.rect.width);
      const ny = clamp(origin.rect.y + dy, 0, h - origin.rect.height);
      setSelection({ ...origin.rect, x: nx, y: ny });
      return;
    }

    // resize
    const r = origin.rect;
    let left = r.x;
    let top = r.y;
    let right = r.x + r.width;
    let bottom = r.y + r.height;

    if (mode === "resize-se") {
      right = clamp(x, left + 1, w);
      bottom = clamp(y, top + 1, h);
      if (aspect) bottom = clamp(top + (right - left) / aspect, top + 1, h);
    } else if (mode === "resize-nw") {
      left = clamp(x, 0, right - 1);
      top = clamp(y, 0, bottom - 1);
      if (aspect) top = clamp(bottom - (right - left) / aspect, 0, bottom - 1);
    } else if (mode === "resize-ne") {
      right = clamp(x, left + 1, w);
      top = clamp(y, 0, bottom - 1);
      if (aspect) top = clamp(bottom - (right - left) / aspect, 0, bottom - 1);
    } else if (mode === "resize-sw") {
      left = clamp(x, 0, right - 1);
      bottom = clamp(y, top + 1, h);
      if (aspect) bottom = clamp(top + (right - left) / aspect, top + 1, h);
    }

    setSelection({ x: left, y: top, width: right - left, height: bottom - top });
  }

  function onWindowUp() {
    modeRef.current = null;
    originRef.current = null;
    detachWindowListeners();
  }

  React.useEffect(() => () => detachWindowListeners(), []);

  function applyAspect(value: number | null) {
    setAspect(value);
    if (!selection || !value) return;
    const b = getBounds();
    const newHeight = clamp(selection.width / value, 1, b.height - selection.y);
    setSelection({ ...selection, height: newHeight });
  }

  function handleCrop() {
    if (!naturalImg || !selection || selection.width < 4 || selection.height < 4) return;
    const b = getBounds();
    if (b.width === 0 || b.height === 0) return;
    const scaleX = naturalImg.naturalWidth / b.width;
    const scaleY = naturalImg.naturalHeight / b.height;
    const sx = Math.round(selection.x * scaleX);
    const sy = Math.round(selection.y * scaleY);
    const sw = Math.round(selection.width * scaleX);
    const sh = Math.round(selection.height * scaleY);

    try {
      const canvas = document.createElement("canvas");
      canvas.width = sw;
      canvas.height = sh;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("no ctx");
      if (format === "jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, sw, sh);
      }
      ctx.drawImage(naturalImg, sx, sy, sw, sh, 0, 0, sw, sh);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError("Couldn't crop this image. Try a different selection.");
            return;
          }
          setCroppedBlob(blob);
          setCroppedUrl((prev) => {
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
      setError("Something went wrong while cropping this image.");
    }
  }

  function handleDownload() {
    if (!croppedBlob || !file) return;
    downloadBlob(croppedBlob, `${baseName(file.name)}-cropped.${EXT[format]}`);
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {!imgSrc ? (
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

            <div className="flex flex-wrap gap-2">
              {ASPECT_OPTIONS.map((opt) => (
                <Button
                  key={opt.label}
                  size="sm"
                  variant={aspect === opt.value ? "primary" : "secondary"}
                  onClick={() => applyAspect(opt.value)}
                >
                  {opt.label}
                </Button>
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              Drag on the image to select an area to keep. Drag the corner handles to resize, or drag inside the
              selection to move it.
            </p>

            <div
              ref={wrapperRef}
              className="relative mx-auto max-w-full select-none overflow-hidden rounded-lg border border-border bg-surface-sunken"
              style={{ touchAction: "none" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={displayImgRef}
                src={imgSrc}
                alt="To crop"
                draggable={false}
                className="block max-h-[65vh] w-full object-contain"
              />
              <div className="absolute inset-0" onPointerDown={onWrapperPointerDown}>
                {selection && (
                  <div
                    onPointerDown={onSelectionPointerDown}
                    className="absolute cursor-move border-2 border-primary"
                    style={{
                      left: selection.x,
                      top: selection.y,
                      width: selection.width,
                      height: selection.height,
                      boxShadow: "0 0 0 9999px rgba(0,0,0,0.55)",
                    }}
                  >
                    {(["nw", "ne", "sw", "se"] as const).map((corner) => (
                      <div
                        key={corner}
                        onPointerDown={onHandlePointerDown(`resize-${corner}` as Exclude<Mode, "create" | "move" | null>)}
                        className={cn(
                          "absolute size-3.5 rounded-full border-2 border-primary bg-surface-elevated",
                          corner === "nw" && "-left-1.5 -top-1.5 cursor-nwse-resize",
                          corner === "ne" && "-right-1.5 -top-1.5 cursor-nesw-resize",
                          corner === "sw" && "-left-1.5 -bottom-1.5 cursor-nesw-resize",
                          corner === "se" && "-right-1.5 -bottom-1.5 cursor-nwse-resize"
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {error && (
              <p className="flex items-start gap-1.5 text-sm text-destructive">
                <XCircle className="mt-0.5 size-4 shrink-0" />
                {error}
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                onClick={handleCrop}
                disabled={!selection || selection.width < 4 || selection.height < 4}
              >
                <CropIcon /> Crop
              </Button>
            </div>

            {croppedUrl && (
              <div>
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Cropped result{croppedBlob ? ` — ${formatBytes(croppedBlob.size)}` : ""}
                </span>
                <div className="flex items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-sunken p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={croppedUrl} alt="Cropped result" className="max-h-72 w-auto max-w-full object-contain" />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" onClick={handleDownload}>
                    <Download /> Download cropped image
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
