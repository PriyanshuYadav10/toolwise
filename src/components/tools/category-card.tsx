import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/lib/data/types";
import { getToolsByCategory, liveTools } from "@/lib/data/tools";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

const accentClasses: Record<Category["accent"], string> = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/15 text-accent-foreground dark:text-accent",
  success: "bg-success/15 text-success",
  warning: "bg-warning/20 text-warning",
};

export function CategoryCard({ category }: { category: Category }) {
  const tools = getToolsByCategory(category.slug);
  const live = tools.filter((t) => t.status === "live");
  const popular = live.filter((t) => t.popular).slice(0, 3);

  return (
    <Link
      href={`/${category.slug}`}
      className="group flex flex-col gap-4 rounded-2xl border border-border bg-surface-elevated p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <span className={cn("flex size-12 items-center justify-center rounded-xl", accentClasses[category.accent])}>
          <Icon name={category.icon} className="size-6" />
        </span>
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
          {live.length} tools
        </span>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{category.tagline}</p>
      </div>

      {popular.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">
          {popular.map((tool) => (
            <li
              key={tool.id}
              className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
            >
              {tool.name}
            </li>
          ))}
        </ul>
      )}

      <span className="mt-auto flex items-center gap-1 text-sm font-medium text-primary">
        View all
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export function totalLiveToolCount() {
  return liveTools.length;
}
