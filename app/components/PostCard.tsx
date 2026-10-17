import { Post, CL, IC } from "../data/content";
import Arrow from "./Arrow";

export default function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <a
      className="pc tl it"
      href={`/blog/${post.s}`}
      style={{ "--i": index } as React.CSSProperties}
    >
      <div className={`pt ${post.c}`} dangerouslySetInnerHTML={{ __html: IC[post.c] }} />
      <div className="pb">
        <div className="pm mono">{CL[post.c]} · {post.k}</div>
        <h3>{post.n}</h3>
        <p>{post.d}</p>
        <span className="pr">Read more <Arrow /></span>
      </div>
    </a>
  );
}
