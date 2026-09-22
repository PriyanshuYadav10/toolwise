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
  marksObtained: number;
  maxMarks: number;
}

let nextId = 4;
const initialRows: Row[] = [
  { id: 1, subject: "Mathematics", marksObtained: 88, maxMarks: 100 },
  { id: 2, subject: "Science", marksObtained: 76, maxMarks: 100 },
  { id: 3, subject: "English", marksObtained: 82, maxMarks: 100 },
];

export default function MarksPercentageCalculator({ tool }: ToolComponentProps) {
  const [rows, setRows] = React.useState<Row[]>(initialRows);
  const { copy } = useCopy(tool.slug);

  const { percentage, totalObtained, totalMax } = React.useMemo(() => {
    const totalObtained = rows.reduce((sum, r) => sum + (r.marksObtained || 0), 0);
    const totalMax = rows.reduce((sum, r) => sum + (r.maxMarks || 0), 0);
    return {
      percentage: totalMax > 0 ? (totalObtained / totalMax) * 100 : 0,
      totalObtained,
      totalMax,
    };
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
      { id: nextId++, subject: `Subject ${prev.length + 1}`, marksObtained: 0, maxMarks: 100 },
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
        <Label className="mb-2">Subjects</Label>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-sunken text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-3 py-2.5 font-medium">Subject</th>
                <th className="px-3 py-2.5 font-medium">Marks Obtained</th>
                <th className="px-3 py-2.5 font-medium">Maximum Marks</th>
                <th className="px-3 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const invalid = row.marksObtained > row.maxMarks;
                return (
                  <tr key={row.id} className="border-b border-border last:border-b-0">
                    <td className="p-2 align-top">
                      <Input
                        value={row.subject}
                        onChange={(e) => updateRow(row.id, { subject: e.target.value })}
                        className="h-9"
                      />
                    </td>
                    <td className="p-2 align-top">
                      <Input
                        type="number"
                        value={row.marksObtained}
                        min={0}
                        onChange={(e) =>
                          updateRow(row.id, { marksObtained: Number(e.target.value) || 0 })
                        }
                        className="h-9 w-24"
                      />
                      {invalid && (
                        <p className="mt-1 text-xs text-destructive">
                          Marks obtained can&apos;t exceed maximum marks
                        </p>
                      )}
                    </td>
                    <td className="p-2 align-top">
                      <Input
                        type="number"
                        value={row.maxMarks}
                        min={0}
                        onChange={(e) =>
                          updateRow(row.id, { maxMarks: Number(e.target.value) || 0 })
                        }
                        className="h-9 w-24"
                      />
                    </td>
                    <td className="p-2 align-top">
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
                );
              })}
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
            onClick={() =>
              copy(
                `Overall percentage: ${formatNumber(percentage, 2)}% (${totalObtained} / ${totalMax})`
              )
            }
          >
            <Copy /> Copy result
          </Button>
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcw /> Reset
          </Button>
        </div>

        <ResultGrid className="mt-6 sm:grid-cols-2">
          <ResultCard label="Overall Percentage" value={`${formatNumber(percentage, 2)}%`} emphasis />
          <ResultCard label="Total Marks Obtained" value={`${totalObtained} / ${totalMax}`} />
        </ResultGrid>
      </CardContent>
    </Card>
  );
}
