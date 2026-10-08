import type { MetadataRoute } from "next";
import { routes } from "./lib/routes";
import { siteConfig } from "./lib/site-config";

/** Built from the route registry in lib/routes.ts — add pages there, not here. */
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    ...(route.lastModified && { lastModified: route.lastModified }),
    changeFrequency: route.changeFrequency ?? "monthly",
    priority: route.priority ?? 0.5,
    ...(route.images && { images: route.images.map((image) => `${siteConfig.url}${image}`) }),
    // hreflang for the regional market pages (en-GB / en-US / en-CA / en-AE + x-default).
    ...(route.languages && {
      alternates: {
        languages: Object.fromEntries(
          Object.entries(route.languages).map(([lang, path]) => [lang, `${siteConfig.url}${path}`]),
        ),
      },
    }),
  }));
}
