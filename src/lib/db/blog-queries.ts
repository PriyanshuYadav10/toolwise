import { and, desc, eq, ne } from "drizzle-orm";
import { db } from "./client";
import { blogPosts } from "./schema";

export function getPublishedBlogPosts() {
  return db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt));
}

export async function getPublishedBlogPost(slug: string) {
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.status, "published")));
  return post ?? null;
}

export function getRelatedBlogPosts(currentSlug: string, category: string | null, limit = 3) {
  if (!category) return Promise.resolve([]);
  return db
    .select()
    .from(blogPosts)
    .where(
      and(
        eq(blogPosts.status, "published"),
        eq(blogPosts.category, category),
        ne(blogPosts.slug, currentSlug)
      )
    )
    .orderBy(desc(blogPosts.publishedAt))
    .limit(limit);
}
