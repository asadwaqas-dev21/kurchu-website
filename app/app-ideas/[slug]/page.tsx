import { deflateRawSync } from "node:zlib";
import type { Viewport } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/app/components/shared/JsonLd";
import { appIdeaPath, appIdeas, getAppIdea, type AppIdea } from "@/app/lib/app-ideas";
import { buildEstimate, packEstimate } from "@/app/lib/estimate-share";
import { PLATFORMS, formatUsd, getFeature, priceFor, type FeatureKey } from "@/app/lib/estimator";
import { faqPageJsonLd } from "@/app/lib/jsonld";
import { buildMetadata } from "@/app/lib/metadata";
import { Faq } from "@/app/premium-app-development/components/Faq";
import { FinalCta } from "@/app/premium-app-development/components/FinalCta";
import { IdeaPlanner } from "@/app/premium-app-development/components/IdeaPlanner";
import { PageHero } from "@/app/premium-app-development/components/PageHero";
import { PremiumShell } from "@/app/premium-app-development/components/PremiumShell";
import { Summary } from "@/app/premium-app-development/components/Summary";
import { SectionHead, rv } from "@/app/premium-app-development/components/ui";

// Fully static: every idea page is generated at build time and served from the CDN.
export const dynamicParams = false;

export function generateStaticParams() {
  return appIdeas.map((idea) => ({ slug: idea.slug }));
}

type Props = { params: Promise<{ slug: string }> };

const keysOf = (items: AppIdea["mvp"]) => items.map(([key]) => key as FeatureKey);
const range = (r: { low: number; high: number }) => `${formatUsd(r.low)}–${formatUsd(r.high)}`;
const weeks = (r: { weeks: [number, number] }) => `${r.weeks[0]}–${r.weeks[1]} weeks`;
/** "a salon booking app" / "an e-commerce shopping app". */
const withArticle = (name: string) => `${/^[aeiou]/i.test(name) ? "an" : "a"} ${name.toLowerCase()}`;

function plan(idea: AppIdea) {
  const mvpKeys = keysOf(idea.mvp);
  const laterKeys = keysOf(idea.later);
  return {
    mvpKeys,
    laterKeys,
    mvp: priceFor(mvpKeys, "cross-platform", "template"),
    full: priceFor([...mvpKeys, ...laterKeys], "cross-platform", "template"),
  };
}

/** A share link that opens this plan in the estimator — built here, so it costs no AI. */
function estimatorLink(idea: AppIdea) {
  const estimate = buildEstimate({
    name: idea.sampleName,
    summary: idea.intro,
    features: [
      ...idea.mvp.map(([key, reason]) => ({ key, phase: "mvp" as const, reason })),
      ...idea.later.map(([key, reason]) => ({ key, phase: "later" as const, reason })),
    ],
    platform: "cross-platform",
    platformReason: "One codebase reaches iOS and Android users at the lowest cost.",
    design: "template",
    improvements: idea.standOut,
    advice: idea.launchTips,
    questions: idea.questions,
  });
  return `/app-cost-estimator#e=z${deflateRawSync(Buffer.from(JSON.stringify(packEstimate(estimate)))).toString("base64url")}`;
}

function faqsFor(idea: AppIdea) {
  const { mvp, full } = plan(idea);
  const lower = withArticle(idea.name);
  return [
    {
      q: `How much does ${lower} cost?`,
      a: `With Kurchu, a first release with ${idea.mvp.length} core features is estimated at ${range(mvp)} for iOS and Android from one codebase with a ready-made design. The full product, adding ${idea.later
        .map(([key]) => getFeature(key)?.label.toLowerCase())
        .join(", ")}, is estimated at ${range(full)}. A fixed price follows a short discovery call.`,
    },
    {
      q: `How long does it take to build ${lower}?`,
      a: `The first release takes about ${weeks(mvp)} from discovery to store launch; the full product about ${weeks(full)}. Building natively for iOS and Android, or with a custom design, adds time — the price table on this page shows the difference.`,
    },
    ...idea.faqs,
  ];
}

export async function generateMetadata({ params }: Props) {
  const idea = getAppIdea((await params).slug);
  if (!idea) return {};
  const { mvp } = plan(idea);
  return buildMetadata({
    // Long names fall back to a shorter pattern so Google shows the whole title (~60 characters).
    title: [`${idea.name}: Features, Cost & Timeline | Kurchu`, `${idea.name}: Cost & Features | Kurchu`].find((t) => t.length <= 60) ?? `${idea.name} | Kurchu`,
    description: `What ${withArticle(idea.name)} needs, what it costs (MVP from ${formatUsd(mvp.low)}) and how long it takes — with wireframes, a budget planner and launch advice.`,
    path: appIdeaPath(idea),
  });
}

export const viewport: Viewport = { themeColor: "#09090A", viewportFit: "cover" };

export default async function AppIdeaPage({ params }: Props) {
  const idea = getAppIdea((await params).slug);
  if (!idea) notFound();
  const { mvpKeys, laterKeys, mvp, full } = plan(idea);
  const path = appIdeaPath(idea);
  const faqs = faqsFor(idea);
  // Same category first, then the plans that follow this one (wrapping round), so every plan is linked
  // from its neighbours instead of all pages pointing at the first few in the list.
  const at = appIdeas.indexOf(idea);
  const ring = [...appIdeas.slice(at + 1), ...appIdeas.slice(0, at)];
  const related = [...ring.filter((other) => other.category === idea.category), ...ring.filter((other) => other.category !== idea.category)].slice(0, 3);
  const platformRows = PLATFORMS.filter((p) => p.value !== "android").map((p) => ({
    label: p.value === "ios" ? "One platform (iOS or Android)" : p.label,
    mvp: priceFor(mvpKeys, p.value, "template"),
    full: priceFor([...mvpKeys, ...laterKeys], p.value, "template"),
  }));

  return (
    <PremiumShell current="pricing">
      <JsonLd data={faqPageJsonLd(faqs)} />
      <PageHero
        path={path}
        eyebrow={`App idea · ${idea.category}`}
        lines={[`${idea.name}:`, "features, cost", <em key="em">and timeline.</em>]}
        lede={idea.intro}
        meta={[`MVP from ${formatUsd(mvp.low)}`, weeks(mvp), `${idea.mvp.length} core features`]}
        cta={{ label: "Start a Project" }}
        secondary={{ href: estimatorLink(idea), label: "Customise this estimate" }}
      />

      <Summary
        title={
          <>
            What a {idea.name.toLowerCase()} <em>costs.</em>
          </>
        }
        answer={faqs[0].a}
        facts={[
          ["Who it's for", idea.audience],
          ["First release (MVP)", `${range(mvp)} · ${weeks(mvp)}`],
          ["Full product", `${range(full)} · ${weeks(full)}`],
          ["Platforms", "iOS + Android from one codebase"],
          ["Design", "Ready-made design (custom design ×1.3)"],
        ]}
      />

      <section className="section" id="features" aria-labelledby="features-title">
        <div className="wrap">
          <SectionHead
            eyebrow="Features"
            titleId="features-title"
            title={
              <>
                What a {idea.name.toLowerCase()} <em>needs.</em>
              </>
            }
            lede="The first release covers the core job; the rest can follow once real users are on board."
          />
          <div className="ie-features" {...rv()}>
            {[
              { title: "First release (MVP)", items: idea.mvp },
              { title: "Add later", items: idea.later },
            ].map((group) => (
              <div className="ie-group" key={group.title}>
                <h3 className="label">{group.title}</h3>
                <ul>
                  {group.items.map(([key, why]) => {
                    const feature = getFeature(key)!;
                    return (
                      <li key={key}>
                        <div>
                          <b>{feature.label}</b>
                          <span>{why}</span>
                        </div>
                        <span className="mono">{range(feature)}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="planner" aria-labelledby="planner-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead
            eyebrow="Plan it to your budget"
            titleId="planner-title"
            title={
              <>
                See it, then <em>fit it to your budget.</em>
              </>
            }
          />
          <IdeaPlanner sampleName={idea.sampleName} mvp={mvpKeys} later={laterKeys} />
        </div>
      </section>

      <section className="section mkt-tbl" id="price-by-platform" aria-labelledby="platform-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead
            eyebrow="Price by platform"
            titleId="platform-title"
            title={
              <>
                How platform choice <em>changes the price.</em>
              </>
            }
            lede="Ready-made design. A custom UI/UX design multiplies each figure by 1.3."
          />
          <div className="tbl-wrap" {...rv()}>
            <table className="tbl">
              <caption className="sr-only">{`${idea.name} estimated cost by platform`}</caption>
              <thead>
                <tr>
                  <th scope="col">Platform</th>
                  <th scope="col">First release (MVP)</th>
                  <th scope="col">Full product</th>
                </tr>
              </thead>
              <tbody>
                {platformRows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>
                      {range(row.mvp)} · {weeks(row.mvp)}
                    </td>
                    <td>
                      {range(row.full)} · {weeks(row.full)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section mk" id="advice" aria-labelledby="advice-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead
            eyebrow="Advice"
            titleId="advice-title"
            title={
              <>
                Making a {idea.name.toLowerCase()} <em>succeed.</em>
              </>
            }
          />
          <div className="mk-grid" {...rv()}>
            {[
              { title: "How to stand out", items: idea.standOut },
              { title: "Launch tips", items: idea.launchTips },
              { title: "We'd ask you", items: idea.questions },
            ].map((column) => (
              <div className="mk-col" key={column.title}>
                <h3>{column.title}</h3>
                <ul>
                  {column.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq
        items={faqs}
        eyebrow={`FAQ · ${idea.name}`}
        title={
          <>
            Questions, <em>answered.</em>
          </>
        }
      />

      <section className="section mkt" id="more-ideas" aria-labelledby="more-ideas-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead
            eyebrow="More app ideas"
            titleId="more-ideas-title"
            title={
              <>
                Compare with <em>similar apps.</em>
              </>
            }
          />
          <ul className="mkt-grid n3">
            {related.map((other, i) => (
              <li key={other.slug} {...rv(i ? `${(i * 0.06).toFixed(2)}s` : undefined)}>
                <Link href={appIdeaPath(other)} className="mkt-card">
                  <span className="mkt-code mono">{other.category}</span>
                  <h3>{other.name}</h3>
                  <p>MVP from {formatUsd(plan(other).mvp.low)}</p>
                  <span className="svl-go">See features &amp; cost →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </PremiumShell>
  );
}
