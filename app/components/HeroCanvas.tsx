"use client";
import { useEffect, useRef } from "react";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const x = cv.getContext("2d");
    if (!x) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    type Particle = { gx: number; gy: number; x: number; y: number; vx: number; vy: number };
    let W = 0, H = 0;
    let P: Particle[] = [];
    const m = { x: -999, y: -999 };
    let rafId = 0;

    function cs(n: string) {
      return getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    }

    function init() {
      const d = Math.min(devicePixelRatio || 1, 2);
      W = cv!.clientWidth;
      H = cv!.clientHeight;
      cv!.width = W * d;
      cv!.height = H * d;
      x!.setTransform(d, 0, 0, d, 0, 0);
      P = [];
      const g = Math.max(38, Math.round(W / 26));
      const cols = Math.ceil(W / g);
      const rows = Math.ceil(H / g);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          P.push({ gx: (i + 0.5) * g, gy: (j + 0.5) * g, x: 0, y: 0, vx: Math.random() - 0.5, vy: Math.random() - 0.5 });
        }
      }
    }

    function draw(now: number) {
      const ink = cs("--ink");
      const red = cs("--red");
      x!.clearRect(0, 0, W, H);
      for (const p of P) {
        let tx = p.gx + Math.sin(now / 900 + p.gy) * 3;
        let ty = p.gy + Math.cos(now / 900 + p.gx) * 3;
        const dx = tx - m.x, dy = ty - m.y;
        const dd = Math.sqrt(dx * dx + dy * dy);
        if (dd < 120) { tx += (dx / dd) * (120 - dd) * 0.4; ty += (dy / dd) * (120 - dd) * 0.4; }
        p.x += (tx - p.x) * 0.12;
        p.y += (ty - p.y) * 0.12;
      }
      x!.globalAlpha = 1;
      for (let i = 0; i < P.length; i++) {
        const p = P[i];
        const md = Math.hypot(p.x - m.x, p.y - m.y);
        const hot = (i % 9 === 0) || md < 140;
        x!.fillStyle = hot ? red : ink;
        x!.globalAlpha = hot ? 1 : 0.35;
        const r = md < 140 ? 2 + (140 - md) / 35 : (hot ? 3 : 2);
        x!.fillRect(p.x - r / 2, p.y - r / 2, r, r);
      }
      x!.globalAlpha = 1;
      if (!reduce) rafId = requestAnimationFrame(draw);
    }

    const parent = cv.parentNode as HTMLElement;
    const onMove = (ev: PointerEvent) => {
      const r = cv!.getBoundingClientRect();
      m.x = ev.clientX - r.left;
      m.y = ev.clientY - r.top;
    };
    const onLeave = () => { m.x = m.y = -999; };

    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", init);
    init();
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", init);
    };
  }, []);

  return <canvas ref={canvasRef} id="c" aria-hidden="true" />;
}
