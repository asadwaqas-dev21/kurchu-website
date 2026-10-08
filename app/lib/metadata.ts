import type { Metadata } from "next";
import { siteConfig } from "./site-config";

/**
 * Build page-level metadata with OG / Twitter cards.
 * Each page passes title + description; the rest is filled automatically.
 */
export function buildMetadata(opts: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  /** hreflang → path for pages with regional variants (emits <link rel="alternate" hreflang>). */
  languages?: Record<string, string>;
  /** Open Graph locale, e.g. "en_GB" on the UK page. */
  locale?: string;
}): Metadata {
  const url = `${siteConfig.url}${opts.path ?? ""}`;

  return {
    title: opts.title,
    description: opts.description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: opts.path ?? "/", ...(opts.languages && { languages: opts.languages }) },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: siteConfig.name,
      locale: opts.locale ?? "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
    ...(opts.noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
