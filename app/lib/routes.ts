/** ──────────────────────────────────────────────
 *  Site architecture — the single source of truth for every indexable page.
 *
 *  `parent` defines the hierarchy that breadcrumbs (visible + JSON-LD) and the
 *  sitemap are built from. Add a page here when you add a route; leave
 *  `lastModified` out unless you know the real date (a fake "now" date teaches
 *  Google to ignore the field).
 * ──────────────────────────────────────────────*/
import type { MetadataRoute } from "next";
import { posts } from "./blog";
import { regionLanguageAlternates, regionPath, regions } from "./regions";

export type SiteRoute = {
  path: string;
  /** Short name used in breadcrumbs. */
  name: string;
  parent?: string;
  lastModified?: string;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: number;
  images?: string[];
  /** hreflang → path, for pages that have regional variants. */
  languages?: Record<string, string>;
};

const HOMEPAGE_REDESIGNED = "2026-10-07";
const PAGES_REDESIGNED = "2026-10-08";
const MARKETS_ADDED = "2026-10-08";
const latestPostDate = posts.map((post) => post.date).sort().at(-1);

export const routes: SiteRoute[] = [
  { path: "/", name: "Home", lastModified: HOMEPAGE_REDESIGNED, changeFrequency: "weekly", priority: 1 },

  // Services hub and its service lines.
  { path: "/services", name: "Services", parent: "/", lastModified: PAGES_REDESIGNED, priority: 0.9 },
  { path: "/mobile-app-development", name: "Mobile App Development", parent: "/services", priority: 0.9 },
  { path: "/web-development", name: "Web Development", parent: "/services", priority: 0.9 },
  { path: "/seo-services", name: "SEO Services", parent: "/services", priority: 0.9 },
  { path: "/pricing", name: "Pricing", parent: "/services", priority: 0.7 },

  // Target markets: a hub (hreflang x-default) and one page per region.
  { path: "/locations", name: "Locations", parent: "/", lastModified: MARKETS_ADDED, priority: 0.8, languages: regionLanguageAlternates() },
  ...regions.map<SiteRoute>((region) => ({
    path: regionPath(region),
    name: region.name,
    parent: "/locations",
    lastModified: MARKETS_ADDED,
    priority: 0.8,
    languages: regionLanguageAlternates(),
  })),

  // Company.
  { path: "/work", name: "Work", parent: "/", lastModified: PAGES_REDESIGNED, priority: 0.8 },
  { path: "/process", name: "Process", parent: "/", lastModified: PAGES_REDESIGNED, priority: 0.7 },
  { path: "/technology", name: "Technology", parent: "/", lastModified: PAGES_REDESIGNED, priority: 0.7 },
  { path: "/about", name: "About", parent: "/", lastModified: PAGES_REDESIGNED, priority: 0.7 },
  { path: "/contact", name: "Contact", parent: "/", priority: 0.6 },

  // Blog hub and articles.
  { path: "/blog", name: "Blog", parent: "/", lastModified: latestPostDate, changeFrequency: "weekly", priority: 0.7 },
  ...posts.map<SiteRoute>((post) => ({
    path: `/blog/${post.slug}`,
    name: post.title,
    parent: "/blog",
    lastModified: post.date,
    priority: 0.6,
    images: [post.image],
  })),
];

const byPath = new Map(routes.map((route) => [route.path, route]));

export function getRoute(path: string) {
  return byPath.get(path);
}

/** Home → … → page, following `parent` links. */
export function breadcrumbTrail(path: string): Array<{ name: string; path: string }> {
  const trail: Array<{ name: string; path: string }> = [];
  for (let route = getRoute(path); route; route = route.parent ? getRoute(route.parent) : undefined) {
    trail.unshift({ name: route.name, path: route.path });
  }
  return trail;
}

/** Direct children of a page — e.g. the service lines under /services. */
export function childRoutes(path: string) {
  return routes.filter((route) => route.parent === path);
}
