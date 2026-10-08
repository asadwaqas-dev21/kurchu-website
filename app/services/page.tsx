import type { Viewport } from "next";
import { buildMetadata } from "@/app/lib/metadata";
import { Engagement } from "@/app/premium-app-development/components/Engagement";
import { Estimator } from "@/app/premium-app-development/components/Estimator";
import { FinalCta } from "@/app/premium-app-development/components/FinalCta";
import { PageHero } from "@/app/premium-app-development/components/PageHero";
import { PremiumShell } from "@/app/premium-app-development/components/PremiumShell";
import { Services } from "@/app/premium-app-development/components/Services";
import { Summary } from "@/app/premium-app-development/components/Summary";
import { services } from "@/app/premium-app-development/data";

// Overview of what the team does and how clients engage; the keyword-focused
// detail page is /mobile-app-development (its child in lib/routes.ts).
export const metadata = buildMetadata({
  title: "App Development Services & Engagement Models | Kurchu",
  description:
    "Product strategy, UX/UI design, iOS and Android engineering, backend, QA and launch — one senior team for clients in the UK, USA, Canada and UAE.",
  path: "/services",
});

export const viewport: Viewport = { themeColor: "#09090A", viewportFit: "cover" };

export default function ServicesPage() {
  return (
    <PremiumShell current="services">
      <PageHero
        path="/services"
        eyebrow="App development services"
        lines={["Everything an app", "needs, from first", <em key="em">sketch to store.</em>]}
        lede="Product strategy, UX/UI design, iOS and Android engineering, backend, quality engineering and launch — planned, designed and built by the same accountable team."
        meta={["Six disciplines, one team", "Fixed scope per phase", "You own 100% of the code"]}
        cta={{ label: "Start a Project" }}
        secondary={{ href: "/mobile-app-development", label: "Mobile app development in detail" }}
        pageType="CollectionPage"
      />
      <Summary
        title={
          <>
            What Kurchu <em>offers.</em>
          </>
        }
        answer="Kurchu Software Solutions offers end-to-end mobile app development for businesses in the UK, USA, Canada and UAE: product strategy, UX/UI design, iOS and Android engineering, backend, quality engineering and launch, delivered by one senior team. Projects are scoped in fixed-price phases, and clients own all of the code, designs and documentation."
        facts={services.map((service) => [service.title, service.chips.join(", ")])}
      />
      <Services />
      <Engagement />
      <Estimator />
      <FinalCta />
    </PremiumShell>
  );
}
