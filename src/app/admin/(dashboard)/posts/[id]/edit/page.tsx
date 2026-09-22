import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/lib/db/client";
import { blogPosts } from "@/lib/db/schema";
import { PostEditor } from "@/components/admin/post-editor";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, Number(id)));
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Edit post</h1>
      <div className="mt-6">
        <PostEditor mode="edit" initialPost={post} />
      </div>
    </div>
  );
}
