"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, X, CornerDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { searchTools, toolHref } from "@/lib/data/tools";
import { Icon } from "@/components/icon";
import { track } from "@/lib/analytics";
import { Badge } from "@/components/ui/badge";

interface GlobalSearchProps {
  variant?: "hero" | "compact";
  placeholder?: string;
  autoFocus?: boolean;
  onNavigate?: () => void;
}

export function GlobalSearch({
  variant = "hero",
  placeholder = "Search 100+ free tools...",
  autoFocus,
  onNavigate,
}: GlobalSearchProps) {
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = React.useMemo(() => searchTools(query, 8), [query]);

  React.useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  React.useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  React.useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  React.useEffect(() => {
    if (query.trim()) {
      const timeout = setTimeout(() => {
        track({ name: "search_performed", query: query.trim(), resultCount: results.length });
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [query, results.length]);

  function navigateTo(index: number) {
    const tool = results[index];
    if (!tool) return;
    router.push(toolHref(tool));
    setOpen(false);
    setQuery("");
    onNavigate?.();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      navigateTo(activeIndex);
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl border border-border bg-surface-elevated shadow-sm transition-shadow focus-within:shadow-md focus-within:ring-2 focus-within:ring-ring",
          variant === "hero" ? "px-5 py-4" : "px-3.5 py-2.5"
        )}
      >
        <Search className={cn("shrink-0 text-muted-foreground", variant === "hero" ? "size-5" : "size-4")} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Search tools"
          role="combobox"
          aria-expanded={open}
          aria-controls="global-search-results"
          className={cn(
            "w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none",
            variant === "hero" ? "text-base" : "text-sm"
          )}
        />
        {query ? (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="shrink-0 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        ) : (
          variant === "hero" && (
            <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 text-[11px] text-muted-foreground sm:block">
              /
            </kbd>
          )
        )}
      </div>

      {open && query.trim() && (
        <div
          id="global-search-results"
          role="listbox"
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-lg animate-fade-in"
        >
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">
              No tools found for &ldquo;{query}&rdquo;.
            </p>
          ) : (
            <ul className="max-h-96 overflow-y-auto py-1.5">
              {results.map((tool, i) => (
                <li key={tool.id}>
                  <button
                    role="option"
                    aria-selected={i === activeIndex}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => navigateTo(i)}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors",
                      i === activeIndex ? "bg-muted" : "hover:bg-muted"
                    )}
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon name={tool.icon} className="size-4.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium text-foreground">{tool.name}</span>
                        {tool.status === "coming-soon" && (
                          <Badge variant="outline" className="shrink-0">
                            Coming soon
                          </Badge>
                        )}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {tool.shortDescription}
                      </span>
                    </span>
                    {i === activeIndex && <CornerDownLeft className="size-3.5 shrink-0 text-muted-foreground" />}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
