"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import type { BlogBlock, BlogPostRow } from "@/lib/db/schema";
import { Input, Textarea, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface PostEditorProps {
  mode: "create" | "edit";
  initialPost?: BlogPostRow;
}

export function PostEditor({ mode, initialPost }: PostEditorProps) {
  const router = useRouter();
  const [title, setTitle] = React.useState(initialPost?.title ?? "");
  const [slug, setSlug] = React.useState(initialPost?.slug ?? "");
  const [slugTouched, setSlugTouched] = React.useState(mode === "edit");
  const [excerpt, setExcerpt] = React.useState(initialPost?.excerpt ?? "");
  const [readingTime, setReadingTime] = React.useState(initialPost?.readingTime ?? "3 min read");
  const [status, setStatus] = React.useState<"draft" | "published">(initialPost?.status ?? "draft");
  const [relatedToolName, setRelatedToolName] = React.useState(initialPost?.relatedTool?.name ?? "");
  const [relatedToolHref, setRelatedToolHref] = React.useState(initialPost?.relatedTool?.href ?? "");
  const [relatedToolCta, setRelatedToolCta] = React.useState(initialPost?.relatedTool?.cta ?? "");
  const [content, setContent] = React.useState<BlogBlock[]>(initialPost?.content ?? []);
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  function handleTitleBlur() {
    if (!slugTouched && title) setSlug(slugify(title));
  }

  function addBlock(type: BlogBlock["type"]) {
    setContent((blocks) => [
      ...blocks,
      type === "ul" ? { type, items: [""] } : { type, text: "" },
    ]);
  }

  function updateBlock(index: number, next: BlogBlock) {
    setContent((blocks) => blocks.map((b, i) => (i === index ? next : b)));
  }

  function removeBlock(index: number) {
    setContent((blocks) => blocks.filter((_, i) => i !== index));
  }

  function moveBlock(index: number, direction: -1 | 1) {
    setContent((blocks) => {
      const target = index + direction;
      if (target < 0 || target >= blocks.length) return blocks;
      const next = [...blocks];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      title,
      slug,
      excerpt,
      readingTime,
      status,
      relatedTool: { name: relatedToolName, href: relatedToolHref, cta: relatedToolCta },
      content,
    };

    const url = mode === "create" ? "/api/admin/posts" : `/api/admin/posts/${initialPost!.id}`;
    const method = mode === "create" ? "POST" : "PATCH";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleBlur}
              required
            />
          </div>
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="readingTime">Reading time</Label>
              <Input
                id="readingTime"
                value={readingTime}
                onChange={(e) => setReadingTime(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                className="flex h-11 w-full rounded-lg border border-border bg-surface px-3.5 text-sm text-foreground"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="font-semibold text-foreground">Related tool</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="relatedToolName">Name</Label>
              <Input
                id="relatedToolName"
                value={relatedToolName}
                onChange={(e) => setRelatedToolName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="relatedToolHref">Link</Label>
              <Input
                id="relatedToolHref"
                value={relatedToolHref}
                onChange={(e) => setRelatedToolHref(e.target.value)}
                placeholder="/calculators/emi-calculator"
                required
              />
            </div>
            <div>
              <Label htmlFor="relatedToolCta">Button text</Label>
              <Input
                id="relatedToolCta"
                value={relatedToolCta}
                onChange={(e) => setRelatedToolCta(e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Content</h2>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => addBlock("p")}>
                <Plus /> Paragraph
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => addBlock("h2")}>
                <Plus /> Heading
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => addBlock("ul")}>
                <Plus /> Bullet list
              </Button>
            </div>
          </div>

          {content.length === 0 && (
            <p className="text-sm text-muted-foreground">Add a paragraph, heading or bullet list block above.</p>
          )}

          <div className="space-y-3">
            {content.map((block, index) => (
              <div key={index} className="rounded-lg border border-border p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase text-muted-foreground">{block.type}</span>
                  <div className="flex gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => moveBlock(index, -1)}
                      disabled={index === 0}
                    >
                      <ArrowUp />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => moveBlock(index, 1)}
                      disabled={index === content.length - 1}
                    >
                      <ArrowDown />
                    </Button>
                    <Button type="button" variant="destructive" size="icon" onClick={() => removeBlock(index)}>
                      <Trash2 />
                    </Button>
                  </div>
                </div>

                {block.type === "ul" ? (
                  <div className="space-y-2">
                    {(block.items ?? []).map((item, itemIndex) => (
                      <div key={itemIndex} className="flex gap-2">
                        <Input
                          value={item}
                          onChange={(e) => {
                            const items = [...(block.items ?? [])];
                            items[itemIndex] = e.target.value;
                            updateBlock(index, { ...block, items });
                          }}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const items = (block.items ?? []).filter((_, i) => i !== itemIndex);
                            updateBlock(index, { ...block, items });
                          }}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => updateBlock(index, { ...block, items: [...(block.items ?? []), ""] })}
                    >
                      <Plus /> Item
                    </Button>
                  </div>
                ) : block.type === "h2" ? (
                  <Input
                    value={block.text ?? ""}
                    onChange={(e) => updateBlock(index, { ...block, text: e.target.value })}
                  />
                ) : (
                  <Textarea
                    value={block.text ?? ""}
                    onChange={(e) => updateBlock(index, { ...block, text: e.target.value })}
                    className="min-h-24"
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving…" : mode === "create" ? "Create post" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
