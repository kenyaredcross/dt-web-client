"use client";
import { useEffect, useRef } from "react";

const PILLARS = [
  {
    num: "01",
    title: "Empowered People",
    desc: "KRCS staff and volunteers are supported in developing relevant data and digital skills, allowing them to work effectively with the tools and processes introduced in the digital transformation process.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    color: "#ED1C24",
  },
  {
    num: "02",
    title: "Inclusive Digital Systems Fit for Purpose",
    desc: "KRCS has adopted unified, suitable and user-friendly systems that improve operational efficiencies at HQ, region and branches, with processes to ensure ownership and inclusivity throughout the organisation.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
        <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
        <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
        <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/>
        <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/>
      </svg>
    ),
    color: "#c4a800",
  },
  {
    num: "03",
    title: "Enhanced Data & Digital Partnerships",
    desc: "KRCS applies its partnership model to attract key partners in data and digital: private sector, academia, civil society. KRCS is the partner of choice for other National Societies wanting to adopt its capacities.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    color: "#b84db8",
  },
  {
    num: "04",
    title: "Responsible Use of Data",
    desc: "KRCS has developed and implemented a body of policy that informs and shapes its digital transformation journey, ensuring all actions are grounded in humanitarian principles and cutting-edge data best practices.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    color: "#3a5bbf",
  },
  {
    num: "05",
    title: "Data & Digital Innovation for Humanitarian Action",
    desc: "KRCS drives data and digital innovation at HQ, regional and branch level. Flagship projects are developed, piloted and, where successful, adopted organisation-wide to support core humanitarian activities.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
        <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
      </svg>
    ),
    color: "#7a6bbf",
  },
  {
    num: "06",
    title: "Community-Centered Digital Transformation",
    desc: "KRCS transforms into a digitally enabled national society, accountable to communities, centering community needs in the design of all digital interventions and humanitarian actions.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    color: "#6aaa00",
  },
];

export default function PillarsSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.15 });
    section.querySelectorAll(".pl-row").forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <section className="pl-wrap" id="journey" ref={ref}>
      <div className="pl-head">
        <div className="eb">Strategic pillars · Digital Transformation</div>
        <h2>Our six pillars of digital transformation</h2>
        <p>The framework guiding Kenya Red Cross Society's journey from reactive relief to anticipatory, data-driven humanitarian action.</p>
      </div>

      <div className="pl-list">
        {PILLARS.map((p, i) => (
          <div className={`pl-row${i % 2 === 1 ? " pl-row-r" : ""}`} key={p.num}>
            {/* number spine */}
            <div className="pl-spine">
              <span className="pl-num" style={{ "--pc": p.color } as React.CSSProperties}>{p.num}</span>
              {i < PILLARS.length - 1 && <span className="pl-line" style={{ "--pc": p.color } as React.CSSProperties} />}
            </div>
            {/* card */}
            <article className="pl-card" style={{ "--pc": p.color } as React.CSSProperties}>
              <div className="pl-icon" style={{ background: p.color }}>
                {p.icon}
              </div>
              <div className="pl-body">
                <h3 className="pl-title">{p.title}</h3>
                <p className="pl-desc">{p.desc}</p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
