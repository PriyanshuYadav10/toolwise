"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { recordRecentTool } from "@/hooks/use-recent-tools";

export function ToolAnalyticsBeacon({ toolSlug, category }: { toolSlug: string; category: string }) {
  useEffect(() => {
    track({ name: "tool_opened", toolSlug, category });
    recordRecentTool(toolSlug);
  }, [toolSlug, category]);

  return null;
}
