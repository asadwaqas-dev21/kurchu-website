/** ──────────────────────────────────────────────
 *  Structured-data builders.
 *
 *  Every node points at the same Organization and WebSite `@id`s (declared
 *  once in the root layout), so Google reads the site as one connected graph
 *  instead of unrelated snippets.
 * ──────────────────────────────────────────────*/
import { breadcrumbTrail } from "./routes";
import { siteConfig } from "./site-config";

export const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

const absolute = (path: string) => `${siteConfig.url}${path}`;

export function breadcrumbJsonLd(path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
    areaServed: "Worldwide",
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
