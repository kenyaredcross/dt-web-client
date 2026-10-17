"use client";
import { useEffect } from "react";

export default function HeroParallax() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const hero = document.querySelector(".hero") as HTMLElement | null;
    const acs = document.querySelectorAll<HTMLElement>(".ac");
    let mx = 0, my = 0, tx = 0, ty = 0;

    if (hero) {
      const onMove = (e: PointerEvent) => {
        const r = hero.getBoundingClientRect();
        mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        my = ((e.clientY - r.top) / r.height - 0.5) * 2;
      };
      const onLeave = () => { mx = my = 0; };
      hero.addEventListener("pointermove", onMove);
      hero.addEventListener("pointerleave", onLeave);

      let rafId = 0;
      function par() {
        tx += (mx - tx) * 0.06;
        ty += (my - ty) * 0.06;
        acs.forEach((a, i) => {
          const d = 10 + (i % 3) * 6;
          a.style.translate = `${tx * d}px ${ty * d}px`;
        });
        rafId = requestAnimationFrame(par);
      }
      rafId = requestAnimationFrame(par);

      return () => {
        cancelAnimationFrame(rafId);
        hero.removeEventListener("pointermove", onMove);
        hero.removeEventListener("pointerleave", onLeave);
      };
    }
  }, []);

  return null;
}
