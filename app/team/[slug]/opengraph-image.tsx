import { ImageResponse } from "next/og";
import { frappeFetch } from "../../lib/frappe";
import { type TeamMember } from "../../data/content";

export const runtime = "nodejs";
export const alt = "Kenya Red Cross Digital Transformation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = await frappeFetch<TeamMember>("krcs_dt_cms.dt_cms.api.get_team_member", { slug }).catch(() => null);

  const name = member?.n ?? "Kenya Red Cross";
  const role = member?.r ?? "Digital Transformation Team";
  const initials = member?.i ?? "KR";
  const photoUrl = member?.photo ? `${process.env.NEXT_PUBLIC_FRAPPE_URL}${member.photo}` : null;
  const skills = member?.t?.slice(0, 4) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          background: "#0a0a0a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Red top bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: "#ED1C24", display: "flex" }} />

        {/* Left — avatar */}
        <div style={{
          width: 420,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#161616",
          flexShrink: 0,
        }}>
          {photoUrl ? (
            <img
              src={photoUrl}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div style={{
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: "#ED1C24",
              color: "#fff",
              fontSize: 64,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              {initials}
            </div>
          )}
        </div>

        {/* Right — info */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 72px 60px 60px",
        }}>
          {/* Team label */}
          <div style={{
            color: "#ED1C24",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}>
            Kenya Red Cross · Digital Transformation
          </div>

          {/* Name */}
          <div style={{
            color: "#fff",
            fontSize: name.length > 20 ? 52 : 64,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: 16,
          }}>
            {name}
          </div>

          {/* Role */}
          <div style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: 22,
            marginBottom: 36,
          }}>
            {role}
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {skills.map((tag) => (
                <div key={tag} style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 14,
                  fontWeight: 600,
                  padding: "6px 14px",
                  borderRadius: 6,
                }}>
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
