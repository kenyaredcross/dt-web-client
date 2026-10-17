import { type TeamMember } from "../data/content";
import { CL } from "../data/content";
import Arrow from "./Arrow";

const BASE = process.env.NEXT_PUBLIC_FRAPPE_URL ?? "";

const TP_BG  = ["#fde2e0", "#ececec", "var(--red)", "#0a0a0a"];
const TP_COL = ["#0a0a0a", "#0a0a0a", "#fff",       "#fff"];

function initials(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

// derive a short "@handle" from a social profile URL
function handle(url: string): string {
  try {
    const path = new URL(url).pathname.replace(/\/+$/, "");
    const last = path.split("/").filter(Boolean).pop();
    return last ? `@${last}` : url;
  } catch {
    return url;
  }
}

function SocialIcon({ type }: { type: "email" | "linkedin" | "twitter" | "github" }) {
  if (type === "email") return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
  if (type === "linkedin") return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
  if (type === "twitter") return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

export default function TeamMemberDetail({ member: m, allTeam }: { member: TeamMember; allTeam: TeamMember[] }) {
  const idx = allTeam.findIndex(t => t.s === m.s);
  const bg  = TP_BG[idx  % TP_BG.length];
  const col = TP_COL[idx % TP_COL.length];

  // random 3 teammates (reshuffled on every server render)
  const others = [...allTeam.filter(t => t.s !== m.s)]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const projectCount = m.projects?.length ?? 0;
  const postCount = m.posts?.length ?? 0;

  return (
    <div className="tmd-page">
      {/* breadcrumb */}
      <div className="tmd-crumb">
        <a href="/">Home</a>
        <span>/</span>
        <a href="/team">Team</a>
        <span>/</span>
        <span>{m.n}</span>
      </div>

      <div className="tmd-layout">
        {/* ── sticky sidebar ─────────────────────────────── */}
        <aside className="tmd-aside">
          <div className="tmd-aside-inner">
            <div className="tmd-card">
              <div className="tmd-photo" style={{ background: bg, color: col }}>
                {m.photo
                  ? <img src={`${BASE}${m.photo}`} alt={m.n} />
                  : <span className="tmd-ini">{m.i}</span>
                }
              </div>

              <div className="tmd-card-body">
                <h1 className="tmd-name">{m.n}</h1>
                <p className="tmd-role">{m.r}</p>

                {(m.email || m.linkedin || m.twitter || m.github) && (
                  <div className="tmd-contact">
                    <div className="tmd-contact-label">Connect</div>
                    {m.email && (
                      <a className="tmd-link" href={`mailto:${m.email}`}>
                        <span className="tmd-link-ic"><SocialIcon type="email" /></span>
                        <span className="tmd-link-meta">
                          <b>Email</b>
                          <em>{m.email}</em>
                        </span>
                        <span className="tmd-link-ar">↗</span>
                      </a>
                    )}
                    {m.linkedin && (
                      <a className="tmd-link" href={m.linkedin} target="_blank" rel="noopener">
                        <span className="tmd-link-ic"><SocialIcon type="linkedin" /></span>
                        <span className="tmd-link-meta">
                          <b>LinkedIn</b>
                          <em>{handle(m.linkedin)}</em>
                        </span>
                        <span className="tmd-link-ar">↗</span>
                      </a>
                    )}
                    {m.twitter && (
                      <a className="tmd-link" href={m.twitter} target="_blank" rel="noopener">
                        <span className="tmd-link-ic"><SocialIcon type="twitter" /></span>
                        <span className="tmd-link-meta">
                          <b>X / Twitter</b>
                          <em>{handle(m.twitter)}</em>
                        </span>
                        <span className="tmd-link-ar">↗</span>
                      </a>
                    )}
                    {m.github && (
                      <a className="tmd-link" href={m.github} target="_blank" rel="noopener">
                        <span className="tmd-link-ic"><SocialIcon type="github" /></span>
                        <span className="tmd-link-meta">
                          <b>GitHub</b>
                          <em>{handle(m.github)}</em>
                        </span>
                        <span className="tmd-link-ar">↗</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            <a className="tmd-back btn" href="/team"><Arrow dir="left" /> Back to team</a>
          </div>
        </aside>

        {/* ── scrolling content ──────────────────────────── */}
        <div className="tmd-main">
          {m.b && (
            <section className="tmd-block">
              <div className="tmd-label">About</div>
              <p className="tmd-bio">{m.b}</p>
            </section>
          )}

          {m.t.length > 0 && (
            <section className="tmd-block">
              <div className="tmd-label">Skills</div>
              <div className="tmd-tags">
                {m.t.map(tag => <span key={tag}>{tag}</span>)}
              </div>
            </section>
          )}

          {m.projects && m.projects.length > 0 && (
            <section className="tmd-block">
              <div className="tmd-label">Projects <span className="tmd-count">{projectCount}</span></div>
              <div className="tmd-projs">
                {m.projects.map((p) => (
                  <a className="tmd-proj" href={`/projects/${p.s}`} key={p.s}>
                    <div className="tmd-proj-thumb">
                      {p.img
                        ? <img src={`${BASE}${p.img}`} alt={p.n} />
                        : <span>{p.n.slice(0, 2).toUpperCase()}</span>
                      }
                    </div>

                    <div className="tmd-proj-body">
                      <div className="tmd-proj-top">
                        <h3 className="tmd-proj-name">{p.n}</h3>
                        {p.status && (
                          <span className={`tmd-proj-status s-${p.status.toLowerCase()}`}>
                            {p.status}
                          </span>
                        )}
                      </div>
                      {p.sum && <p className="tmd-proj-sum">{p.sum}</p>}

                      <div className="tmd-proj-meta">
                        {p.members && p.members.length > 0 && (
                          <div className="tmd-proj-avs">
                            {p.members.slice(0, 4).map((mem) => (
                              <span className="tmd-proj-av" key={mem.s} title={mem.n}>
                                {initials(mem.n)}
                              </span>
                            ))}
                            {p.members.length > 4 && (
                              <span className="tmd-proj-av tmd-proj-av-more">
                                +{p.members.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                        {p.live && <span className="tmd-proj-tag">Live</span>}
                        {p.repo && <span className="tmd-proj-tag">Repo</span>}
                      </div>
                    </div>

                    <span className="tmd-proj-ar"><Arrow /></span>
                  </a>
                ))}
              </div>
            </section>
          )}

          {m.posts && m.posts.length > 0 && (
            <section className="tmd-block">
              <div className="tmd-label">Writing <span className="tmd-count">{postCount}</span></div>
              <div className="tmd-writing">
                {m.posts.map((post, i) => (
                  <a className="tmd-art" href={`/blog/${post.s}`} key={post.s}>
                    <span className="tmd-art-num mono">{String(i + 1).padStart(2, "0")}</span>

                    <div className="tmd-art-body">
                      <div className="tmd-art-tags">
                        <span className={`tmd-art-cat ${post.c}`}>{CL[post.c]}</span>
                        {post.k && <span className="tmd-art-label">{post.k}</span>}
                        {post.f && <span className="ftag">FEATURED</span>}
                      </div>
                      <h3 className="tmd-art-name">{post.n}</h3>
                      {post.d && <p className="tmd-art-sum">{post.d}</p>}
                    </div>

                    <span className="tmd-art-read">
                      Read <span className="tmd-art-ar"><Arrow /></span>
                    </span>
                  </a>
                ))}
              </div>
            </section>
          )}

          {others.length > 0 && (
            <section className="tmd-block">
              <div className="tmd-label">More from the team</div>
              <div className="tmd-grid">
                {others.map((o) => {
                  const obg  = TP_BG[allTeam.findIndex(t => t.s === o.s)  % TP_BG.length];
                  const ocol = TP_COL[allTeam.findIndex(t => t.s === o.s) % TP_COL.length];
                  return (
                    <a className="tp-pc" href={`/team/${o.s}`} key={o.s}>
                      <div className="tp-pc-img" style={{ background: obg, color: ocol }}>
                        {o.photo
                          ? <img src={`${BASE}${o.photo}`} alt={o.n} />
                          : <span className="tp-pc-ini">{o.i}</span>
                        }
                      </div>
                      <div className="tp-pc-foot">
                        <h3 className="tp-pc-name">{o.n}</h3>
                        <p className="tp-pc-role">{o.r}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
