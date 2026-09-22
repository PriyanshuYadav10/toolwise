"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { Icon } from "@/components/icon";
import { ThemeToggle } from "./theme-toggle";
import { GlobalSearch } from "@/components/search/global-search";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-semibold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4.5" />
          </span>
          <span className="text-lg">Toolwise</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/blog"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Blog
          </Link>
        </nav>

        <div className="hidden flex-1 justify-center md:flex lg:max-w-xs">
          <GlobalSearch variant="compact" />
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted md:hidden"
          >
            <Icon name="Search" className="size-4.5" />
          </button>
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted lg:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border px-4 py-3 md:hidden">
          <GlobalSearch variant="compact" autoFocus onNavigate={() => setSearchOpen(false)} />
        </div>
      )}

      <div
        className={cn(
          "grid overflow-hidden border-border transition-all duration-200 lg:hidden",
          mobileOpen ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col gap-0.5 px-4 py-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                <Icon name={cat.icon} className="size-4 text-muted-foreground" />
                {cat.name}
              </Link>
            ))}
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
            >
              Blog
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
