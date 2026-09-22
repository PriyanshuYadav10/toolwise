"use client";

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Copy, RotateCcw, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ResultCard, ResultGrid } from "@/components/tools/result-card";
import { formatCurrencyINR, formatNumber } from "@/lib/utils";
import { useCopy } from "@/hooks/use-copy";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

const DEFAULTS = { amount: 2000000, rate: 8.5, years: 20 };

function calculateEmi(principal: number, annualRate: number, years: number) {
  const months = years * 12;
  const monthlyRate = annualRate / 12 / 100;
  if (principal <= 0 || months <= 0) return { emi: 0, totalPayment: 0, totalInterest: 0 };
  if (monthlyRate === 0) {
    const emi = principal / months;
    return { emi, totalPayment: principal, totalInterest: 0 };
  }
  const factor = Math.pow(1 + monthlyRate, months);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;
  return { emi, totalPayment, totalInterest };
}

export default function EmiCalculator({ tool }: ToolComponentProps) {
  const [amount, setAmount] = React.useState(DEFAULTS.amount);
  const [rate, setRate] = React.useState(DEFAULTS.rate);
  const [years, setYears] = React.useState(DEFAULTS.years);
  const { copy } = useCopy(tool.slug);

  const { emi, totalPayment, totalInterest } = React.useMemo(
    () => calculateEmi(amount, rate, years),
    [amount, rate, years]
  );

  React.useEffect(() => {
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
  }, [amount, rate, years, tool.slug, tool.category]);

  const chartData = [
    { name: "Principal", value: amount, color: "var(--primary)" },
    { name: "Interest", value: totalInterest, color: "var(--accent)" },
  ];

  function handleReset() {
    setAmount(DEFAULTS.amount);
    setRate(DEFAULTS.rate);
    setYears(DEFAULTS.years);
  }

  function handleCopy() {
    copy(
      `EMI: ${formatCurrencyINR(emi)} | Principal: ${formatCurrencyINR(amount)} | Interest: ${formatCurrencyINR(
        totalInterest
      )} | Total Payment: ${formatCurrencyINR(totalPayment)}`
    );
  }

  async function handleShare() {
    const text = `My EMI: ${formatCurrencyINR(emi)}/month on a ${formatCurrencyINR(amount)} loan — calculated with Toolwise`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "EMI Calculator – Toolwise", text, url: window.location.href });
      } catch {
        // user cancelled — no-op
      }
    } else {
      copy(window.location.href);
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <Label className="mb-0">Loan Amount</Label>
                <span className="text-sm font-semibold text-foreground">{formatCurrencyINR(amount)}</span>
              </div>
              <Input
                type="number"
                value={amount}
                min={10000}
                max={100000000}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                className="mb-2"
              />
              <Slider min={100000} max={20000000} step={50000} value={amount} onChange={setAmount} />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <Label className="mb-0">Interest Rate (per year)</Label>
                <span className="text-sm font-semibold text-foreground">{rate}%</span>
              </div>
              <Input
                type="number"
                value={rate}
                step={0.1}
                min={0}
                max={30}
                onChange={(e) => setRate(Number(e.target.value) || 0)}
                className="mb-2"
              />
              <Slider min={1} max={20} step={0.1} value={rate} onChange={setRate} />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <Label className="mb-0">Loan Tenure (years)</Label>
                <span className="text-sm font-semibold text-foreground">{years} yrs</span>
              </div>
              <Input
                type="number"
                value={years}
                min={1}
                max={35}
                onChange={(e) => setYears(Number(e.target.value) || 0)}
                className="mb-2"
              />
              <Slider min={1} max={30} step={1} value={years} onChange={setYears} />
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={handleCopy}>
                <Copy /> Copy result
              </Button>
              <Button variant="secondary" size="sm" onClick={handleShare}>
                <Share2 /> Share
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
                <span className="text-xs text-muted-foreground">Monthly EMI</span>
                <span className="text-xl font-bold text-foreground">{formatCurrencyINR(emi)}</span>
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
          <ResultCard label="Monthly EMI" value={formatCurrencyINR(emi)} emphasis />
          <ResultCard label="Principal" value={formatCurrencyINR(amount)} />
          <ResultCard label="Total Interest" value={formatCurrencyINR(totalInterest)} />
          <ResultCard label="Total Payment" value={formatCurrencyINR(totalPayment)} />
        </ResultGrid>
        <p className="mt-3 text-xs text-muted-foreground">
          {formatNumber(years * 12, 0)} monthly instalments of {formatCurrencyINR(emi)}.
        </p>
      </CardContent>
    </Card>
  );
}
