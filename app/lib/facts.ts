/** ──────────────────────────────────────────────
 *  Canonical company facts.
 *
 *  Answer engines (ChatGPT, Perplexity, Google AI Overviews…) cite sites that
 *  state facts plainly and consistently. Every "In short" summary, llms.txt and
 *  the Organization schema read from here, so the entity is described the same
 *  way everywhere. Only verifiable facts belong here — not marketing figures.
 * ──────────────────────────────────────────────*/
import { marketsSentence } from "./regions";
import { siteConfig } from "./site-config";

export const companySummary =
  `${siteConfig.name} is a software development company based in ${siteConfig.location} that designs, builds and launches ` +
  `mobile apps, websites and SEO programmes for businesses in ${marketsSentence}. A small senior team runs strategy, ` +
  `design, engineering and launch end to end, and clients own all of the code.`;

export const companyFacts: Array<[string, string]> = [
  ["Company", siteConfig.name],
  ["Based in", siteConfig.location],
  ["Markets served", "United Kingdom, United States, Canada, United Arab Emirates"],
  ["Services", "Mobile app development, web development, SEO"],
  ["Platforms", "iOS, Android, Flutter, React Native, Next.js, WordPress, Shopify"],
  ["Typical MVP timeline", "12–16 weeks from discovery to store launch"],
  ["Engagement models", "MVP launch, full product, dedicated team, app upgrade"],
  ["Code ownership", "The client owns all code, designs and documentation"],
  ["Contact", siteConfig.contact.email],
];

/** Technologies the site describes working with — used for Organization `knowsAbout`. */
export const technologies = ["Swift", "SwiftUI", "Kotlin", "Jetpack Compose", "Flutter", "React Native", "Next.js", "React", "Node.js", "PostgreSQL", "Firebase", "Supabase", "WordPress", "Shopify"];
