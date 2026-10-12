import type { NextConfig } from "next";

/**
 * URLs from an earlier version of the site that Google still has indexed.
 * Each maps to the closest page that exists today, so old links and rankings
 * carry over instead of ending in a 404.
 */
const LEGACY_PAGES: Record<string, string> = {
  "mobile-app-development": "/mobile-app-development",
  "business-app-solutions": "/services",
  "ai-business-tools": "/services",
  "crm-solutions": "/services",
  payments: "/services",
  compare: "/services",
  industries: "/services",
  support: "/contact",
  "case-studies": "/work",
  download: "/",
  author: "/about",
  "blog/small-business-mobile-app-guide": "/blog",
  "blog/page": "/blog",
  tag: "/blog",
};

// That earlier site had untranslated /ar, /ur and /it copies of every page,
// which Google flagged as duplicates. This site is English-only.
const LEGACY_LOCALES = "ar|ur|it";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The design was first built at this path; "/" now serves it, so send
      // any old links there instead of keeping a duplicate URL alive.
      { source: "/premium-app-development", destination: "/", permanent: true },

      // Website development and SEO are no longer offered. These URLs were live,
      // so redirect them permanently rather than letting links and rankings 404.
      { source: "/web-development", destination: "/services", permanent: true },
      { source: "/seo-services", destination: "/services", permanent: true },
      { source: "/blog/how-much-does-a-business-website-cost", destination: "/blog", permanent: true },
      { source: "/blog/local-seo-checklist-google-maps", destination: "/blog", permanent: true },

      // Legacy pages and their sub-pages (e.g. /compare/agency, /author/<name>),
      // with or without a language prefix.
      ...Object.entries(LEGACY_PAGES).flatMap(([path, destination]) => [
        { source: `/:locale(${LEGACY_LOCALES})/${path}/:rest*`, destination, permanent: true },
        ...(destination === `/${path}`
          ? [{ source: `/${path}/:rest+`, destination, permanent: true }]
          : [{ source: `/${path}/:rest*`, destination, permanent: true }]),
      ]),
      { source: `/:locale(${LEGACY_LOCALES})/pricing/:plan*`, destination: "/pricing", permanent: true },
      { source: "/pricing/:plan+", destination: "/pricing", permanent: true },

      // Anything else under an old language prefix: drop the prefix. Pages that
      // still exist resolve; anything else returns a normal 404.
      { source: `/:locale(${LEGACY_LOCALES})`, destination: "/", permanent: true },
      { source: `/:locale(${LEGACY_LOCALES})/:path*`, destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
