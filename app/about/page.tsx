import type { Viewport } from "next";
import { buildMetadata } from "@/app/lib/metadata";
import { siteConfig } from "@/app/lib/site-config";
import { FinalCta } from "@/app/premium-app-development/components/FinalCta";
import { PageHero } from "@/app/premium-app-development/components/PageHero";
import { PremiumShell } from "@/app/premium-app-development/components/PremiumShell";
import { Testimonials } from "@/app/premium-app-development/components/Testimonials";
import { Trust } from "@/app/premium-app-development/components/Trust";
import { WhyUs } from "@/app/premium-app-development/components/WhyUs";

export const metadata = buildMetadata({
  title: "About Kurchu Software Solutions | Senior App Development Team",
  description:
    "A small, senior team of product strategists, designers and engineers. The people you meet in the first call are the people who build your app.",
  path: "/about",
});

export const viewport: Viewport = { themeColor: "#09090A", viewportFit: "cover" };

export default function AboutPage() {
  return (
    <PremiumShell current="about">
      <PageHero
        path="/about"
        eyebrow="About Kurchu"
        lines={["Senior people,", "a handful of products,", <em key="em">full accountability.</em>]}
        lede="Kurchu Software Solutions is a deliberately small team of product strategists, designers and engineers. The people you meet in the first call are the people who build your app."
        meta={["Senior-led. No junior hand-offs.", `Based in ${siteConfig.location}`, "Working with clients worldwide"]}
        cta={{ label: "Start a Project" }}
        secondary={{ href: "/work", label: "See our work" }}
      />
      <Trust />
      <WhyUs />
      <Testimonials />
      <FinalCta />
    </PremiumShell>
  );
}
