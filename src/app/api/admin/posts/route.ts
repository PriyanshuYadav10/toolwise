import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { desc } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db/client";
import { blogPosts } from "@/lib/db/schema";
import { requireAdminSession } from "@/lib/auth/require-session";

const blockSchema = z.object({
  type: z.enum(["p", "h2", "h3", "ul", "callout"]),
  text: z.string().optional(),
  items: z.array(z.string()).optional(),
  variant: z.enum(["tip", "warning", "note"]).optional(),
});

export const postSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers and hyphens."),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.array(blockSchema).min(1),
  relatedTool: z.object({
    name: z.string().min(1),
    href: z.string().min(1),
    cta: z.string().min(1),
  }),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published"]),
  readingTime: z.string().min(1),
});

export async function GET() {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please fill in the required fields.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const now = new Date();
    const [created] = await db
      .insert(blogPosts)
      .values({
        ...parsed.data,
        publishedAt: parsed.data.status === "published" ? now : null,
      })
      .returning();

    revalidatePath("/blog");
    revalidatePath(`/blog/${created.slug}`);
    return NextResponse.json({ post: created }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && "code" in error && (error as { code: string }).code === "23505") {
      return NextResponse.json({ error: "A post with this slug already exists." }, { status: 409 });
    }
    console.error("Create post error:", error);
    return NextResponse.json({ error: "Something went wrong creating the post." }, { status: 500 });
  }
}
