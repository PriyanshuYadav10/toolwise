"use client";

import * as React from "react";
import { Copy, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResultCard, ResultGrid } from "@/components/tools/result-card";
import { formatNumber } from "@/lib/utils";
import { useCopy } from "@/hooks/use-copy";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

const DEFAULTS = { dob: "2000-01-01" };

function calculateAge(dobStr: string, asOfStr: string) {
  const dob = new Date(dobStr);
  const asOf = new Date(asOfStr);

  if (Number.isNaN(dob.getTime()) || Number.isNaN(asOf.getTime())) {
    return null;
  }
  if (asOf < dob) {
    return { error: true as const };
  }

  let years = asOf.getFullYear() - dob.getFullYear();
  let months = asOf.getMonth() - dob.getMonth();
  let days = asOf.getDate() - dob.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(asOf.getFullYear(), asOf.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.floor((asOf.getTime() - dob.getTime()) / msPerDay);
  const totalMonths = Math.floor(totalDays / 30.4375);
  const totalWeeks = Math.floor(totalDays / 7);

  return { error: false as const, years, months, days, totalDays, totalMonths, totalWeeks };
}

export default function AgeCalculator({ tool }: ToolComponentProps) {
  const [dob, setDob] = React.useState(DEFAULTS.dob);
  const [asOf, setAsOf] = React.useState(todayIso());
  const { copy } = useCopy(tool.slug);

  const result = React.useMemo(() => calculateAge(dob, asOf), [dob, asOf]);

  React.useEffect(() => {
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
  }, [dob, asOf, tool.slug, tool.category]);

  function handleReset() {
    setDob(DEFAULTS.dob);
    setAsOf(todayIso());
  }

  function handleCopy() {
    if (!result || result.error) return;
    copy(
      `Age: ${result.years} years, ${result.months} months, ${result.days} days | Total Days: ${formatNumber(
        result.totalDays,
        0
      )}`
    );
  }

  const hasError = result?.error === true;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Date of Birth</Label>
            <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          </div>
          <div>
            <Label>As of Date</Label>
            <Input type="date" value={asOf} onChange={(e) => setAsOf(e.target.value)} />
          </div>
        </div>

        {hasError && (
          <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive">
            The &quot;as of&quot; date can&apos;t be before the date of birth. Please pick a valid range.
          </p>
        )}

        <div className="flex flex-wrap gap-2 pt-4">
          <Button variant="secondary" size="sm" onClick={handleCopy} disabled={hasError}>
            <Copy /> Copy result
          </Button>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw /> Reset
          </Button>
        </div>

        {!hasError && result && (
          <ResultGrid className="mt-8">
            <ResultCard
              label="Your Age"
              value={`${result.years} years, ${result.months} months, ${result.days} days`}
              emphasis
            />
            <ResultCard label="Total Days" value={formatNumber(result.totalDays, 0)} />
            <ResultCard label="Total Months" value={formatNumber(result.totalMonths, 0)} />
            <ResultCard label="Total Weeks" value={formatNumber(result.totalWeeks, 0)} />
          </ResultGrid>
        )}
      </CardContent>
    </Card>
  );
}
