/**
 * Global structured data injected in the root layout: the Organization and
 * WebSite nodes every page-level node (Service, BreadcrumbList, BlogPosting…)
 * points back to by `@id`.
 */
import { ORGANIZATION_ID, WEBSITE_ID, marketsAreaServed } from "@/app/lib/jsonld";
import { companySummary, technologies } from "@/app/lib/facts";
import { serviceLines } from "@/app/lib/services";
import { siteConfig } from "@/app/lib/site-config";
import JsonLd from "./JsonLd";

export default function StructuredData() {
  // Placeholder links ("#") would be invalid sameAs values, so only real URLs are listed.
  const sameAs = Object.values(siteConfig.social).filter((href) => href.startsWith("http"));

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": ORGANIZATION_ID,
        name: siteConfig.name,
        alternateName: siteConfig.shortName,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        image: `${siteConfig.url}/opengraph-image.jpg`,
        description: companySummary,
        slogan: siteConfig.tagline,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lahore",
          addressCountry: "PK",
        },
        areaServed: marketsAreaServed(),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: siteConfig.contact.email,
          telephone: siteConfig.contact.phone,
          availableLanguage: "English",
        },
        knowsAbout: [...serviceLines.map((service) => service.serviceType), ...technologies],
        ...(sameAs.length > 0 && { sameAs }),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: siteConfig.name,
        url: siteConfig.url,
        inLanguage: "en",
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };

  return <JsonLd data={graph} />;
}
