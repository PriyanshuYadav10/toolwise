import { ImageResponse } from "next/og";

export const alt = "Toolwise — Simple, Fast & Free Online Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "linear-gradient(135deg, #2f4bd6 0%, #1f36a8 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 72,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 88,
              height: 88,
              borderRadius: 20,
              background: "rgba(255,255,255,0.15)",
            }}
          >
            <svg width="44" height="44" viewBox="0 0 24 24" fill="white">
              <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
            </svg>
          </div>
          Toolwise
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 32, opacity: 0.9 }}>
          Simple, fast &amp; free online tools
        </div>
        <div style={{ display: "flex", marginTop: 12, fontSize: 22, opacity: 0.7 }}>
          A product by GrainZap
        </div>
      </div>
    ),
    { ...size }
  );
}
