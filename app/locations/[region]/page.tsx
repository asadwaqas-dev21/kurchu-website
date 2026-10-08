import type { Viewport } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/app/components/shared/JsonLd";
import { faqPageJsonLd, regionalServiceJsonLd } from "@/app/lib/jsonld";
import { buildMetadata } from "@/app/lib/metadata";
import { getRegion, regionLanguageAlternates, regionPath, regionPhrase, regions } from "@/app/lib/regions";
import { Engagement } from "@/app/premium-app-development/components/Engagement";
import { Faq } from "@/app/premium-app-development/components/Faq";
import { FinalCta } from "@/app/premium-app-development/components/FinalCta";
import { MarketDetails, Markets } from "@/app/premium-app-development/components/Markets";
import { PageHero } from "@/app/premium-app-development/components/PageHero";
import { Summary } from "@/app/premium-app-development/components/Summary";
import { PremiumShell } from "@/app/premium-app-development/components/PremiumShell";

export const dynamicParams = false;

export function generateStaticParams() {
  return regions.map((region) => ({ region: region.slug }));
}

export async function generateMetadata(props: PageProps<"/locations/[region]">) {
  const region = getRegion((await props.params).region);
  if (!region) return {};
  return buildMetadata({
    title: region.seo.title,
    description: region.seo.description,
    path: regionPath(region),
    languages: regionLanguageAlternates(),
    locale: region.ogLocale,
  });
}

export const viewport: Viewport = { themeColor: "#09090A", viewportFit: "cover" };

export default async function RegionPage(props: PageProps<"/locations/[region]">) {
  const region = getRegion((await props.params).region);
  if (!region) notFound();
  const path = regionPath(region);
  const [first, second, accent] = region.hero.lines;

  return (
    <PremiumShell lang={region.hreflang}>
      <JsonLd data={regionalServiceJsonLd(region, path)} />
      <JsonLd data={faqPageJsonLd(region.faqs)} />
      <PageHero
        path={path}
        eyebrow={region.hero.eyebrow}
        lines={[first, second, <em key="em">{accent}</em>]}
        lede={region.hero.lede}
        meta={region.hero.meta}
        cta={{ label: "Start a Project" }}
        secondary={{ href: "/work", label: "See selected work" }}
        lang={region.hreflang}
      />
      <Summary
        title={
          <>
            Kurchu <em>in {regionPhrase(region)}.</em>
          </>
        }
        answer={`Kurchu Software Solutions builds iOS, Android and cross-platform apps for businesses in ${regionPhrase(region)}. Products are planned around ${region.privacyLaw}, integrate ${region.payments[0]}, and support ${region.languages}. ${region.timeZone.difference}`}
        facts={[
          ["Market", region.name],
          ["Key privacy law", region.privacyLaw],
          ["Local payments", region.payments.slice(0, 3).join("; ")],
          ["Interface languages", region.languages],
          ["Time zone", `${region.timeZone.zone} — ${region.timeZone.callWindow}`],
          ["Services", "Mobile app strategy, UX/UI, iOS & Android development, backend, QA and launch"],
        ]}
      />
      <MarketDetails region={region} />
      <Engagement />
      <Faq
        items={region.faqs}
        eyebrow={`FAQ · ${region.short}`}
        title={
          <>
            Questions from teams <em>in {regionPhrase(region)}.</em>
          </>
        }
      />
      <Markets
        exclude={region.slug}
        eyebrow="Other markets"
        title={
          <>
            Also building for <em>three more markets.</em>
          </>
        }
        lede="The same team and the same standard — with each market's law, payments and languages planned in."
      />
      <FinalCta />
    </PremiumShell>
  );
}
