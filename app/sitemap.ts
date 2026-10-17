import type { MetadataRoute } from "next";
import { frappeFetch } from "./lib/frappe";
import { SITE_URL } from "./lib/seo";

type SlugItem = { s: string };

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const [posts, team, projects] = await Promise.all([
    frappeFetch<SlugItem[]>("krcs_dt_cms.dt_cms.api.get_posts").catch(() => [] as SlugItem[]),
    frappeFetch<SlugItem[]>("krcs_dt_cms.dt_cms.api.get_team").catch(() => [] as SlugItem[]),
    frappeFetch<SlugItem[]>("krcs_dt_cms.dt_cms.api.get_projects").catch(() => [] as SlugItem[]),
  ]);

  const static_routes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/team`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const post_routes: MetadataRoute.Sitemap = posts
    .filter((p) => p.s)
    .map((p) => ({ url: `${SITE_URL}/blog/${p.s}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 }));

  const project_routes: MetadataRoute.Sitemap = projects
    .filter((p) => p.s)
    .map((p) => ({ url: `${SITE_URL}/projects/${p.s}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 }));

  const team_routes: MetadataRoute.Sitemap = team
    .filter((m) => m.s)
    .map((m) => ({ url: `${SITE_URL}/team/${m.s}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 }));

  return [...static_routes, ...post_routes, ...project_routes, ...team_routes];
}
