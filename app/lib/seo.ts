export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dt.redcross.or.ke";
export const SITE_NAME = "Kenya Red Cross · Digital Transformation";
export const SITE_DESC =
  "The Digital Transformation Department is connecting people, data and technology so Kenya Red Cross can reach communities faster, in every county.";

export function buildMeta({
  title,
  description = SITE_DESC,
  path = "/",
  image,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}) {
  const url = `${SITE_URL}${path}`;
  const og = image ?? `${SITE_URL}/og-default.png`;
  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: og, width: 1200, height: 630, alt: title }],
      type: "website" as const,
      locale: "en_KE",
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [og],
    },
  };
}
