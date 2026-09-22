"use client";

import * as React from "react";
import { Copy, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResultCard, ResultGrid } from "@/components/tools/result-card";
import { formatCurrencyINR } from "@/lib/utils";
import { useCopy } from "@/hooks/use-copy";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

const DEFAULTS = { basic: 30000, hraReceived: 15000, rentPaid: 18000, metro: true };

function calculateHra(basic: number, hraReceived: number, rentPaid: number, metro: boolean) {
  const rentMinusTenPercent = Math.max(0, rentPaid - 0.1 * basic);
  const metroLimit = (metro ? 0.5 : 0.4) * basic;
  const exemption = Math.max(0, Math.min(hraReceived, rentMinusTenPercent, metroLimit));
  const taxableHra = Math.max(0, hraReceived - exemption);
  return { exemption, taxableHra };
}

export default function HraCalculator({ tool }: ToolComponentProps) {
  const [basic, setBasic] = React.useState(DEFAULTS.basic);
  const [hraReceived, setHraReceived] = React.useState(DEFAULTS.hraReceived);
  const [rentPaid, setRentPaid] = React.useState(DEFAULTS.rentPaid);
  const [metro, setMetro] = React.useState(DEFAULTS.metro);
  const { copy } = useCopy(tool.slug);

  const { exemption, taxableHra } = React.useMemo(
    () => calculateHra(basic, hraReceived, rentPaid, metro),
    [basic, hraReceived, rentPaid, metro]
  );

  React.useEffect(() => {
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
  }, [basic, hraReceived, rentPaid, metro, tool.slug, tool.category]);

  function handleReset() {
    setBasic(DEFAULTS.basic);
    setHraReceived(DEFAULTS.hraReceived);
    setRentPaid(DEFAULTS.rentPaid);
    setMetro(DEFAULTS.metro);
  }

  function handleCopy() {
    copy(
      `Exempt HRA: ${formatCurrencyINR(exemption)} | Taxable HRA: ${formatCurrencyINR(
        taxableHra
      )} | Basic Salary: ${formatCurrencyINR(basic)} | Rent Paid: ${formatCurrencyINR(rentPaid)}`
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <Label htmlFor="hra-basic">Basic Monthly Salary</Label>
            <Input
              id="hra-basic"
              type="number"
              value={basic}
              min={0}
              onChange={(e) => setBasic(Number(e.target.value) || 0)}
            />
          </div>

          <div>
            <Label htmlFor="hra-received">HRA Received Monthly</Label>
            <Input
              id="hra-received"
              type="number"
              value={hraReceived}
              min={0}
              onChange={(e) => setHraReceived(Number(e.target.value) || 0)}
            />
          </div>

          <div>
            <Label htmlFor="hra-rent">Rent Paid Monthly</Label>
            <Input
              id="hra-rent"
              type="number"
              value={rentPaid}
              min={0}
              onChange={(e) => setRentPaid(Number(e.target.value) || 0)}
            />
          </div>

          <div>
            <Label className="mb-1.5">City Type</Label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMetro(true)}
                className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                  metro
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                Metro
              </button>
              <button
                type="button"
                onClick={() => setMetro(false)}
                className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                  !metro
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                Non-Metro
              </button>
            </div>
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
          <ResultCard label="Exempt HRA" value={formatCurrencyINR(exemption)} emphasis />
          <ResultCard label="Taxable HRA" value={formatCurrencyINR(taxableHra)} />
          <ResultCard label="Basic Salary" value={formatCurrencyINR(basic)} />
          <ResultCard label="Rent Paid" value={formatCurrencyINR(rentPaid)} />
        </ResultGrid>

        <p className="mt-3 text-xs text-muted-foreground">
          HRA exemption is only available under the old tax regime.
        </p>
      </CardContent>
    </Card>
  );
}
