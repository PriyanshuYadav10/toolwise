"use client";

import * as React from "react";
import { Copy, Download, RefreshCw, ClipboardCopy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/hooks/use-copy";
import { downloadText } from "@/lib/download";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

export default function UuidGenerator({ tool }: ToolComponentProps) {
  const [count, setCount] = React.useState(5);
  const [uuids, setUuids] = React.useState<string[]>([]);
  const { copy } = useCopy(tool.slug);

  const generate = React.useCallback(
    (n: number) => {
      const clamped = Math.min(100, Math.max(1, n || 1));
      const list = Array.from({ length: clamped }, () => crypto.randomUUID());
      setUuids(list);
      track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
    },
    [tool.slug, tool.category]
  );

  React.useEffect(() => {
    generate(5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4 flex flex-wrap items-end gap-3">
          <div>
            <Label htmlFor="uuid-count">How many?</Label>
            <Input
              id="uuid-count"
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-28"
            />
          </div>
          <Button size="sm" onClick={() => generate(count)}>
            <RefreshCw /> Generate
          </Button>
          <Button size="sm" variant="ghost" onClick={() => uuids.length && copy(uuids.join("\n"))} disabled={!uuids.length}>
            <ClipboardCopy /> Copy All
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => uuids.length && downloadText(uuids.join("\n"), "uuids.txt")}
            disabled={!uuids.length}
          >
            <Download /> Download as .txt
          </Button>
        </div>

        <div className="rounded-lg border border-border bg-surface-sunken">
          {uuids.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">No UUIDs generated yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {uuids.map((id, i) => (
                <li key={`${id}-${i}`} className="flex items-center justify-between gap-3 px-3.5 py-2">
                  <code className="truncate font-mono text-sm text-foreground">{id}</code>
                  <Button size="icon" variant="ghost" className="size-8 shrink-0" onClick={() => copy(id)} aria-label="Copy UUID">
                    <Copy className="size-3.5" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
