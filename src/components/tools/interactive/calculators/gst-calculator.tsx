"use client";

import * as React from "react";
import { Copy, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { ResultCard, ResultGrid } from "@/components/tools/result-card";
import { cn, formatCurrencyINR } from "@/lib/utils";
import { useCopy } from "@/hooks/use-copy";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

const DEFAULTS = { amount: 10000, rate: 18 };
const RATE_CHIPS = [5, 12, 18, 28];
const MODE_TABS = [
  { value: "add", label: "Add GST" },
  { value: "remove", label: "Remove GST" },
];

function calculateGst(amount: number, rate: number, mode: string) {
  if (amount <= 0 || rate < 0) return { base: 0, gstAmount: 0, total: 0 };
  if (mode === "add") {
    const gstAmount = (amount * rate) / 100;
    return { base: amount, gstAmount, total: amount + gstAmount };
  }
  const base = amount / (1 + rate / 100);
  const gstAmount = amount - base;
  return { base, gstAmount, total: amount };
}

export default function GstCalculator({ tool }: ToolComponentProps) {
  const [mode, setMode] = React.useState<"add" | "remove">("add");
  const [amount, setAmount] = React.useState(DEFAULTS.amount);
  const [rate, setRate] = React.useState<number>(DEFAULTS.rate);
  const [isCustom, setIsCustom] = React.useState(false);
  const [customRate, setCustomRate] = React.useState(DEFAULTS.rate);
  const { copy } = useCopy(tool.slug);

  const effectiveRate = isCustom ? customRate : rate;

  const { base, gstAmount, total } = React.useMemo(
    () => calculateGst(amount, effectiveRate, mode),
    [amount, effectiveRate, mode]
  );

  React.useEffect(() => {
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
  }, [amount, effectiveRate, mode, tool.slug, tool.category]);

  function handleReset() {
    setMode("add");
    setAmount(DEFAULTS.amount);
    setRate(DEFAULTS.rate);
    setIsCustom(false);
    setCustomRate(DEFAULTS.rate);
  }

  function handleCopy() {
    copy(
      `Base Amount: ${formatCurrencyINR(base)} | GST (${effectiveRate}%): ${formatCurrencyINR(
        gstAmount
      )} | Total: ${formatCurrencyINR(total)}`
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <Tabs
            tabs={MODE_TABS}
            value={mode}
            onChange={(v) => setMode(v as "add" | "remove")}
          />

          <div>
            <Label>{mode === "add" ? "Amount (excluding GST)" : "Amount (including GST)"}</Label>
            <Input
              type="number"
              value={amount}
              min={0}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
            />
          </div>

          <div>
            <Label>GST Rate</Label>
            <div className="flex flex-wrap gap-2">
              {RATE_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => {
                    setIsCustom(false);
                    setRate(chip);
                  }}
                  className={cn(
                    "cursor-pointer rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
                    !isCustom && rate === chip
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border bg-surface text-foreground hover:bg-muted"
                  )}
                >
                  {chip}%
                </button>
              ))}
              <button
                type="button"
                onClick={() => setIsCustom(true)}
                className={cn(
                  "cursor-pointer rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
                  isCustom
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-border bg-surface text-foreground hover:bg-muted"
                )}
              >
                Custom
              </button>
            </div>
            {isCustom && (
              <Input
                type="number"
                value={customRate}
                min={0}
                max={100}
                step={0.1}
                placeholder="Enter custom GST rate %"
                onChange={(e) => setCustomRate(Number(e.target.value) || 0)}
                className="mt-2"
              />
            )}
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
          <ResultCard label="Base Amount" value={formatCurrencyINR(base)} />
          <ResultCard label="GST Amount" value={formatCurrencyINR(gstAmount)} />
          <ResultCard label="CGST" value={formatCurrencyINR(gstAmount / 2)} />
          <ResultCard label="SGST" value={formatCurrencyINR(gstAmount / 2)} />
        </ResultGrid>
        <ResultGrid className="mt-3">
          <ResultCard label="Total Amount" value={formatCurrencyINR(total)} emphasis className="col-span-2 sm:col-span-4" />
        </ResultGrid>
      </CardContent>
    </Card>
  );
}
