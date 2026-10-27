"use client";
import { useEffect, useRef, useState } from "react";
import { CL, IC, type Post } from "../data/content";
import { frappeFetch } from "../lib/frappe";
import Arrow from "./Arrow";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Stories", value: "story" },
  { label: "Field notes", value: "field" },
  { label: "Tech", value: "tech" },
] as const;

export default function BlogSection() {
  const [filter, setFilter] = useState<string>("all");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loaded, setLoaded] = useState(false);
  const blRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const visible = posts.filter((p) => filter === "all" || p.c === filter);

  useEffect(() => {
    frappeFetch<Post[]>("krcs_dt_cms.dt_cms.api.get_posts")
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.25 });
    section.querySelectorAll(".rv").forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const bl = blRef.current;
    const pi = progRef.current;
    if (!bl || !pi) return;
    const onScroll = () => {
      const max = bl.scrollWidth - bl.clientWidth;
      pi.style.width = (20 + 80 * (max > 0 ? bl.scrollLeft / max : 0)) + "%";
    };
    bl.addEventListener("scroll", onScroll, { passive: true });
    return () => bl.removeEventListener("scroll", onScroll);
  }, []);

  function scrollBy(d: number) {
    const bl = blRef.current;
    if (!bl) return;
    const card = bl.querySelector<HTMLElement>(".br");
    const w = card ? card.offsetWidth + 20 : 320;
    bl.scrollBy({ left: d * w, behavior: "smooth" });
  }

  return (
    <section className="sec" id="blog" ref={sectionRef}>
      <div className="sh">
        <h2 className="rv">From the blog</h2>
        {posts.length > 0 && (
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <div className="bf" role="group" aria-label="Filter posts">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  className={filter === f.value ? "on" : ""}
                  onClick={() => setFilter(f.value)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="bnav">
              <button aria-label="Previous stories" onClick={() => scrollBy(-1)}><Arrow dir="left" /></button>
              <button aria-label="Next stories" onClick={() => scrollBy(1)}><Arrow /></button>
            </div>
          </div>
        )}
      </div>

      {loaded && posts.length === 0 && (
        <div className="empty rv">
          <div className="empty-ic" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <h3>No stories yet</h3>
          <p>Field notes and engineering stories from the Digital Transformation Department will appear here soon.</p>
        </div>
      )}

      <div className="bl rv" ref={blRef} hidden={loaded && posts.length === 0}>
        {posts.map((p, i) => (
          <a
            key={p.s}
            className={`br vacard${filter !== "all" && p.c !== filter ? " hid" : ""}`}
            href={`/blog/${p.s}`}
            data-t={p.c}
            style={{ "--i": i } as React.CSSProperties}
          >
            <div className="vfh">
              <div className="va">KR</div>
              <div>
                <div className="vby2"><b>KENYA RED CROSS DIGITAL</b></div>
                <div className="vsub">{p.k}</div>
              </div>
            </div>
            <p className="sf"><b>{p.n}.</b> {p.d}</p>
            <div className={`vimg ${p.c}`}>
              {p.img
                ? <img src={`${process.env.NEXT_PUBLIC_FRAPPE_URL}${p.img}`} alt={p.n} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <span dangerouslySetInnerHTML={{ __html: IC[p.c] }} />}
            </div>
            <div className="vacard-foot">
              <span className="ul">Read the story</span>
            </div>
          </a>
        ))}
      </div>


      {posts.length > 0 && (
        <div className="dbt rv" style={{ marginTop: 40 }}>
          <a className="cb" href="/blog">
            View all posts
            <span className="ar"><Arrow /></span>
          </a>
        </div>
      )}
    </section>
  );
}
