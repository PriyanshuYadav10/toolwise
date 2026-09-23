import { Calendar, Clock } from "lucide-react";
import { getCategory } from "@/lib/data/categories";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ACCENT_STYLES = {
  primary: { bg: "bg-primary", fg: "text-primary-foreground" },
  accent: { bg: "bg-accent", fg: "text-accent-foreground" },
  success: { bg: "bg-success", fg: "text-success-foreground" },
  warning: { bg: "bg-warning", fg: "text-warning-foreground" },
} as const;

export function BlogPostHeader({
  title,
  category,
  tags,
  publishedAt,
  readingTime,
}: {
  title: string;
  category?: string | null;
  tags: string[];
  publishedAt: Date | null;
  readingTime: string;
}) {
  const cat = category ? getCategory(category) : undefined;
  const accent = ACCENT_STYLES[cat?.accent ?? "primary"];

  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl px-6 py-10 sm:px-10 sm:py-14", accent.bg, accent.fg)}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      <div className="relative">
        {cat && (
          <Badge variant="outline" className="border-current/30 bg-white/10 text-current">
            {cat.name}
          </Badge>
        )}
        <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm opacity-90">
          <span className="font-medium">By the GrainZap Team</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            <time dateTime={publishedAt?.toISOString()}>
              {(publishedAt ?? new Date()).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {readingTime}
          </span>
        </div>
        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
