import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar } from "lucide-react";
import { getPublishedBlogPost, getRelatedBlogPosts } from "@/lib/db/blog-queries";
import { extractHeadings, getHeadingId } from "@/lib/blog-content";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AdInArticle, AdSidebar } from "@/components/ads";
import { JsonLd } from "@/components/seo/json-ld";
import { BlogPostHeader } from "@/components/blog/blog-post-header";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { CalloutBox } from "@/components/blog/callout-box";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolwise.app";

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPost(slug);
  if (!post) return {};

  const ogImage = `${siteUrl}/blog/${post.slug}/opengraph-image`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      url: `/blog/${post.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPublishedBlogPost(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const related = await getRelatedBlogPosts(post.slug, post.category, 3);
  const pageUrl = `${siteUrl}/blog/${post.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${siteUrl}/blog/${post.slug}/opengraph-image`,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    mainEntityOfPage: pageUrl,
    url: pageUrl,
    author: { "@type": "Organization", name: "GrainZap" },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: pageUrl },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

      <div className="mt-4">
        <BlogPostHeader
          title={post.title}
          category={post.category}
          tags={post.tags}
          publishedAt={post.publishedAt}
          readingTime={post.readingTime}
        />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0">
          <div className="mb-6 lg:hidden">
            <TableOfContents headings={headings} />
          </div>

          <div className="space-y-4">
            {post.content.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2 key={i} id={getHeadingId(i)} className="scroll-mt-24 pt-3 text-xl font-semibold text-foreground">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "h3") {
                return (
                  <h3 key={i} id={getHeadingId(i)} className="scroll-mt-24 pt-2 text-lg font-semibold text-foreground">
                    {block.text}
                  </h3>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul key={i} className="list-disc space-y-1.5 pl-5 text-muted-foreground">
                    {block.items?.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                );
              }
              if (block.type === "callout") {
                return <CalloutBox key={i} variant={block.variant} text={block.text} />;
              }
              return (
                <p
                  key={i}
                  className={i === 0 ? "text-lg leading-relaxed text-foreground" : "leading-relaxed text-muted-foreground"}
                >
                  {block.text}
                </p>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <AdInArticle />
          </div>

          <div className="mt-10 flex flex-col items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-foreground">
              Ready to put this into practice?
            </p>
            <Link href={post.relatedTool.href} className={buttonVariants({ variant: "primary" })}>
              {post.relatedTool.cta}
              <ArrowRight />
            </Link>
          </div>

          {related.length > 0 && (
            <section className="mt-10 border-t border-border pt-8">
              <h2 className="text-lg font-semibold text-foreground">More guides</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`}>
                    <Card className="h-full p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="size-3" />
                        <time dateTime={r.publishedAt?.toISOString()}>
                          {(r.publishedAt ?? r.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </time>
                      </div>
                      <h3 className="mt-2 text-sm font-semibold text-foreground">{r.title}</h3>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-6">
            <TableOfContents headings={headings} />
            <AdSidebar />
          </div>
        </aside>
      </div>
    </div>
  );
}
