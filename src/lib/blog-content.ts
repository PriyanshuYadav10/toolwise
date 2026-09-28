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

export interface FaqPair {
  question: string;
  answer: string;
}

/**
 * Every post ends with a "Frequently asked questions" h2 followed by h3/p
 * pairs — pull those out for FAQPage structured data instead of requiring a
 * separate faq field, since the content already has this shape.
 */
export function extractFaqPairs(content: BlogBlock[]): FaqPair[] {
  const pairs: FaqPair[] = [];
  let inFaqSection = false;

  for (let i = 0; i < content.length; i++) {
    const block = content[i];
    if (block.type === "h2") {
      inFaqSection = /frequently asked questions/i.test(block.text ?? "");
      continue;
    }
    if (!inFaqSection || block.type !== "h3") continue;

    const next = content[i + 1];
    if (next?.type === "p" && next.text) {
      pairs.push({ question: block.text ?? "", answer: next.text });
    }
  }

  return pairs;
}
