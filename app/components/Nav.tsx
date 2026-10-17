"use client";

export default function Nav() {
  return (
    <nav className="dt-nav">
      <a className="bk" href="/">
        <b>Digital Transformation <i>DT.</i></b>
      </a>
      <div className="nl">
        <a href="/blog">Blog</a>
        <a href="/projects">Projects</a>
        <a href="/team">Team</a>
      </div>
      <a className="btn" href="#go" style={{ padding: "10px 20px", fontSize: "14px" }}>
        Start
      </a>
    </nav>
  );
}
