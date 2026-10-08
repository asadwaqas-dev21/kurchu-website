import type { MetadataRoute } from "next";
import { siteConfig } from "./lib/site-config";

/**
 * AI answer-engine and assistant crawlers, listed explicitly so the intent is
 * unambiguous (they would also match "*"). Search/retrieval bots fetch pages to
 * cite them in answers; training bots (GPTBot, Google-Extended, Applebot-Extended,
 * CCBot) feed the models themselves — remove any you would rather opt out of.
 */
const AI_CRAWLERS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // /classic/* stays crawlable on purpose: its pages carry `noindex`, and
      // crawlers can only obey that if they may fetch them.
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
