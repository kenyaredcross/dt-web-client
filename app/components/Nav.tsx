"use client";
import { useState, useEffect } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  // lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <nav className="dt-nav">
      <a className="bk" href="/">
        <img className="bk-logo" src="/krcs-logo.png" alt="Kenya Red Cross" />
        <b>Digital Transformation <i>DT.</i></b>
      </a>

      <div className="nl">
        <a href="/blog">Blog</a>
        <a href="/projects">Projects</a>
        <a href="/team">Team</a>
      </div>

      <a className="btn nav-cta" href="/contact" style={{ padding: "10px 20px", fontSize: "14px" }}>
        Contact
      </a>

      {/* hamburger — mobile only */}
      <button
        className={`nav-burger${open ? " on" : ""}`}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>

      {/* mobile drawer */}
      <div className={`nav-drawer${open ? " on" : ""}`}>
        <a href="/blog" onClick={() => setOpen(false)}>Blog</a>
        <a href="/projects" onClick={() => setOpen(false)}>Projects</a>
        <a href="/team" onClick={() => setOpen(false)}>Team</a>
        <a className="nav-drawer-cta" href="/contact" onClick={() => setOpen(false)}>Contact</a>
      </div>

      {/* backdrop */}
      <div
        className={`nav-scrim${open ? " on" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
    </nav>
  );
}
