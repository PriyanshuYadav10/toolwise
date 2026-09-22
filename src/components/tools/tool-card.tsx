import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Tool } from "@/lib/data/types";
import { toolHref } from "@/lib/data/tools";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ToolCard({ tool, className }: { tool: Tool; className?: string }) {
  const comingSoon = tool.status === "coming-soon";

  return (
    <Link
      href={toolHref(tool)}
      className={cn(
        "group relative flex flex-col gap-3 rounded-xl border border-border bg-surface-elevated p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon name={tool.icon} className="size-5" />
        </span>
        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground">{tool.name}</h3>
          {comingSoon && (
            <Badge variant="outline" className="shrink-0 gap-1">
              <Clock className="size-3" />
              Soon
            </Badge>
          )}
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{tool.shortDescription}</p>
      </div>
    </Link>
  );
}
