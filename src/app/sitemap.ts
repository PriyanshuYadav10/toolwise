import type { MetadataRoute } from "next";
import { categories } from "@/lib/data/categories";
import { allTools, toolHref } from "@/lib/data/tools";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolwise.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${siteUrl}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/disclaimer`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${siteUrl}/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const toolPages: MetadataRoute.Sitemap = allTools
    .filter((t) => t.status === "live")
    .map((t) => ({
      url: `${siteUrl}${toolHref(t)}`,
      changeFrequency: "monthly",
      priority: t.featured ? 0.9 : 0.6,
    }));

  return [...staticPages, ...categoryPages, ...toolPages];
}
