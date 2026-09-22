import { pgTable, serial, text, jsonb, timestamp, pgEnum, varchar } from "drizzle-orm/pg-core";

export interface BlogBlock {
  type: "p" | "h2" | "ul";
  text?: string;
  items?: string[];
}

export interface RelatedTool {
  name: string;
  href: string;
  cta: string;
}

export const postStatusEnum = pgEnum("post_status", ["draft", "published"]);

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: jsonb("content").$type<BlogBlock[]>().notNull(),
  relatedTool: jsonb("related_tool").$type<RelatedTool>().notNull(),
  status: postStatusEnum("status").notNull().default("draft"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  readingTime: varchar("reading_time", { length: 32 }).notNull().default("3 min read"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type BlogPostRow = typeof blogPosts.$inferSelect;
export type NewBlogPostRow = typeof blogPosts.$inferInsert;
