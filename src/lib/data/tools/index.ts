import type { Tool, CategorySlug } from "../types";
import { calculatorTools } from "./calculators";
import { developerTools } from "./developer-tools";
import { pdfTools } from "./pdf-tools";
import { imageTools } from "./image-tools";
import { aiTools } from "./ai-tools";
import { studentTools } from "./student-tools";

export const allTools: Tool[] = [
  ...calculatorTools,
  ...developerTools,
  ...pdfTools,
  ...imageTools,
  ...aiTools,
  ...studentTools,
];

export const liveTools = allTools.filter((t) => t.status === "live");

export function getToolsByCategory(category: CategorySlug): Tool[] {
  return allTools.filter((t) => t.category === category);
}

export function getTool(category: string, slug: string): Tool | undefined {
  return allTools.find((t) => t.category === category && t.slug === slug);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return allTools.find((t) => t.slug === slug);
}

export function getRelatedTools(tool: Tool, limit = 4): Tool[] {
  const related = tool.relatedTools
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is Tool => Boolean(t) && t!.status === "live");
  if (related.length >= limit) return related.slice(0, limit);

  const sameCategory = getToolsByCategory(tool.category).filter(
    (t) => t.slug !== tool.slug && t.status === "live" && !related.some((r) => r.slug === t.slug)
  );
  return [...related, ...sameCategory].slice(0, limit);
}

export function getFeaturedTools(limit = 6): Tool[] {
  return liveTools.filter((t) => t.featured).slice(0, limit);
}

export function getPopularTools(limit = 8): Tool[] {
  return liveTools.filter((t) => t.popular).slice(0, limit);
}

export function toolHref(tool: Tool): string {
  return `/${tool.category}/${tool.slug}`;
}

export function searchTools(query: string, limit = 8): Tool[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const scored = allTools
    .map((tool) => {
      const name = tool.name.toLowerCase();
      const desc = tool.shortDescription.toLowerCase();
      const keywords = tool.keywords.join(" ").toLowerCase();
      let score = 0;
      if (name === q) score += 100;
      else if (name.startsWith(q)) score += 60;
      else if (name.includes(q)) score += 40;
      if (keywords.includes(q)) score += 20;
      if (desc.includes(q)) score += 10;
      if (tool.status === "live") score += 5;
      return { tool, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.tool);
}
