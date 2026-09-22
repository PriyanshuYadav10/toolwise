"use client";

import * as React from "react";
import { Plus, Trash2, Copy, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResultCard, ResultGrid } from "@/components/tools/result-card";
import { formatNumber } from "@/lib/utils";
import { useCopy } from "@/hooks/use-copy";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

interface Row {
  id: number;
  subject: string;
  gradePoint: number;
  credits: number;
}

let nextId = 4;
const initialRows: Row[] = [
  { id: 1, subject: "Subject 1", gradePoint: 8, credits: 4 },
  { id: 2, subject: "Subject 2", gradePoint: 7.5, credits: 3 },
  { id: 3, subject: "Subject 3", gradePoint: 9, credits: 4 },
];

export default function CgpaCalculator({ tool }: ToolComponentProps) {
  const [rows, setRows] = React.useState<Row[]>(initialRows);
  const [scale, setScale] = React.useState(10);
  const { copy } = useCopy(tool.slug);

  const { cgpa, totalCredits } = React.useMemo(() => {
    const totalCredits = rows.reduce((sum, r) => sum + (r.credits || 0), 0);
    const weightedSum = rows.reduce((sum, r) => sum + (r.gradePoint || 0) * (r.credits || 0), 0);
    return { cgpa: totalCredits > 0 ? weightedSum / totalCredits : 0, totalCredits };
  }, [rows]);

  React.useEffect(() => {
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
  }, [rows, tool.slug, tool.category]);

  function updateRow(id: number, patch: Partial<Row>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function addRow() {
    setRows((prev) => [...prev, { id: nextId++, subject: `Subject ${prev.length + 1}`, gradePoint: 8, credits: 3 }]);
  }

  function removeRow(id: number) {
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));
  }

  function reset() {
    setRows(initialRows);
    setScale(10);
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4 flex items-center justify-between">
          <Label className="mb-0">Grading scale</Label>
          <div className="flex gap-2">
            {[10, 4].map((s) => (
              <button
                key={s}
                onClick={() => setScale(s)}
                className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                  scale === s ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {s}.0 scale
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-sunken text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-3 py-2.5 font-medium">Subject</th>
                <th className="px-3 py-2.5 font-medium">Grade Point</th>
                <th className="px-3 py-2.5 font-medium">Credits</th>
                <th className="px-3 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-border last:border-b-0">
                  <td className="p-2">
                    <Input
                      value={row.subject}
                      onChange={(e) => updateRow(row.id, { subject: e.target.value })}
                      className="h-9"
                    />
                  </td>
                  <td className="p-2">
                    <Input
                      type="number"
                      value={row.gradePoint}
                      min={0}
                      max={scale}
                      step={0.1}
                      onChange={(e) => updateRow(row.id, { gradePoint: Number(e.target.value) || 0 })}
                      className="h-9 w-24"
                    />
                  </td>
                  <td className="p-2">
                    <Input
                      type="number"
                      value={row.credits}
                      min={0}
                      max={10}
                      onChange={(e) => updateRow(row.id, { credits: Number(e.target.value) || 0 })}
                      className="h-9 w-20"
                    />
                  </td>
                  <td className="p-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeRow(row.id)}
                      disabled={rows.length === 1}
                      aria-label="Remove subject"
                    >
                      <Trash2 className="size-4 text-muted-foreground" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" onClick={addRow}>
            <Plus /> Add subject
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => copy(`CGPA: ${formatNumber(cgpa, 2)} (${scale}.0 scale) across ${totalCredits} credits`)}
          >
            <Copy /> Copy result
          </Button>
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcw /> Reset
          </Button>
        </div>

        <ResultGrid className="mt-6 sm:grid-cols-2">
          <ResultCard label="Your CGPA" value={`${formatNumber(cgpa, 2)} / ${scale}.0`} emphasis />
          <ResultCard label="Total Credits" value={String(totalCredits)} />
        </ResultGrid>
      </CardContent>
    </Card>
  );
}
