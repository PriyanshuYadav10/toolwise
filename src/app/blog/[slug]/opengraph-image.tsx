import { ImageResponse } from "next/og";
import { getPublishedBlogPost } from "@/lib/db/blog-queries";
import { getCategory } from "@/lib/data/categories";

export const alt = "Toolwise Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT_GRADIENTS = {
  primary: "linear-gradient(135deg, #2f4bd6 0%, #1f36a8 100%)",
  accent: "linear-gradient(135deg, #2fa8d6 0%, #1c6e8f 100%)",
  success: "linear-gradient(135deg, #22a55e 0%, #157a41 100%)",
  warning: "linear-gradient(135deg, #d69a2f 0%, #a86e1f 100%)",
} as const;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedBlogPost(slug);
  const cat = post?.category ? getCategory(post.category) : undefined;
  const gradient = ACCENT_GRADIENTS[cat?.accent ?? "primary"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundImage: gradient,
          color: "#ffffff",
          fontFamily: "sans-serif",
          padding: 64,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 28, opacity: 0.85 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "rgba(255,255,255,0.15)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
            </svg>
          </div>
          Toolwise Blog
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {cat && (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                fontSize: 22,
                padding: "6px 16px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.18)",
                marginBottom: 20,
              }}
            >
              {cat.name}
            </div>
          )}
          <div style={{ display: "flex", fontSize: 56, fontWeight: 700, lineHeight: 1.2, maxWidth: 1000 }}>
            {post?.title ?? "Toolwise Blog"}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
