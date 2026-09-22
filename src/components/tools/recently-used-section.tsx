"use client";

import { useRecentToolSlugs } from "@/hooks/use-recent-tools";
import { getToolBySlug } from "@/lib/data/tools";
import { ToolCard } from "./tool-card";
import { History } from "lucide-react";

export function RecentlyUsedSection() {
  const slugs = useRecentToolSlugs();
  const tools = slugs.map((slug) => getToolBySlug(slug)).filter((t): t is NonNullable<typeof t> => Boolean(t));

  if (tools.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-2">
        <History className="size-5 text-muted-foreground" />
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Continue where you left off</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tools.slice(0, 4).map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}
