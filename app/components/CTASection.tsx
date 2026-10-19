"use client";
import { useEffect, useRef } from "react";

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);

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
    <section className="cs" id="go" ref={ref}>
      <div className="ci rv">
        <h2>
          Humanity, powered by digital.
        </h2>
        <div className="cr">
          <p>Partner with the Digital Transformation Department to bring faster, smarter help to every community we serve.</p>
          <a className="cb" href="#">
            Partner with us
            <span className="ar">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
