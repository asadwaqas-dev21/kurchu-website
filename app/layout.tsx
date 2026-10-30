import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "./lib/site-config";
import StructuredData from "./components/shared/StructuredData";

// No canonical or og:url here: every indexable page sets its own, and a root
// default would point any page that forgets to (and the 404 page) at "/".
export const metadata: Metadata = {
  title: "Kurchu Software Solutions — Mobile App Development",
  description:
    "Kurchu Software Solutions designs, engineers and launches iOS, Android and cross-platform apps for businesses in the UK, USA, Canada and UAE.",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: "Kurchu Software Solutions — Mobile App Development",
    description:
      "Kurchu Software Solutions designs, engineers and launches iOS, Android and cross-platform apps for businesses in the UK, USA, Canada and UAE.",
    siteName: "Kurchu Software Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kurchu Software Solutions — Mobile App Development",
    description:
      "Kurchu Software Solutions designs, engineers and launches mobile apps for businesses in the UK, USA, Canada and UAE.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-[#0b1220]">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
