"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useAdNetwork } from "./ad-provider";

export type AdSlotType = "leaderboard" | "rectangle" | "sidebar" | "mobile-banner" | "in-article";

const DIMENSIONS: Record<AdSlotType, { width: number; height: number; className: string }> = {
  leaderboard: { width: 728, height: 90, className: "hidden md:flex" },
  rectangle: { width: 336, height: 280, className: "flex" },
  sidebar: { width: 300, height: 600, className: "hidden lg:flex" },
  "mobile-banner": { width: 320, height: 100, className: "flex md:hidden" },
  "in-article": { width: 336, height: 280, className: "flex" },
};

/**
 * Real AdSense ad units, created per format in the AdSense dashboard.
 * "in-article" uses a matched-content (autorelaxed) unit, which sizes itself
 * to its container rather than a fixed width/height.
 */
const SLOTS: Record<AdSlotType, { slotId: string; format: "auto" | "autorelaxed" }> = {
  leaderboard: { slotId: "7159704593", format: "auto" },
  rectangle: { slotId: "7159704593", format: "auto" },
  sidebar: { slotId: "7159704593", format: "auto" },
  "mobile-banner": { slotId: "7159704593", format: "auto" },
  "in-article": { slotId: "4694246793", format: "autorelaxed" },
};

interface AdSlotProps {
  type: AdSlotType;
  className?: string;
}

/**
 * Reserves fixed dimensions for every placement (prevents CLS) and lazy-loads.
 * With no ad network configured, renders a clearly-labelled placeholder so the
 * layout and UX can be reviewed before a real AdSense unit is wired in.
 */
export function AdSlot({ type, className }: AdSlotProps) {
  const { network, clientId } = useAdNetwork();
  const ref = React.useRef<HTMLModElement | null>(null);
  const dims = DIMENSIONS[type];
  const slot = SLOTS[type];
  const isAutorelaxed = slot.format === "autorelaxed";

  React.useEffect(() => {
    if (network !== "adsense") return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      // ad blocked or script not yet loaded — safe to ignore
    }
  }, [network]);

  return (
    <div
      className={cn(
        "mx-auto flex-col items-center justify-center gap-1",
        dims.className,
        className
      )}
      style={{ minHeight: dims.height, maxWidth: dims.width, width: "100%" }}
    >
      <span className="text-[10px] uppercase tracking-wide text-muted-foreground/70">
        Advertisement
      </span>
      {network === "adsense" && clientId ? (
        <ins
          ref={ref}
          className="adsbygoogle"
          style={isAutorelaxed ? { display: "block", width: "100%" } : { display: "block", width: dims.width, height: dims.height }}
          data-ad-client={clientId}
          data-ad-slot={slot.slotId}
          data-ad-format={slot.format}
          {...(!isAutorelaxed && { "data-full-width-responsive": "true" })}
        />
      ) : (
        <div
          className="flex w-full items-center justify-center rounded-lg border border-dashed border-border bg-surface-sunken text-xs text-muted-foreground/60"
          style={{ height: dims.height, maxWidth: dims.width }}
        >
          {dims.width} × {dims.height}
        </div>
      )}
    </div>
  );
}
