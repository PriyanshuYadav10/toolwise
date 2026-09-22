"use client";

import * as React from "react";
import { Copy, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResultCard, ResultGrid } from "@/components/tools/result-card";
import { cn, formatNumber } from "@/lib/utils";
import { useCopy } from "@/hooks/use-copy";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

const DEFAULTS = {
  held: 40,
  attended: 34,
  requiredPct: 75,
  remaining: 10,
};

export default function AttendanceCalculator({ tool }: ToolComponentProps) {
  const [held, setHeld] = React.useState(DEFAULTS.held);
  const [attended, setAttended] = React.useState(DEFAULTS.attended);
  const [requiredPct, setRequiredPct] = React.useState(DEFAULTS.requiredPct);
  const [remaining, setRemaining] = React.useState(DEFAULTS.remaining);
  const { copy } = useCopy(tool.slug);

  const { currentPercentage, canMiss, mustAttend } = React.useMemo(() => {
    const currentPercentage = held > 0 ? (attended / held) * 100 : null;

    let canMiss = 0;
    let mustAttend = 0;
    if (remaining > 0) {
      const totalFinal = held + remaining;
      const needed = Math.ceil((requiredPct / 100) * totalFinal);
      canMiss = Math.max(0, attended + remaining - needed);
      mustAttend = Math.min(remaining, Math.max(0, needed - attended));
    }

    return { currentPercentage, canMiss, mustAttend };
  }, [held, attended, requiredPct, remaining]);

  React.useEffect(() => {
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
  }, [held, attended, requiredPct, remaining, tool.slug, tool.category]);

  const isShort = currentPercentage !== null && currentPercentage < requiredPct;
  const showMustAttend = remaining > 0 && isShort && canMiss <= 0;
  const showCanMiss = remaining > 0 && !showMustAttend;

  function reset() {
    setHeld(DEFAULTS.held);
    setAttended(DEFAULTS.attended);
    setRequiredPct(DEFAULTS.requiredPct);
    setRemaining(DEFAULTS.remaining);
  }

  function handleCopy() {
    const pctText = currentPercentage === null ? "—" : `${formatNumber(currentPercentage, 2)}%`;
    let message = `Current attendance: ${pctText} (${attended}/${held} classes)`;
    if (showCanMiss) {
      message += ` — you can miss up to ${canMiss} more classes and still maintain ${requiredPct}%.`;
    } else if (showMustAttend) {
      message += ` — you need to attend at least ${mustAttend} more classes to reach ${requiredPct}%.`;
    }
    copy(message);
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Total classes held so far</Label>
            <Input
              type="number"
              value={held}
              min={0}
              onChange={(e) => setHeld(Number(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label>Classes attended so far</Label>
            <Input
              type="number"
              value={attended}
              min={0}
              onChange={(e) => setAttended(Number(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label>Minimum required attendance %</Label>
            <Input
              type="number"
              value={requiredPct}
              min={0}
              max={100}
              onChange={(e) => setRequiredPct(Number(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label>Total classes remaining in the term</Label>
            <Input
              type="number"
              value={remaining}
              min={0}
              onChange={(e) => setRemaining(Number(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" onClick={handleCopy}>
            <Copy /> Copy result
          </Button>
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcw /> Reset
          </Button>
        </div>

        <ResultGrid className="mt-6 sm:grid-cols-3">
          <div
            className={cn(
              "rounded-xl border p-4",
              currentPercentage === null
                ? "border-border bg-surface-sunken"
                : currentPercentage >= requiredPct
                ? "border-primary/30 bg-primary/5"
                : "border-destructive/30 bg-destructive/5"
            )}
          >
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Current Attendance %
            </p>
            <p
              className={cn(
                "mt-1 text-2xl font-semibold tracking-tight",
                currentPercentage === null
                  ? "text-foreground"
                  : currentPercentage >= requiredPct
                  ? "text-success"
                  : "text-destructive"
              )}
            >
              {currentPercentage === null ? "—" : `${formatNumber(currentPercentage, 2)}%`}
            </p>
          </div>
          <ResultCard label="Classes Attended" value={String(attended)} />
          <ResultCard label="Classes Held" value={String(held)} />
        </ResultGrid>

        {(showCanMiss || showMustAttend) && (
          <p
            className={cn(
              "mt-3 text-sm",
              showMustAttend ? "font-medium text-warning" : "text-muted-foreground"
            )}
          >
            {showCanMiss &&
              `You can miss up to ${canMiss} more class${canMiss === 1 ? "" : "es"} and still maintain ${requiredPct}%.`}
            {showMustAttend &&
              `You need to attend at least ${mustAttend} more class${mustAttend === 1 ? "" : "es"} to reach ${requiredPct}%.`}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
