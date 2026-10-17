import { type Project } from "../data/content";
import Arrow from "./Arrow";

const BASE = process.env.NEXT_PUBLIC_FRAPPE_URL ?? "";

function initials(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export default function ProjectsPage({ projects }: { projects: Project[] }) {
  return (
    <div className="prj">
      {/* ── header ── */}
      <header className="prj-head">
        <div className="prj-head-text">
          <h1 className="prj-title">Projects we build.</h1>
          <p className="prj-intro">
            Platforms and tools built by the Digital Transformation Department to help Kenya Red Cross
            reach communities faster, in every county.
          </p>
          {projects.length > 0 && (
            <div className="prj-count">
              <b>{projects.length}</b> {projects.length === 1 ? "project" : "projects"}
            </div>
          )}
        </div>

        {/* floating abstract object */}
        <div className="prj-float" aria-hidden="true">
          <span className="prj-shape prj-shape-1" />
          <span className="prj-shape prj-shape-2" />
          <span className="prj-shape prj-shape-3" />
          <span className="prj-shape prj-shape-dot" />
        </div>
      </header>

      {/* ── feature rows ── */}
      {projects.length > 0 ? (
        <div className="prj-list">
          {projects.map((p, i) => (
            <a className="prj-row" href={`/projects/${p.s}`} key={p.s}>
              <div className="prj-media">
                {p.img
                  ? <img src={`${BASE}${p.img}`} alt={p.n} />
                  : <span className="prj-media-ini">{p.n.slice(0, 2).toUpperCase()}</span>}
                <span className="prj-index">{String(i + 1).padStart(2, "0")}</span>
              </div>

              <div className="prj-info">
                <h2 className="prj-name">{p.n}</h2>
                {p.sum && <p className="prj-sum">{p.sum}</p>}

                {p.tech && p.tech.length > 0 && (
                  <div className="prj-tech">
                    {p.tech.slice(0, 5).map((t) => (
                      <span className="prj-tech-tag" key={t}>{t}</span>
                    ))}
                    {p.tech.length > 5 && (
                      <span className="prj-tech-tag prj-tech-more">+{p.tech.length - 5}</span>
                    )}
                  </div>
                )}

                <div className="prj-foot">
                  {p.members && p.members.length > 0 && (
                    <div className="prj-avs">
                      {p.members.slice(0, 4).map((m) => (
                        <span className="prj-av" key={m.s} title={m.n}>{initials(m.n)}</span>
                      ))}
                      {p.members.length > 4 && (
                        <span className="prj-av prj-av-more">+{p.members.length - 4}</span>
                      )}
                    </div>
                  )}
                  <span className="prj-view">View project <Arrow /></span>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="prj-empty">No projects published yet.</p>
      )}
    </div>
  );
}
