import type { Viewport } from "next";
import { buildMetadata } from "@/app/lib/metadata";
import { FinalCta } from "@/app/premium-app-development/components/FinalCta";
import { Gallery } from "@/app/premium-app-development/components/Gallery";
import { PageHero } from "@/app/premium-app-development/components/PageHero";
import { PremiumShell } from "@/app/premium-app-development/components/PremiumShell";
import { Testimonials } from "@/app/premium-app-development/components/Testimonials";
import { Work } from "@/app/premium-app-development/components/Work";

export const metadata = buildMetadata({
  title: "Selected Work — App Case Studies | Kurchu Software Solutions",
  description:
    "Mobile app case studies across fintech, healthcare, mobility and commerce: the challenge, our role, the platforms and the outcome for each product.",
  path: "/work",
});

export const viewport: Viewport = { themeColor: "#09090A", viewportFit: "cover" };

export default function WorkPage() {
  return (
    <PremiumShell current="work">
      <PageHero
        path="/work"
        eyebrow="Selected work"
        lines={["Products with", "their own identity,", <em key="em">built to last.</em>]}
        lede="Concept case studies across fintech, healthcare, mobility and commerce — each with its own brand, its own constraints and its own definition of done. Full client case studies are shared under NDA on request."
        meta={["Fintech · Health · Mobility · Commerce", "iOS, Android & cross-platform", "Client case studies under NDA"]}
        cta={{ label: "Start a Project" }}
        secondary={{ href: "/process", label: "How we work" }}
      />
      <Work />
      <Gallery />
      <Testimonials />
      <FinalCta />
    </PremiumShell>
  );
}
