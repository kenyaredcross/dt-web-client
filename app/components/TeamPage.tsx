"use client";
import { useEffect, useRef } from "react";
import { type TeamMember } from "../data/content";

const BASE = process.env.NEXT_PUBLIC_FRAPPE_URL ?? "";

// 7 fixed card slots matching the reference layout positions
const CARDS = [
  { w: 240, h: 300, l: "2%",   t: "10%", z: 2,  rot: -7,  depth: 12 },
  { w: 240, h: 300, l: "26%",  t: "4%",  z: 3,  rot:  3,  depth: 14 },
  { w: 240, h: 300, l: "54%",  t: "8%",  z: 4,  rot: -3,  depth: 10 },
  { w: 240, h: 300, l: "78%",  t: "14%", z: 5,  rot:  4,  depth:  8 },
];

const TP_BG  = ["#fde2e0", "#ececec", "var(--red)", "#0a0a0a"];
const TP_COL = ["#0a0a0a", "#0a0a0a", "#fff",       "#fff"];

function SocialIcon({ type }: { type: "linkedin" | "twitter" | "github" }) {
  if (type === "linkedin") return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
  if (type === "twitter") return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

export default function TeamPageView({ team }: { team: TeamMember[] }) {
  const heroRef   = useRef<HTMLElement>(null);
  const cardsRef  = useRef<(HTMLDivElement | null)[]>([]);
  const mxRef     = useRef(0);
  const myRef     = useRef(0);
  const txRef     = useRef(0);
  const tyRef     = useRef(0);
  const rafRef    = useRef<number>(0);

  // Assign team members to card slots, cycling if fewer than 7
  const cardMembers = CARDS.map((_, i) => team[i % Math.max(team.length, 1)] ?? null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Continuous float per card
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const rot = CARDS[i].rot;
      let t = 0;
      const speed = 3 + (i % 3) * 0.6;
      const amp   = 6 + (i % 3) * 4;
      const rotAmp = i % 2 === 0 ? 1.2 : -1.2;

      function tick() {
        t += 0.016 / speed;
        const dy = Math.sin(t * Math.PI * 2) * amp;
        const dr = Math.sin(t * Math.PI * 2) * rotAmp;
        const baseRot = rot + dr;
        if (!card) return;
        card.style.setProperty("--dy", `${dy}px`);
        card.style.setProperty("--dr", `${baseRot}deg`);
        card.style.setProperty("--brot", `${rot}deg`);
      }
      const iv = setInterval(tick, 16);
      return () => clearInterval(iv);
    });

    // Mouse parallax
    function onMove(e: MouseEvent) {
      if (!heroRef.current) return;
      const r = heroRef.current.getBoundingClientRect();
      mxRef.current = ((e.clientX - r.left) / r.width  - 0.5) * 2;
      myRef.current = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    }
    function onLeave() { mxRef.current = 0; myRef.current = 0; }

    heroRef.current?.addEventListener("mousemove", onMove);
    heroRef.current?.addEventListener("mouseleave", onLeave);

    function parallax() {
      txRef.current += (mxRef.current - txRef.current) * 0.05;
      tyRef.current += (myRef.current - tyRef.current) * 0.05;
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const d = CARDS[i].depth;
        card.style.setProperty("--px", `${txRef.current * d}px`);
        card.style.setProperty("--py", `${tyRef.current * d * 0.6}px`);
      });
      rafRef.current = requestAnimationFrame(parallax);
    }
    rafRef.current = requestAnimationFrame(parallax);

    return () => {
      heroRef.current?.removeEventListener("mousemove", onMove);
      heroRef.current?.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [team]);

  // 3D hover on cards
  function onCardMove(e: React.MouseEvent<HTMLDivElement>, i: number) {
    const card = cardsRef.current[i];
    if (!card) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width  - 0.5;
    const py = (e.clientY - r.top)  / r.height - 0.5;
    card.style.setProperty("--rx", `${-py * 14}deg`);
    card.style.setProperty("--ry", `${px  * 14}deg`);
    card.style.setProperty("--sc", "1.1");
  }
  function onCardLeave(i: number) {
    const card = cardsRef.current[i];
    if (!card) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--sc", "1");
  }

  return (
    <div className="tp-page">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="tp-hero" ref={heroRef}>
        {/* floating cards */}
        <div className="tp-cards-row" aria-hidden="true">
          {CARDS.map((slot, i) => {
            const m = cardMembers[i];
            const hasPhoto = !!(m?.photo);
            return (
              <div
                key={i}
                ref={el => { cardsRef.current[i] = el; }}
                className="tp-pcard"
                style={{
                  width:  slot.w,
                  height: slot.h,
                  left:   slot.l,
                  top:    slot.t,
                  zIndex: slot.z,
                  "--rot": `${slot.rot}deg`,
                } as React.CSSProperties}
                onMouseMove={e => onCardMove(e, i)}
                onMouseLeave={() => onCardLeave(i)}
              >
                {hasPhoto
                  ? <img src={`${BASE}${m!.photo}`} alt={m!.n} />
                  : (
                    <div
                      className="tp-pcard-ini"
                      style={{ background: TP_BG[i % TP_BG.length], color: TP_COL[i % TP_COL.length] }}
                    >
                      {m?.i ?? "KR"}
                    </div>
                  )
                }
              </div>
            );
          })}
        </div>

        {/* giant bottom text */}
        <div className="tp-listen-wrap">
          <h2 className="tp-listen">The DT Team</h2>
        </div>

        <p className="tp-description">
          Technology is built by people. Meet the engineers, data experts and product leads behind Kenya Red Cross&apos;s digital transformation work.
        </p>
      </section>

      {/* ── TEAM GRID ─────────────────────────────────────── */}
      <section className="tp-members">
        <h2 className="tp-ep-h2">The people<br />building it.</h2>

        {team.length > 0 ? (
          <div className="tp-ep-grid">
            {team.map((m, i) => {
              const bg  = TP_BG[i  % TP_BG.length];
              const col = TP_COL[i % TP_COL.length];
              return (
                <a className="tp-pc" href={`/team/${m.s}`} key={m.s}>
                  <div className="tp-pc-img" style={{ background: bg, color: col }}>
                    {m.photo
                      ? <img src={`${BASE}${m.photo}`} alt={m.n} />
                      : <span className="tp-pc-ini">{m.i}</span>
                    }
                  </div>
                  <div className="tp-pc-foot">
                    <h3 className="tp-pc-name">{m.n}</h3>
                    <p className="tp-pc-role">{m.r}</p>
                    {m.b && <p className="tp-pc-bio">{m.b}</p>}
                  </div>
                </a>
              );
            })}
          </div>
        ) : null}
      </section>

      {/* ── DARK CTA ──────────────────────────────────────── */}
      <section className="tp-cta-wrap">
        <div className="tp-cta-inner">
          <h2>Work with us.<br /><em>Build for humanity.</em></h2>
          <p>We&apos;re building digital tools that reach communities across all 47 counties. If you want to apply technology to some of the world&apos;s most meaningful problems, we&apos;d love to hear from you.</p>
          <div className="tp-cta-links">
            <span className="tp-cta-lbl">Also visit</span>
            <a className="tp-cta-pill" href="https://www.redcross.or.ke" target="_blank" rel="noopener">Kenya Red Cross</a>
            <a className="tp-cta-pill" href="/blog">Our Work</a>
            <a className="tp-cta-pill" href="/">Home</a>
          </div>
        </div>
      </section>
    </div>
  );
}
