import { and, desc, eq } from "drizzle-orm";
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
