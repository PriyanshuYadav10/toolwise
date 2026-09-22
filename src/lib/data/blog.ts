export interface BlogBlock {
  type: "p" | "h2" | "ul";
  text?: string;
  items?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  relatedTool: { name: string; href: string; cta: string };
  content: BlogBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-calculate-emi",
    title: "How to Calculate EMI (With Formula and Examples)",
    excerpt:
      "A plain-English walkthrough of how loan EMIs are actually calculated, what drives your interest cost, and how tenure changes the total you repay.",
    publishedAt: "2026-08-12",
    readingTime: "5 min read",
    relatedTool: { name: "EMI Calculator", href: "/calculators/emi-calculator", cta: "Calculate Your EMI Free" },
    content: [
      {
        type: "p",
        text: "Every home, car or personal loan comes with an EMI — a fixed monthly payment that combines both principal and interest. Understanding how it's calculated helps you see exactly what you're paying for, and why two loans with the same amount can have very different total costs.",
      },
      { type: "h2", text: "The EMI formula" },
      {
        type: "p",
        text: "EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ − 1), where P is the loan principal, r is the monthly interest rate (your annual rate divided by 12 and by 100), and n is the total number of monthly instalments.",
      },
      {
        type: "p",
        text: "This is a reducing-balance formula: each month, interest is charged only on the balance still outstanding, not on the original loan amount. As you pay down principal, less of each future EMI goes toward interest.",
      },
      { type: "h2", text: "Why the same EMI amount can be misleading" },
      {
        type: "p",
        text: "Two loans with the same monthly EMI can have very different total costs if their tenures differ. A longer tenure lowers the EMI but increases the total interest paid, sometimes dramatically. Always compare total interest, not just the EMI, before choosing a tenure.",
      },
      { type: "h2", text: "A worked example" },
      {
        type: "ul",
        items: [
          "Loan amount: ₹20,00,000",
          "Interest rate: 8.5% per year",
          "Tenure: 20 years (240 months)",
          "Monthly EMI: ≈ ₹17,357",
          "Total interest paid: ≈ ₹21,65,680 — more than the principal itself",
        ],
      },
      {
        type: "p",
        text: "Notice that the total interest here is actually larger than the amount borrowed. That's the compounding effect of a long tenure, and it's exactly why comparing tenures matters as much as comparing interest rates.",
      },
      { type: "h2", text: "What EMI calculators don't include" },
      {
        type: "p",
        text: "Most EMI calculators, including ours, compute principal and interest only. They don't include processing fees, loan insurance, or prepayment charges — check these separately with your lender, since they can meaningfully change the real cost of a loan.",
      },
    ],
  },
  {
    slug: "how-gst-is-calculated",
    title: "How GST Is Calculated in India",
    excerpt:
      "Understand how India's Goods and Services Tax slabs work, the difference between CGST, SGST and IGST, and how to move between GST-inclusive and exclusive prices.",
    publishedAt: "2026-07-28",
    readingTime: "4 min read",
    relatedTool: { name: "GST Calculator", href: "/calculators/gst-calculator", cta: "Calculate GST Free" },
    content: [
      {
        type: "p",
        text: "Goods and Services Tax (GST) replaced a patchwork of indirect taxes in India with a single, tiered system. Most goods and services fall into one of four standard slabs: 5%, 12%, 18% or 28%.",
      },
      { type: "h2", text: "Adding vs removing GST" },
      {
        type: "p",
        text: "There are two common calculations. To add GST to a base price: GST amount = base price × rate / 100. To go the other way — finding the base price from a GST-inclusive total — divide instead: base price = inclusive amount / (1 + rate/100).",
      },
      {
        type: "p",
        text: "A common mistake is applying the rate directly to an already-inclusive amount, which overstates the tax. If a price already includes GST, always use the division formula, not the multiplication one.",
      },
      { type: "h2", text: "CGST, SGST and IGST" },
      {
        type: "ul",
        items: [
          "CGST + SGST: applied together, in equal halves, on sales within the same state.",
          "IGST: applied as a single combined tax on sales between different states.",
          "The total tax rate is the same either way — only how it's split changes.",
        ],
      },
      { type: "h2", text: "A quick example" },
      {
        type: "p",
        text: "On a ₹1,000 base price at 18% GST: GST amount = ₹180, split into ₹90 CGST and ₹90 SGST for an intra-state sale, bringing the total to ₹1,180.",
      },
    ],
  },
  {
    slug: "how-to-reduce-pdf-size",
    title: "How to Reduce PDF File Size Without Losing Quality",
    excerpt:
      "Practical, realistic ways to shrink a PDF — what actually reduces size, what doesn't, and why image-heavy PDFs compress very differently from text documents.",
    publishedAt: "2026-09-02",
    readingTime: "4 min read",
    relatedTool: { name: "Compress PDF", href: "/pdf-tools/compress-pdf", cta: "Compress a PDF Free" },
    content: [
      {
        type: "p",
        text: "A large PDF is almost always large because of embedded images, not text. Understanding this changes how you should think about compressing one.",
      },
      { type: "h2", text: "What actually drives PDF file size" },
      {
        type: "ul",
        items: [
          "High-resolution scanned pages or photos embedded at full quality",
          "Uncompressed or lightly-compressed embedded images",
          "Redundant fonts, metadata or duplicate objects from repeated edits",
          "Unused or hidden layers left over from the original document",
        ],
      },
      {
        type: "p",
        text: "A text-only PDF — a contract, a report with no images — is already fairly compact. Running it through a compressor usually yields only a small reduction, because there isn't much redundant data to remove.",
      },
      { type: "h2", text: "What actually helps" },
      {
        type: "p",
        text: "The biggest wins come from re-encoding embedded images at a lower quality or resolution, and re-serializing the document to remove redundant internal structure. This is why a scanned, image-heavy PDF can often shrink by 50% or more, while a text report might only shrink by a few percent.",
      },
      { type: "h2", text: "A sensible workflow" },
      {
        type: "p",
        text: "Start with a moderate compression level and check that text is still sharp and images are still legible for your use case. If you need to email a large file, moderate compression is usually enough — you don't need to sacrifice quality just to hit an arbitrary attachment size limit.",
      },
    ],
  },
  {
    slug: "how-to-calculate-cgpa",
    title: "How to Calculate Your CGPA (Formula Explained)",
    excerpt:
      "A step-by-step explanation of how CGPA is calculated from your subject grade points and credit hours, and how it differs from a simple average.",
    publishedAt: "2026-08-20",
    readingTime: "3 min read",
    relatedTool: { name: "CGPA Calculator", href: "/student-tools/cgpa-calculator", cta: "Calculate Your CGPA Free" },
    content: [
      {
        type: "p",
        text: "CGPA (Cumulative Grade Point Average) looks like a simple average, but it isn't — it's a credit-weighted average, which means subjects with more credit hours count for more.",
      },
      { type: "h2", text: "The formula" },
      {
        type: "p",
        text: "CGPA = Σ(Grade Point × Credit Hours) / Σ(Credit Hours). In words: multiply each subject's grade point by its credit hours, add those up, then divide by the total credit hours across all subjects.",
      },
      { type: "h2", text: "Why this matters" },
      {
        type: "p",
        text: "A high grade in a low-credit elective won't move your CGPA nearly as much as the same grade in a high-credit core subject. This is the single most common source of confusion when students try to estimate CGPA by simply averaging their grade points.",
      },
      { type: "h2", text: "A worked example" },
      {
        type: "ul",
        items: [
          "Subject A: grade point 8, 4 credits → 32",
          "Subject B: grade point 7.5, 3 credits → 22.5",
          "Subject C: grade point 9, 4 credits → 36",
          "Total: 90.5 grade points across 11 credits → CGPA = 8.23",
        ],
      },
      {
        type: "p",
        text: "One more thing worth knowing: don't mix grading scales. If your institution uses a 10-point scale for some subjects and a 4-point scale for others (rare, but it happens with transfer credits), convert everything to a single scale before averaging.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
