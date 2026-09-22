import type { Category } from "./types";

export const categories: Category[] = [
  {
    id: "cat-calculators",
    slug: "calculators",
    name: "Calculators",
    tagline: "Financial and everyday calculations",
    description:
      "Loan, tax, salary and savings calculators that turn confusing formulas into instant, clear answers.",
    icon: "Calculator",
    accent: "primary",
  },
  {
    id: "cat-developer-tools",
    slug: "developer-tools",
    name: "Developer Tools",
    tagline: "Fast utilities for developers",
    description:
      "Format, validate, encode and inspect data without leaving your browser — built for daily engineering work.",
    icon: "Code2",
    accent: "accent",
  },
  {
    id: "cat-pdf-tools",
    slug: "pdf-tools",
    name: "PDF Tools",
    tagline: "Work with documents directly in your browser",
    description:
      "Merge, compress, split and convert PDF files quickly, with clear notes on how your files are handled.",
    icon: "FileText",
    accent: "warning",
  },
  {
    id: "cat-image-tools",
    slug: "image-tools",
    name: "Image Tools",
    tagline: "Compress, resize and convert images",
    description:
      "Shrink file sizes, resize dimensions and convert formats without losing the quality that matters.",
    icon: "Image",
    accent: "success",
  },
  {
    id: "cat-ai-tools",
    slug: "ai-tools",
    name: "AI Tools",
    tagline: "AI-powered productivity utilities",
    description:
      "Generate resumes, cover letters and polished writing using AI — with full control over the result.",
    icon: "Sparkles",
    accent: "accent",
  },
  {
    id: "cat-student-tools",
    slug: "student-tools",
    name: "Student Tools",
    tagline: "Tools for students and academic calculations",
    description:
      "CGPA, attendance and grade calculators built around how schools and colleges actually grade.",
    icon: "GraduationCap",
    accent: "primary",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
