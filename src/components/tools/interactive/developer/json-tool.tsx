"use client";

import * as React from "react";
import { Copy, Download, Trash2, Sparkles, Minimize2, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/hooks/use-copy";
import { downloadText } from "@/lib/download";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { ToolComponentProps } from "@/lib/tool-components";

const SAMPLE = `{
  "name": "Toolwise",
  "tools": ["calculators", "developer-tools", "pdf-tools"],
  "free": true
}`;

function locateError(input: string, message: string): { line: number; column: number } | null {
  const match = message.match(/position (\d+)/);
  if (!match) return null;
  const pos = Number(match[1]);
  const before = input.slice(0, pos);
  const lines = before.split("\n");
  return { line: lines.length, column: lines[lines.length - 1].length + 1 };
}

function highlight(json: string): string {
  const escaped = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g,
    (match) => {
      let cls = "text-[color:oklch(0.55_0.16_260)] dark:text-[color:oklch(0.75_0.14_260)]"; // number
      if (/^"/.test(match)) {
        cls = /:$/.test(match)
          ? "text-[color:oklch(0.5_0.15_290)] dark:text-[color:oklch(0.8_0.12_290)]" // key
          : "text-[color:oklch(0.55_0.15_150)] dark:text-[color:oklch(0.78_0.14_150)]"; // string
      } else if (/true|false/.test(match)) {
        cls = "text-[color:oklch(0.6_0.18_35)] dark:text-[color:oklch(0.78_0.16_35)]";
      } else if (/null/.test(match)) {
        cls = "text-muted-foreground";
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
}

export default function JsonTool({ tool }: ToolComponentProps) {
  const initialMode = tool.slug === "json-minifier" ? "minify" : tool.slug === "json-validator" ? "validate" : "format";
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState<{ line: number; column: number; message: string } | null>(null);
  const [valid, setValid] = React.useState<boolean | null>(null);
  const { copy } = useCopy(tool.slug);

  function run(mode: "format" | "minify" | "validate") {
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
    if (!input.trim()) {
      setError(null);
      setOutput("");
      setValid(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setError(null);
      setValid(true);
      if (mode === "format") setOutput(JSON.stringify(parsed, null, 2));
      else if (mode === "minify") setOutput(JSON.stringify(parsed));
      else setOutput(JSON.stringify(parsed, null, 2));
    } catch (e) {
      const message = e instanceof Error ? e.message : "Invalid JSON";
      const loc = locateError(input, message);
      setValid(false);
      setOutput("");
      setError({ line: loc?.line ?? 0, column: loc?.column ?? 0, message });
      track({ name: "tool_error", toolSlug: tool.slug, category: tool.category, message });
    }
  }

  const highlighted = React.useMemo(() => (output ? highlight(output) : ""), [output]);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4 flex flex-wrap gap-2">
          <Button size="sm" onClick={() => run("format")}>
            <Sparkles /> Format
          </Button>
          <Button size="sm" variant="secondary" onClick={() => run("minify")}>
            <Minimize2 /> Minify
          </Button>
          <Button size="sm" variant="secondary" onClick={() => run("validate")}>
            <CheckCircle2 /> Validate
          </Button>
          <Button size="sm" variant="ghost" onClick={() => output && copy(output)} disabled={!output}>
            <Copy /> Copy
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => output && downloadText(output, "data.json", "application/json")}
            disabled={!output}
          >
            <Download /> Download
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setInput("");
              setOutput("");
              setError(null);
              setValid(null);
            }}
          >
            <Trash2 /> Clear
          </Button>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Input</span>
              {!input && (
                <button onClick={() => setInput(SAMPLE)} className="text-xs text-primary hover:underline">
                  Load sample
                </button>
              )}
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste JSON here"
              spellCheck={false}
              className="min-h-80 resize-y font-mono text-sm"
            />
            {error && (
              <p className="mt-2 flex items-start gap-1.5 text-sm text-destructive">
                <XCircle className="mt-0.5 size-4 shrink-0" />
                <span>
                  {error.line > 0 ? `Line ${error.line}, column ${error.column}: ` : ""}
                  {error.message}
                </span>
              </p>
            )}
            {valid === true && (
              <p className="mt-2 flex items-center gap-1.5 text-sm text-success">
                <CheckCircle2 className="size-4" /> Valid JSON
              </p>
            )}
          </div>

          <div>
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Output
            </span>
            <pre
              className={cn(
                "min-h-80 overflow-auto rounded-lg border border-border bg-code-background p-3.5 font-mono text-sm text-code-foreground"
              )}
            >
              {output ? (
                <code dangerouslySetInnerHTML={{ __html: highlighted }} />
              ) : (
                <span className="text-muted-foreground">Formatted output will appear here.</span>
              )}
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
