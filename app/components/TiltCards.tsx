"use client";
import { useEffect } from "react";

export default function TiltCards() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const cards = document.querySelectorAll<HTMLElement>(".bc,.wc,.tc,.pc,.dc,.tl");
    const cleanup: (() => void)[] = [];
    cards.forEach((c) => {
      const onMove = (e: PointerEvent) => {
        const r = c.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = `perspective(900px) rotateX(${-py * 8}deg) rotateY(${px * 8}deg) translateY(-10px)`;
      };
      const onLeave = () => { c.style.transform = ""; };
      c.addEventListener("pointermove", onMove);
      c.addEventListener("pointerleave", onLeave);
      cleanup.push(() => {
        c.removeEventListener("pointermove", onMove);
        c.removeEventListener("pointerleave", onLeave);
      });
    });
    return () => cleanup.forEach((fn) => fn());
  }, []);
  return null;
}
