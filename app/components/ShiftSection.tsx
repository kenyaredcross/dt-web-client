"use client";
import { useEffect, useRef, useState } from "react";
import Arrow from "./Arrow";

const ROWS = [
  {
    from: "Traditional Manual-Based",
    to: "Data-Driven Decisions",
    body: "Utilize real-time data to inform KRCS's interventions and ensure they are appropriate and effective.",
  },
  {
    from: "Reactive",
    to: "Proactive",
    body: "Strengthen disaster preparedness and anticipatory action by utilizing digital tools for risk mapping, early warning systems, and community mobilization.",
  },
  {
    from: "Isolated Relief",
    to: "Connected Communities",
    body: "Enhance communication channels through mobile apps, social media outreach, and digital volunteer management tools, fostering stronger connections with communities before, during, and after disasters.",
  },
  {
    from: "Siloed Operations",
    to: "Collaborative Response",
    body: "Empower cross-departmental collaboration through digital platforms for real-time information sharing and coordinated response efforts.",
  },
  {
    from: "Generic Tools",
    to: "Localized Solutions",
    body: "Develop and/or adopt culturally appropriate digital tools and programs that meet the specific needs of vulnerable communities.",
  },
];

export default function ShiftSection() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.25 });
    el.querySelectorAll(".rv").forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <section id="shift" ref={ref}>
      <h2 className="rv">Priority outcomes for a digitally transformed Kenya Red Cross</h2>
      <div className="rv">
        {ROWS.map(({ from, to, body }, i) => (
          <div
            className={`row${open === i ? " on open" : ""}`}
            key={from}
            role="button"
            tabIndex={0}
            onClick={() => setOpen(open === i ? null : i)}
            onKeyDown={(e) => e.key === "Enter" && setOpen(open === i ? null : i)}
          >
            <s>{from}</s>
            <span className="ar"><Arrow /></span>
            <span className="row-to">{to}</span>
            <span className="row-body">{body}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
