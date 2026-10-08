import type { Viewport } from "next";
import { buildMetadata } from "@/app/lib/metadata";
import { Engagement } from "@/app/premium-app-development/components/Engagement";
import { Estimator } from "@/app/premium-app-development/components/Estimator";
import { FinalCta } from "@/app/premium-app-development/components/FinalCta";
import { PageHero } from "@/app/premium-app-development/components/PageHero";
import { PremiumShell } from "@/app/premium-app-development/components/PremiumShell";
import { ServiceLines } from "@/app/premium-app-development/components/ServiceLines";
import { Services } from "@/app/premium-app-development/components/Services";

// Hub of the service architecture: links down to each service line page
// (see lib/routes.ts), which own their specific keywords.
export const metadata = buildMetadata({
  title: "Software Development Services — Apps, Websites & SEO | Kurchu",
  description:
    "Mobile app development, web development and SEO services from one senior team in Lahore, working with clients worldwide. Fixed scope per phase; you own the code.",
  path: "/services",
});

export const viewport: Viewport = { themeColor: "#09090A", viewportFit: "cover" };

export default function ServicesPage() {
  return (
    <PremiumShell current="services">
      <PageHero
        path="/services"
        eyebrow="Software development services"
        lines={["Apps, websites", "and SEO, built by", <em key="em">one senior team.</em>]}
        lede="Mobile apps for iOS and Android, websites and web applications, and SEO that brings the right customers — planned, designed and engineered by the same accountable team."
        meta={["Mobile apps · Websites · SEO", "Fixed scope per phase", "You own 100% of the code"]}
        cta={{ label: "Start a Project" }}
        secondary={{ href: "/work", label: "See selected work" }}
      />
      <ServiceLines />
      <Services />
      <Engagement />
      <Estimator />
      <FinalCta />
    </PremiumShell>
  );
}
