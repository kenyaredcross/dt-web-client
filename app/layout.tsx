import type { Metadata } from "next";
import { Google_Sans_Flex } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import { SITE_URL, SITE_NAME, SITE_DESC } from "./lib/seo";

const googleSansFlex = Google_Sans_Flex({
  variable: "--font-google-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Kenya Red Cross | Digital Transformation", template: "%s | Kenya Red Cross" },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  keywords: ["Kenya Red Cross", "Digital Transformation", "humanitarian technology", "KRCS", "Africa"],
  authors: [{ name: "Kenya Red Cross Digital Transformation Department", url: SITE_URL }],
  creator: "Kenya Red Cross Society",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Kenya Red Cross | Digital Transformation",
    description: SITE_DESC,
  },
  twitter: {
    card: "summary_large_image",
    site: "@KenyaRedCross",
    creator: "@KenyaRedCross",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={googleSansFlex.variable}>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
