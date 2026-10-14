import type { Viewport } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/shared/JsonLd";
import { appIdeaPath, appIdeas } from "@/app/lib/app-ideas";
import { formatUsd, priceFor, type FeatureKey } from "@/app/lib/estimator";
import { buildMetadata } from "@/app/lib/metadata";
import { siteConfig } from "@/app/lib/site-config";
import { FinalCta } from "@/app/premium-app-development/components/FinalCta";
import { PageHero } from "@/app/premium-app-development/components/PageHero";
import { PremiumShell } from "@/app/premium-app-development/components/PremiumShell";
import { Summary } from "@/app/premium-app-development/components/Summary";
import { SectionHead, rv } from "@/app/premium-app-development/components/ui";

export const metadata = buildMetadata({
  title: "App Ideas: Features, Cost & Timeline | Kurchu",
  description:
    "Popular app types — salon booking, food delivery, real estate, school, taxi and more — with the features each needs, estimated cost, timeline and wireframes.",
  path: "/app-ideas",
});

export const viewport: Viewport = { themeColor: "#09090A", viewportFit: "cover" };

const cards = appIdeas.map((idea) => {
  const mvp = priceFor(
    idea.mvp.map(([key]) => key as FeatureKey),
    "cross-platform",
    "template",
  );
  return { idea, mvp };
});

const listJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Kurchu app ideas library",
  itemListElement: appIdeas.map((idea, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${siteConfig.url}${appIdeaPath(idea)}`,
    name: idea.name,
  })),
};

export default function AppIdeasPage() {
  const cheapest = Math.min(...cards.map((card) => card.mvp.low));
  return (
    <PremiumShell current="pricing">
      <JsonLd data={listJsonLd} />
      <PageHero
        path="/app-ideas"
        eyebrow="App ideas library"
        lines={["What would your", "app need — and", <em key="em">what would it cost?</em>]}
        lede="Popular app types, planned out: the features each one needs, what to build first, estimated cost and timeline, and wireframes you can fit to your budget."
        meta={[`${appIdeas.length} app types`, `MVPs from ${formatUsd(cheapest)}`, "Wireframes & budget planner"]}
        cta={{ label: "Start a Project" }}
        secondary={{ href: "/app-cost-estimator", label: "Estimate my own idea" }}
        pageType="CollectionPage"
      />
      <Summary
        title={
          <>
            Plans for <em>popular apps.</em>
          </>
        }
        answer={`Each guide shows what a type of app needs for its first release, what can wait, and what it costs with Kurchu — calculated from the same feature price table as our AI cost estimator. First releases start from ${formatUsd(cheapest)}; every guide links to the estimator so you can adjust the plan to your own idea.`}
        facts={cards.slice(0, 6).map(({ idea, mvp }) => [idea.name, `MVP ${formatUsd(mvp.low)}–${formatUsd(mvp.high)} · ${mvp.weeks[0]}–${mvp.weeks[1]} weeks`])}
      />
      <section className="section mkt" id="ideas" aria-labelledby="ideas-title">
        <div className="wrap">
          <SectionHead
            eyebrow="Browse"
            titleId="ideas-title"
            title={
              <>
                Pick the app <em>closest to yours.</em>
              </>
            }
            lede="Don't see your idea? Describe it in the AI cost estimator and get the same plan for your own app."
          />
          <ul className="mkt-grid n3">
            {cards.map(({ idea, mvp }, i) => (
              <li key={idea.slug} {...rv(i % 3 ? `${((i % 3) * 0.06).toFixed(2)}s` : undefined)}>
                <Link href={appIdeaPath(idea)} className="mkt-card">
                  <span className="mkt-code mono">{idea.category}</span>
                  <h3>{idea.name}</h3>
                  <p>{idea.audience}</p>
                  <span className="mkt-tz">
                    MVP from {formatUsd(mvp.low)} · {mvp.weeks[0]}–{mvp.weeks[1]} weeks
                  </span>
                  <span className="svl-go">See features &amp; cost →</span>
                </Link>
              </li>
            ))}
            <li {...rv(".12s")}>
              <Link href="/app-cost-estimator" className="mkt-card">
                <span className="mkt-code mono">Your idea</span>
                <h3>Something different?</h3>
                <p>Describe your app in your own words and get features, advice, wireframes and a price in about ten seconds.</p>
                <span className="svl-go">Open the AI estimator →</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <FinalCta />
    </PremiumShell>
  );
}
