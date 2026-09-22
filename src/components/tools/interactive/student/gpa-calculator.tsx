"use client";

import * as React from "react";
import { Plus, Trash2, Copy, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ResultCard, ResultGrid } from "@/components/tools/result-card";
import { formatNumber } from "@/lib/utils";
import { useCopy } from "@/hooks/use-copy";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

interface Row {
  id: number;
  course: string;
  grade: string;
  credits: number;
}

const GRADE_POINTS: Record<string, number> = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  D: 1.0,
  F: 0.0,
};

const GRADE_OPTIONS = Object.keys(GRADE_POINTS).map((g) => ({ value: g, label: g }));

let nextId = 4;
const initialRows: Row[] = [
  { id: 1, course: "Mathematics", grade: "A", credits: 4 },
  { id: 2, course: "Physics", grade: "B+", credits: 3 },
  { id: 3, course: "English", grade: "A-", credits: 3 },
];

export default function GpaCalculator({ tool }: ToolComponentProps) {
  const [rows, setRows] = React.useState<Row[]>(initialRows);
  const { copy } = useCopy(tool.slug);

  const { gpa, totalCredits } = React.useMemo(() => {
    const totalCredits = rows.reduce((sum, r) => sum + (r.credits || 0), 0);
    const weightedSum = rows.reduce(
      (sum, r) => sum + (GRADE_POINTS[r.grade] ?? 0) * (r.credits || 0),
      0
    );
    return { gpa: totalCredits > 0 ? weightedSum / totalCredits : 0, totalCredits };
  }, [rows]);

  React.useEffect(() => {
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
  }, [rows, tool.slug, tool.category]);

  function updateRow(id: number, patch: Partial<Row>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function addRow() {
    setRows((prev) => [
      ...prev,
      { id: nextId++, course: `Course ${prev.length + 1}`, grade: "A", credits: 3 },
    ]);
  }

  function removeRow(id: number) {
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));
  }

  function reset() {
    setRows(initialRows);
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Label className="mb-2">Courses this semester</Label>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-sunken text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-3 py-2.5 font-medium">Course</th>
                <th className="px-3 py-2.5 font-medium">Letter Grade</th>
                <th className="px-3 py-2.5 font-medium">Credit Hours</th>
                <th className="px-3 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-border last:border-b-0">
                  <td className="p-2">
                    <Input
                      value={row.course}
                      onChange={(e) => updateRow(row.id, { course: e.target.value })}
                      className="h-9"
                    />
                  </td>
                  <td className="p-2">
                    <Select
                      options={GRADE_OPTIONS}
                      value={row.grade}
                      onChange={(value) => updateRow(row.id, { grade: value })}
                      className="h-9 w-28"
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
                      aria-label="Remove course"
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
            <Plus /> Add course
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              copy(`GPA: ${formatNumber(gpa, 2)} / 4.0 across ${totalCredits} credit hours`)
            }
          >
            <Copy /> Copy result
          </Button>
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcw /> Reset
          </Button>
        </div>

        <ResultGrid className="mt-6 sm:grid-cols-2">
          <ResultCard label="Your GPA" value={`${formatNumber(gpa, 2)} / 4.0`} emphasis />
          <ResultCard label="Total Credits" value={String(totalCredits)} />
        </ResultGrid>
      </CardContent>
    </Card>
  );
}
