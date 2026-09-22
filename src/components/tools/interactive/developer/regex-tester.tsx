"use client";

import * as React from "react";
import { XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Textarea, Label } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

const FLAGS: { key: string; label: string }[] = [
  { key: "g", label: "Global (g)" },
  { key: "i", label: "Ignore case (i)" },
  { key: "m", label: "Multiline (m)" },
  { key: "s", label: "Dot-all (s)" },
];

export default function RegexTester({ tool }: ToolComponentProps) {
  const [pattern, setPattern] = React.useState("");
  const [flags, setFlags] = React.useState<Set<string>>(new Set(["g"]));
  const [testString, setTestString] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  function toggleFlag(key: string) {
    setFlags((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const { matches, regexError } = React.useMemo(() => {
    if (!pattern) return { matches: [] as RegExpMatchArray[], regexError: null as string | null };
    try {
      const flagStr = Array.from(flags).join("");
      const regex = new RegExp(pattern, flagStr);
      let found: RegExpMatchArray[] = [];
      if (flags.has("g")) {
        found = Array.from(testString.matchAll(regex));
      } else {
        const m = regex.exec(testString);
        found = m ? [m] : [];
      }
      return { matches: found, regexError: null };
    } catch (e) {
      const message = e instanceof Error ? e.message : "Invalid pattern";
      return { matches: [], regexError: `Invalid regular expression: ${message}` };
    }
  }, [pattern, flags, testString]);

  React.useEffect(() => {
    setError(regexError);
    if (pattern && !regexError) {
      track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
    } else if (regexError) {
      track({ name: "tool_error", toolSlug: tool.slug, category: tool.category, message: regexError });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regexError]);

  const highlightedNodes = React.useMemo(() => {
    if (!testString) return null;
    if (error || matches.length === 0) return testString;
    const nodes: React.ReactNode[] = [];
    let lastIndex = 0;
    matches.forEach((m, i) => {
      const start = m.index ?? 0;
      const end = start + m[0].length;
      if (start > lastIndex) nodes.push(testString.slice(lastIndex, start));
      nodes.push(
        <mark key={i} className="rounded bg-primary/20 px-0.5 text-foreground">
          {m[0]}
        </mark>
      );
      lastIndex = Math.max(lastIndex, end);
    });
    if (lastIndex < testString.length) nodes.push(testString.slice(lastIndex));
    return nodes;
  }, [testString, matches, error]);

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <div>
            <Label htmlFor="regex-pattern">Pattern</Label>
            <Input
              id="regex-pattern"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="e.g. \\b\\w+@\\w+\\.\\w+\\b"
              className="font-mono text-sm"
              spellCheck={false}
            />
          </div>
          <div>
            <Label>Flags</Label>
            <div className="flex flex-wrap gap-1.5">
              {FLAGS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => toggleFlag(f.key)}
                  className={cn(
                    "rounded-md border px-2.5 py-2 text-xs font-medium transition-colors cursor-pointer",
                    flags.has(f.key)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:bg-muted"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <p className="flex items-start gap-1.5 text-sm text-destructive">
            <XCircle className="mt-0.5 size-4 shrink-0" />
            <span>{error}</span>
          </p>
        )}

        <div>
          <Label htmlFor="regex-test-string">Test string</Label>
          <Textarea
            id="regex-test-string"
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Paste text to test the pattern against"
            className="min-h-32 resize-y font-mono text-sm"
          />
        </div>

        <div>
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {matches.length} {matches.length === 1 ? "match" : "matches"} found
          </span>
          <pre className="min-h-24 overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-code-background p-3.5 font-mono text-sm text-code-foreground">
            {highlightedNodes ?? <span className="text-muted-foreground">Highlighted matches will appear here.</span>}
          </pre>
        </div>

        {matches.length > 0 && (
          <div className="overflow-auto rounded-lg border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-sunken text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-3 py-2">#</th>
                  <th className="px-3 py-2">Index</th>
                  <th className="px-3 py-2">Match</th>
                  <th className="px-3 py-2">Groups</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {matches.map((m, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2 text-muted-foreground">{i + 1}</td>
                    <td className="px-3 py-2 text-muted-foreground">{m.index}</td>
                    <td className="px-3 py-2 font-mono break-all">{m[0]}</td>
                    <td className="px-3 py-2 font-mono break-all text-muted-foreground">
                      {m.length > 1
                        ? m
                            .slice(1)
                            .map((g, gi) => `$${gi + 1}: ${g ?? "—"}`)
                            .join(", ")
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
