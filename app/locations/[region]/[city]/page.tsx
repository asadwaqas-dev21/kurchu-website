import type { Viewport } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/app/components/shared/JsonLd";
import { cities, cityPath, getCity } from "@/app/lib/cities";
import { cityServiceJsonLd, faqPageJsonLd } from "@/app/lib/jsonld";
import { buildMetadata } from "@/app/lib/metadata";
import { regionPhrase } from "@/app/lib/regions";
import { CityApps, CityDetails, CityLinks, Guides } from "@/app/premium-app-development/components/Cities";
import { Faq } from "@/app/premium-app-development/components/Faq";
import { FinalCta } from "@/app/premium-app-development/components/FinalCta";
import { PageHero } from "@/app/premium-app-development/components/PageHero";
import { Summary } from "@/app/premium-app-development/components/Summary";
import { PremiumShell } from "@/app/premium-app-development/components/PremiumShell";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((city) => ({ region: city.region, city: city.slug }));
}

export async function generateMetadata(props: PageProps<"/locations/[region]/[city]">) {
  const { region: regionSlug, city: citySlug } = await props.params;
  const match = getCity(regionSlug, citySlug);
  if (!match) return {};
  const { city, region } = match;
  return buildMetadata({
    title: city.seo.title,
    description: city.seo.description,
    path: cityPath(city),
    locale: region.ogLocale,
    keywords: city.keywords,
  });
}

export const viewport: Viewport = { themeColor: "#09090A", viewportFit: "cover" };

export default async function CityPage(props: PageProps<"/locations/[region]/[city]">) {
  const { region: regionSlug, city: citySlug } = await props.params;
  const match = getCity(regionSlug, citySlug);
  if (!match) notFound();
  const { city, region } = match;
  const path = cityPath(city);

  return (
    <PremiumShell lang={region.hreflang}>
      <JsonLd data={cityServiceJsonLd(city, region, path)} />
      <JsonLd data={faqPageJsonLd(city.faqs)} />
      <PageHero
        path={path}
        eyebrow={`Mobile app development · ${city.name}`}
        lines={["Mobile app", "development for", <em key="em">{city.name} businesses.</em>]}
        lede={city.hero.lede}
        meta={city.hero.meta}
        cta={{ label: "Start a Project" }}
        secondary={{ href: "/work", label: "See selected work" }}
        lang={region.hreflang}
      />
      <Summary
        title={
          <>
            App development <em>in {city.name}.</em>
          </>
        }
        answer={city.answer}
        facts={[
          ["City", `${city.name}, ${region.name}`],
          ["Time zone", `${city.timeZone.zone} — ${city.timeZone.callWindow}`],
          ["Local rules", city.rules.slice(0, 2).join("; ")],
          ["Integrations", city.integrations.slice(0, 3).join("; ")],
          ["Platforms", "iOS (Swift), Android (Kotlin), Flutter, React Native"],
          ["Team location", "Lahore, Pakistan — working remotely with clients"],
        ]}
      />
      <CityDetails city={city} />
      <CityApps city={city} />
      <Faq
        items={city.faqs}
        eyebrow={`FAQ · ${city.name}`}
        title={
          <>
            Questions from teams <em>in {city.name}.</em>
          </>
        }
      />
      <Guides slugs={region.guides} place={city.name} />
      <CityLinks
        region={region}
        exclude={city.slug}
        eyebrow={`More of ${regionPhrase(region)}`}
        title={
          <>
            Also building for <em>{regionPhrase(region)}.</em>
          </>
        }
      />
      <FinalCta />
    </PremiumShell>
  );
}
