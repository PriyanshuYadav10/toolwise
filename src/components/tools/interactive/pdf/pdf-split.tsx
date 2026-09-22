"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import { UploadCloud, FileText, X, Loader2, Scissors } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { downloadBlob } from "@/lib/download";
import { formatBytes, cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

function parseRange(input: string, pageCount: number): { indices: number[] } | { error: string } {
  const trimmed = input.trim();
  if (!trimmed) return { error: "Enter a page range, e.g. 1-3, 5, 7-9." };
  const indices: number[] = [];
  const parts = trimmed.split(",").map((p) => p.trim()).filter(Boolean);
  for (const part of parts) {
    const rangeMatch = part.match(/^(\d+)\s*-\s*(\d+)$/);
    if (rangeMatch) {
      const start = Number(rangeMatch[1]);
      const end = Number(rangeMatch[2]);
      if (start < 1 || end < 1 || start > pageCount || end > pageCount) {
        return { error: `Page range "${part}" is outside this document's ${pageCount} pages.` };
      }
      if (start > end) {
        return { error: `Invalid range "${part}" — start page is after end page.` };
      }
      for (let i = start; i <= end; i++) indices.push(i - 1);
    } else if (/^\d+$/.test(part)) {
      const page = Number(part);
      if (page < 1 || page > pageCount) {
        return { error: `Page ${page} is outside this document's ${pageCount} pages.` };
      }
      indices.push(page - 1);
    } else {
      return { error: `Couldn't understand "${part}". Use a format like 1-3, 5, 7-9.` };
    }
  }
  if (indices.length === 0) return { error: "No valid pages found in that range." };
  return { indices };
}

export default function PdfSplit({ tool }: ToolComponentProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [pageCount, setPageCount] = React.useState<number | null>(null);
  const [range, setRange] = React.useState("");
  const [dragging, setDragging] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const [loadingFile, setLoadingFile] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { show } = useToast();

  async function handleFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    const picked = list[0];
    if (picked.type !== "application/pdf" && !picked.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a PDF file.");
      return;
    }
    setError(null);
    setFile(picked);
    setPageCount(null);
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
    setLoadingFile(true);
    try {
      const bytes = await picked.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      setPageCount(doc.getPageCount());
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to read PDF";
      setError("This file couldn't be processed. Please make sure it's a valid PDF and try again.");
      track({ name: "tool_error", toolSlug: tool.slug, category: tool.category, message });
      setFile(null);
    } finally {
      setLoadingFile(false);
    }
    if (inputRef.current) inputRef.current.value = "";
  }

  function clearFile() {
    setFile(null);
    setPageCount(null);
    setRange("");
    setError(null);
  }

  async function handleSplit() {
    if (!file || pageCount === null) return;
    const parsed = parseRange(range, pageCount);
    if ("error" in parsed) {
      setError(parsed.error);
      return;
    }
    setError(null);
    setProcessing(true);
    try {
      const bytes = await file.arrayBuffer();
      const src = await PDFDocument.load(bytes);
      const out = await PDFDocument.create();
      const pages = await out.copyPages(src, parsed.indices);
      pages.forEach((page) => out.addPage(page));
      const outBytes = await out.save();
      downloadBlob(new Blob([outBytes as BlobPart], { type: "application/pdf" }), "extracted.pdf");
      track({ name: "tool_completed", toolSlug: tool.slug, category: tool.category });
      track({ name: "download_clicked", toolSlug: tool.slug });
      show("Your pages were extracted successfully.", "success");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to split PDF";
      setError("This file couldn't be processed. Please make sure it's a valid PDF and try again.");
      track({ name: "tool_error", toolSlug: tool.slug, category: tool.category, message });
      show("Couldn't split that PDF.", "error");
    } finally {
      setProcessing(false);
    }
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

        {loadingFile && (
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> Reading PDF...
          </div>
        )}

        {file && (
          <div className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-surface-sunken px-3 py-2.5">
            <FileText className="size-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatBytes(file.size)}
                {pageCount !== null ? ` · ${pageCount} page${pageCount === 1 ? "" : "s"}` : ""}
              </p>
            </div>
            <Button variant="ghost" size="icon" className="size-8" onClick={clearFile} aria-label="Remove">
              <X className="size-3.5" />
            </Button>
          </div>
        )}

        {file && pageCount !== null && (
          <div className="mt-5 space-y-3">
            <div>
              <Label>Pages to extract</Label>
              <Input
                value={range}
                onChange={(e) => setRange(e.target.value)}
                placeholder="e.g. 1-3, 5, 7-9"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                This document has {pageCount} page{pageCount === 1 ? "" : "s"}.
              </p>
            </div>
            <Button onClick={handleSplit} disabled={processing || !range.trim()}>
              {processing ? <Loader2 className="animate-spin" /> : <Scissors />}
              {processing ? "Extracting..." : "Split / Extract"}
            </Button>
          </div>
        )}

        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      </CardContent>
    </Card>
  );
}
