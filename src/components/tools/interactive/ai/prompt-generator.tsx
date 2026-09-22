"use client";

import * as React from "react";
import { Wand2, Copy, RefreshCw, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea, Label } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAiGenerate } from "@/hooks/use-ai-generate";
import { useCopy } from "@/hooks/use-copy";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

type OutputType = "writing" | "code" | "image" | "research" | "general";

const OUTPUT_TYPES: { value: OutputType; label: string }[] = [
  { value: "general", label: "General" },
  { value: "writing", label: "Writing" },
  { value: "code", label: "Code" },
  { value: "image", label: "Image generation" },
  { value: "research", label: "Research" },
];

export default function PromptGenerator({ tool }: ToolComponentProps) {
  const [goal, setGoal] = React.useState("");
  const [outputType, setOutputType] = React.useState<OutputType>("general");
  const { result, loading, error, generate } = useAiGenerate<{ goal: string; outputType: OutputType }>({
    endpoint: "/api/ai/prompt",
  });
  const { copy } = useCopy(tool.slug);

  const canSubmit = goal.trim().length > 2;

  async function handleGenerate() {
    if (!canSubmit) return;
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
    const res = await generate({ goal, outputType });
    if (res) track({ name: "tool_completed", toolSlug: tool.slug, category: tool.category });
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <Label htmlFor="prompt-goal">What do you want to achieve?</Label>
            <Textarea
              id="prompt-goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. Write a product launch announcement for a new budgeting app"
              className="min-h-24"
            />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <div className="w-48">
            <Label htmlFor="prompt-type">Output type</Label>
            <Select
              id="prompt-type"
              value={outputType}
              options={OUTPUT_TYPES}
              onChange={(v) => setOutputType(v as OutputType)}
            />
          </div>
          <Button onClick={handleGenerate} disabled={!canSubmit || loading}>
            {loading ? (
              <>
                <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 /> Generate prompt
              </>
            )}
          </Button>
        </div>

        <div className="mt-6">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Generated prompt
            </span>
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
          <div className="min-h-40 whitespace-pre-wrap rounded-lg border border-border bg-surface-sunken p-4 text-sm leading-relaxed text-foreground">
            {error ? (
              <p className="flex items-start gap-2 text-destructive">
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                {error}
              </p>
            ) : result ? (
              result
            ) : (
              <span className="text-muted-foreground">Your detailed, structured prompt will appear here.</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
