"use client";

import * as React from "react";
import md5 from "md5";
import { Copy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/hooks/use-copy";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

async function sha(algo: "SHA-1" | "SHA-256" | "SHA-512", text: string): Promise<string> {
  const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

interface Hashes {
  md5: string;
  sha1: string;
  sha256: string;
  sha512: string;
}

export default function HashGenerator({ tool }: ToolComponentProps) {
  const [text, setText] = React.useState("");
  const [hashes, setHashes] = React.useState<Hashes | null>(null);
  const { copy } = useCopy(tool.slug);

  React.useEffect(() => {
    let cancelled = false;
    if (!text) {
      setHashes(null);
      return;
    }
    (async () => {
      try {
        const [sha1, sha256, sha512] = await Promise.all([sha("SHA-1", text), sha("SHA-256", text), sha("SHA-512", text)]);
        if (cancelled) return;
        setHashes({ md5: md5(text), sha1, sha256, sha512 });
        track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
      } catch (e) {
        if (cancelled) return;
        const message = e instanceof Error ? e.message : "Failed to compute hashes.";
        track({ name: "tool_error", toolSlug: tool.slug, category: tool.category, message });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [text, tool.slug, tool.category]);

  const rows: { label: string; value: string | undefined }[] = [
    { label: "MD5", value: hashes?.md5 },
    { label: "SHA-1", value: hashes?.sha1 },
    { label: "SHA-256", value: hashes?.sha256 },
    { label: "SHA-512", value: hashes?.sha512 },
  ];

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div>
          <Label htmlFor="hash-input">Text</Label>
          <Textarea
            id="hash-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to hash"
            className="min-h-32 resize-y font-mono text-sm"
          />
        </div>

        <div className="space-y-3">
          {rows.map((row) => (
            <div key={row.label} className="rounded-lg border border-border bg-surface-sunken p-3.5">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{row.label}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-7"
                  onClick={() => row.value && copy(row.value)}
                  disabled={!row.value}
                  aria-label={`Copy ${row.label}`}
                >
                  <Copy className="size-3.5" />
                </Button>
              </div>
              <p className="break-all font-mono text-sm text-foreground">
                {row.value ?? <span className="text-muted-foreground">Hash will appear here.</span>}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
