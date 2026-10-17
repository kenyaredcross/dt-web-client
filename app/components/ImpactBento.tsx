"use client";
import { useEffect, useRef } from "react";

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const elRef = useRef<HTMLDivElement>(null);
  const ranRef = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el || ranRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { el.textContent = target + suffix; ranRef.current = true; return; }
    const start = performance.now();
    function frame(now: number) {
      const p = Math.min(Math.max((now - start) / 1800, 0), 1);
      el!.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    ranRef.current = true;
  }, [target, suffix]);

  return <div className="num" ref={elRef}>0</div>;
}

export default function ImpactBento() {
  const sectionRef = useRef<HTMLElement>(null);
  const didCount = useRef(false);
  const [counted, setCountedState] = [false, (v: boolean) => { didCount.current = v; }];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.25 });
    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bento" id="impact" ref={sectionRef}>
      <div className="bgrid">
        <div className="bc red" style={{ "--i": 0 } as React.CSSProperties}>
          <svg className="wv" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true">
            <g stroke="#fff" strokeWidth="1" fill="none">
              <path d="M0 15 Q50 0,100 15 T200 15" />
              <path d="M0 30 Q50 15,100 30 T200 30" />
              <path d="M0 45 Q50 30,100 45 T200 45" />
              <path d="M0 60 Q50 45,100 60 T200 60" />
              <path d="M0 75 Q50 60,100 75 T200 75" />
              <path d="M0 90 Q50 75,100 90 T200 90" />
            </g>
          </svg>
          <div>
            <div className="arw">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
              </svg>
            </div>
            <div className="lbl">Our mission: put the right help in the right place, faster.</div>
          </div>
        </div>

        <div className="bc gry" style={{ "--i": 1 } as React.CSSProperties}>
          <CountUp target={47} suffix="" />
          <div className="lbl">counties in one connected network</div>
        </div>

        <div className="bc blk" style={{ "--i": 2 } as React.CSSProperties}>
          <svg className="ecg" viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true">
            <path pathLength="600" d="M0 60 H70 L85 60 L95 20 L110 90 L122 45 L132 60 H190 L205 60 L215 30 L228 75 L238 60 H300" fill="none" stroke="#FF3B30" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
          <div className="lbl">Response pulse, from every branch to headquarters</div>
        </div>

        <div className="bc gry" style={{ "--i": 3 } as React.CSSProperties}>
          <CountUp target={100} suffix="k+" />
          <div className="lbl">lives impacted</div>
        </div>
      </div>
    </section>
  );
}
