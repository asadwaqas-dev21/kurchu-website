import type { MetadataRoute } from "next";
import { siteConfig } from "./lib/site-config";
import { posts } from "./lib/blog";

// Only list a lastModified date when it is a real one — a "now" timestamp on every
// URL teaches Google to ignore the field. Pages without a known date omit it.
const HOMEPAGE_REDESIGNED = "2026-10-07";
const latestPostDate = posts.map((post) => post.date).sort().at(-1);

const pages: Array<{ path: string; lastModified?: string }> = [
  // Homepage uses the premium-app-development design; /classic is noindex and left out.
  { path: "/", lastModified: HOMEPAGE_REDESIGNED },
  { path: "/web-development" },
  { path: "/mobile-app-development" },
  { path: "/seo-services" },
  { path: "/work" },
  { path: "/about" },
  { path: "/process" },
  { path: "/contact" },
  { path: "/pricing" },
  { path: "/blog", lastModified: latestPostDate },
  ...posts.map((post) => ({ path: `/blog/${post.slug}`, lastModified: post.date })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, lastModified }) => ({
    url: `${siteConfig.url}${path}`,
    ...(lastModified && { lastModified }),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1.0 : 0.8,
  }));
}
