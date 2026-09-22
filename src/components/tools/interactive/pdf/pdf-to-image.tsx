"use client";

import * as React from "react";
import * as pdfjsLib from "pdfjs-dist";
import { UploadCloud, FileText, X, Download, Loader2, Images } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { downloadBlob } from "@/lib/download";
import { formatBytes, cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface RenderedPage {
  pageNumber: number;
  blob: Blob;
  url: string;
}

function blobFromCanvas(canvas: HTMLCanvasElement, mimeType: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to render page"));
      },
      mimeType,
      quality
    );
  });
}

export default function PdfToImage({ tool }: ToolComponentProps) {
  const isPng = tool.slug === "pdf-to-png";
  const mimeType = isPng ? "image/png" : "image/jpeg";
  const extension = isPng ? "png" : "jpg";

  const [file, setFile] = React.useState<File | null>(null);
  const [dragging, setDragging] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState<{ current: number; total: number } | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [pages, setPages] = React.useState<RenderedPage[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { show } = useToast();

  React.useEffect(() => {
    return () => {
      pages.forEach((p) => URL.revokeObjectURL(p.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function resetPages() {
    setPages((prev) => {
      prev.forEach((p) => URL.revokeObjectURL(p.url));
      return [];
    });
  }

  async function handleFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    const picked = list[0];
    if (picked.type !== "application/pdf" && !picked.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a PDF file.");
      return;
    }
    setError(null);
    resetPages();
    setFile(picked);
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
    if (inputRef.current) inputRef.current.value = "";

    setProcessing(true);
    try {
      const bytes = await picked.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      const total = pdf.numPages;
      const rendered: RenderedPage[] = [];
      for (let pageNum = 1; pageNum <= total; pageNum++) {
        setProgress({ current: pageNum, total });
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas not supported");
        await page.render({ canvasContext: ctx, viewport, canvas }).promise;
        const blob = await blobFromCanvas(canvas, mimeType, isPng ? undefined : 0.92);
        const url = URL.createObjectURL(blob);
        rendered.push({ pageNumber: pageNum, blob, url });
      }
      setPages(rendered);
      track({ name: "tool_completed", toolSlug: tool.slug, category: tool.category });
      show(`Rendered ${total} page${total === 1 ? "" : "s"} successfully.`, "success");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to render PDF";
      setError("This file couldn't be processed. Please make sure it's a valid PDF and try again.");
      track({ name: "tool_error", toolSlug: tool.slug, category: tool.category, message });
      show("Couldn't convert that PDF.", "error");
      setFile(null);
    } finally {
      setProcessing(false);
      setProgress(null);
    }
  }

  function clearFile() {
    setFile(null);
    resetPages();
    setError(null);
  }

  function downloadPage(page: RenderedPage) {
    downloadBlob(page.blob, `page-${page.pageNumber}.${extension}`);
    track({ name: "download_clicked", toolSlug: tool.slug });
  }

  function downloadAll() {
    pages.forEach((page) => downloadPage(page));
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {!file && (
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
            <p className="text-sm font-medium text-foreground">Drop your PDF file here</p>
            <p className="text-xs text-muted-foreground">or click to browse</p>
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
        )}

        {file && (
          <div className="flex items-center gap-3 rounded-lg border border-border bg-surface-sunken px-3 py-2.5">
            <FileText className="size-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
              <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
            </div>
            <Button variant="ghost" size="icon" className="size-8" onClick={clearFile} aria-label="Remove">
              <X className="size-3.5" />
            </Button>
          </div>
        )}

        {processing && (
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            {progress ? `Rendering page ${progress.current} of ${progress.total}...` : "Rendering..."}
          </div>
        )}

        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

        {pages.length > 0 && (
          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">
                {pages.length} page{pages.length === 1 ? "" : "s"} rendered
              </p>
              <Button onClick={downloadAll} size="sm">
                <Images /> Download all
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {pages.map((page) => (
                <div key={page.pageNumber} className="overflow-hidden rounded-lg border border-border bg-surface-sunken">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={page.url} alt={`Page ${page.pageNumber}`} className="w-full border-b border-border" />
                  <div className="flex items-center justify-between gap-2 p-2">
                    <span className="text-xs text-muted-foreground">Page {page.pageNumber}</span>
                    <Button variant="ghost" size="icon" className="size-7" onClick={() => downloadPage(page)} aria-label="Download page">
                      <Download className="size-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
