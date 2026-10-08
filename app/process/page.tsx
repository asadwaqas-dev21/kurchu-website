import type { Viewport } from "next";
import JsonLd from "@/app/components/shared/JsonLd";
import { howToJsonLd } from "@/app/lib/jsonld";
import { buildMetadata } from "@/app/lib/metadata";
import { processSteps } from "@/app/premium-app-development/data";
import { Faq } from "@/app/premium-app-development/components/Faq";
import { FinalCta } from "@/app/premium-app-development/components/FinalCta";
import { IdeaToProduct } from "@/app/premium-app-development/components/IdeaToProduct";
import { PageHero } from "@/app/premium-app-development/components/PageHero";
import { PremiumShell } from "@/app/premium-app-development/components/PremiumShell";
import { Process } from "@/app/premium-app-development/components/Process";

export const metadata = buildMetadata({
  title: "Our App Development Process | Kurchu Software Solutions",
  description:
    "Discovery, strategy, UX, UI, engineering, testing, launch and growth. See what happens at each stage, what you receive and how involved you'll be.",
  path: "/process",
});

export const viewport: Viewport = { themeColor: "#09090A", viewportFit: "cover" };

export default function ProcessPage() {
  return (
    <PremiumShell current="process">
      <JsonLd
        data={howToJsonLd({
          path: "/process",
          name: "How Kurchu takes an app from idea to launch",
          description: "Eight delivery stages, each ending with a deliverable the client can review.",
          steps: processSteps.map((step) => ({ name: step.name, text: `${step.body} Deliverable: ${step.deliverable}.` })),
        })}
      />
      <PageHero
        path="/process"
        eyebrow="How we work"
        lines={["How an idea", "becomes an app", <em key="em">you can ship.</em>]}
        lede="Every stage ends with something you can hold — a document, a prototype, a build. You install a real build on your own phone every week, and always know what's being decided and why."
        meta={["Discovery sprint in 10 working days", "Fortnightly demos with real builds", "Written weekly progress summary"]}
        cta={{ label: "Start a Project" }}
        secondary={{ href: "/services", label: "Our services" }}
      />
      <IdeaToProduct />
      <Process />
      <Faq />
      <FinalCta />
    </PremiumShell>
  );
}
