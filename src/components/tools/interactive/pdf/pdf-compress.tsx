"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import { UploadCloud, FileText, X, Download, Loader2, FileArchive } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";
import { downloadBlob } from "@/lib/download";
import { formatBytes, cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

type Level = "low" | "medium" | "high";

const LEVELS: { value: Level; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export default function PdfCompress({ tool }: ToolComponentProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [level, setLevel] = React.useState<Level>("medium");
  const [dragging, setDragging] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<{ blob: Blob; size: number } | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { show } = useToast();

  function handleFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    const picked = list[0];
    if (picked.type !== "application/pdf" && !picked.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a PDF file.");
      return;
    }
    setError(null);
    setFile(picked);
    setResult(null);
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
    if (inputRef.current) inputRef.current.value = "";
  }

  function clearFile() {
    setFile(null);
    setResult(null);
    setError(null);
  }

  async function handleCompress() {
    if (!file) return;
    setProcessing(true);
    setError(null);
    setResult(null);
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes, { updateMetadata: false });
      const outBytes = await doc.save({ useObjectStreams: true });
      const blob = new Blob([outBytes as BlobPart], { type: "application/pdf" });
      setResult({ blob, size: blob.size });
      track({ name: "tool_completed", toolSlug: tool.slug, category: tool.category });
      show("Your PDF was compressed.", "success");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to compress PDF";
      setError("This file couldn't be processed. Please make sure it's a valid PDF and try again.");
      track({ name: "tool_error", toolSlug: tool.slug, category: tool.category, message });
      show("Couldn't compress that PDF.", "error");
    } finally {
      setProcessing(false);
    }
  }

  function handleDownload() {
    if (!result) return;
    downloadBlob(result.blob, "compressed.pdf");
    track({ name: "download_clicked", toolSlug: tool.slug });
  }

  const percentSmaller = file && result ? Math.max(0, Math.round((1 - result.size / file.size) * 100)) : null;

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

        {file && (
          <div className="mt-5 space-y-2">
            <p className="text-sm font-medium text-foreground">Compression level</p>
            <Tabs tabs={LEVELS} value={level} onChange={(v) => setLevel(v as Level)} />
            <p className="text-xs text-muted-foreground">
              Compression works best on PDFs with large embedded images or redundant data — text-only PDFs may not
              shrink much.
            </p>
          </div>
        )}

        {file && (
          <div className="mt-5">
            <Button onClick={handleCompress} disabled={processing}>
              {processing ? <Loader2 className="animate-spin" /> : <FileArchive />}
              {processing ? "Compressing..." : "Compress PDF"}
            </Button>
          </div>
        )}

        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

        {result && file && (
          <div className="mt-5 space-y-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-surface-sunken p-4">
                <p className="text-xs text-muted-foreground">Original size</p>
                <p className="mt-1 text-lg font-semibold text-foreground">{formatBytes(file.size)}</p>
              </div>
              <div className="rounded-lg border border-border bg-surface-sunken p-4">
                <p className="text-xs text-muted-foreground">Compressed size</p>
                <p className="mt-1 text-lg font-semibold text-foreground">{formatBytes(result.size)}</p>
              </div>
              <div className="rounded-lg border border-border bg-surface-sunken p-4">
                <p className="text-xs text-muted-foreground">Change</p>
                <p
                  className={cn(
                    "mt-1 text-lg font-semibold",
                    percentSmaller && percentSmaller > 0 ? "text-success" : "text-foreground"
                  )}
                >
                  {percentSmaller !== null ? `${percentSmaller}% smaller` : "—"}
                </p>
              </div>
            </div>
            <Button onClick={handleDownload}>
              <Download /> Download compressed PDF
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
