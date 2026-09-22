"use client";

import * as React from "react";
import { Copy, Trash2, ArrowRightLeft, ArrowLeftRight, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { useCopy } from "@/hooks/use-copy";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

type Mode = "encode" | "decode";

export default function UrlTool({ tool }: ToolComponentProps) {
  const initialMode: Mode = tool.slug === "url-decoder" ? "decode" : "encode";
  const [mode, setMode] = React.useState<Mode>(initialMode);
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const { copy } = useCopy(tool.slug);

  React.useEffect(() => {
    if (!input) {
      setOutput("");
      setError(null);
      return;
    }
    try {
      const result = mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input);
      setOutput(result);
      setError(null);
    } catch {
      setOutput("");
      setError("Invalid percent-encoded input.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, mode]);

  function handleConvert() {
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
    if (!input) return;
    try {
      setOutput(mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input));
      setError(null);
    } catch {
      setOutput("");
      setError("Invalid percent-encoded input.");
      track({ name: "tool_error", toolSlug: tool.slug, category: tool.category });
    }
  }

  function handleSwap() {
    setMode((m) => (m === "encode" ? "decode" : "encode"));
    setInput(output);
    setOutput("");
    setError(null);
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setError(null);
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Tabs
            tabs={[
              { value: "encode", label: "Encode" },
              { value: "decode", label: "Decode" },
            ]}
            value={mode}
            onChange={(v) => setMode(v as Mode)}
          />
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" onClick={handleConvert}>
              <ArrowRightLeft /> Convert
            </Button>
            <Button size="sm" variant="ghost" onClick={handleSwap} disabled={!output}>
              <ArrowLeftRight /> Swap
            </Button>
            <Button size="sm" variant="ghost" onClick={() => output && copy(output)} disabled={!output}>
              <Copy /> Copy
            </Button>
            <Button size="sm" variant="ghost" onClick={handleClear}>
              <Trash2 /> Clear
            </Button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {mode === "encode" ? "Plain text / URL" : "Encoded URL"}
            </span>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encode" ? "Enter text or a URL to encode" : "Paste a percent-encoded URL"}
              spellCheck={false}
              className="min-h-64 resize-y font-mono text-sm"
            />
            {error && (
              <p className="mt-2 flex items-start gap-1.5 text-sm text-destructive">
                <XCircle className="mt-0.5 size-4 shrink-0" />
                <span>{error}</span>
              </p>
            )}
          </div>

          <div>
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {mode === "encode" ? "Encoded URL" : "Decoded text"}
            </span>
            <pre className="min-h-64 overflow-auto rounded-lg border border-border bg-code-background p-3.5 font-mono text-sm break-all whitespace-pre-wrap text-code-foreground">
              {output || <span className="text-muted-foreground">Output will appear here.</span>}
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
