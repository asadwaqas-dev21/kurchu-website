import type { MetadataRoute } from "next";
import { siteConfig } from "./lib/site-config";
import { posts } from "./lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/", // homepage (premium-app-development design); /classic is noindex and left out
    "/web-development",
    "/mobile-app-development",
    "/seo-services",
    "/work",
    "/about",
    "/process",
    "/contact",
    "/pricing",
    "/blog",
    ...posts.map((post) => `/blog/${post.slug}`),
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1.0 : 0.8,
  }));
}
