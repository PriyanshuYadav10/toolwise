"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import { UploadCloud, FileText, X, Download, Loader2, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { downloadBlob } from "@/lib/download";
import { formatBytes, cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

export default function PdfMerge({ tool }: ToolComponentProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [dragging, setDragging] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { show } = useToast();

  function handleFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    const incoming = Array.from(list).filter((f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"));
    if (incoming.length === 0) {
      setError("Please select PDF files only.");
      return;
    }
    setError(null);
    setFiles((prev) => [...prev, ...incoming]);
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
    if (inputRef.current) inputRef.current.value = "";
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function moveFile(index: number, direction: -1 | 1) {
    setFiles((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function handleMerge() {
    if (files.length < 2) return;
    setProcessing(true);
    setError(null);
    try {
      const merged = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const src = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(src, src.getPageIndices());
        pages.forEach((page) => merged.addPage(page));
      }
      const outBytes = await merged.save();
      downloadBlob(new Blob([outBytes as BlobPart], { type: "application/pdf" }), "merged.pdf");
      track({ name: "tool_completed", toolSlug: tool.slug, category: tool.category });
      track({ name: "download_clicked", toolSlug: tool.slug });
      show("Your PDFs were merged successfully.", "success");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to merge PDFs";
      setError("This file couldn't be processed. Please make sure all files are valid PDFs and try again.");
      track({ name: "tool_error", toolSlug: tool.slug, category: tool.category, message });
      show("Couldn't merge those PDFs.", "error");
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
          <p className="text-sm font-medium text-foreground">Drop your PDF files here</p>
          <p className="text-xs text-muted-foreground">or click to browse (select multiple)</p>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center gap-3 rounded-lg border border-border bg-surface-sunken px-3 py-2.5"
              >
                <FileText className="size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    disabled={index === 0}
                    onClick={() => moveFile(index, -1)}
                    aria-label="Move up"
                  >
                    <ArrowUp className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    disabled={index === files.length - 1}
                    onClick={() => moveFile(index, 1)}
                    aria-label="Move down"
                  >
                    <ArrowDown className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => removeFile(index)}
                    aria-label="Remove"
                  >
                    <X className="size-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button onClick={handleMerge} disabled={files.length < 2 || processing}>
            {processing ? <Loader2 className="animate-spin" /> : <Download />}
            {processing ? "Merging..." : "Merge PDFs"}
          </Button>
          {files.length > 0 && files.length < 2 && (
            <p className="text-xs text-muted-foreground">Add at least 2 PDF files to merge.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
