export const dynamic = "force-dynamic";

import Nav from "../../components/Nav";
import { frappeFetch } from "../../lib/frappe";
import { type Post } from "../../data/content";
import BlogPostPageView from "../../components/BlogPostPage";
import { notFound } from "next/navigation";
import { buildMeta, SITE_URL } from "../../lib/seo";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    frappeFetch<Post>("krcs_dt_cms.dt_cms.api.get_post", { slug }).catch(() => null),
    frappeFetch<Post[]>("krcs_dt_cms.dt_cms.api.get_posts").catch(() => [] as Post[]),
  ]);
  if (!post) notFound();
  return (
    <>
      <Nav />
      <BlogPostPageView post={post} allPosts={allPosts} />
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await frappeFetch<Post>("krcs_dt_cms.dt_cms.api.get_post", { slug }).catch(() => null);
  if (!post) return buildMeta({ title: "Blog | Kenya Red Cross", path: "/blog" });
  return {
    ...buildMeta({
      title: `${post.n} | Kenya Red Cross`,
      description: post.d || undefined,
      path: `/blog/${slug}`,
      image: post.img ? `${SITE_URL}${post.img}` : undefined,
    }),
    openGraph: {
      ...buildMeta({ title: post.n, description: post.d || undefined, path: `/blog/${slug}`, image: post.img ? `${SITE_URL}${post.img}` : undefined }).openGraph,
      type: "article" as const,
    },
  };
}
