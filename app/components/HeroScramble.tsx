"use client";
import { useEffect, useRef } from "react";

const PAIRS: [string, string][] = [
  ["MANUAL", "DATA-DRIVEN"],
  ["REACTIVE", "PROACTIVE"],
  ["ISOLATED", "CONNECTED"],
  ["SILOS", "COLLABORATION"],
];
const CH = "01#/<>_X$%";

export default function HeroScramble() {
  const aRef = useRef<HTMLSpanElement>(null);
  const bRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let k = 0;

    function scr(el: HTMLSpanElement, to: string, done?: () => void) {
      let f = 0;
      const n = to.length;
      const iv = setInterval(() => {
        f++;
        let o = "";
        for (let i = 0; i < n; i++) {
          o += i < f / 2 ? to[i] : CH[Math.floor(Math.random() * CH.length)];
        }
        el.textContent = o;
        if (f >= n * 2 + 2) {
          clearInterval(iv);
          el.textContent = to;
          done?.();
        }
      }, 40);
    }

    const iv = setInterval(() => {
      k = (k + 1) % PAIRS.length;
      if (aRef.current) scr(aRef.current, PAIRS[k][0]);
      if (bRef.current) scr(bRef.current, PAIRS[k][1]);
    }, 4200);

    return () => clearInterval(iv);
  }, []);

  return (
    <h1>
      <span className="ln">
        <b>From <span ref={aRef}>MANUAL</span></b>
      </span>
      <span className="ln">
        <b>to <span className="r" ref={bRef}>DATA-DRIVEN</span>.</b>
      </span>
    </h1>
  );
}
