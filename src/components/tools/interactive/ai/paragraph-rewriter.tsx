"use client";

import * as React from "react";
import { Wand2, Copy, RefreshCw, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAiGenerate } from "@/hooks/use-ai-generate";
import { useCopy } from "@/hooks/use-copy";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

type Tone = "formal" | "casual" | "concise" | "simple";

const TONE_TABS: { value: Tone; label: string }[] = [
  { value: "concise", label: "Concise" },
  { value: "formal", label: "Formal" },
  { value: "casual", label: "Casual" },
  { value: "simple", label: "Simple" },
];

export default function ParagraphRewriter({ tool }: ToolComponentProps) {
  const [text, setText] = React.useState("");
  const [tone, setTone] = React.useState<Tone>("concise");
  const { result, loading, error, generate } = useAiGenerate<{ text: string; tone: Tone }>({
    endpoint: "/api/ai/rewrite",
  });
  const { copy } = useCopy(tool.slug);

  const canSubmit = text.trim().length > 1;

  async function handleGenerate() {
    if (!canSubmit) return;
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
    const res = await generate({ text, tone });
    if (res) track({ name: "tool_completed", toolSlug: tool.slug, category: tool.category });
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Tabs tabs={TONE_TABS} value={tone} onChange={(v) => setTone(v as Tone)} />
          <Button onClick={handleGenerate} disabled={!canSubmit || loading}>
            {loading ? (
              <>
                <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Rewriting...
              </>
            ) : (
              <>
                <Wand2 /> Rewrite
              </>
            )}
          </Button>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Original
            </span>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste the text you want to rewrite"
              className="min-h-64"
            />
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Rewritten</span>
              {result && (
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => copy(result)}>
                    <Copy /> Copy
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleGenerate} disabled={loading}>
                    <RefreshCw /> Regenerate
                  </Button>
                </div>
              )}
            </div>
            <div className="min-h-64 whitespace-pre-wrap rounded-lg border border-border bg-surface-sunken p-4 text-sm leading-relaxed text-foreground">
              {error ? (
                <p className="flex items-start gap-2 text-destructive">
                  <AlertCircle className="mt-0.5 size-4 shrink-0" />
                  {error}
                </p>
              ) : result ? (
                result
              ) : (
                <span className="text-muted-foreground">Your rewritten text will appear here.</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
