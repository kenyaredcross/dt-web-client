export const dynamic = "force-dynamic";

import Nav from "../components/Nav";
import { frappeFetch } from "../lib/frappe";
import { type Project } from "../data/content";
import ProjectsPage from "../components/ProjectsPage";
import { buildMeta } from "../lib/seo";

export const metadata = buildMeta({
  title: "Projects | Kenya Red Cross Digital Transformation",
  description: "Platforms and tools built by the Digital Transformation Department to help Kenya Red Cross reach communities faster, in every county.",
  path: "/projects",
});

export default async function Projects() {
  const projects = await frappeFetch<Project[]>("krcs_dt_cms.dt_cms.api.get_projects").catch(() => [] as Project[]);
  return (
    <>
      <Nav />
      <ProjectsPage projects={projects} />
    </>
  );
}
