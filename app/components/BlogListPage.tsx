"use client";
import { useState } from "react";
import { CL, IC, type Post, type Voice } from "../data/content";

const POST_TABS = [
  { label: "All", value: "all" },
  { label: "Stories", value: "story" },
  { label: "Field notes", value: "field" },
  { label: "Tech", value: "tech" },
] as const;

type TopTab = "posts" | "voices";
export default function BlogListPage({ posts, voices }: { posts: Post[]; voices: Voice[] }) {
  const [topTab, setTopTab] = useState<TopTab>("posts");
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const matched = posts.filter((p) => {
    const text = (p.n + " " + p.d + " " + CL[p.c]).toLowerCase();
    return (filter === "all" || p.c === filter) && (!query || text.includes(query));
  });

  // Hero block prefers featured posts; top up with the rest only if featured
  // don't fill the lead + 4-up list. Stable order preserved within each group.
  const filtered = [...matched.filter((p) => p.f), ...matched.filter((p) => !p.f)];

  const lead = filtered[0];
  const rest = filtered.slice(1);
  const visible = rest.slice(0, 4);

  return (
    <div className="vx" id="vx">
      <div className="vwm" aria-hidden="true">Stories<span>.</span></div>
      <div className="vin">

        {/* Nav bar */}
        <div className="vnav">
          <span>
            <button className={topTab === "posts" ? "on" : ""} onClick={() => setTopTab("posts")}>
              Stories
            </button>
          </span>
          <span>
            <i>/</i>
            <button className={topTab === "voices" ? "on" : ""} onClick={() => setTopTab("voices")}>
              Field Voices
            </button>
          </span>
          {topTab === "posts" && POST_TABS.map((t) => (
            <span key={t.value}>
              <i>/</i>
              <button
                className={filter === t.value ? "on" : ""}
                onClick={() => setFilter(t.value)}
              >
                {t.label}
              </button>
            </span>
          ))}
          {topTab === "posts" && (
            <label className="vsr">
              <span className="sr">Search stories</span>
              <input
                id="vq"
                type="search"
                placeholder="Search stories"
                value={query}
                onChange={(e) => setQuery(e.target.value.trim().toLowerCase())}
              />
            </label>
          )}
        </div>

        {/* ── POSTS TAB ── */}
        {topTab === "posts" && (
          <>
            <div className="vhlayout">
              {/* Left — featured hero */}
              <div className="vhleft">
                {lead ? (
                  <>
                    <a className="vhr" href={`/blog/${lead.s}`}>
                      <div className={`vhi ${lead.c}`}>
                        {lead.img
                          ? <img src={`${process.env.NEXT_PUBLIC_FRAPPE_URL}${lead.img}`} alt={lead.n} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
                          : <span dangerouslySetInnerHTML={{ __html: IC[lead.c] }} />}
                      </div>
                      <h3 className="vht">{lead.n}</h3>
                    </a>
                    <p className="vdk">{lead.d}</p>
                    {lead.author && (
                      <p className="vppl">
                        By <a href={`/team/${lead.author.s}`}>{lead.author.n}</a>
                      </p>
                    )}
                    {lead.contributors && lead.contributors.length > 0 && (
                      <div className="vppl-box">
                        <div className="vppl-lbl">People involved</div>
                        <div className="vppl-chips">
                          {lead.contributors.map((c) => {
                            const ppl = lead.people?.find((x) => (c.s ? x.s === c.s : x.n === c.n));
                            const ini = (ppl?.i) || c.n.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
                            const inner = (
                              <>
                                <span className="vppl-av">
                                  {ppl?.photo
                                    ? <img src={`${process.env.NEXT_PUBLIC_FRAPPE_URL}${ppl.photo}`} alt={c.n} />
                                    : <span className="vppl-ini">{ini}</span>}
                                </span>
                                <span className="vppl-meta">
                                  <b>{c.n}</b>
                                  {c.role && <em>{c.role}</em>}
                                </span>
                              </>
                            );
                            return c.s
                              ? <a className="vppl-chip" href={`/team/${c.s}`} key={c.s}>{inner}</a>
                              : <span className="vppl-chip vppl-chip-static" key={c.n}>{inner}</span>;
                          })}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="vdk" style={{ marginLeft: 0 }}>No stories match your search.</p>
                )}
              </div>

              {/* Right — remaining posts list */}
              <div className="vhright">
                {visible.length > 0 && (
                  <div className="vst" style={{ marginTop: 0 }}>
                    {visible.map((p) => (
                      <a className="vs" href={`/blog/${p.s}`} key={p.s}>
                        <div className={`vtn ${p.c}`}>
                          {p.img
                            ? <img src={`${process.env.NEXT_PUBLIC_FRAPPE_URL}${p.img}`} alt={p.n} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            : <span dangerouslySetInnerHTML={{ __html: IC[p.c] }} />}
                        </div>
                        <div>
                          <span className="vtg">{p.k}</span>
                          {p.f && <span className="ftag">FEATURED</span>}
                          <h3>{p.n}</h3>
                          <div className="vby2">
                            <b>{CL[p.c]}</b>
                            {p.people && p.people.length > 0 && (
                              <span className="pavs pavs-sm">
                                {p.people.slice(0, 4).map((person) => (
                                  <span className="pav" key={person.s || person.n} title={person.n}>
                                    {person.photo
                                      ? <img src={`${process.env.NEXT_PUBLIC_FRAPPE_URL}${person.photo}`} alt={person.n} />
                                      : <span className="pav-ini">{person.i}</span>
                                    }
                                  </span>
                                ))}
                                {p.people.length > 4 && (
                                  <span className="pav pav-more">+{p.people.length - 4}</span>
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Article cards row below */}
            {posts.length > 0 && (
              <div className="varow">
                {posts.map((p) => (
                  <a className="vacard" href={`/blog/${p.s}`} key={p.s}>
                    <div className="vfh">
                      <div className="va">KR</div>
                      <div>
                        <div className="vby2"><b>KENYA RED CROSS DIGITAL</b></div>
                        <div className="vsub">{p.k}</div>
                      </div>
                    </div>
                    <p className="sf"><b>{p.n}.</b> {p.d}</p>
                    <div className={`vimg ${p.c}`} dangerouslySetInnerHTML={{ __html: IC[p.c] }} />
                    <div className="vacard-foot">
                      {p.people && p.people.length > 0 && (
                        <div className="pavs">
                          {p.people.slice(0, 4).map((person) => (
                            <span className="pav" key={person.s || person.n} title={person.n}>
                              {person.photo
                                ? <img src={`${process.env.NEXT_PUBLIC_FRAPPE_URL}${person.photo}`} alt={person.n} />
                                : <span className="pav-ini">{person.i}</span>
                              }
                            </span>
                          ))}
                          {p.people.length > 4 && (
                            <span className="pav pav-more">+{p.people.length - 4}</span>
                          )}
                        </div>
                      )}
                      <span className="ul">Read the story</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── FIELD VOICES TAB ── */}
        {topTab === "voices" && (
          <div className="vsec" style={{ marginTop: 32 }}>
            <h2>Field voices <span>/ What frontline teams say about our digital solutions.</span></h2>
            <div className="vcols">
              {voices[0] && (
                <div className="vbig">
                  <div>
                    <div className="vqm">&ldquo;</div>
                    <p>{voices[0].q}</p>
                  </div>
                  <div className="vby2">
                    <b>{voices[0].n}</b>
                    <span>{voices[0].r}</span>
                  </div>
                </div>
              )}
              <div className="vlist">
                {voices.slice(1).map((v) => (
                  <div className="vs vv" key={v.n}>
                    <div className="vtn vc2" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 20 }}>
                      {v.i}
                    </div>
                    <div>
                      <p className="vqs">&ldquo;{v.q}&rdquo;</p>
                      <div className="vby2">
                        <b>{v.n}</b>
                        <span>{v.r}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
