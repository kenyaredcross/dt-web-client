export const dynamic = "force-dynamic";

import Nav from "../components/Nav";
import { frappeFetch } from "../lib/frappe";
import { type TeamMember } from "../data/content";
import TeamPageView from "../components/TeamPage";
import { buildMeta } from "../lib/seo";

export const metadata = buildMeta({
  title: "Team | Kenya Red Cross Digital Transformation",
  description: "Meet the people building digital tools for Kenya Red Cross across all 47 counties.",
  path: "/team",
});

export default async function TeamPage() {
  const team = await frappeFetch<TeamMember[]>("krcs_dt_cms.dt_cms.api.get_team").catch(() => [] as TeamMember[]);
  return (
    <>
      <Nav />
      <TeamPageView team={team} />
    </>
  );
}
