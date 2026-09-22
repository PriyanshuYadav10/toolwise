"use client";

import * as React from "react";
import { Sparkles, Copy, Download, RefreshCw, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAiGenerate } from "@/hooks/use-ai-generate";
import { useCopy } from "@/hooks/use-copy";
import { downloadText } from "@/lib/download";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

interface CoverLetterInput {
  jobTitle: string;
  company: string;
  background: string;
  tone: "formal" | "friendly" | "confident";
}

const EMPTY: CoverLetterInput = { jobTitle: "", company: "", background: "", tone: "formal" };
const TONES = [
  { value: "formal", label: "Formal" },
  { value: "friendly", label: "Friendly" },
  { value: "confident", label: "Confident" },
];

export default function CoverLetterGenerator({ tool }: ToolComponentProps) {
  const [form, setForm] = React.useState<CoverLetterInput>(EMPTY);
  const { result, loading, error, generate } = useAiGenerate<CoverLetterInput>({
    endpoint: "/api/ai/cover-letter",
  });
  const { copy } = useCopy(tool.slug);

  const canSubmit = form.jobTitle.trim().length > 1 && form.company.trim().length > 0 && form.background.trim().length > 2;

  async function handleGenerate(e?: React.FormEvent) {
    e?.preventDefault();
    if (!canSubmit) return;
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
    const res = await generate(form);
    if (res) track({ name: "tool_completed", toolSlug: tool.slug, category: tool.category });
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="cl-job-title">Job title *</Label>
                <Input
                  id="cl-job-title"
                  value={form.jobTitle}
                  onChange={(e) => setForm((f) => ({ ...f, jobTitle: e.target.value }))}
                  placeholder="e.g. Product Manager"
                  required
                />
              </div>
              <div>
                <Label htmlFor="cl-company">Company *</Label>
                <Input
                  id="cl-company"
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  placeholder="e.g. Acme Inc."
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="cl-background">Your background &amp; why you&apos;re interested *</Label>
              <Textarea
                id="cl-background"
                value={form.background}
                onChange={(e) => setForm((f) => ({ ...f, background: e.target.value }))}
                placeholder="Summarise your relevant experience and what draws you to this role"
                required
                className="min-h-32"
              />
            </div>
            <div>
              <Label htmlFor="cl-tone">Tone</Label>
              <Select
                id="cl-tone"
                value={form.tone}
                options={TONES}
                onChange={(v) => setForm((f) => ({ ...f, tone: v as CoverLetterInput["tone"] }))}
              />
            </div>
            <Button type="submit" disabled={!canSubmit || loading} className="w-full">
              {loading ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles /> Generate cover letter
                </>
              )}
            </Button>
          </form>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Result</span>
              {result && (
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => copy(result)}>
                    <Copy /> Copy
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => downloadText(result, "cover-letter.txt")}>
                    <Download /> Download
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleGenerate()} disabled={loading}>
                    <RefreshCw /> Regenerate
                  </Button>
                </div>
              )}
            </div>
            <div className="min-h-96 whitespace-pre-wrap rounded-lg border border-border bg-surface-sunken p-4 text-sm leading-relaxed text-foreground">
              {error ? (
                <p className="flex items-start gap-2 text-destructive">
                  <AlertCircle className="mt-0.5 size-4 shrink-0" />
                  {error}
                </p>
              ) : result ? (
                result
              ) : (
                <span className="text-muted-foreground">
                  Fill in the form and click Generate to get your cover letter draft.
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
