"use client";

import * as React from "react";
import QRCode from "qrcode";
import { Download, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { downloadBlob } from "@/lib/download";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

export default function QrGenerator({ tool }: ToolComponentProps) {
  const [text, setText] = React.useState("");
  const [size, setSize] = React.useState(256);
  const [dataUrl, setDataUrl] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    if (!text.trim()) {
      setDataUrl("");
      setError(null);
      return;
    }
    QRCode.toDataURL(text, { width: size, margin: 1 })
      .then((url: string) => {
        if (cancelled) return;
        setDataUrl(url);
        setError(null);
        track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setDataUrl("");
        const message = e instanceof Error ? e.message : "Could not generate a QR code for this input.";
        setError(message);
        track({ name: "tool_error", toolSlug: tool.slug, category: tool.category, message });
      });
    return () => {
      cancelled = true;
    };
  }, [text, size, tool.slug, tool.category]);

  async function handleDownload() {
    if (!dataUrl) return;
    const blob = await fetch(dataUrl).then((r) => r.blob());
    downloadBlob(blob, "qrcode.png");
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <Label htmlFor="qr-text">Text or URL</Label>
              <Textarea
                id="qr-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text or a URL"
                className="min-h-32 resize-y"
              />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <Label className="mb-0">Size</Label>
                <span className="text-xs text-muted-foreground">{size}px</span>
              </div>
              <Slider min={128} max={512} step={32} value={size} onChange={setSize} />
            </div>
            {error && (
              <p className="flex items-start gap-1.5 text-sm text-destructive">
                <XCircle className="mt-0.5 size-4 shrink-0" />
                <span>{error}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-border bg-surface-sunken p-6">
            {dataUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dataUrl}
                  alt="Generated QR code"
                  width={size}
                  height={size}
                  className="rounded-md border border-border bg-white p-2"
                />
                <Button size="sm" variant="secondary" onClick={handleDownload}>
                  <Download /> Download PNG
                </Button>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Enter some text to generate a QR code.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
