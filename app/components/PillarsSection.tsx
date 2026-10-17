"use client";
import { useEffect, useRef } from "react";

const PILLARS = [
  {
    num: "PILLAR 01",
    title: "Digital Systems",
    desc: "We support the development and adoption of digital systems that are accessible, usable and aligned with organisational needs.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <circle cx="11" cy="11" r="7" /><line x1="16" y1="16" x2="21" y2="21" />
      </svg>
    ),
    dark: false,
  },
  {
    num: "PILLAR 02",
    title: "Data & Analytics",
    desc: "We promote responsible data management and the use of data to support informed decision-making.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    dark: true,
  },
  {
    num: "PILLAR 03",
    title: "Innovation",
    desc: "We encourage the exploration, testing and adoption of digital approaches that can help address humanitarian challenges.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 14 15 20 7" /><polyline points="20 13 20 7 14 7" />
      </svg>
    ),
    dark: false,
  },
];

export default function PillarsSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const grid = section.querySelector("#wfg");
    const io = new IntersectionObserver((es) => {
      es.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.25 });
    section.querySelectorAll(".rv").forEach((e) => io.observe(e));
    if (grid) io.observe(grid);
    return () => io.disconnect();
  }, []);

  return (
    <section className="wf" id="journey" ref={ref}>
      <div className="wfh">
        <div>
          <div className="eb">What we do · Three pillars</div>
          <h2 className="rv">From reactive relief to <em>anticipatory resilience</em></h2>
        </div>
        <p className="rv">Building digital systems, analytics, skills, innovation, community engagement, partnerships, and open resources for humanitarian transformation.</p>
      </div>
      <div className="wfg" id="wfg">
        {PILLARS.map((p, i) => (
          <article className={`wc${p.dark ? " dk" : ""}`} style={{ "--i": i } as React.CSSProperties} key={p.num}>
            <div className="ic">{p.icon}</div>
            <div className="sn">{p.num}</div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
