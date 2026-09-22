"use client";

import * as React from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { UploadCloud, FileText, X, Loader2, RotateCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { downloadBlob } from "@/lib/download";
import { formatBytes, cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

type Target = "all" | "specific";

export default function PdfRotate({ tool }: ToolComponentProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [pageCount, setPageCount] = React.useState<number | null>(null);
  const [target, setTarget] = React.useState<Target>("all");
  const [pageNumber, setPageNumber] = React.useState(1);
  const [angle, setAngle] = React.useState<90 | 180 | 270>(90);
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
    setTarget("all");
    setPageNumber(1);
    setError(null);
  }

  async function handleRotate() {
    if (!file || pageCount === null) return;
    if (target === "specific" && (pageNumber < 1 || pageNumber > pageCount)) {
      setError(`Page number must be between 1 and ${pageCount}.`);
      return;
    }
    setError(null);
    setProcessing(true);
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const pages = target === "all" ? doc.getPages() : [doc.getPage(pageNumber - 1)];
      pages.forEach((page) => {
        page.setRotation(degrees((page.getRotation().angle + angle) % 360));
      });
      const outBytes = await doc.save();
      downloadBlob(new Blob([outBytes as BlobPart], { type: "application/pdf" }), "rotated.pdf");
      track({ name: "tool_completed", toolSlug: tool.slug, category: tool.category });
      track({ name: "download_clicked", toolSlug: tool.slug });
      show("Your PDF was rotated successfully.", "success");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to rotate PDF";
      setError("This file couldn't be processed. Please make sure it's a valid PDF and try again.");
      track({ name: "tool_error", toolSlug: tool.slug, category: tool.category, message });
      show("Couldn't rotate that PDF.", "error");
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
          <div className="mt-5 space-y-5">
            <div>
              <Label>Pages to rotate</Label>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant={target === "all" ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => setTarget("all")}
                >
                  All pages
                </Button>
                <Button
                  type="button"
                  variant={target === "specific" ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => setTarget("specific")}
                >
                  Specific page
                </Button>
                {target === "specific" && (
                  <Input
                    type="number"
                    min={1}
                    max={pageCount}
                    value={pageNumber}
                    onChange={(e) => setPageNumber(Number(e.target.value) || 1)}
                    className="w-24"
                  />
                )}
              </div>
            </div>

            <div>
              <Label>Rotation angle</Label>
              <div className="flex flex-wrap gap-2">
                {[90, 180, 270].map((a) => (
                  <Button
                    key={a}
                    type="button"
                    variant={angle === a ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setAngle(a as 90 | 180 | 270)}
                  >
                    {a}°
                  </Button>
                ))}
              </div>
            </div>

            <Button onClick={handleRotate} disabled={processing}>
              {processing ? <Loader2 className="animate-spin" /> : <RotateCw />}
              {processing ? "Rotating..." : "Rotate PDF"}
            </Button>
          </div>
        )}

        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      </CardContent>
    </Card>
  );
}
