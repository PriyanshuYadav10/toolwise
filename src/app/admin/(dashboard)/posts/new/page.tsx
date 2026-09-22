import { PostEditor } from "@/components/admin/post-editor";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-foreground">New post</h1>
      <div className="mt-6">
        <PostEditor mode="create" />
      </div>
    </div>
  );
}
