export type CategorySlug =
  | "calculators"
  | "developer-tools"
  | "pdf-tools"
  | "image-tools"
  | "ai-tools"
  | "student-tools";

export type ToolStatus = "live" | "coming-soon";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ExampleRow {
  label: string;
  value: string;
}

export interface ToolContent {
  intro: string;
  howToUse: string[];
  formula?: {
    title: string;
    expression: string;
    description: string;
  };
  example?: {
    title: string;
    summary: string;
    rows: ExampleRow[];
  };
  benefits: string[];
  commonMistakes: string[];
  faq: FaqItem[];
}

export interface Tool {
  id: string;
  name: string;
  shortName?: string;
  slug: string;
  category: CategorySlug;
  shortDescription: string;
  description: string;
  icon: string;
  componentKey: string;
  status: ToolStatus;
  featured?: boolean;
  popular?: boolean;
  runsInBrowser: boolean;
  privacyNote?: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  relatedTools: string[];
  content?: ToolContent;
}

export interface Category {
  id: string;
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  accent: "primary" | "accent" | "success" | "warning";
}
