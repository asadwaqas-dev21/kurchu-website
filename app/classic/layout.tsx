import { Geist, Geist_Mono } from "next/font/google";
import { ChatWidget } from "../components/chat/ChatWidget";
import MobileBottomNav from "../components/MobileBottomNav";

// The previous design's fonts and mobile chrome live here so the live pages
// don't download them.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ClassicLayout({ children }: LayoutProps<"/classic">) {
  return (
    // `contents` keeps the children as direct flex items of <body>.
    <div className={`${geistSans.variable} ${geistMono.variable} font-sans`} style={{ display: "contents" }}>
      {children}
      <MobileBottomNav />
      <ChatWidget />
    </div>
  );
}
