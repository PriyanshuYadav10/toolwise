"use client";

import * as React from "react";
import { Copy, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ResultCard, ResultGrid } from "@/components/tools/result-card";
import { formatCurrencyINR } from "@/lib/utils";
import { useCopy } from "@/hooks/use-copy";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

const DEFAULTS = { deposit: 5000, rate: 7, months: 60 };

function calculateRd(monthlyDeposit: number, annualRate: number, months: number) {
  if (monthlyDeposit <= 0 || months <= 0) {
    return { maturity: 0, totalDeposited: 0, interest: 0 };
  }
  const totalDeposited = monthlyDeposit * months;
  const i = annualRate / 400;
  let maturity: number;
  const denominator = 1 - Math.pow(1 + i, -1 / 3);
  if (i <= 0 || !Number.isFinite(denominator) || denominator === 0) {
    maturity = totalDeposited;
  } else {
    maturity = monthlyDeposit * ((Math.pow(1 + i, months) - 1) / denominator);
  }
  const interest = maturity - totalDeposited;
  return { maturity, totalDeposited, interest };
}

export default function RdCalculator({ tool }: ToolComponentProps) {
  const [deposit, setDeposit] = React.useState(DEFAULTS.deposit);
  const [rate, setRate] = React.useState(DEFAULTS.rate);
  const [months, setMonths] = React.useState(DEFAULTS.months);
  const { copy } = useCopy(tool.slug);

  const { maturity, totalDeposited, interest } = React.useMemo(
    () => calculateRd(deposit, rate, months),
    [deposit, rate, months]
  );

  React.useEffect(() => {
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
  }, [deposit, rate, months, tool.slug, tool.category]);

  function handleReset() {
    setDeposit(DEFAULTS.deposit);
    setRate(DEFAULTS.rate);
    setMonths(DEFAULTS.months);
  }

  function handleCopy() {
    copy(
      `Maturity Value: ${formatCurrencyINR(maturity)} | Total Deposited: ${formatCurrencyINR(
        totalDeposited
      )} | Interest Earned: ${formatCurrencyINR(interest)}`
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <Label className="mb-0">Monthly Deposit</Label>
              <span className="text-sm font-semibold text-foreground">{formatCurrencyINR(deposit)}</span>
            </div>
            <Input
              type="number"
              value={deposit}
              min={100}
              max={1000000}
              onChange={(e) => setDeposit(Number(e.target.value) || 0)}
              className="mb-2"
            />
            <Slider min={500} max={100000} step={500} value={deposit} onChange={setDeposit} />
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
              max={15}
              onChange={(e) => setRate(Number(e.target.value) || 0)}
              className="mb-2"
            />
            <Slider min={1} max={12} step={0.1} value={rate} onChange={setRate} />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <Label className="mb-0">Tenure (months)</Label>
              <span className="text-sm font-semibold text-foreground">{months} mo</span>
            </div>
            <Input
              type="number"
              value={months}
              min={6}
              max={120}
              onChange={(e) => setMonths(Number(e.target.value) || 0)}
              className="mb-2"
            />
            <Slider min={6} max={120} step={1} value={months} onChange={setMonths} />
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

        <ResultGrid className="mt-8">
          <ResultCard label="Maturity Value" value={formatCurrencyINR(maturity)} emphasis />
          <ResultCard label="Total Deposited" value={formatCurrencyINR(totalDeposited)} />
          <ResultCard label="Interest Earned" value={formatCurrencyINR(interest)} />
        </ResultGrid>
      </CardContent>
    </Card>
  );
}
