import { List } from "lucide-react";
import type { HeadingEntry } from "@/lib/blog-content";

function TocList({ headings }: { headings: HeadingEntry[] }) {
  return (
    <ul className="space-y-2 text-sm">
      {headings.map((h) => (
        <li key={h.id} className={h.level === 3 ? "pl-4" : undefined}>
          <a
            href={`#${h.id}`}
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function TableOfContents({ headings }: { headings: HeadingEntry[] }) {
  if (headings.length === 0) return null;

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <div className="hidden rounded-xl border border-border bg-surface-elevated p-5 lg:block">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <List className="size-4" />
          On this page
        </div>
        <div className="mt-3">
          <TocList headings={headings} />
        </div>
      </div>

      {/* Mobile/tablet: collapsible */}
      <details className="rounded-xl border border-border bg-surface-elevated p-4 lg:hidden">
        <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-foreground">
          <List className="size-4" />
          On this page
        </summary>
        <div className="mt-3">
          <TocList headings={headings} />
        </div>
      </details>
    </>
  );
}
