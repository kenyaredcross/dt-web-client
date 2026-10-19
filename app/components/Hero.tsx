import HeroCanvas from "./HeroCanvas";
import HeroScramble from "./HeroScramble";
import HeroParallax from "./HeroParallax";
import Arrow from "./Arrow";

export default function Hero() {
  return (
    <header className="hero">
      <HeroCanvas />

      {/* Floating accent bubbles */}

      {/* Main content */}
      <div className="in">
        <HeroScramble />
        <p className="fu" style={{ animationDelay: ".6s" }}>
          The Digital Transformation Department is connecting people, data and technology so Kenya Red Cross can reach communities faster, in every county.
        </p>
        <div className="cta fu" style={{ animationDelay: ".8s" }}>
          <a className="btn dk" href="#go">Our digital roadmap <Arrow /></a>
        </div>


      </div>

      {/* Node diagram */}
      <div className="rc" aria-hidden="true">
        <svg className="lines" viewBox="0 0 600 600" preserveAspectRatio="none">
          <path className="lp" pathLength="1" style={{ "--i": 0 } as React.CSSProperties} d="M 300 240 Q 300 120 150 120" />
          <path className="lp" pathLength="1" style={{ "--i": 1 } as React.CSSProperties} d="M 300 240 Q 300 120 450 120" />
          <path className="lp" pathLength="1" style={{ "--i": 2 } as React.CSSProperties} d="M 300 240 L 300 60" />
          <path className="lp" pathLength="1" style={{ "--i": 3 } as React.CSSProperties} d="M 210 270 Q 150 270 120 270" />
          <path className="lp" pathLength="1" style={{ "--i": 4 } as React.CSSProperties} d="M 390 270 Q 450 270 480 270" />
          <path className="lp" pathLength="1" style={{ "--i": 5 } as React.CSSProperties} d="M 300 300 Q 300 420 160 420" />
          <path className="lp" pathLength="1" style={{ "--i": 6 } as React.CSSProperties} d="M 300 300 Q 300 420 440 420" />
          <path className="lp" pathLength="1" style={{ "--i": 7 } as React.CSSProperties} d="M 200 450 Q 200 520 300 520" />
          <path className="lp" pathLength="1" style={{ "--i": 8 } as React.CSSProperties} d="M 400 450 Q 400 520 300 520" />
        </svg>
        <div className="nc p1" style={{ "--i": 0 } as React.CSSProperties}><div className="nd dk sm"><svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg></div></div>
        <div className="nc p2" style={{ "--i": 1 } as React.CSSProperties}><div className="nd pk md"><svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg></div></div>
        <div className="nc p3 alt" style={{ "--i": 2 } as React.CSSProperties}><div className="nd rd md2"><svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div></div>
        <div className="nc p4 alt" style={{ "--i": 3 } as React.CSSProperties}><div className="nd gy md"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.9" /><path d="M16 3.1a4 4 0 0 1 0 7.8" /></svg></div></div>
        <div className="nc p5" style={{ "--i": 4 } as React.CSSProperties}><div className="nd dk lg"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="6" height="6"/><rect x="4" y="4" width="16" height="16" rx="2"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/></svg></div></div>
        <div className="nc p6" style={{ "--i": 5 } as React.CSSProperties}><div className="nd pk md"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div></div>
        <div className="nc p7 alt" style={{ "--i": 6 } as React.CSSProperties}><div className="nd rd md2"><svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg></div></div>
        <div className="nc p8" style={{ "--i": 7 } as React.CSSProperties}><div className="nd dk sm"><svg viewBox="0 0 24 24"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /><path d="M13 13l6 6" /></svg></div></div>
        <div className="nc p9" style={{ "--i": 8 } as React.CSSProperties}><div className="nd gy md"><svg viewBox="0 0 24 24"><line x1="7" y1="20" x2="7" y2="14" /><line x1="12" y1="20" x2="12" y2="10" /><line x1="17" y1="20" x2="17" y2="6" /></svg></div></div>
        <div className="nc p10 alt" style={{ "--i": 9 } as React.CSSProperties}><div className="nd dk sm"><svg viewBox="0 0 24 24"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg></div></div>
        <div className="nc p11 alt" style={{ "--i": 10 } as React.CSSProperties}><div className="nd pk md2"><svg viewBox="0 0 24 24"><path d="M18 10h-1.3A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></svg></div></div>
      </div>

      <HeroParallax />
    </header>
  );
}
