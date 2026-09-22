"use client";

import * as React from "react";
import { XCircle, Copy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/hooks/use-copy";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

function base64UrlDecode(segment: string): string {
  const base64 = segment.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  return decodeURIComponent(escape(atob(padded)));
}

export default function JwtDecoder({ tool }: ToolComponentProps) {
  const [input, setInput] = React.useState("");
  const [header, setHeader] = React.useState<string | null>(null);
  const [payload, setPayload] = React.useState<string | null>(null);
  const [exp, setExp] = React.useState<number | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const { copy } = useCopy(tool.slug);

  React.useEffect(() => {
    if (!input.trim()) {
      setHeader(null);
      setPayload(null);
      setExp(null);
      setError(null);
      return;
    }
    const parts = input.trim().split(".");
    if (parts.length !== 3) {
      setError("This doesn't look like a valid JWT (expected 3 dot-separated parts).");
      setHeader(null);
      setPayload(null);
      setExp(null);
      return;
    }
    try {
      const headerJson = JSON.parse(base64UrlDecode(parts[0]));
      const payloadJson = JSON.parse(base64UrlDecode(parts[1]));
      setHeader(JSON.stringify(headerJson, null, 2));
      setPayload(JSON.stringify(payloadJson, null, 2));
      setExp(typeof payloadJson.exp === "number" ? payloadJson.exp : null);
      setError(null);
      track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to decode this token.";
      setError(`Failed to decode this token: ${message}`);
      setHeader(null);
      setPayload(null);
      setExp(null);
      track({ name: "tool_error", toolSlug: tool.slug, category: tool.category, message });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const isExpired = exp !== null && exp * 1000 < Date.now();

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div>
          <Label htmlFor="jwt-input">JWT</Label>
          <Textarea
            id="jwt-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste a JSON Web Token here"
            spellCheck={false}
            className="min-h-28 resize-y font-mono text-sm break-all"
          />
        </div>

        {error && (
          <p className="flex items-start gap-1.5 text-sm text-destructive">
            <XCircle className="mt-0.5 size-4 shrink-0" />
            <span>{error}</span>
          </p>
        )}

        {(header || payload) && (
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Header</span>
                <Button size="icon" variant="ghost" className="size-7" onClick={() => header && copy(header)} aria-label="Copy header">
                  <Copy className="size-3.5" />
                </Button>
              </div>
              <pre className="overflow-auto rounded-lg border border-border bg-code-background p-3.5 font-mono text-sm text-code-foreground">
                {header}
              </pre>
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Payload</span>
                <Button size="icon" variant="ghost" className="size-7" onClick={() => payload && copy(payload)} aria-label="Copy payload">
                  <Copy className="size-3.5" />
                </Button>
              </div>
              <pre className="overflow-auto rounded-lg border border-border bg-code-background p-3.5 font-mono text-sm text-code-foreground">
                {payload}
              </pre>
              {exp !== null && (
                <p className={`mt-2 text-sm ${isExpired ? "text-destructive" : "text-muted-foreground"}`}>
                  Expires: {new Date(exp * 1000).toLocaleString()}
                  {isExpired ? " (expired)" : ""}
                </p>
              )}
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          This only decodes the token — it does not verify the signature.
        </p>
      </CardContent>
    </Card>
  );
}
