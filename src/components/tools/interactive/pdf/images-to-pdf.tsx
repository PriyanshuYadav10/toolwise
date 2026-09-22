"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import { UploadCloud, X, Loader2, ArrowUp, ArrowDown, FileUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { downloadBlob } from "@/lib/download";
import { formatBytes, cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

interface ImageItem {
  file: File;
  url: string;
}

const SUPPORTED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export default function ImagesToPdf({ tool }: ToolComponentProps) {
  const [images, setImages] = React.useState<ImageItem[]>([]);
  const [dragging, setDragging] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { show } = useToast();

  React.useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    const incoming = Array.from(list);
    const unsupported = incoming.filter((f) => !SUPPORTED_TYPES.includes(f.type));
    const supported = incoming.filter((f) => SUPPORTED_TYPES.includes(f.type));

    if (unsupported.length > 0) {
      setError(
        `${unsupported.length} file${unsupported.length === 1 ? " is" : "s are"} not a supported image type. Only JPG and PNG images can be converted.`
      );
    } else {
      setError(null);
    }

    if (supported.length > 0) {
      const items = supported.map((file) => ({ file, url: URL.createObjectURL(file) }));
      setImages((prev) => [...prev, ...items]);
      track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
    }
    if (inputRef.current) inputRef.current.value = "";
  }

  function removeImage(index: number) {
    setImages((prev) => {
      const target = prev[index];
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((_, i) => i !== index);
    });
  }

  function moveImage(index: number, direction: -1 | 1) {
    setImages((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function handleConvert() {
    if (images.length === 0) return;
    setProcessing(true);
    setError(null);
    try {
      const doc = await PDFDocument.create();
      for (const item of images) {
        const bytes = await item.file.arrayBuffer();
        const isPng = item.file.type === "image/png";
        const img = isPng ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
        const page = doc.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      const outBytes = await doc.save();
      downloadBlob(new Blob([outBytes as BlobPart], { type: "application/pdf" }), "converted.pdf");
      track({ name: "tool_completed", toolSlug: tool.slug, category: tool.category });
      track({ name: "download_clicked", toolSlug: tool.slug });
      show("Your PDF was created successfully.", "success");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to convert images";
      setError("These images couldn't be converted. Please make sure they're valid JPG or PNG files and try again.");
      track({ name: "tool_error", toolSlug: tool.slug, category: tool.category, message });
      show("Couldn't convert those images.", "error");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-10 text-center transition-colors",
            dragging ? "border-primary bg-primary/5" : "border-border hover:border-border-strong"
          )}
        >
          <UploadCloud className="size-8 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">Drop your image(s) here</p>
          <p className="text-xs text-muted-foreground">or click to browse (JPG or PNG, select multiple)</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {images.map((item, index) => (
              <div key={`${item.file.name}-${index}`} className="overflow-hidden rounded-lg border border-border bg-surface-sunken">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt={item.file.name} className="h-28 w-full border-b border-border object-cover" />
                <div className="p-2">
                  <p className="truncate text-xs font-medium text-foreground">{item.file.name}</p>
                  <p className="text-[11px] text-muted-foreground">{formatBytes(item.file.size)}</p>
                  <div className="mt-1.5 flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7"
                      disabled={index === 0}
                      onClick={() => moveImage(index, -1)}
                      aria-label="Move up"
                    >
                      <ArrowUp className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7"
                      disabled={index === images.length - 1}
                      onClick={() => moveImage(index, 1)}
                      aria-label="Move down"
                    >
                      <ArrowDown className="size-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-7" onClick={() => removeImage(index)} aria-label="Remove">
                      <X className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button onClick={handleConvert} disabled={images.length === 0 || processing}>
            {processing ? <Loader2 className="animate-spin" /> : <FileUp />}
            {processing ? "Converting..." : "Convert to PDF"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
