import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "./lib/site-config";
import StructuredData from "./components/shared/StructuredData";
import { ChatWidget } from "./components/chat/ChatWidget";
import MobileBottomNav from "./components/MobileBottomNav";
import HideOnRoutes from "./components/shared/HideOnRoutes";

// Pages built on the dark premium design have their own nav and inquiry flow.
const premiumRoutes = ["/", "/services", "/work", "/process", "/technology", "/about", "/contact", "/privacy", "/terms"];
const premiumPrefixes = ["/premium-app-development", "/locations"];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kurchu Software Solutions — Mobile App Development",
  description:
    "Kurchu Software Solutions designs, engineers and launches iOS, Android and cross-platform apps for businesses in the UK, USA, Canada and UAE.",
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Kurchu Software Solutions — Mobile App Development",
    description:
      "Kurchu Software Solutions designs, engineers and launches iOS, Android and cross-platform apps for businesses in the UK, USA, Canada and UAE.",
    url: siteConfig.url,
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white pb-[calc(68px+env(safe-area-inset-bottom))] text-[#0b1220] lg:pb-0">
        <StructuredData />
        {children}
        <HideOnRoutes exact={premiumRoutes} prefixes={premiumPrefixes}>
          <MobileBottomNav />
          <ChatWidget />
        </HideOnRoutes>
      </body>
    </html>
  );
}
