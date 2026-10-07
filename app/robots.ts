import type { MetadataRoute } from "next";
import { siteConfig } from "./lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /classic is the retired homepage (noindex); /api holds route handlers, not pages.
        disallow: ["/api/", "/classic"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
