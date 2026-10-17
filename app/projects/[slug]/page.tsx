export const dynamic = "force-dynamic";

import Nav from "../../components/Nav";
import { frappeFetch } from "../../lib/frappe";
import { type Project } from "../../data/content";
import ProjectDetail from "../../components/ProjectDetail";
import { notFound } from "next/navigation";
import { buildMeta, SITE_URL } from "../../lib/seo";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await frappeFetch<Project>("krcs_dt_cms.dt_cms.api.get_project", { slug }).catch(() => null);
  if (!project) notFound();
  return (
    <>
      <Nav />
      <ProjectDetail project={project} />
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await frappeFetch<Project>("krcs_dt_cms.dt_cms.api.get_project", { slug }).catch(() => null);
  if (!project) return buildMeta({ title: "Projects | Kenya Red Cross", path: "/projects" });
  return buildMeta({
    title: `${project.n} | Kenya Red Cross Digital Transformation`,
    description: project.sum,
    path: `/projects/${slug}`,
    image: project.img ? `${SITE_URL}${project.img}` : undefined,
  });
}
