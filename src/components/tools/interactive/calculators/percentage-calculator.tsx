"use client";

import * as React from "react";
import { Copy, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { ResultCard } from "@/components/tools/result-card";
import { cn, formatNumber } from "@/lib/utils";
import { useCopy } from "@/hooks/use-copy";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

const MODE_TABS = [
  { value: "of", label: "X% of Y" },
  { value: "what-pct", label: "X is what % of Y" },
  { value: "change", label: "% Change" },
];

export default function PercentageCalculator({ tool }: ToolComponentProps) {
  const [mode, setMode] = React.useState<"of" | "what-pct" | "change">("of");

  const [x, setX] = React.useState(20);
  const [y, setY] = React.useState(200);

  const [oldValue, setOldValue] = React.useState(100);
  const [newValue, setNewValue] = React.useState(120);

  const { copy } = useCopy(tool.slug);

  const ofResult = (x / 100) * y;
  const whatPctResult = y !== 0 ? (x / y) * 100 : null;
  const changeResult = oldValue !== 0 ? ((newValue - oldValue) / oldValue) * 100 : null;

  React.useEffect(() => {
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
  }, [mode, x, y, oldValue, newValue, tool.slug, tool.category]);

  function handleReset() {
    setX(20);
    setY(200);
    setOldValue(100);
    setNewValue(120);
  }

  function handleCopy() {
    if (mode === "of") {
      copy(`${formatNumber(x)}% of ${formatNumber(y)} = ${formatNumber(ofResult)}`);
    } else if (mode === "what-pct") {
      copy(
        whatPctResult === null
          ? "Undefined (Y cannot be 0)"
          : `${formatNumber(x)} is ${formatNumber(whatPctResult)}% of ${formatNumber(y)}`
      );
    } else {
      copy(
        changeResult === null
          ? "Undefined (Old value cannot be 0)"
          : `Change from ${formatNumber(oldValue)} to ${formatNumber(newValue)} = ${changeResult >= 0 ? "+" : ""}${formatNumber(
              changeResult
            )}%`
      );
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <Tabs tabs={MODE_TABS} value={mode} onChange={(v) => setMode(v as typeof mode)} />

          {mode === "of" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>X (percentage)</Label>
                <Input type="number" value={x} onChange={(e) => setX(Number(e.target.value) || 0)} />
              </div>
              <div>
                <Label>Y (value)</Label>
                <Input type="number" value={y} onChange={(e) => setY(Number(e.target.value) || 0)} />
              </div>
            </div>
          )}

          {mode === "what-pct" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>X</Label>
                <Input type="number" value={x} onChange={(e) => setX(Number(e.target.value) || 0)} />
              </div>
              <div>
                <Label>Y</Label>
                <Input type="number" value={y} onChange={(e) => setY(Number(e.target.value) || 0)} />
              </div>
            </div>
          )}

          {mode === "change" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Old value</Label>
                <Input type="number" value={oldValue} onChange={(e) => setOldValue(Number(e.target.value) || 0)} />
              </div>
              <div>
                <Label>New value</Label>
                <Input type="number" value={newValue} onChange={(e) => setNewValue(Number(e.target.value) || 0)} />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={handleCopy}>
              <Copy /> Copy result
            </Button>
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <RotateCcw /> Reset
            </Button>
          </div>
        </div>

        <div className="mt-8">
          {mode === "of" && <ResultCard label={`${formatNumber(x)}% of ${formatNumber(y)}`} value={formatNumber(ofResult)} emphasis />}

          {mode === "what-pct" && (
            <ResultCard
              label="Result"
              value={whatPctResult === null ? "—" : `${formatNumber(whatPctResult)}%`}
              emphasis
            />
          )}

          {mode === "change" && (
            <div
              className={cn(
                "rounded-xl border p-4",
                changeResult === null
                  ? "border-border bg-surface-sunken"
                  : "border-primary/30 bg-primary/5"
              )}
            >
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {changeResult === null ? "% Change" : changeResult >= 0 ? "Increase" : "Decrease"}
              </p>
              <p
                className={cn(
                  "mt-1 text-2xl font-semibold tracking-tight",
                  changeResult === null
                    ? "text-foreground"
                    : changeResult >= 0
                      ? "text-success"
                      : "text-destructive"
                )}
              >
                {changeResult === null
                  ? "—"
                  : `${changeResult >= 0 ? "+" : ""}${formatNumber(changeResult)}%`}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
