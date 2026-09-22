import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allTools, getTool, toolHref } from "@/lib/data/tools";
import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { ToolWidget } from "@/components/tools/tool-widget";
import { ToolAnalyticsBeacon } from "@/components/tools/tool-analytics-beacon";

export function generateStaticParams() {
  return allTools.map((tool) => ({ category: tool.category, slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[category]/[slug]">): Promise<Metadata> {
  const { category, slug } = await params;
  const tool = getTool(category, slug);
  if (!tool) return {};

  const path = toolHref(tool);
  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    keywords: tool.keywords,
    alternates: { canonical: path },
    robots: tool.status === "coming-soon" ? { index: false, follow: true } : undefined,
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      url: path,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.seoTitle,
      description: tool.seoDescription,
    },
  };
}

export default async function ToolPage({ params }: PageProps<"/[category]/[slug]">) {
  const { category, slug } = await params;
  const tool = getTool(category, slug);
  if (!tool) notFound();

  const path = toolHref(tool);

  const jsonLdBlocks: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: tool.category, item: `/${tool.category}` },
        { "@type": "ListItem", position: 3, name: tool.name, item: path },
      ],
    },
  ];

  if (tool.status === "live") {
    jsonLdBlocks.push({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: tool.name,
      description: tool.seoDescription,
      url: path,
      applicationCategory: "UtilitiesApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    });

    if (tool.content?.faq.length) {
      jsonLdBlocks.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: tool.content.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      });
    }
  }

  return (
    <>
      {jsonLdBlocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <ToolAnalyticsBeacon toolSlug={tool.slug} category={tool.category} />
      <ToolPageLayout tool={tool}>
        <ToolWidget tool={tool} />
      </ToolPageLayout>
    </>
  );
}
