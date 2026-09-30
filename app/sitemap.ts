import type { MetadataRoute } from "next";
import { siteConfig } from "./lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/web-development",
    "/mobile-app-development",
    "/seo-services",
    "/work",
    "/about",
    "/process",
    "/contact",
    "/pricing",
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1.0 : 0.8,
  }));
}
