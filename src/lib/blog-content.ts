import type { BlogBlock } from "@/lib/db/schema";

export function getHeadingId(index: number): string {
  return `heading-${index}`;
}

export interface HeadingEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

export function extractHeadings(content: BlogBlock[]): HeadingEntry[] {
  return content
    .map((block, index) => ({ block, index }))
    .filter(({ block }) => block.type === "h2" || block.type === "h3")
    .map(({ block, index }) => ({
      id: getHeadingId(index),
      text: block.text ?? "",
      level: block.type === "h2" ? 2 : 3,
    }));
}
