"use client";

import * as React from "react";
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

const DEFAULTS = { amount: 100000, rate: 7, years: 5, frequency: 4 };

const FREQUENCY_OPTIONS = [
  { value: "1", label: "Annually" },
  { value: "2", label: "Half-Yearly" },
  { value: "4", label: "Quarterly" },
  { value: "12", label: "Monthly" },
];

function calculateFd(principal: number, annualRate: number, years: number, frequency: number) {
  if (principal <= 0 || years <= 0 || frequency <= 0) {
    return { maturity: principal, interest: 0 };
  }
  const maturity = principal * Math.pow(1 + annualRate / (100 * frequency), frequency * years);
  const interest = maturity - principal;
  return { maturity, interest };
}

export default function FdCalculator({ tool }: ToolComponentProps) {
  const [amount, setAmount] = React.useState(DEFAULTS.amount);
  const [rate, setRate] = React.useState(DEFAULTS.rate);
  const [years, setYears] = React.useState(DEFAULTS.years);
  const [frequency, setFrequency] = React.useState(DEFAULTS.frequency);
  const { copy } = useCopy(tool.slug);

  const { maturity, interest } = React.useMemo(
    () => calculateFd(amount, rate, years, frequency),
    [amount, rate, years, frequency]
  );

  React.useEffect(() => {
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
  }, [amount, rate, years, frequency, tool.slug, tool.category]);

  function handleReset() {
    setAmount(DEFAULTS.amount);
    setRate(DEFAULTS.rate);
    setYears(DEFAULTS.years);
    setFrequency(DEFAULTS.frequency);
  }

  function handleCopy() {
    copy(
      `Maturity Value: ${formatCurrencyINR(maturity)} | Principal: ${formatCurrencyINR(
        amount
      )} | Interest Earned: ${formatCurrencyINR(interest)}`
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <Label className="mb-0">Deposit Amount</Label>
              <span className="text-sm font-semibold text-foreground">{formatCurrencyINR(amount)}</span>
            </div>
            <Input
              type="number"
              value={amount}
              min={1000}
              max={10000000}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              className="mb-2"
            />
            <Slider min={1000} max={5000000} step={1000} value={amount} onChange={setAmount} />
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
              <Label className="mb-0">Tenure (years)</Label>
              <span className="text-sm font-semibold text-foreground">{years} yrs</span>
            </div>
            <Input
              type="number"
              value={years}
              min={1}
              max={20}
              onChange={(e) => setYears(Number(e.target.value) || 0)}
              className="mb-2"
            />
            <Slider min={1} max={20} step={1} value={years} onChange={setYears} />
          </div>

          <div>
            <Label htmlFor="fd-frequency">Compounding Frequency</Label>
            <Select
              id="fd-frequency"
              options={FREQUENCY_OPTIONS}
              value={String(frequency)}
              onChange={(value) => setFrequency(Number(value))}
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

        <ResultGrid className="mt-8">
          <ResultCard label="Maturity Value" value={formatCurrencyINR(maturity)} emphasis />
          <ResultCard label="Principal" value={formatCurrencyINR(amount)} />
          <ResultCard label="Interest Earned" value={formatCurrencyINR(interest)} />
        </ResultGrid>
      </CardContent>
    </Card>
  );
}
