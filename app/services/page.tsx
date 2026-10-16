import type { Viewport } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/shared/JsonLd";
import { serviceListJsonLd } from "@/app/lib/jsonld";
import { buildMetadata } from "@/app/lib/metadata";
import { serviceLines } from "@/app/lib/services";
import { specialistServices } from "@/app/lib/specialist-services";
import { Engagement } from "@/app/premium-app-development/components/Engagement";
import { Estimator } from "@/app/premium-app-development/components/Estimator";
import { FinalCta } from "@/app/premium-app-development/components/FinalCta";
import { PageHero } from "@/app/premium-app-development/components/PageHero";
import { PremiumShell } from "@/app/premium-app-development/components/PremiumShell";
import { Services } from "@/app/premium-app-development/components/Services";
import { Summary } from "@/app/premium-app-development/components/Summary";
import { SectionHead, rv } from "@/app/premium-app-development/components/ui";
import { services } from "@/app/premium-app-development/data";

// The services hub: a directory of every service page plus the engagement models. The keyword-focused
// pillar is /mobile-app-development; specialist pages live at /services/<slug>.
export const metadata = buildMetadata({
  title: "App Development Services: iOS, Android & MVP | Kurchu",
  description:
    "Every app development service we offer: iOS, Android, Flutter and React Native apps, startup MVPs and UI/UX design, for the UK, USA, Canada and UAE.",
  path: "/services",
});

export const viewport: Viewport = { themeColor: "#09090A", viewportFit: "cover" };

export default function ServicesPage() {
  return (
    <PremiumShell current="services">
      <JsonLd data={serviceListJsonLd([...serviceLines, ...specialistServices])} />
      <PageHero
        path="/services"
        eyebrow="Everything an app needs"
        lines={["App development", "services, from first", <em key="em">sketch to store.</em>]}
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
      <section className="section mkt" id="directory" aria-labelledby="directory-title">
        <div className="wrap">
          <SectionHead
            eyebrow="Service directory"
            titleId="directory-title"
            title={
              <>
                Find the right service <em>for your app.</em>
              </>
            }
            lede="Start with the overview, or go straight to the platform or stage you need. Each page covers scope, process, cost and common questions."
          />
          <ul className="mkt-grid n3">
            {[...serviceLines, ...specialistServices].map((service, i) => (
              <li key={service.path} {...rv(i % 3 ? `${((i % 3) * 0.05).toFixed(2)}s` : undefined)}>
                <Link href={service.path} className="mkt-card">
                  <span className="mkt-code mono">{i === 0 ? "Overview" : "Specialist service"}</span>
                  <h3>{i === 0 ? "Custom mobile app development" : service.name}</h3>
                  <p>{service.description}</p>
                  <span className="svl-go">Open →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Services />
      <Engagement />
      <Estimator />
      <FinalCta />
    </PremiumShell>
  );
}
