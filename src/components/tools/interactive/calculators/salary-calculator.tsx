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

const DEFAULTS = { ctc: 1200000, basicPct: 50, professionalTax: 200 };

function calculateSalary(ctc: number, basicPct: number, professionalTax: number) {
  if (ctc <= 0) {
    return { monthlyInHand: 0, annualInHand: 0, employeePfMonthly: 0, employerPfMonthly: 0 };
  }
  const annualBasic = (ctc * basicPct) / 100;
  const employerPfAnnual = 0.12 * annualBasic;
  const grossAnnual = ctc - employerPfAnnual;
  const monthlyGross = grossAnnual / 12;
  const monthlyBasic = annualBasic / 12;
  const employeePfMonthly = 0.12 * monthlyBasic;
  const monthlyInHand = monthlyGross - employeePfMonthly - professionalTax;
  const annualInHand = monthlyInHand * 12;
  const employerPfMonthly = employerPfAnnual / 12;
  return { monthlyInHand, annualInHand, employeePfMonthly, employerPfMonthly };
}

export default function SalaryCalculator({ tool }: ToolComponentProps) {
  const [ctc, setCtc] = React.useState(DEFAULTS.ctc);
  const [basicPct, setBasicPct] = React.useState(DEFAULTS.basicPct);
  const [professionalTax, setProfessionalTax] = React.useState(DEFAULTS.professionalTax);
  const { copy } = useCopy(tool.slug);

  const { monthlyInHand, annualInHand, employeePfMonthly, employerPfMonthly } = React.useMemo(
    () => calculateSalary(ctc, basicPct, professionalTax),
    [ctc, basicPct, professionalTax]
  );

  React.useEffect(() => {
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
  }, [ctc, basicPct, professionalTax, tool.slug, tool.category]);

  function handleReset() {
    setCtc(DEFAULTS.ctc);
    setBasicPct(DEFAULTS.basicPct);
    setProfessionalTax(DEFAULTS.professionalTax);
  }

  function handleCopy() {
    copy(
      `Monthly In-Hand: ${formatCurrencyINR(monthlyInHand)} | Annual In-Hand: ${formatCurrencyINR(
        annualInHand
      )} | Employee PF: ${formatCurrencyINR(employeePfMonthly)}/mo | Employer PF: ${formatCurrencyINR(
        employerPfMonthly
      )}/mo`
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <Label className="mb-0">Annual CTC</Label>
              <span className="text-sm font-semibold text-foreground">{formatCurrencyINR(ctc)}</span>
            </div>
            <Input
              type="number"
              value={ctc}
              min={100000}
              max={100000000}
              onChange={(e) => setCtc(Number(e.target.value) || 0)}
              className="mb-2"
            />
            <Slider min={100000} max={10000000} step={10000} value={ctc} onChange={setCtc} />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <Label className="mb-0">Basic Pay (% of CTC)</Label>
              <span className="text-sm font-semibold text-foreground">{basicPct}%</span>
            </div>
            <Input
              type="number"
              value={basicPct}
              min={30}
              max={60}
              onChange={(e) => setBasicPct(Number(e.target.value) || 0)}
              className="mb-2"
            />
            <Slider min={30} max={60} step={1} value={basicPct} onChange={setBasicPct} />
          </div>

          <div>
            <Label>Monthly Professional Tax</Label>
            <Input
              type="number"
              value={professionalTax}
              min={0}
              max={2500}
              onChange={(e) => setProfessionalTax(Number(e.target.value) || 0)}
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
          <ResultCard label="Monthly In-Hand" value={formatCurrencyINR(monthlyInHand)} emphasis />
          <ResultCard label="Annual In-Hand" value={formatCurrencyINR(annualInHand)} />
          <ResultCard label="Employee PF (monthly)" value={formatCurrencyINR(employeePfMonthly)} />
          <ResultCard label="Employer PF (monthly)" value={formatCurrencyINR(employerPfMonthly)} />
        </ResultGrid>
        <p className="mt-3 text-xs text-muted-foreground">
          This is an approximate estimate. It does not include income tax, which depends on your tax regime and
          other income.
        </p>
      </CardContent>
    </Card>
  );
}
