import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Link href="/" className="flex items-center hover:text-foreground transition-colors" aria-label="Home">
        <Home className="size-3.5" />
      </Link>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <ChevronRight className="size-3.5 shrink-0" />
          {item.href ? (
            <Link href={item.href} className="hover:text-foreground transition-colors truncate">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium truncate" aria-current="page">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
