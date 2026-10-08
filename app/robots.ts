import type { MetadataRoute } from "next";
import { siteConfig } from "./lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Route handlers only. /classic/* stays crawlable on purpose: its pages
        // carry `noindex`, and Google can only obey that if it may fetch them.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
