"use client";
import { useEffect, useRef, useState } from "react";
import { type TeamMember } from "../data/content";
import { frappeFetch } from "../lib/frappe";
import Arrow from "./Arrow";

const BASE = process.env.NEXT_PUBLIC_FRAPPE_URL ?? ""

export default function TeamSection() {
  const [active, setActive] = useState(0);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    frappeFetch<TeamMember[]>("krcs_dt_cms.dt_cms.api.get_team")
      .then(setTeam)
      .catch(() => setTeam([]))
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.25 });
    section.querySelectorAll(".rv").forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <section className="sec" id="team" ref={ref}>
      <div className="sh">
        <h2 className="rv">Meet the team</h2>
        <p className="rv">Technology is built by people. Meet the software engineers, data scientists, GIS experts, and field operational leads behind our digital work.</p>
      </div>

      {loaded && team.length === 0 && (
        <div className="empty rv">
          <div className="empty-ic" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h3>Team coming soon</h3>
          <p>The people behind our digital work will be introduced here shortly.</p>
        </div>
      )}

      <div className="ta rv" id="ta" hidden={loaded && team.length === 0}>
        {team.slice(0, 4).map((m, i) => (
          <article
            key={m.s}
            className={`tp${i === active ? " on" : ""}${m.photo ? " has-photo" : ""}`}
            tabIndex={0}
            role="button"
            aria-expanded={i === active}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            onFocus={() => setActive(i)}
            style={m.photo ? {
              backgroundImage: `url(${BASE}${m.photo})`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
            } : undefined}
          >
            <div className="ini">{m.i}</div>
            <div className="vn">{m.n}</div>
            <div className="inf">
              <h3>{m.n}</h3>
              <div className="rl">{m.r}</div>
              <div className="chs">
                {m.t.map((tag) => <span className="ch" key={tag}>{tag}</span>)}
              </div>
              <a className="pr" href="/team">View on the team page <Arrow /></a>
            </div>
          </article>
        ))}
      </div>

      {team.length > 0 && (
        <div className="dbt rv" style={{ marginTop: 40 }}>
          <a className="cb" href="/team">
            Meet the full team
            <span className="ar"><Arrow /></span>
          </a>
        </div>
      )}
    </section>
  );
}
