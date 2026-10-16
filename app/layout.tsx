import type { Metadata } from "next";
import { Google_Sans_Flex, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const googleSansFlex = Google_Sans_Flex({
  variable: "--font-google-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const sourceSerif4 = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Kenya Red Cross | Digital Transformation",
  description:
    "The Digital Transformation Department is connecting people, data and technology so Kenya Red Cross can reach communities faster, in every county.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${googleSansFlex.variable} ${jetbrainsMono.variable} ${sourceSerif4.variable}`}>
      <body>{children}</body>
    </html>
  );
}
