import type { Metadata } from "next";
import { siteConfig } from "./site-config";

/**
 * Setting `openGraph` on a page replaces the parent's whole object, which drops
 * the image Next adds from app/opengraph-image.jpg — so it is set explicitly.
 */
const shareImage = { url: "/opengraph-image.jpg", width: 1200, height: 630, alt: siteConfig.name };

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
  keywords?: string[];
  /** Marks the page as an article (og:type "article") with its publish dates. */
  article?: { publishedTime: string; modifiedTime?: string };
  /** A page-specific share image in place of the site default. */
  image?: { url: string; width: number; height: number; alt: string };
}): Metadata {
  const url = `${siteConfig.url}${opts.path ?? ""}`;
  const image = opts.image ?? shareImage;

  return {
    title: opts.title,
    description: opts.description,
    ...(opts.keywords && { keywords: opts.keywords }),
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: opts.path ?? "/", ...(opts.languages && { languages: opts.languages }) },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: siteConfig.name,
      locale: opts.locale ?? "en_US",
      images: [image],
      ...(opts.article ? { type: "article", ...opts.article } : { type: "website" }),
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [image.url],
    },
    ...(opts.noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
