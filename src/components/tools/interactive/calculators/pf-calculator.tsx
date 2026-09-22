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

const DEFAULTS = { salary: 25000, age: 28, increment: 5, rate: 8.25 };
const RETIREMENT_AGE = 58;
const EMPLOYEE_RATE = 0.12;
const EMPLOYER_EPF_RATE = 0.0367;

function projectEpf(monthlySalary: number, age: number, increment: number, rate: number) {
  const yearsToRetirement = Math.max(RETIREMENT_AGE - age, 0);
  let balance = 0;
  let totalEmployeeContribution = 0;
  let totalEmployerContribution = 0;
  let currentSalary = monthlySalary;

  for (let year = 0; year < yearsToRetirement; year++) {
    const annualBasic = currentSalary * 12;
    const employeeContribution = annualBasic * EMPLOYEE_RATE;
    const employerContribution = annualBasic * EMPLOYER_EPF_RATE;

    balance += employeeContribution + employerContribution;
    totalEmployeeContribution += employeeContribution;
    totalEmployerContribution += employerContribution;

    balance += balance * (rate / 100);

    currentSalary += currentSalary * (increment / 100);
  }

  return {
    corpus: balance,
    yearsToRetirement,
    totalEmployeeContribution,
    totalEmployerContribution,
  };
}

export default function PfCalculator({ tool }: ToolComponentProps) {
  const [salary, setSalary] = React.useState(DEFAULTS.salary);
  const [age, setAge] = React.useState(DEFAULTS.age);
  const [increment, setIncrement] = React.useState(DEFAULTS.increment);
  const [rate, setRate] = React.useState(DEFAULTS.rate);
  const { copy } = useCopy(tool.slug);

  const { corpus, yearsToRetirement, totalEmployeeContribution, totalEmployerContribution } = React.useMemo(
    () => projectEpf(salary, age, increment, rate),
    [salary, age, increment, rate]
  );

  React.useEffect(() => {
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
  }, [salary, age, increment, rate, tool.slug, tool.category]);

  function handleReset() {
    setSalary(DEFAULTS.salary);
    setAge(DEFAULTS.age);
    setIncrement(DEFAULTS.increment);
    setRate(DEFAULTS.rate);
  }

  function handleCopy() {
    copy(
      `Projected EPF Corpus: ${formatCurrencyINR(corpus)} at retirement (age ${RETIREMENT_AGE}) | Your Contribution: ${formatCurrencyINR(
        totalEmployeeContribution
      )} | Employer's Contribution: ${formatCurrencyINR(totalEmployerContribution)}`
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <Label htmlFor="pf-salary">Current Monthly Basic Salary</Label>
            <Input
              id="pf-salary"
              type="number"
              value={salary}
              min={0}
              onChange={(e) => setSalary(Number(e.target.value) || 0)}
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <Label className="mb-0">Current Age</Label>
              <span className="text-sm font-semibold text-foreground">{age} yrs</span>
            </div>
            <Input
              type="number"
              value={age}
              min={18}
              max={57}
              onChange={(e) => setAge(Number(e.target.value) || 0)}
              className="mb-2"
            />
            <Slider min={18} max={57} step={1} value={age} onChange={setAge} />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <Label className="mb-0">Expected Annual Salary Increment</Label>
              <span className="text-sm font-semibold text-foreground">{increment}%</span>
            </div>
            <Input
              type="number"
              value={increment}
              min={0}
              max={30}
              step={0.5}
              onChange={(e) => setIncrement(Number(e.target.value) || 0)}
              className="mb-2"
            />
            <Slider min={0} max={20} step={0.5} value={increment} onChange={setIncrement} />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <Label className="mb-0">Current EPF Interest Rate</Label>
              <span className="text-sm font-semibold text-foreground">{rate}%</span>
            </div>
            <Input
              type="number"
              value={rate}
              min={0}
              max={15}
              step={0.05}
              onChange={(e) => setRate(Number(e.target.value) || 0)}
              className="mb-2"
            />
            <Slider min={5} max={12} step={0.05} value={rate} onChange={setRate} />
          </div>

          <div className="rounded-lg border border-border bg-surface-sunken px-3.5 py-2.5 text-sm text-muted-foreground">
            Retirement age is fixed at <span className="font-medium text-foreground">{RETIREMENT_AGE} years</span>.
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
          <ResultCard label="Projected EPF Corpus" value={formatCurrencyINR(corpus)} emphasis />
          <ResultCard label="Years to Retirement" value={formatNumber(yearsToRetirement, 0)} />
          <ResultCard label="Your Total Contribution" value={formatCurrencyINR(totalEmployeeContribution)} />
          <ResultCard label="Employer's Total Contribution" value={formatCurrencyINR(totalEmployerContribution)} />
        </ResultGrid>

        <p className="mt-3 text-xs text-muted-foreground">
          Employer contribution assumes 3.67% goes to EPF (the remaining 8.33% goes to the Employee Pension Scheme).
          This is a simplified projection, not a guarantee.
        </p>
      </CardContent>
    </Card>
  );
}
