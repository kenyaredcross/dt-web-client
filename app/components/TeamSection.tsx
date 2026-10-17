"use client";
import { useEffect, useRef, useState } from "react";
import { type TeamMember } from "../data/content";
import { frappeFetch } from "../lib/frappe";
import Arrow from "./Arrow";

export default function TeamSection() {
  const [active, setActive] = useState(0);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    frappeFetch<TeamMember[]>("krcs_dt_cms.dt_cms.api.get_team")
      .then(setTeam)
      .catch(() => setTeam([]));
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
        <h2 className="rv">Meet the <em>team</em></h2>
        <p className="rv">Technology is built by people. Meet the software engineers, data scientists, GIS experts, and field operational leads behind our digital work.</p>
      </div>

      <div className="ta rv" id="ta">
        {team.slice(0, 4).map((m, i) => (
          <article
            key={m.s}
            className={`tp${i === active ? " on" : ""}`}
            tabIndex={0}
            role="button"
            aria-expanded={i === active}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <div className="ini">{m.i}</div>
            <div className="vn">{m.n}</div>
            <div className="inf">
              <h3>{m.n}</h3>
              <div className="rl">{m.r}</div>
              <p>{m.b}</p>
              <div className="chs">
                {m.t.map((tag) => <span className="ch" key={tag}>{tag}</span>)}
              </div>
              <a className="pr" href="/team">View on the team page <Arrow /></a>
            </div>
          </article>
        ))}
      </div>

      <div className="dbt rv" style={{ marginTop: 40 }}>
        <a className="cb" href="/team">
          Meet the full team
          <span className="ar"><Arrow /></span>
        </a>
      </div>
    </section>
  );
}
