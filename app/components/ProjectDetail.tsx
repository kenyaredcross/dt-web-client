import { type Project } from "../data/content";
import { CL } from "../data/content";
import Arrow from "./Arrow";

const BASE = process.env.NEXT_PUBLIC_FRAPPE_URL ?? "";

function initials(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export default function ProjectDetail({ project: p }: { project: Project }) {
  const hasLinks = !!(p.live || p.repo);

  return (
    <div className="pd">
      {/* breadcrumb */}
      <div className="pd-crumb">
        <a href="/">Home</a>
        <Arrow />
        <a href="/projects">Projects</a>
        <Arrow />
        <span>{p.n}</span>
      </div>

      {/* ── hero banner ── */}
      <header className={`pd-hero${p.img ? " has-img" : ""}`}>
        {p.img && <img className="pd-hero-bg" src={`${BASE}${p.img}`} alt="" aria-hidden="true" />}
        <div className="pd-hero-inner">
          <h1 className="pd-title">{p.n}</h1>
          {p.sum && <p className="pd-sum">{p.sum}</p>}

          {hasLinks && (
            <div className="pd-actions">
              {p.live && (
                <a className="pd-btn pd-btn-primary" href={p.live} target="_blank" rel="noopener">
                  Visit live site <Arrow />
                </a>
              )}
              {p.repo && (
                <a className="pd-btn" href={p.repo} target="_blank" rel="noopener">
                  View repository
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      {/* ── body: description + sidebar ── */}
      <div className="pd-body">
        <div className="pd-main">
          {p.description
            ? <div className="pd-rte rte" dangerouslySetInnerHTML={{ __html: p.description }} />
            : <p className="pd-rte">{p.sum}</p>}

           {/* ── case study sections ── */}
      {p.sections && p.sections.length > 0 && (
        <section className="pd-case">
          {p.sections.map((s, i) => (
            <article className="pd-case-row" key={i}>
              <div className="pd-case-eyebrow">
                <span className="pd-case-num">{String(i + 1).padStart(2, "0")}</span>
                {s.eyebrow && <span className="pd-case-tag">{s.eyebrow}</span>}
              </div>
              <div className="pd-case-content">
                <h2 className="pd-case-head">{s.heading}</h2>
                <p className="pd-case-body">{s.body}</p>
              </div>
            </article>
          ))}
        </section>
      )}

      {/* ── related writing ── */}
      {p.posts && p.posts.length > 0 && (
        <section className="pd-rel">
          <h2 className="pd-rel-head">Related writing</h2>
          <div className="pd-rel-grid">
            {p.posts.map((post) => (
              <a className="pd-rel-card" href={`/blog/${post.s}`} key={post.s}>
                <span className={`pd-rel-cat ${post.c}`}>{CL[post.c]}</span>
                <h3 className="pd-rel-title">{post.n}</h3>
                {post.d && <p className="pd-rel-ex">{post.d}</p>}
                <span className="pd-rel-read">Read <Arrow /></span>
              </a>
            ))}
          </div>
        </section>
      )}
        </div>

        <aside className="pd-side">
          {p.members.length > 0 && (
            <div className="pd-side-block">
              <div className="pd-side-lbl">Team</div>
              <div className="pd-team">
                {p.members.map((m) => (
                  <a className="pd-member" href={`/team/${m.s}`} key={m.s}>
                    <span className="pd-member-av">{initials(m.n)}</span>
                    <span className="pd-member-meta">
                      <b>{m.n}</b>
                      {m.role && <em>{m.role}</em>}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {p.tech && p.tech.length > 0 && (
            <div className="pd-side-block">
              <div className="pd-side-lbl">Tech stack</div>
              <div className="pd-tech">
                {p.tech.map((t) => <span className="pd-tech-tag" key={t}>{t}</span>)}
              </div>
            </div>
          )}

          {p.partners && p.partners.length > 0 && (
            <div className="pd-side-block">
              <div className="pd-side-lbl">Partners & Collaborators</div>
              <div className="pd-partners">
                {p.partners.map((pt, i) => (
                  pt.url
                    ? <a className="pd-partner" href={pt.url} target="_blank" rel="noopener" key={i}>
                        <span className="pd-partner-name">{pt.n}</span>
                        {pt.type && <span className="pd-partner-type">{pt.type}</span>}
                      </a>
                    : <div className="pd-partner" key={i}>
                        <span className="pd-partner-name">{pt.n}</span>
                        {pt.type && <span className="pd-partner-type">{pt.type}</span>}
                      </div>
                ))}
              </div>
            </div>
          )}

          <a className="pd-back" href="/projects"><Arrow dir="left" /> All projects</a>
        </aside>
      </div>

     
    </div>
  );
}
