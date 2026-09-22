import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { blogPosts } from "@/lib/db/schema";
import { requireAdminSession } from "@/lib/auth/require-session";
import { postSchema } from "../route";

type RouteContext = { params: Promise<{ id: string }> };

const updateSchema = postSchema.partial();

export async function GET(_request: Request, { params }: RouteContext) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, Number(id)));
  if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const [existing] = await db.select().from(blogPosts).where(eq(blogPosts.id, Number(id)));
  if (!existing) return NextResponse.json({ error: "Post not found." }, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please fill in the required fields.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const nextStatus = parsed.data.status ?? existing.status;
  const publishedAt =
    nextStatus === "published" && !existing.publishedAt ? new Date() : existing.publishedAt;

  try {
    const [updated] = await db
      .update(blogPosts)
      .set({ ...parsed.data, publishedAt, updatedAt: new Date() })
      .where(eq(blogPosts.id, Number(id)))
      .returning();

    revalidatePath("/blog");
    revalidatePath(`/blog/${existing.slug}`);
    if (updated.slug !== existing.slug) revalidatePath(`/blog/${updated.slug}`);

    return NextResponse.json({ post: updated });
  } catch (error) {
    if (error instanceof Error && "code" in error && (error as { code: string }).code === "23505") {
      return NextResponse.json({ error: "A post with this slug already exists." }, { status: 409 });
    }
    console.error("Update post error:", error);
    return NextResponse.json({ error: "Something went wrong updating the post." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const [existing] = await db.select().from(blogPosts).where(eq(blogPosts.id, Number(id)));
  if (!existing) return NextResponse.json({ error: "Post not found." }, { status: 404 });

  await db.delete(blogPosts).where(eq(blogPosts.id, Number(id)));

  revalidatePath("/blog");
  revalidatePath(`/blog/${existing.slug}`);

  return NextResponse.json({ ok: true });
}
