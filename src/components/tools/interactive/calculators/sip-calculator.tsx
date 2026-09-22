"use client";

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Copy, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ResultCard, ResultGrid } from "@/components/tools/result-card";
import { formatCurrencyINR, formatNumber } from "@/lib/utils";
import { useCopy } from "@/hooks/use-copy";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

const DEFAULTS = { monthly: 10000, rate: 12, years: 15 };

function calculateSip(monthly: number, annualRate: number, years: number) {
  const months = years * 12;
  const i = annualRate / 12 / 100;
  if (monthly <= 0 || months <= 0) {
    return { maturity: 0, invested: 0, returns: 0 };
  }
  const maturity = i === 0 ? monthly * months : monthly * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
  const invested = monthly * months;
  const returns = maturity - invested;
  return { maturity, invested, returns };
}

export default function SipCalculator({ tool }: ToolComponentProps) {
  const [monthly, setMonthly] = React.useState(DEFAULTS.monthly);
  const [rate, setRate] = React.useState(DEFAULTS.rate);
  const [years, setYears] = React.useState(DEFAULTS.years);
  const { copy } = useCopy(tool.slug);

  const { maturity, invested, returns } = React.useMemo(
    () => calculateSip(monthly, rate, years),
    [monthly, rate, years]
  );

  React.useEffect(() => {
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
  }, [monthly, rate, years, tool.slug, tool.category]);

  const chartData = [
    { name: "Invested", value: invested, color: "var(--primary)" },
    { name: "Returns", value: returns, color: "var(--accent)" },
  ];

  function handleReset() {
    setMonthly(DEFAULTS.monthly);
    setRate(DEFAULTS.rate);
    setYears(DEFAULTS.years);
  }

  function handleCopy() {
    copy(
      `Maturity Value: ${formatCurrencyINR(maturity)} | Total Invested: ${formatCurrencyINR(
        invested
      )} | Estimated Returns: ${formatCurrencyINR(returns)}`
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <Label className="mb-0">Monthly Investment</Label>
                <span className="text-sm font-semibold text-foreground">{formatCurrencyINR(monthly)}</span>
              </div>
              <Input
                type="number"
                value={monthly}
                min={500}
                max={500000}
                onChange={(e) => setMonthly(Number(e.target.value) || 0)}
                className="mb-2"
              />
              <Slider min={500} max={500000} step={500} value={monthly} onChange={setMonthly} />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <Label className="mb-0">Expected Annual Return</Label>
                <span className="text-sm font-semibold text-foreground">{rate}%</span>
              </div>
              <Input
                type="number"
                value={rate}
                step={0.1}
                min={1}
                max={30}
                onChange={(e) => setRate(Number(e.target.value) || 0)}
                className="mb-2"
              />
              <Slider min={1} max={30} step={0.1} value={rate} onChange={setRate} />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <Label className="mb-0">Investment Duration (years)</Label>
                <span className="text-sm font-semibold text-foreground">{years} yrs</span>
              </div>
              <Input
                type="number"
                value={years}
                min={1}
                max={40}
                onChange={(e) => setYears(Number(e.target.value) || 0)}
                className="mb-2"
              />
              <Slider min={1} max={40} step={1} value={years} onChange={setYears} />
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

          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative h-56 w-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                    strokeWidth={0}
                  >
                    {chartData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => formatCurrencyINR(Number(value ?? 0))}
                    contentStyle={{
                      background: "var(--surface-elevated)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 13,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs text-muted-foreground">Maturity Value</span>
                <span className="text-xl font-bold text-foreground">{formatCurrencyINR(maturity)}</span>
              </div>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full" style={{ background: "var(--primary)" }} />
                Invested
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full" style={{ background: "var(--accent)" }} />
                Returns
              </span>
            </div>
          </div>
        </div>

        <ResultGrid className="mt-8">
          <ResultCard label="Maturity Value" value={formatCurrencyINR(maturity)} emphasis />
          <ResultCard label="Total Invested" value={formatCurrencyINR(invested)} />
          <ResultCard label="Estimated Returns" value={formatCurrencyINR(returns)} />
          <ResultCard label="Total Duration" value={`${years} years (${formatNumber(years * 12, 0)} months)`} />
        </ResultGrid>
      </CardContent>
    </Card>
  );
}
