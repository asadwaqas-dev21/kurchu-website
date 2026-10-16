import type { Viewport } from "next";
import JsonLd from "@/app/components/shared/JsonLd";
import { faqPageJsonLd } from "@/app/lib/jsonld";
import { buildMetadata } from "@/app/lib/metadata";
import { Engagement } from "@/app/premium-app-development/components/Engagement";
import { Estimator } from "@/app/premium-app-development/components/Estimator";
import { Faq } from "@/app/premium-app-development/components/Faq";
import { FinalCta } from "@/app/premium-app-development/components/FinalCta";
import { PageHero } from "@/app/premium-app-development/components/PageHero";
import { OutsideCosts, PriceDrivers, QuoteSteps } from "@/app/premium-app-development/components/Pricing";
import { PremiumShell } from "@/app/premium-app-development/components/PremiumShell";
import { Summary } from "@/app/premium-app-development/components/Summary";
import { models, pricingFaqs } from "@/app/premium-app-development/data";
import { PRICE_EXAMPLES, PRICE_SCOPE } from "@/app/lib/pricing-copy";

export const metadata = buildMetadata({
  title: "Mobile App Development Cost & Pricing | Kurchu",
  description:
    "What mobile app development costs with Kurchu: fixed-price phases, milestones or a monthly team, with a written scope before work starts. No hourly billing.",
  path: "/pricing",
});

export const viewport: Viewport = { themeColor: "#09090A", viewportFit: "cover" };

export default function PricingPage() {
  return (
    <PremiumShell current="pricing">
      <JsonLd data={faqPageJsonLd(pricingFaqs)} />
      <PageHero
        path="/pricing"
        eyebrow="Pricing"
        lines={["App development cost:", "a clear price for", <em key="em">every phase, up front.</em>]}
        lede="No hourly billing and no open-ended estimates. Every project starts with a written scope and a fixed price for the first phase — so you know the commitment before you make it."
        meta={["Fixed price per phase", "Written scope first", "Priced in GBP, USD, CAD or AED"]}
        cta={{ label: "Get a Quote" }}
        secondary={{ href: "/app-cost-estimator", label: "Estimate my idea with AI" }}
      />
      <Summary
        title={
          <>
            What an app costs <em>with Kurchu.</em>
          </>
        }
        answer={`Kurchu Software Solutions never charges by the hour: ${PRICE_SCOPE}. ${PRICE_EXAMPLES} Each phase has a written scope and a fixed price, agreed before work begins, and the client owns all of the code.`}
        facts={[
          ...models.map<[string, string]>((model) => [model.title, `${model.pricing} · ${model.timeline}`]),
          ["Currencies", "GBP, USD, CAD or AED"],
          ["Code ownership", "100% yours, from the first commit"],
        ]}
      />
      <Engagement eyebrow="Ways to work together" />
      <PriceDrivers />
      <QuoteSteps />
      <OutsideCosts />
      <Estimator eyebrow="Scope estimator" />
      <Faq
        items={pricingFaqs}
        eyebrow="Pricing FAQ"
        title={
          <>
            Questions about <em>cost.</em>
          </>
        }
      />
      <FinalCta />
    </PremiumShell>
  );
}
