"use client";
import { useEffect, useRef, useState } from "react";
import { frappeFetch } from "../lib/frappe";

interface ServiceTag {
  label: string;
  dark: number;
  x_pos: string;
  y_pos: string;
  rotate: string;
  delay: string;
}

interface SiteSettings {
  stat_projects: string;
  stat_awards: string;
}

const DEFAULT_SERVICES: ServiceTag[] = [
  { label: "Platforms", dark: 0, x_pos: "0%", y_pos: "26%", rotate: "-5deg", delay: ".4s" },
  { label: "Data Services", dark: 1, x_pos: "48%", y_pos: "25%", rotate: "-6deg", delay: ".8s" },
];

export default function DemoSection() {
  const ref = useRef<HTMLElement>(null);
  const [services, setServices] = useState<ServiceTag[]>(DEFAULT_SERVICES);
  const [statProjects, setStatProjects] = useState("300+");
  const [statAwards, setStatAwards] = useState("16+");

  useEffect(() => {
    frappeFetch<ServiceTag[]>("krcs_dt_cms.dt_cms.api.get_services")
      .then(setServices)
      .catch(() => {/* keep static fallback */});
    frappeFetch<SiteSettings>("krcs_dt_cms.dt_cms.api.get_site_settings")
      .then((s) => {
        if (s.stat_projects) setStatProjects(s.stat_projects);
        if (s.stat_awards) setStatAwards(s.stat_awards);
      })
      .catch(() => {/* keep static fallback */});
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
    <section className="dm" id="demo" aria-label="Book a demo" ref={ref}>
      <div className="dbt rv">
        <a className="cb" href="#go">
          Book a demo
          <span className="ar">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
            </svg>
          </span>
        </a>
      </div>

      <div className="dg rv">
        {/* Services */}
        <div className="dc dsv">
          <h3>Services</h3>
          <div className="pa">
            {services.map((s) => (
              <span
                key={s.label}
                className={`pl${s.dark ? " k" : ""}`}
                style={{ "--x": s.x_pos, "--y": s.y_pos, "--r": s.rotate, "--d": s.delay } as React.CSSProperties}
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="dmid">
          <div className="dc ds k">
            <div className="n">{statProjects}</div>
            <p>projects completed across Kenya and the Greater Horn of Africa.</p>
          </div>
          <div className="dc ds w">
            <div className="n">{statAwards}</div>
            <p>awards received for our digital work.</p>
          </div>
        </div>

        {/* Quote */}
        <div className="dc dq">
          <div>
            <div className="qm">&ldquo;</div>
            <p className="q1">Deploying the Anticipatory Action framework helped our emergency units disburse emergency cash support before severe flooding displaced families in the Tana Delta.</p>
            <p className="q2">Zainab Hussein, Field Cash Assistance Officer, Humanitarian Cash Assistance Unit</p>
          </div>
          <div className="av2">
            <i>ZH</i>
          </div>
        </div>
      </div>
    </section>
  );
}
