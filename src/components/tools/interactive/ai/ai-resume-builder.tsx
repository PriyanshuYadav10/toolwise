"use client";

import * as React from "react";
import { Sparkles, Copy, Download, RefreshCw, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAiGenerate } from "@/hooks/use-ai-generate";
import { useCopy } from "@/hooks/use-copy";
import { downloadText } from "@/lib/download";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

interface ResumeInput {
  jobTitle: string;
  yearsExperience: string;
  skills: string;
  education: string;
  projects: string;
}

const EMPTY: ResumeInput = { jobTitle: "", yearsExperience: "", skills: "", education: "", projects: "" };

export default function AiResumeBuilder({ tool }: ToolComponentProps) {
  const [form, setForm] = React.useState<ResumeInput>(EMPTY);
  const { result, loading, error, generate } = useAiGenerate<ResumeInput>({ endpoint: "/api/ai/resume" });
  const { copy } = useCopy(tool.slug);

  const canSubmit = form.jobTitle.trim().length > 1 && form.skills.trim().length > 1;

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
            <div>
              <Label htmlFor="job-title">Target job title *</Label>
              <Input
                id="job-title"
                value={form.jobTitle}
                onChange={(e) => setForm((f) => ({ ...f, jobTitle: e.target.value }))}
                placeholder="e.g. Frontend Developer"
                required
              />
            </div>
            <div>
              <Label htmlFor="years">Years of experience</Label>
              <Input
                id="years"
                value={form.yearsExperience}
                onChange={(e) => setForm((f) => ({ ...f, yearsExperience: e.target.value }))}
                placeholder="e.g. 3"
              />
            </div>
            <div>
              <Label htmlFor="skills">Skills *</Label>
              <Textarea
                id="skills"
                value={form.skills}
                onChange={(e) => setForm((f) => ({ ...f, skills: e.target.value }))}
                placeholder="React, TypeScript, Tailwind CSS, REST APIs"
                required
                className="min-h-20"
              />
            </div>
            <div>
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                value={form.education}
                onChange={(e) => setForm((f) => ({ ...f, education: e.target.value }))}
                placeholder="e.g. B.Tech Computer Science"
              />
            </div>
            <div>
              <Label htmlFor="projects">Notable projects</Label>
              <Textarea
                id="projects"
                value={form.projects}
                onChange={(e) => setForm((f) => ({ ...f, projects: e.target.value }))}
                placeholder="Briefly describe 1-2 projects"
                className="min-h-20"
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
                  <Sparkles /> Generate resume
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => downloadText(result, "resume.txt")}
                  >
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
                  Fill in the form and click Generate to get your resume draft.
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
