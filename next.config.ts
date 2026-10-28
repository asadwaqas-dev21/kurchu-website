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
  // Old industry pages go to the matching App Ideas plan (same topic), before the catch-all below.
  "industries/salon-app": "/app-ideas/salon-booking-app",
  "industries/gym-app": "/app-ideas/fitness-coaching-app",
  "industries/real-estate-app": "/app-ideas/real-estate-app",
  "industries/restaurant-app": "/app-ideas/food-delivery-app",
  "industries/tailor-app": "/app-ideas/tailor-shop-app",
  "industries/cleaning-business-app": "/app-ideas/cleaning-service-app",
  industries: "/app-ideas",
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
  // Drop the X-Powered-By header: it advertises the framework and adds nothing for visitors.
  poweredByHeader: false,

  // Baseline security headers on every response. HSTS covers this host only (no includeSubDomains or
  // preload), since browsers remember it for two years and that is hard to undo.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Restricts framing, <base>, form targets and plugins only. Script and style sources are left
          // open on purpose: Next's inline scripts and JSON-LD would need per-request nonces, which
          // would turn every static page dynamic.
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests",
          },
        ],
      },
      // Unhashed public images and icons: let browsers keep them for a day and refresh in the background
      // for a week, instead of revalidating on every visit. (Hashed /_next/static files are already immutable.)
      ...["/blog/:file*", "/opengraph-image.jpg", "/icon.png", "/apple-icon.png", "/favicon.ico"].map((source) => ({
        source,
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      })),
    ];
  },

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
