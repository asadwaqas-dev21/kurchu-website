import type { Viewport } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/shared/JsonLd";
import { DESIGNS, FEATURES, FOUNDATION, MIN_PRICE, PLATFORMS, formatUsd } from "@/app/lib/estimator";
import { ORGANIZATION_ID, faqPageJsonLd } from "@/app/lib/jsonld";
import { buildMetadata } from "@/app/lib/metadata";
import { siteConfig } from "@/app/lib/site-config";
import { Faq } from "@/app/premium-app-development/components/Faq";
import { FinalCta } from "@/app/premium-app-development/components/FinalCta";
import { IdeaEstimator } from "@/app/premium-app-development/components/IdeaEstimator";
import { PageHero } from "@/app/premium-app-development/components/PageHero";
import { PremiumShell } from "@/app/premium-app-development/components/PremiumShell";
import { SectionHead, rv } from "@/app/premium-app-development/components/ui";

const PATH = "/app-cost-estimator";

export const metadata = buildMetadata({
  title: "AI App Cost Estimator: Price Your App Idea | Kurchu",
  description: `Describe your app idea and get an improved plan, a feature list, launch advice and an estimated price from Kurchu's pricing table — apps from ${formatUsd(MIN_PRICE)}.`,
  path: PATH,
});

export const viewport: Viewport = { themeColor: "#09090A", viewportFit: "cover" };

const steps = [
  {
    title: "Your idea, sharpened",
    body: "AI reads your description, restates it clearly and suggests ways to make it stronger — without assuming anything you didn't say.",
  },
  {
    title: "Features from our list",
    body: "It picks the features your first release needs and what can wait, choosing only from the priced feature list below.",
  },
  {
    title: "Priced by our table",
    body: "The price is calculated from our pricing table for your platform and design choice. The AI never writes the number.",
  },
];

const faqs = [
  {
    q: "How accurate is the estimate?",
    a: "It is an indicative range based on our own feature prices, for the features the estimator selects. Real projects differ in detail — integrations, content and edge cases — so the final figure comes from a written scope after a short discovery call. The estimate gives you a realistic starting point for budgeting.",
  },
  {
    q: "Is this a quote?",
    a: "No. It is an estimate to help you plan. If you send it to us, a senior member of the team reviews it, asks the questions that affect cost and replies within one working day. A fixed price for the first phase follows the discovery call, before any work begins.",
  },
  {
    q: `What do apps cost with Kurchu?`,
    a: `Prices start from ${formatUsd(MIN_PRICE)}. Every app includes the ${FOUNDATION.label.toLowerCase()} (${formatUsd(FOUNDATION.low)}–${formatUsd(FOUNDATION.high)}), and each feature adds to that according to the table on this page. Building for iOS and Android with one codebase, natively for both, or with a custom design changes the total by a fixed factor.`,
  },
  {
    q: "What happens to the idea I type?",
    a: `Your description is sent to Google's Gemini AI to produce the estimate and is not stored by Kurchu. Nothing reaches our team unless you choose to send the estimate with your name and email. Avoid including confidential details; you can share those after signing an NDA with us at ${siteConfig.contact.email}.`,
  },
];

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${siteConfig.url}${PATH}#app`,
  name: "AI App Cost Estimator",
  url: `${siteConfig.url}${PATH}`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any (web browser)",
  description: "Describe a mobile app idea and get an improved plan, a feature list, launch advice and an estimated price range.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: { "@id": ORGANIZATION_ID },
};

export default function AppCostEstimatorPage() {
  return (
    <PremiumShell current="pricing">
      <JsonLd data={appJsonLd} />
      <JsonLd data={faqPageJsonLd(faqs)} />
      <PageHero
        path={PATH}
        eyebrow="AI app cost estimator"
        lines={["Describe your idea.", "Get features, advice", <em key="em">and a price.</em>]}
        lede="Tell us what you want to build. In about ten seconds you get a sharper version of your idea, the features your first release needs, practical advice and an estimated price from our own pricing table."
        meta={["Free, no sign-up", "Answer in about 10 seconds", `Apps from ${formatUsd(MIN_PRICE)}`]}
        cta={{ label: "Start a Project" }}
        secondary={{ href: "#estimator", label: "Estimate my app" }}
      />

      {/* Sits right under the hero, so it skips the usual large section gap. */}
      <section className="section" id="estimator" aria-labelledby="estimator-title" style={{ paddingTop: "clamp(24px, 3vw, 48px)" }}>
        <div className="wrap">
          <SectionHead
            eyebrow="Your estimate"
            titleId="estimator-title"
            title={
              <>
                What are you <em>building?</em>
              </>
            }
            lede={
              <>
                Describe the app in your own words — any language works. Mention who it&apos;s for and what people should be able to do. Or start from a{" "}
                <Link className="tlink" href="/app-ideas">
                  ready-made plan for a popular app
                </Link>
                .
              </>
            }
          />
          <IdeaEstimator />
        </div>
      </section>

      <section className="section mkt" id="how" aria-labelledby="how-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead
            eyebrow="How the estimate works"
            titleId="how-title"
            title={
              <>
                AI plans it. <em>Our table prices it.</em>
              </>
            }
          />
          <ol className="mkt-grid n3">
            {steps.map((step, i) => (
              <li key={step.title} {...rv(i ? `${(i * 0.06).toFixed(2)}s` : undefined)}>
                <div className="mkt-card">
                  <span className="mkt-code mono">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section mkt-tbl" id="feature-prices" aria-labelledby="prices-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead
            eyebrow="Feature prices"
            titleId="prices-title"
            title={
              <>
                What each feature <em>adds.</em>
              </>
            }
            lede={`Every app starts with the ${FOUNDATION.label.toLowerCase()}. ${PLATFORMS.filter((p) => p.factor !== 1)
              .map((p) => `${p.label}: ×${p.factor}`)
              .join(" · ")} · ${DESIGNS.filter((d) => d.factor !== 1)
              .map((d) => `${d.label}: ×${d.factor}`)
              .join(" · ")}.`}
          />
          <div className="tbl-wrap" {...rv()}>
            <table className="tbl">
              <caption className="sr-only">Kurchu feature prices for mobile apps, in US dollars</caption>
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">Typical price</th>
                  <th scope="col">Typical time</th>
                </tr>
              </thead>
              <tbody>
                {[{ key: "foundation", ...FOUNDATION }, ...FEATURES].map((feature) => (
                  <tr key={feature.key}>
                    <th scope="row">{feature.label}</th>
                    <td>
                      {formatUsd(feature.low)} – {formatUsd(feature.high)}
                    </td>
                    <td>{feature.weeks < 1 ? `${Math.round(feature.weeks * 5)} working days` : `${feature.weeks} week${feature.weeks === 1 ? "" : "s"}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Faq
        items={faqs}
        eyebrow="Estimator FAQ"
        title={
          <>
            About the <em>estimate.</em>
          </>
        }
      />
      <FinalCta />
    </PremiumShell>
  );
}
