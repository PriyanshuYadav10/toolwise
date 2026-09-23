import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { getPublishedBlogPosts } from "@/lib/db/blog-queries";
import { getCategory } from "@/lib/data/categories";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdBanner } from "@/components/ads";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides on calculations, file conversions and everyday tools — written to be genuinely useful, not just SEO filler.",
  alternates: { canonical: "/blog" },
};

export const revalidate = 60;

const BADGE_VARIANTS = {
  primary: "primary",
  accent: "accent",
  success: "success",
  warning: "warning",
} as const;

export default async function BlogIndexPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Blog" }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Blog</h1>
      <p className="mt-2 text-muted-foreground">
        Practical guides behind the tools — how calculations actually work, and how to get the most out of them.
      </p>

      <div className="mt-6 flex justify-center">
        <AdBanner />
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const cat = post.category ? getCategory(post.category) : undefined;
          return (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <Card className="flex h-full flex-col p-6 transition-all group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-md">
                {cat && (
                  <Badge variant={BADGE_VARIANTS[cat.accent]} className="w-fit">
                    {cat.name}
                  </Badge>
                )}
                <h2 className="mt-3 text-lg font-semibold text-foreground">{post.title}</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>

                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="size-3.5" />
                  <time dateTime={post.publishedAt?.toISOString()}>
                    {(post.publishedAt ?? post.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read more
                  <ArrowRight className="size-3.5" />
                </span>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
