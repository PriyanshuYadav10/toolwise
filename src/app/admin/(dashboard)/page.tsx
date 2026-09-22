import Link from "next/link";
import { desc } from "drizzle-orm";
import { Plus } from "lucide-react";
import { db } from "@/lib/db/client";
import { blogPosts } from "@/lib/db/schema";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { DeletePostButton } from "@/components/admin/delete-post-button";

export default async function AdminDashboardPage() {
  const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Blog posts</h1>
        <Link href="/admin/posts/new" className={buttonVariants({ variant: "primary" })}>
          <Plus /> New post
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {posts.length === 0 && (
          <p className="text-sm text-muted-foreground">No posts yet. Create your first one.</p>
        )}
        {posts.map((post) => (
          <Card key={post.id} className="flex items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Badge variant={post.status === "published" ? "success" : "default"}>
                  {post.status}
                </Badge>
                <h2 className="truncate font-medium text-foreground">{post.title}</h2>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">/blog/{post.slug}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={`/admin/posts/${post.id}/edit`}
                className={buttonVariants({ variant: "secondary", size: "sm" })}
              >
                Edit
              </Link>
              <DeletePostButton id={post.id} title={post.title} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
