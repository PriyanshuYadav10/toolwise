"use client";

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Copy, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ResultCard, ResultGrid } from "@/components/tools/result-card";
import { formatCurrencyINR } from "@/lib/utils";
import { useCopy } from "@/hooks/use-copy";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

const DEFAULTS = { principal: 100000, rate: 8, years: 5, frequency: 1 };

const FREQUENCY_OPTIONS = [
  { value: "1", label: "Annually" },
  { value: "2", label: "Half-Yearly" },
  { value: "4", label: "Quarterly" },
  { value: "12", label: "Monthly" },
];

function calculateCompoundInterest(principal: number, annualRate: number, years: number, frequency: number) {
  if (principal <= 0 || years <= 0 || frequency <= 0) {
    return { maturity: principal, interest: 0 };
  }
  const amount = principal * Math.pow(1 + annualRate / (100 * frequency), frequency * years);
  return { maturity: amount, interest: amount - principal };
}

export default function CompoundInterestCalculator({ tool }: ToolComponentProps) {
  const [principal, setPrincipal] = React.useState(DEFAULTS.principal);
  const [rate, setRate] = React.useState(DEFAULTS.rate);
  const [years, setYears] = React.useState(DEFAULTS.years);
  const [frequency, setFrequency] = React.useState(DEFAULTS.frequency);
  const { copy } = useCopy(tool.slug);

  const { maturity, interest } = React.useMemo(
    () => calculateCompoundInterest(principal, rate, years, frequency),
    [principal, rate, years, frequency]
  );

  React.useEffect(() => {
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
  }, [principal, rate, years, frequency, tool.slug, tool.category]);

  const chartData = [
    { name: "Principal", value: principal, color: "var(--primary)" },
    { name: "Interest", value: interest, color: "var(--accent)" },
  ];

  function handleReset() {
    setPrincipal(DEFAULTS.principal);
    setRate(DEFAULTS.rate);
    setYears(DEFAULTS.years);
    setFrequency(DEFAULTS.frequency);
  }

  function handleCopy() {
    copy(
      `Maturity Value: ${formatCurrencyINR(maturity)} | Principal: ${formatCurrencyINR(
        principal
      )} | Interest Earned: ${formatCurrencyINR(interest)}`
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <Label className="mb-0">Principal Amount</Label>
                <span className="text-sm font-semibold text-foreground">{formatCurrencyINR(principal)}</span>
              </div>
              <Input
                type="number"
                value={principal}
                min={1000}
                max={100000000}
                onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
                className="mb-2"
              />
              <Slider min={1000} max={10000000} step={1000} value={principal} onChange={setPrincipal} />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <Label className="mb-0">Annual Interest Rate</Label>
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
                <Label className="mb-0">Time Period (years)</Label>
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

            <div>
              <Label>Compounding Frequency</Label>
              <Select
                options={FREQUENCY_OPTIONS}
                value={String(frequency)}
                onChange={(v) => setFrequency(Number(v))}
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
                Principal
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full" style={{ background: "var(--accent)" }} />
                Interest
              </span>
            </div>
          </div>
        </div>

        <ResultGrid className="mt-8">
          <ResultCard label="Maturity Value" value={formatCurrencyINR(maturity)} emphasis />
          <ResultCard label="Principal" value={formatCurrencyINR(principal)} />
          <ResultCard label="Interest Earned" value={formatCurrencyINR(interest)} />
        </ResultGrid>
      </CardContent>
    </Card>
  );
}
