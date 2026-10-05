import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "./components/shared/StructuredData";
import { ChatWidget } from "./components/chat/ChatWidget";
import MobileBottomNav from "./components/MobileBottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kurchu Software Solutions — Websites, apps and SEO",
  description:
    "Kurchu Software Solutions designs, builds and grows digital products for businesses worldwide. Websites, apps and SEO that turn visitors into customers.",
  metadataBase: new URL("https://kurchu.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Kurchu Software Solutions — Websites, apps and SEO",
    description:
      "Kurchu Software Solutions designs, builds and grows digital products for businesses worldwide. Websites, apps and SEO that turn visitors into customers.",
    url: "https://kurchu.com",
    siteName: "Kurchu Software Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kurchu Software Solutions — Websites, apps and SEO",
    description:
      "Kurchu Software Solutions designs, builds and grows digital products for businesses worldwide.",
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
        <MobileBottomNav />
        <ChatWidget />
      </body>
    </html>
  );
}
