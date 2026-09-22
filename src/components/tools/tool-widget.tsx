"use client";

import { useMemo } from "react";
import type { Tool } from "@/lib/data/types";
import { getToolComponent } from "@/lib/tool-components";

export function ToolWidget({ tool }: { tool: Tool }) {
  const Component = useMemo(() => getToolComponent(tool.componentKey), [tool.componentKey]);
  return <Component tool={tool} />;
}
