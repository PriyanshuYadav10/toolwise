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

function encodeBase64(input: string): string {
  return btoa(unescape(encodeURIComponent(input)));
}

function decodeBase64(input: string): string {
  return decodeURIComponent(escape(atob(input)));
}

export default function Base64Tool({ tool }: ToolComponentProps) {
  const initialMode: Mode = tool.slug === "base64-decoder" ? "decode" : "encode";
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
      const result = mode === "encode" ? encodeBase64(input) : decodeBase64(input);
      setOutput(result);
      setError(null);
    } catch {
      setOutput("");
      setError(mode === "decode" ? "Invalid Base64 input." : "Unable to encode this input.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, mode]);

  function handleConvert() {
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
    if (!input) return;
    try {
      const result = mode === "encode" ? encodeBase64(input) : decodeBase64(input);
      setOutput(result);
      setError(null);
    } catch {
      setOutput("");
      setError(mode === "decode" ? "Invalid Base64 input." : "Unable to encode this input.");
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
              {mode === "encode" ? "Plain text" : "Base64"}
            </span>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encode" ? "Enter text to encode" : "Paste Base64 to decode"}
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
              {mode === "encode" ? "Base64" : "Plain text"}
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
