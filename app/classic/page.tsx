import type { Metadata } from "next";
import Header from "../components/Header";
import Hero from "../components/Hero";
import LogoCloud from "../components/LogoCloud";
import Services from "../components/Services";
import Process from "../components/Process";
import RecentWork from "../components/RecentWork";
import Pricing from "../components/Pricing";
import FaqContact from "../components/FaqContact";
import LatestInsights from "../components/LatestInsights";
import Footer from "../components/Footer";

// Previous homepage, kept for reference — the live homepage is at "/".
export const metadata: Metadata = { robots: { index: false, follow: true } };

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <LogoCloud />
        <Services />
        <Process />
        <RecentWork />
        <Pricing />
        <FaqContact />
        <LatestInsights />
      </main>
      <Footer />
    </>
  );
}
