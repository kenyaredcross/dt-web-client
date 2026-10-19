"use client";
import { useEffect, useRef } from "react";

const PILLARS = [
  {
    num: "01",
    title: "Empowered People",
    desc: "KRCS staff and volunteers are supported in developing relevant data and digital skills, allowing them to work effectively with the tools and processes introduced in the digital transformation process.",
    icon: (
      /* Raised fist / empowerment — filled bold style */
      <svg width="26" height="26" viewBox="0 0 32 32" fill="currentColor">
        <path d="M10 6a2 2 0 0 1 2-2h.5a2 2 0 0 1 2 2v5h-4.5V6zM15.5 4a2 2 0 0 1 2-2h.5a2 2 0 0 1 2 2v7h-4.5V4zM21 6a2 2 0 0 1 2-2h.5a2 2 0 0 1 2 2v6.5c0 .3-.02.58-.05.86L21 11V6zM8 10a2 2 0 0 1 2-2h.5v5.5L8 12V10zM7 14l1.5 1.5c.9.9 2.1 1.5 3.5 1.5h5a5 5 0 0 0 5-5V12h.5a2 2 0 0 1 2 2v2a9 9 0 0 1-9 9H13a7 7 0 0 1-7-7v-3.5L7 14z"/>
        <rect x="4" y="24" width="14" height="4" rx="2"/>
      </svg>
    ),
    color: "#ED1C24",
    hero: true,
  },
  {
    num: "02",
    title: "Inclusive Digital Systems Fit for Purpose",
    desc: "KRCS has adopted unified, suitable and user-friendly systems that improve operational efficiencies at HQ, region and branches, with processes to ensure ownership and inclusivity throughout the organisation.",
    icon: (
      /* Layered stack / systems — filled */
      <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 3L2 10l14 7 14-7L16 3z"/>
        <path d="M2 16l14 7 14-7-2.8-1.4L16 20 4.8 14.6 2 16z" opacity=".75"/>
        <path d="M2 22l14 7 14-7-2.8-1.4L16 26 4.8 20.6 2 22z" opacity=".45"/>
      </svg>
    ),
    color: "#c4870a",
  },
  {
    num: "03",
    title: "Enhanced Data and Digital Partnerships",
    desc: "KRCS applies its partnership model to attract key partners in data and digital: private sector, academia, civil society.",
    icon: (
      /* Handshake / partnership — filled bold */
      <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor">
        <path d="M2 10h5l4 4h2l3-3h3l5 3 2-2-6-4h-4l-2 2h-1L10 8H2v2z"/>
        <path d="M30 10h-3l-2 2-5-3h-4l-3 3H11l-4-4H2v2l8 8 4-4h1l3 3h5l6-4v-2z" opacity=".6"/>
        <path d="M11 20l-9-9v3l8 8 1-2zM21 20l9-9v3l-8 8-1-2z" opacity=".4"/>
      </svg>
    ),
    color: "#7b3fbf",
  },
  {
    num: "04",
    title: "Responsible Use of Data",
    desc: "KRCS has developed and implemented a body of policy that informs its digital transformation journey, ensuring all actions are grounded in humanitarian principles.",
    icon: (
      /* Shield with checkmark — filled */
      <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 2L4 7v9c0 7.18 5.15 13.9 12 15.93C23.85 29.9 29 23.18 29 16V7L16 2z" opacity=".25"/>
        <path d="M16 4L6 8.5V16c0 5.85 4.2 11.35 10 12.93C21.8 27.35 26 21.85 26 16V8.5L16 4z"/>
        <path d="M11.5 15.5l3 3 6-6" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "#1a4db8",
  },
  {
    num: "05",
    title: "Data and Digital Innovation for Humanitarian Action",
    desc: "KRCS drives data and digital innovation at HQ, regional and branch level. Flagship projects are developed, piloted and adopted organisation-wide.",
    icon: (
      /* Rocket / innovation — filled */
      <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 2c0 0-8 6-8 14v1l3 3h1c0-4 1.5-7.5 4-10 2.5 2.5 4 6 4 10h1l3-3v-1c0-8-8-14-8-14z"/>
        <path d="M13 19v7l3 2 3-2v-7c-1 .65-2 1-3 1s-2-.35-3-1z" opacity=".7"/>
        <circle cx="9" cy="21" r="3" opacity=".5"/>
        <circle cx="23" cy="21" r="3" opacity=".5"/>
      </svg>
    ),
    color: "#0e8a6e",
  },
  {
    num: "06",
    title: "Community-Centered Digital Transformation",
    desc: "KRCS transforms into a digitally enabled national society, accountable to communities, centering community needs in the design of all digital interventions.",
    icon: (
      /* People network / community — filled */
      <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor">
        <circle cx="16" cy="8" r="4"/>
        <path d="M10 20c0-3.31 2.69-6 6-6s6 2.69 6 6v2H10v-2z"/>
        <circle cx="5" cy="13" r="3" opacity=".7"/>
        <path d="M0 23c0-2.76 2.24-5 5-5 1.1 0 2.12.36 2.94.96A8 8 0 0 0 8 22v1H0v-1z" opacity=".7"/>
        <circle cx="27" cy="13" r="3" opacity=".7"/>
        <path d="M32 23c0-2.76-2.24-5-5-5-1.1 0-2.12.36-2.94.96A8 8 0 0 1 24 22v1h8v-1z" opacity=".7"/>
      </svg>
    ),
    color: "#3a7d1e",
  },
];

export default function PillarsSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.1 });
    section.querySelectorAll(".pl-tile").forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <section className="pl-wrap" id="journey" ref={ref}>
      <div className="pl-head">
        <div className="eb">Strategic pillars · Digital Transformation</div>
        <h2>Our six pillars of digital transformation</h2>
        <p>The framework guiding Kenya Red Cross Society's journey from reactive relief to anticipatory, data-driven humanitarian action.</p>
      </div>

      <div className="pl-bento">
        {PILLARS.map((p, i) => (
          <div
            key={p.num}
            className={`pl-tile${p.hero ? " pl-tile-hero" : " pl-tile-sm"}`}
            style={{ "--pc": p.color, "--i": i } as React.CSSProperties}
          >
            {p.hero && <span className="pl-tile-num" aria-hidden="true">{p.num}</span>}
            <div className="pl-tile-icon">{p.icon}</div>
            <div>
              {!p.hero && <div className="pl-tile-num">{p.num}</div>}
              <h3 className="pl-tile-title">{p.title}</h3>
              <p className="pl-tile-desc">{p.desc}</p>
            </div>
            <span className="pl-tile-bg" aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}
