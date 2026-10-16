import type { Viewport } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/app/components/shared/JsonLd";
import { faqPageJsonLd, serviceJsonLd } from "@/app/lib/jsonld";
import { buildMetadata } from "@/app/lib/metadata";
import { getSpecialistService, specialistServices } from "@/app/lib/specialist-services";
import { Guides } from "@/app/premium-app-development/components/Cities";
import { Faq } from "@/app/premium-app-development/components/Faq";
import { FinalCta } from "@/app/premium-app-development/components/FinalCta";
import { PageHero } from "@/app/premium-app-development/components/PageHero";
import { PremiumShell } from "@/app/premium-app-development/components/PremiumShell";
import { Summary } from "@/app/premium-app-development/components/Summary";
import { SectionHead, rv } from "@/app/premium-app-development/components/ui";
import { quoteSteps } from "@/app/premium-app-development/data";

// Specialist services under the /mobile-app-development pillar (see lib/specialist-services.ts).
export const dynamicParams = false;

export function generateStaticParams() {
  return specialistServices.map((service) => ({ slug: service.slug }));
}

export const viewport: Viewport = { themeColor: "#09090A", viewportFit: "cover" };

export async function generateMetadata(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getSpecialistService(slug);
  if (!service) return {};
  return buildMetadata({ title: service.seoTitle, description: service.metaDescription, path: service.path });
}

const delay = (i: number, per: number) => (i % per ? `${((i % per) * 0.05).toFixed(2)}s` : undefined);

/** "Cross-platform & hybrid app development" → splits the last word into the italic accent. */
function accent(text: string) {
  const words = text.split(" ");
  return (
    <>
      {words.slice(0, -1).join(" ")} <em>{words.at(-1)}</em>
    </>
  );
}

export default async function SpecialistServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getSpecialistService(slug);
  if (!service) notFound();

  const related = service.related.flatMap((s) => getSpecialistService(s) ?? []);

  return (
    <PremiumShell current="services">
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd data={faqPageJsonLd(service.faqs)} />
      <PageHero
        path={service.path}
        eyebrow={service.eyebrow}
        lines={[service.lines[0], service.lines[1], <em key="em">{service.lines[2]}</em>]}
        lede={service.lede}
        meta={service.meta}
        cta={{ label: "Start a Project" }}
        secondary={{ href: "/app-cost-estimator", label: "Estimate my app free" }}
      />

      <Summary
        title={
          <>
            {service.short} <em>with Kurchu.</em>
          </>
        }
        answer={service.answer}
        facts={service.facts}
      />

      <section className="section mkt" id="fit" aria-labelledby="fit-title">
        <div className="wrap">
          <SectionHead eyebrow="Who it's for" titleId="fit-title" title={accent(service.fit.title)} lede={service.fit.lede} />
          <ul className="mkt-grid n3">
            {service.fit.items.map((item, i) => (
              <li key={item.title} {...rv(delay(i, 3))}>
                <div className="mkt-card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section mk" id="scope" aria-labelledby="scope-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow="Scope & deliverables" titleId="scope-title" title={accent(service.scope.title)} />
          <div className="mk-grid" {...rv()}>
            {service.scope.columns.map((column) => (
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

      <section className="section mkt" id="process" aria-labelledby="process-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead
            eyebrow="How it works"
            titleId="process-title"
            title={accent(service.steps.title)}
            lede={
              <>
                Every step ends with something you can review.{" "}
                <Link className="tlink" href="/process">
                  See our full development process
                </Link>
                .
              </>
            }
          />
          <ol className="mkt-grid n4">
            {service.steps.items.map((step, i) => (
              <li key={step.title} {...rv(delay(i, 4))}>
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

      <section className="section mkt" id="quote" aria-labelledby="quote-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead
            eyebrow="Project quotation"
            titleId="quote-title"
            title={accent(service.quote.title)}
            lede={
              <>
                {service.quote.lede}{" "}
                <Link className="tlink" href="/contact">
                  Request a quote
                </Link>{" "}
                or see{" "}
                <Link className="tlink" href="/pricing">
                  how we price projects
                </Link>
                .
              </>
            }
          />
          <ol className="mkt-grid n3">
            {quoteSteps.map((step, i) => (
              <li key={step.title} {...rv(delay(i, 3))}>
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

      <section className="section mkt" id="related" aria-labelledby="related-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead
            eyebrow="Related services"
            titleId="related-title"
            title={
              <>
                Part of our <em>mobile app development.</em>
              </>
            }
          />
          <ul className="mkt-grid n4">
            <li {...rv()}>
              <Link href="/mobile-app-development" className="mkt-card">
                <span className="mkt-code mono">Overview</span>
                <h3>Custom mobile app development</h3>
                <p>Every platform, app type and service — strategy to store launch.</p>
                <span className="svl-go">Open →</span>
              </Link>
            </li>
            {related.map((item, i) => (
              <li key={item.slug} {...rv(delay(i + 1, 4))}>
                <Link href={item.path} className="mkt-card">
                  <span className="mkt-code mono">Service</span>
                  <h3>{item.short}</h3>
                  <p>{item.description}</p>
                  <span className="svl-go">Open →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Faq
        items={service.faqs}
        eyebrow={`${service.short} FAQ`}
        title={
          <>
            Questions, <em>answered.</em>
          </>
        }
      />

      <Guides slugs={service.guides} place="your business" />

      <FinalCta />
    </PremiumShell>
  );
}
