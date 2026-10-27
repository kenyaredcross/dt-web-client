"use client";
import { useState } from "react";
import Arrow from "./Arrow";

const INQUIRY_TYPES = [
  "Book a Demo",
  "Partnership",
  "Media & Press",
  "Tech Collaboration",
  "General",
];

type State = "idle" | "loading" | "success" | "error";

const BASE = process.env.NEXT_PUBLIC_FRAPPE_URL ?? "http://localhost:8001";

const HEADINGS: Record<string, string> = {
  "Book a Demo": "Book a demo",
  "Partnership": "Explore a partnership",
  "Media & Press": "Media enquiry",
  "Tech Collaboration": "Build with us",
  "General": "Get in touch",
};

const PLACEHOLDERS: Record<string, string> = {
  "Book a Demo": "Tell us what you'd like to see — which tools, which use case, your team size…",
  "Partnership": "Describe the partnership you have in mind…",
  "Media & Press": "What story are you working on, and your deadline?",
  "Tech Collaboration": "What are you building, and how can we collaborate?",
  "General": "How can the Digital Transformation team help you?",
};

export default function ContactPage() {
  const [type, setType] = useState("General");
  const [state, setState] = useState<State>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("loading");
    try {
      const url = new URL("/api/method/krcs_dt_cms.dt_cms.api.submit_inquiry", BASE);
      url.searchParams.set("full_name", fd.get("full_name") as string);
      url.searchParams.set("email", fd.get("email") as string);
      url.searchParams.set("organisation", (fd.get("organisation") as string) || "");
      url.searchParams.set("inquiry_type", fd.get("inquiry_type") as string);
      url.searchParams.set("message", fd.get("message") as string);
      const res = await fetch(url.toString(), { method: "POST", headers: { "Expect": "" } });
      if (!res.ok) throw new Error("failed");
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="cx">
      <div className="vwm" aria-hidden="true">Contact<span>.</span></div>

      {/* floating abstract object */}
      <div className="cx-float" aria-hidden="true">
        <span className="prj-shape prj-shape-1" />
        <span className="prj-shape prj-shape-2" />
        <span className="prj-shape prj-shape-3" />
        <span className="prj-shape prj-shape-dot" />
      </div>

      <div className="cx-in">
        {/* header */}
        <header className="cx-head">
          <span className="prj-eyebrow">Let&apos;s talk</span>
          <h1 className="cx-title">Humanity,<br /><em>powered by digital.</em></h1>
          <p className="cx-lead">
            Partner with the Digital Transformation Department to bring faster, smarter
            help to every community we serve.
          </p>
        </header>

        {state === "success" ? (
          <div className="cx-success">
            <div className="cx-success-mark">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2>We&apos;ve got your message.</h2>
            <p>Someone from the DT team will be in touch shortly.</p>
            <a className="cb" href="/">
              Back to home
              <span className="ar">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </a>
          </div>
        ) : (
          <div className="cx-grid">
            {/* left — the form card (dark, like .ci) */}
            <form className="cx-card" onSubmit={handleSubmit} noValidate>
              <input type="hidden" name="inquiry_type" value={type} />

              <div className="cx-tabs" role="group" aria-label="What's this about?">
                {INQUIRY_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`cx-tab${type === t ? " on" : ""}`}
                    onClick={() => setType(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <h2 className="cx-card-h">{HEADINGS[type]}</h2>

              <div className="cx-row">
                <label className="cx-field">
                  <span>Full name</span>
                  <input name="full_name" type="text" placeholder="Henry Dunant" required />
                </label>
                <label className="cx-field">
                  <span>Email</span>
                  <input name="email" type="email" placeholder="henry@organisation.org" required />
                </label>
              </div>

              <label className="cx-field">
                <span>Organisation <i>(optional)</i></span>
                <input name="organisation" type="text" placeholder="Your organisation or company" />
              </label>

              <label className="cx-field">
                <span>Message</span>
                <textarea name="message" rows={5} placeholder={PLACEHOLDERS[type]} required />
              </label>

              {state === "error" && (
                <p className="cx-err">Something went wrong — please try again, or email us directly.</p>
              )}

              <button className="cb cx-submit" type="submit" disabled={state === "loading"}>
                {state === "loading" ? "Sending…" : "Send message"}
                <span className="ar">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </button>
            </form>

            {/* right — contact details */}
            <aside className="cx-side">
              <div className="cx-side-block">
                <span className="cx-side-lbl">Email</span>
                <a href="mailto:digital@redcross.or.ke">digital@redcross.or.ke</a>
              </div>
              <div className="cx-side-block">
                <span className="cx-side-lbl">Organisation</span>
                <span>Kenya Red Cross Society</span>
              </div>
              <div className="cx-side-block">
                <span className="cx-side-lbl">Location</span>
                <span>South C, Nairobi, Kenya</span>
              </div>
              <div className="cx-side-block">
                <span className="cx-side-lbl">Elsewhere</span>
                <a href="https://www.redcross.or.ke" target="_blank" rel="noopener">redcross.or.ke</a>
                <a href="https://twitter.com/KenyaRedCross" target="_blank" rel="noopener">Twitter / X</a>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
