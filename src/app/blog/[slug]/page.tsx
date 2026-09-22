import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar } from "lucide-react";
import { blogPosts, getBlogPost } from "@/lib/data/blog";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/components/ui/button";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolwise.app";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      url: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    url: `${siteUrl}/blog/${post.slug}`,
    author: { "@type": "Organization", name: "Toolwise" },
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

      <header className="mt-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="size-3.5" />
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">{post.title}</h1>
      </header>

      <div className="mt-8 space-y-4">
        {post.content.map((block, i) => {
          if (block.type === "h2") {
            return (
              <h2 key={i} className="pt-3 text-xl font-semibold text-foreground">
                {block.text}
              </h2>
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
          return (
            <p key={i} className="leading-relaxed text-muted-foreground">
              {block.text}
            </p>
          );
        })}
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
    </div>
  );
}
