"use client";

import * as React from "react";

const STORAGE_KEY = "toolwise:recent-tools";
const MAX_ITEMS = 8;

function readRecent(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

export function recordRecentTool(slug: string) {
  try {
    const current = readRecent().filter((s) => s !== slug);
    const next = [slug, ...current].slice(0, MAX_ITEMS);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage unavailable (private mode, disabled, etc.) — no-op
  }
}

export function useRecentToolSlugs(): string[] {
  const [slugs, setSlugs] = React.useState<string[]>([]);

  React.useEffect(() => {
    setSlugs(readRecent());
  }, []);

  return slugs;
}
