import { ImageResponse } from "next/og";
import { frappeFetch } from "../../lib/frappe";
import { type Post } from "../../data/content";

export const runtime = "nodejs";
export const alt = "Kenya Red Cross Digital Transformation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function toDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const mime = res.headers.get("content-type") ?? "image/jpeg";
    return `data:${mime};base64,${Buffer.from(buf).toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await frappeFetch<Post>("krcs_dt_cms.dt_cms.api.get_post", { slug }).catch(() => null);

  const title = post?.n ?? "Kenya Red Cross Digital Transformation";
  const desc = post?.d ?? "Stories from the field.";
  const category = post?.k ?? "Blog";

  const imgData = post?.img
    ? await toDataUrl(`${process.env.NEXT_PUBLIC_FRAPPE_URL}${post.img}`)
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          background: "#0a0a0a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Cover image background */}
        {imgData && (
          <img
            src={imgData}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.25 }}
          />
        )}

        {/* Red top bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: "#ED1C24", display: "flex" }} />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "60px 72px", height: "100%", position: "relative" }}>
          {/* Category tag */}
          <div style={{
            display: "flex",
            background: "#ED1C24",
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "6px 14px",
            borderRadius: 6,
            marginBottom: 24,
            width: "fit-content",
          }}>
            {category}
          </div>

          {/* Title */}
          <div style={{
            color: "#fff",
            fontSize: title.length > 60 ? 42 : 52,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: 20,
            maxWidth: 900,
          }}>
            {title}
          </div>

          {/* Description */}
          <div style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: 20,
            lineHeight: 1.5,
            maxWidth: 780,
            marginBottom: 40,
          }}>
            {desc.length > 120 ? desc.slice(0, 120) + "…" : desc}
          </div>

          {/* Footer */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#ED1C24",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 14,
              fontWeight: 800,
            }}>KR</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 16 }}>
              Kenya Red Cross · Digital Transformation
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
