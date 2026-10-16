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
import { appIdeaPath, appIdeas } from "./app-ideas";
import { cities, cityPath } from "./cities";
import { regionLanguageAlternates, regionPath, regions } from "./regions";
import { specialistServices } from "./specialist-services";

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

const PAGES_REDESIGNED = "2026-10-08";
const MARKETS_ADDED = "2026-10-08";
const ESTIMATOR_ADDED = "2026-10-14";
const APP_IDEAS_ADDED = "2026-10-15";
const SERVICE_PAGE_REBUILT = "2026-10-16";
const SPECIALIST_SERVICES_ADDED = "2026-10-16";
/** Keyword-clustering pass: titles, H1s, service links and new sections on these pages. */
const SEO_PASS = "2026-10-16";
const CONTACT_REBUILT = "2026-10-08";
const LEGAL_UPDATED = "2026-10-08";
const latestPostDate = posts.map((post) => post.date).sort().at(-1);

export const routes: SiteRoute[] = [
  { path: "/", name: "Home", lastModified: SEO_PASS, changeFrequency: "weekly", priority: 1 },

  // Services and the mobile app development detail page.
  { path: "/services", name: "Services", parent: "/", lastModified: SEO_PASS, priority: 0.9 },
  { path: "/mobile-app-development", name: "Mobile App Development", parent: "/services", lastModified: SERVICE_PAGE_REBUILT, priority: 0.9 },
  // Specialist services sit under the pillar, so breadcrumbs and the sitemap show the hierarchy.
  ...specialistServices.map<SiteRoute>((service) => ({
    path: service.path,
    name: service.short,
    parent: "/mobile-app-development",
    lastModified: SPECIALIST_SERVICES_ADDED,
    priority: 0.8,
  })),
  { path: "/pricing", name: "Pricing", parent: "/services", lastModified: SEO_PASS, priority: 0.7 },
  { path: "/app-cost-estimator", name: "App Cost Estimator", parent: "/pricing", lastModified: ESTIMATOR_ADDED, priority: 0.8 },

  // App Ideas Library: one static page per app type.
  { path: "/app-ideas", name: "App Ideas", parent: "/", lastModified: APP_IDEAS_ADDED, priority: 0.8 },
  ...appIdeas.map<SiteRoute>((idea) => ({
    path: appIdeaPath(idea),
    name: idea.name,
    parent: "/app-ideas",
    lastModified: APP_IDEAS_ADDED,
    priority: 0.7,
  })),

  // Target markets: a hub (hreflang x-default) and one page per region.
  { path: "/locations", name: "Locations", parent: "/", lastModified: MARKETS_ADDED, priority: 0.8, languages: regionLanguageAlternates() },
  ...regions.map<SiteRoute>((region) => ({
    path: regionPath(region),
    name: region.name,
    parent: "/locations",
    lastModified: SEO_PASS,
    priority: 0.8,
    languages: regionLanguageAlternates(),
  })),
  // City pages under each market.
  ...cities.map<SiteRoute>((city) => ({
    path: cityPath(city),
    name: city.name,
    parent: `/locations/${city.region}`,
    lastModified: SEO_PASS,
    priority: 0.7,
  })),

  // Company.
  { path: "/work", name: "Work", parent: "/", lastModified: PAGES_REDESIGNED, priority: 0.8 },
  { path: "/process", name: "Process", parent: "/", lastModified: SEO_PASS, priority: 0.7 },
  { path: "/technology", name: "Technology", parent: "/", lastModified: SEO_PASS, priority: 0.7 },
  { path: "/about", name: "About", parent: "/", lastModified: PAGES_REDESIGNED, priority: 0.7 },
  { path: "/contact", name: "Contact", parent: "/", lastModified: CONTACT_REBUILT, priority: 0.8 },

  // Legal.
  { path: "/privacy", name: "Privacy Policy", parent: "/", lastModified: LEGAL_UPDATED, changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", name: "Terms of Use", parent: "/", lastModified: LEGAL_UPDATED, changeFrequency: "yearly", priority: 0.3 },

  // Blog hub and articles.
  { path: "/blog", name: "Blog", parent: "/", lastModified: latestPostDate, changeFrequency: "weekly", priority: 0.7 },
  ...posts.map<SiteRoute>((post) => ({
    path: `/blog/${post.slug}`,
    name: post.title,
    parent: "/blog",
    lastModified: post.updated ?? post.date,
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
