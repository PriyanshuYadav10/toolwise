"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Tabs } from "@/components/ui/tabs";
import { track } from "@/lib/analytics";
import type { ToolComponentProps } from "@/lib/tool-components";

type Unit = "seconds" | "milliseconds";

function toDatetimeLocalValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(
    date.getMinutes()
  )}:${pad(date.getSeconds())}`;
}

export default function TimestampConverter({ tool }: ToolComponentProps) {
  const now = React.useMemo(() => new Date(), []);
  const [unit, setUnit] = React.useState<Unit>("seconds");
  const [timestamp, setTimestamp] = React.useState<string>(String(Math.floor(now.getTime() / 1000)));
  const [datetime, setDatetime] = React.useState<string>(toDatetimeLocalValue(now));
  const [current, setCurrent] = React.useState<{ seconds: number; ms: number }>({
    seconds: Math.floor(Date.now() / 1000),
    ms: Date.now(),
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent({ seconds: Math.floor(Date.now() / 1000), ms: Date.now() });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function handleTimestampChange(value: string) {
    setTimestamp(value);
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
    const num = Number(value);
    if (!Number.isFinite(num)) return;
    const ms = unit === "seconds" ? num * 1000 : num;
    const date = new Date(ms);
    if (Number.isNaN(date.getTime())) return;
    setDatetime(toDatetimeLocalValue(date));
  }

  function handleUnitChange(value: Unit) {
    const num = Number(timestamp);
    if (Number.isFinite(num)) {
      const converted = value === "milliseconds" ? Math.round(num * 1000) : Math.round(num / 1000);
      setTimestamp(String(converted));
    }
    setUnit(value);
  }

  function handleDatetimeChange(value: string) {
    setDatetime(value);
    track({ name: "tool_used", toolSlug: tool.slug, category: tool.category });
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return;
    const ms = date.getTime();
    setTimestamp(String(unit === "seconds" ? Math.floor(ms / 1000) : ms));
  }

  function useCurrentNow() {
    const nowDate = new Date();
    setDatetime(toDatetimeLocalValue(nowDate));
    setTimestamp(String(unit === "seconds" ? Math.floor(nowDate.getTime() / 1000) : nowDate.getTime()));
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="rounded-lg border border-border bg-surface-sunken p-4">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Current Unix Timestamp</span>
          <div className="mt-1 flex flex-wrap gap-x-6 gap-y-1 font-mono text-sm text-foreground">
            <span>Seconds: {current.seconds}</span>
            <span>Milliseconds: {current.ms}</span>
          </div>
          <button
            type="button"
            onClick={useCurrentNow}
            className="mt-2 text-xs text-primary hover:underline cursor-pointer"
          >
            Use current time
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <Label className="mb-0" htmlFor="unix-timestamp">
                Unix timestamp
              </Label>
              <Tabs
                tabs={[
                  { value: "seconds", label: "Seconds" },
                  { value: "milliseconds", label: "Milliseconds" },
                ]}
                value={unit}
                onChange={(v) => handleUnitChange(v as Unit)}
              />
            </div>
            <Input
              id="unix-timestamp"
              type="number"
              value={timestamp}
              onChange={(e) => handleTimestampChange(e.target.value)}
              className="font-mono"
            />
          </div>

          <div>
            <Label htmlFor="human-datetime">Human-readable (local time)</Label>
            <Input
              id="human-datetime"
              type="datetime-local"
              step="1"
              value={datetime}
              onChange={(e) => handleDatetimeChange(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
