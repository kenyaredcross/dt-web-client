export const dynamic = "force-dynamic";

import Nav from "../components/Nav";
import { frappeFetch } from "../lib/frappe";
import { type Post, type Voice } from "../data/content";
import BlogListPageView from "../components/BlogListPage";
import { buildMeta } from "../lib/seo";

export const metadata = buildMeta({
  title: "Blog | Kenya Red Cross Digital Transformation",
  description: "Stories, field notes and tech insights from the Kenya Red Cross Digital Transformation Department.",
  path: "/blog",
});

export default async function BlogPage() {
  const [posts, voices] = await Promise.all([
    frappeFetch<Post[]>("krcs_dt_cms.dt_cms.api.get_posts").catch(() => [] as Post[]),
    frappeFetch<Voice[]>("krcs_dt_cms.dt_cms.api.get_voices").catch(() => [] as Voice[]),
  ]);
  return (
    <>
      <Nav />
      <BlogListPageView posts={posts} voices={voices} />
    </>
  );
}
