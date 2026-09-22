"use client";

import * as React from "react";
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

const DEFAULTS = { amount: 2000000, rate: 8.5, years: 20 };

function calculateEmi(principal: number, annualRate: number, years: number) {
  const months = years * 12;
  const monthlyRate = annualRate / 12 / 100;
  if (principal <= 0 || months <= 0) return { emi: 0, totalPayment: 0, totalInterest: 0, months };
  if (monthlyRate === 0) {
    const emi = principal / months;
    return { emi, totalPayment: principal, totalInterest: 0, months };
  }
  const factor = Math.pow(1 + monthlyRate, months);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;
  return { emi, totalPayment, totalInterest, months };
}

interface YearRow {
  year: number;
  principalPaid: number;
  interestPaid: number;
  balance: number;
}

function buildSchedule(principal: number, annualRate: number, months: number, emi: number): YearRow[] {
  const monthlyRate = annualRate / 12 / 100;
  const rows: YearRow[] = [];
  let balance = principal;
  let yearPrincipal = 0;
  let yearInterest = 0;
  let year = 1;

  for (let month = 1; month <= months && balance > 0.01; month++) {
    const interestPortion = balance * monthlyRate;
    let principalPortion = emi - interestPortion;
    if (principalPortion > balance) principalPortion = balance;
    balance -= principalPortion;
    yearPrincipal += principalPortion;
    yearInterest += interestPortion;

    if (month % 12 === 0 || month === months || balance <= 0.01) {
      rows.push({ year, principalPaid: yearPrincipal, interestPaid: yearInterest, balance: Math.max(balance, 0) });
      yearPrincipal = 0;
      yearInterest = 0;
      year++;
    }
  }

  return rows;
}

export default function LoanCalculator({ tool }: ToolComponentProps) {
  const [amount, setAmount] = React.useState(DEFAULTS.amount);
  const [rate, setRate] = React.useState(DEFAULTS.rate);
  const [years, setYears] = React.useState(DEFAULTS.years);
  const { copy } = useCopy(tool.slug);

  const { emi, totalPayment, totalInterest, months } = React.useMemo(
    () => calculateEmi(amount, rate, years),
    [amount, rate, years]
  );

  const schedule = React.useMemo(
    () => buildSchedule(amount, rate, months, emi),
    [amount, rate, months, emi]
  );

  React.useEffect(() => {
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
  }, [amount, rate, years, tool.slug, tool.category]);

  function handleReset() {
    setAmount(DEFAULTS.amount);
    setRate(DEFAULTS.rate);
    setYears(DEFAULTS.years);
  }

  function handleCopy() {
    copy(
      `Monthly EMI: ${formatCurrencyINR(emi)} | Total Interest: ${formatCurrencyINR(
        totalInterest
      )} | Total Payment: ${formatCurrencyINR(totalPayment)}`
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
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
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <RotateCcw /> Reset
            </Button>
          </div>
        </div>

        <ResultGrid className="mt-8">
          <ResultCard label="Monthly EMI" value={formatCurrencyINR(emi)} emphasis />
          <ResultCard label="Total Interest" value={formatCurrencyINR(totalInterest)} />
          <ResultCard label="Total Payment" value={formatCurrencyINR(totalPayment)} />
        </ResultGrid>

        <div className="mt-8">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Yearly Amortisation Schedule</h3>
          <div className="max-h-80 overflow-y-auto rounded-lg border border-border">
            <table className="w-full min-w-[520px] text-sm">
              <thead className="sticky top-0">
                <tr className="border-b border-border bg-surface-sunken text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-3 py-2.5 font-medium">Year</th>
                  <th className="px-3 py-2.5 font-medium">Principal Paid</th>
                  <th className="px-3 py-2.5 font-medium">Interest Paid</th>
                  <th className="px-3 py-2.5 font-medium">Remaining Balance</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row) => (
                  <tr key={row.year} className="border-b border-border last:border-b-0">
                    <td className="px-3 py-2 text-foreground">{row.year}</td>
                    <td className="px-3 py-2 text-foreground">{formatCurrencyINR(row.principalPaid)}</td>
                    <td className="px-3 py-2 text-foreground">{formatCurrencyINR(row.interestPaid)}</td>
                    <td className="px-3 py-2 text-foreground">{formatCurrencyINR(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          {formatNumber(months, 0)} monthly instalments of {formatCurrencyINR(emi)}.
        </p>
      </CardContent>
    </Card>
  );
}
