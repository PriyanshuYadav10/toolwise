"use client";

import * as React from "react";
import { Copy, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResultCard, ResultGrid } from "@/components/tools/result-card";
import { formatCurrencyINR, formatNumber } from "@/lib/utils";
import { useCopy } from "@/hooks/use-copy";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

const DEFAULTS = { salary: 50000, years: 8.5 };

function roundedYearsOf(years: number) {
  const whole = Math.floor(years);
  const fraction = years - whole;
  return fraction >= 0.5 ? whole + 1 : whole;
}

function calculateGratuity(lastDrawnSalary: number, yearsOfService: number) {
  const roundedYears = roundedYearsOf(Math.max(yearsOfService, 0));
  const gratuity = (lastDrawnSalary * 15 * roundedYears) / 26;
  return { gratuity: Number.isFinite(gratuity) ? Math.max(gratuity, 0) : 0, roundedYears };
}

export default function GratuityCalculator({ tool }: ToolComponentProps) {
  const [salary, setSalary] = React.useState(DEFAULTS.salary);
  const [years, setYears] = React.useState(DEFAULTS.years);
  const { copy } = useCopy(tool.slug);

  const { gratuity, roundedYears } = React.useMemo(
    () => calculateGratuity(salary, years),
    [salary, years]
  );

  React.useEffect(() => {
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
  }, [salary, years, tool.slug, tool.category]);

  function handleReset() {
    setSalary(DEFAULTS.salary);
    setYears(DEFAULTS.years);
  }

  function handleCopy() {
    copy(
      `Gratuity Amount: ${formatCurrencyINR(gratuity)} | Years Counted: ${roundedYears} | Last Drawn Salary: ${formatCurrencyINR(
        salary
      )}`
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <Label htmlFor="gratuity-salary">Last Drawn Monthly Salary (Basic + DA)</Label>
            <Input
              id="gratuity-salary"
              type="number"
              value={salary}
              min={0}
              onChange={(e) => setSalary(Number(e.target.value) || 0)}
            />
          </div>

          <div>
            <Label htmlFor="gratuity-years">Years of Service</Label>
            <Input
              id="gratuity-years"
              type="number"
              value={years}
              min={0}
              step={0.1}
              onChange={(e) => setYears(Number(e.target.value) || 0)}
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={handleCopy}>
              <Copy /> Copy result
            </Button>
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <RotateCcw /> Reset
            </Button>
          </div>
        </div>

        <ResultGrid className="mt-8 sm:grid-cols-3">
          <ResultCard label="Gratuity Amount" value={formatCurrencyINR(gratuity)} emphasis />
          <ResultCard label="Years Counted" value={formatNumber(roundedYears, 0)} />
          <ResultCard label="Last Drawn Salary" value={formatCurrencyINR(salary)} />
        </ResultGrid>

        <p className="mt-3 text-xs text-muted-foreground">
          Applicable to employees covered under the Payment of Gratuity Act, 1972, with at least 5 years of service.
        </p>
      </CardContent>
    </Card>
  );
}
