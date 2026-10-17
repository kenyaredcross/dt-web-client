export const dynamic = "force-dynamic";

import Nav from "../../components/Nav";
import { frappeFetch } from "../../lib/frappe";
import { type TeamMember } from "../../data/content";
import TeamMemberDetail from "../../components/TeamMemberDetail";
import { notFound } from "next/navigation";
import { buildMeta, SITE_URL } from "../../lib/seo";

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [member, team] = await Promise.all([
    frappeFetch<TeamMember>("krcs_dt_cms.dt_cms.api.get_team_member", { slug }).catch(() => null),
    frappeFetch<TeamMember[]>("krcs_dt_cms.dt_cms.api.get_team").catch(() => [] as TeamMember[]),
  ]);
  if (!member) notFound();
  return (
    <>
      <Nav />
      <TeamMemberDetail member={member} allTeam={team} />
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = await frappeFetch<TeamMember>("krcs_dt_cms.dt_cms.api.get_team_member", { slug }).catch(() => null);
  if (!member) return buildMeta({ title: "Team | Kenya Red Cross", path: "/team" });
  return buildMeta({
    title: `${member.n} | Kenya Red Cross Digital Transformation`,
    description: member.b || `${member.n} — ${member.r} at Kenya Red Cross Digital Transformation Department.`,
    path: `/team/${slug}`,
    image: member.photo ? `${SITE_URL}${member.photo}` : undefined,
  });
}
