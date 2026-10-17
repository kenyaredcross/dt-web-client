"use client";
import { useEffect, useRef, useState } from "react";
import { CL, IC, type Post } from "../data/content";
import Arrow from "./Arrow";

function initials(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "DT";
}

export default function BlogPostPageView({ post, allPosts }: { post: Post; allPosts: Post[] }) {
  const progRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const prog = progRef.current;
    if (!prog) return;
    const onScroll = () => {
      const d = document.documentElement;
      prog.style.width = (d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight) * 100) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const wordCount = post.b.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.round(wordCount / 200));
  const others = allPosts.filter((p) => p.s !== post.s);

  function copyLink() {
    try { navigator.clipboard.writeText(location.href); }
    catch { /* noop */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <article className="vg">
      <div className="vpr" ref={progRef} />
      <div className="vk">
        <a href="/blog">Blog</a>
        <span>/</span>
        <a href="/blog">{CL[post.c]}</a>
      </div>
      <h1 className="vt">{post.n}</h1>
      <p className="vd">{post.d}</p>

      <div className="vby">
        <div className="vav">{post.author ? initials(post.author.n) : "DT"}</div>
        <div>
          <div className="vn2">
            By{" "}
            {post.author
              ? <a href={`/team/${post.author.s}`}><b>{post.author.n}</b></a>
              : <b>Digital Transformation Department</b>}
          </div>
          <div className="vm2 mono">KENYA RED CROSS · {readTime} MIN READ</div>
        </div>
        <div className="vsh">
          <button onClick={copyLink}>{copied ? "Copied!" : "Copy link"}</button>
        </div>
      </div>

      <figure className="vf">
        {post.img
          ? <img src={`${process.env.NEXT_PUBLIC_FRAPPE_URL}${post.img}`} alt={post.n} className="hb-img" />
          : <div className={`hb ${post.c}`} dangerouslySetInnerHTML={{ __html: IC[post.c] }} />
        }
        <figcaption className="mono">{post.img ? "PHOTO" : "ILLUSTRATION"} · {post.k}</figcaption>
      </figure>

      <div className="vb">
        <aside className="vl">
          <div className="mono">FILED UNDER</div>
          <b>{CL[post.c]}</b>
          <div className="mono">{readTime} MIN READ</div>
          <a className="pr" href="/blog"><Arrow dir="left" /> All posts</a>
        </aside>

        <div className="vc rte" dangerouslySetInnerHTML={{ __html: post.b }} />

        <aside className="vr">
          <h4>More stories</h4>
          <ol>
            {others.slice(0, 4).map((p, i) => (
              <li key={p.s}>
                <a href={`/blog/${p.s}`}>
                  <b>{i + 1}</b>
                  <span>{p.n}</span>
                </a>
              </li>
            ))}
          </ol>
        </aside>
      </div>

      {((post.contributors && post.contributors.length > 0) ||
        (post.projects && post.projects.length > 0)) && (
        <section className="vcx">
          {post.contributors && post.contributors.length > 0 && (
            <>
              <h3 className="vcx-head">People involved</h3>
              <div className="vcx-people">
                {post.contributors.map((c) => {
                  const ppl = post.people?.find((x) => (c.s ? x.s === c.s : x.n === c.n));
                  const inner = (
                    <>
                      <span className="vcx-av">
                        {ppl?.photo
                          ? <img src={`${process.env.NEXT_PUBLIC_FRAPPE_URL}${ppl.photo}`} alt={c.n} />
                          : <span className="vcx-ini">{ppl?.i || initials(c.n)}</span>}
                      </span>
                      <span className="vcx-name">{c.n}</span>
                      {c.role && <span className="vcx-role">{c.role}</span>}
                      {!c.s && <span className="vcx-tag">Guest</span>}
                    </>
                  );
                  return c.s
                    ? <a className="vcx-person" href={`/team/${c.s}`} key={c.s}>{inner}</a>
                    : <div className="vcx-person vcx-person-static" key={c.n}>{inner}</div>;
                })}
              </div>
            </>
          )}

          {post.projects && post.projects.length > 0 && (
            <div className="vcx-proj-row">
              <span className="vcx-proj-lbl">Related projects</span>
              {post.projects.map((p) => (
                <a className="vcx-proj" href={`/projects/${p.s}`} key={p.s}>
                  {p.n}
                  <span className="vcx-proj-ar"><Arrow /></span>
                </a>
              ))}
            </div>
          )}
        </section>
      )}

      <section className="vm">
        <h3>Keep reading</h3>
        <div className="kr-grid">
          {others.slice(0, 3).map((p) => (
            <a className="kr-card" href={`/blog/${p.s}`} key={p.s}>
              <div className="kr-top">
                <span className={`kr-cat ${p.c}`}>{CL[p.c]}</span>
                {p.f && <span className="ftag">FEATURED</span>}
              </div>
              <h4 className="kr-title">{p.n}</h4>
              <p className="kr-ex">{p.d}</p>
              <div className="kr-foot">
                {p.people && p.people.length > 0 && (
                  <div className="pavs">
                    {p.people.slice(0, 4).map((person) => (
                      <span className="pav" key={person.s || person.n} title={person.n}>
                        {person.photo
                          ? <img src={`${process.env.NEXT_PUBLIC_FRAPPE_URL}${person.photo}`} alt={person.n} />
                          : <span className="pav-ini">{person.i}</span>}
                      </span>
                    ))}
                    {p.people.length > 4 && <span className="pav pav-more">+{p.people.length - 4}</span>}
                  </div>
                )}
                <span className="kr-read">Read <Arrow /></span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </article>
  );
}
