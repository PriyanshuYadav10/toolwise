import type { Metadata } from "next";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/lib/data/categories";
import { getToolsByCategory } from "@/lib/data/tools";
import { ToolCard } from "@/components/tools/tool-card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Icon } from "@/components/icon";
import { AdBannerResponsive, AdRectangle } from "@/components/ads";
import { JsonLd } from "@/components/seo/json-ld";

const IN_FEED_AD_INTERVAL = 8;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  const tools = getToolsByCategory(category.slug).filter((t) => t.status === "live");
  const title = `${category.name} – ${tools.length}+ Free Online Tools`;
  const description = `${category.description} Browse ${tools.length} free ${category.name.toLowerCase()} — no sign-up required.`;

  return {
    title,
    description,
    alternates: { canonical: `/${category.slug}` },
    openGraph: { title, description, url: `/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: PageProps<"/[category]">) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const allInCategory = getToolsByCategory(category.slug);
  const live = allInCategory.filter((t) => t.status === "live");
  const comingSoon = allInCategory.filter((t) => t.status === "coming-soon");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: category.name, item: `/${category.slug}` },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={jsonLd} />
      <Breadcrumb items={[{ label: category.name }]} />

      <header className="mt-4 flex items-start gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon name={category.icon} className="size-7" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{category.name}</h1>
          <p className="mt-1 max-w-2xl text-muted-foreground">{category.description}</p>
          <p className="mt-1 text-sm text-muted-foreground">{live.length} tools available</p>
        </div>
      </header>

      <section className="mt-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {live.map((tool, i) => (
            <Fragment key={tool.id}>
              <ToolCard tool={tool} />
              {(i + 1) % IN_FEED_AD_INTERVAL === 0 && i !== live.length - 1 && (
                <div className="flex items-center justify-center">
                  <AdRectangle />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </section>

      {comingSoon.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">Coming soon</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {comingSoon.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-10 flex justify-center">
        <AdBannerResponsive />
      </div>
    </div>
  );
}
