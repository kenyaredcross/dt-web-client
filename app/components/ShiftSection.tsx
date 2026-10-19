"use client";
import { useEffect, useRef } from "react";
import Arrow from "./Arrow";

const ROWS = [
  ["Paper forms", "Mobile data capture"],
  ["Phone-tree alerts", "Instant early warnings"],
  ["Manual volunteer lists", "Digital volunteer network"],
  ["Cash and receipts", "Traceable mobile giving"],
  ["Weeks to report", "Live situation dashboards"],
];

export default function ShiftSection() {
  const ref = useRef<HTMLElement>(null);

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
      <h2 className="rv">How we serve differently</h2>
      <div className="rv">
        {ROWS.map(([from, to]) => (
          <div className="row" key={from}>
            <s>{from}</s>
            <span className="ar"><Arrow /></span>
            <span>{to}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
