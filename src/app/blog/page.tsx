import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { blogPosts } from "@/lib/data/blog";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides on calculations, file conversions and everyday tools — written to be genuinely useful, not just SEO filler.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Blog" }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Blog</h1>
      <p className="mt-2 text-muted-foreground">
        Practical guides behind the tools — how calculations actually work, and how to get the most out of them.
      </p>

      <div className="mt-8 space-y-5">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-xl border border-border bg-surface-elevated p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="size-3.5" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
            <h2 className="mt-2 text-xl font-semibold text-foreground">{post.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Read more
              <ArrowRight className="size-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
