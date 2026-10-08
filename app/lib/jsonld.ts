/** ──────────────────────────────────────────────
 *  Structured-data builders.
 *
 *  Every node points at the same Organization and WebSite `@id`s (declared
 *  once in the root layout), so Google reads the site as one connected graph
 *  instead of unrelated snippets.
 * ──────────────────────────────────────────────*/
import { regionPhrase, regions, type Region } from "./regions";
import { breadcrumbTrail } from "./routes";
import { siteConfig } from "./site-config";

export const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

const absolute = (path: string) => `${siteConfig.url}${path}`;

const country = (region: Region) => ({ "@type": "Country", name: region.name, identifier: region.countryCode });

/** The four target markets, as schema.org Country nodes. */
export const marketsAreaServed = () => regions.map(country);

export function breadcrumbJsonLd(path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${absolute(path)}#breadcrumb`,
    itemListElement: breadcrumbTrail(path).map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  };
}

export function faqPageJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export type ServiceLine = { name: string; path: string; serviceType: string; description: string };

export function serviceJsonLd(service: ServiceLine) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absolute(service.path)}#service`,
    name: service.name,
    serviceType: service.serviceType,
    description: service.description,
    url: absolute(service.path),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: marketsAreaServed(),
  };
}

/** The services hub: an ordered list that references each Service node. */
export function serviceListJsonLd(services: ServiceLine[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.name} services`,
    itemListElement: services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: serviceJsonLd(service),
    })),
  };
}

/** The market page's own Service node: all three service lines, scoped to one country. */
export function regionalServiceJsonLd(region: Region, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absolute(path)}#service`,
    name: `App, web and SEO services in ${regionPhrase(region)}`,
    serviceType: ["Mobile application development", "Web development", "Search engine optimization"],
    url: absolute(path),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: country(region),
    availableLanguage: ({ uae: ["English", "Arabic"], canada: ["English", "French"] } as Record<string, string[]>)[region.slug] ?? "English",
  };
}

export type PageType = "WebPage" | "AboutPage" | "CollectionPage" | "ContactPage";

/** The page itself, tied to the site, the organization and its breadcrumb trail. */
export function webPageJsonLd({ path, name, type = "WebPage", lang = "en", dateModified }: {
  path: string;
  name: string;
  type?: PageType;
  lang?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absolute(path)}#webpage`,
    url: absolute(path),
    name,
    inLanguage: lang,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    breadcrumb: { "@id": `${absolute(path)}#breadcrumb` },
    ...(dateModified && { dateModified }),
  };
}

/** A delivery process as ordered steps — lets answer engines quote "how it works" accurately. */
export function howToJsonLd({ path, name, description, steps }: {
  path: string;
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${absolute(path)}#howto`,
    name,
    description,
    step: steps.map((step, i) => ({ "@type": "HowToStep", position: i + 1, name: step.name, text: step.text })),
  };
}
