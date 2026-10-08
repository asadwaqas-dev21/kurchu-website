/** ──────────────────────────────────────────────
 *  llms.txt (https://llmstxt.org) — a plain-Markdown guide to the site for
 *  AI assistants. Built from the same data as the pages, so it never drifts.
 * ──────────────────────────────────────────────*/
import { posts } from "./blog";
import { companyFacts, companySummary } from "./facts";
import { regionPath, regions } from "./regions";
import { serviceLines } from "./services";
import { siteConfig } from "./site-config";
import { faqs } from "@/app/premium-app-development/data";

const url = (path: string) => `${siteConfig.url}${path}`;

const company = [
  ["Services overview", "/services", "All three service lines, engagement models and a scope estimator."],
  ["Selected work", "/work", "Concept case studies in fintech, healthcare, mobility and commerce."],
  ["Process", "/process", "The eight delivery stages, what each produces and how clients are involved."],
  ["Technology", "/technology", "Reference architecture and the engineering standard applied to every build."],
  ["About", "/about", "Who Kurchu is, how the team works and why clients choose it."],
  ["Pricing", "/pricing", "How projects are priced and estimated."],
  ["Contact", "/contact", "Start a project; replies within one working day."],
];

export function llmsTxt() {
  return [
    `# ${siteConfig.name}`,
    "",
    `> ${companySummary}`,
    "",
    "## Key facts",
    ...companyFacts.map(([term, detail]) => `- ${term}: ${detail}`),
    "",
    "## Services",
    ...serviceLines.map((s) => `- [${s.name}](${url(s.path)}): ${s.description}`),
    "",
    "## Markets",
    `- [All locations](${url("/locations")}): How the four markets compare — time zone, privacy law, payments and languages.`,
    ...regions.map(
      (r) => `- [${r.name}](${url(regionPath(r))}): ${r.privacyLaw}; ${r.languages}; ${r.timeZone.difference}`,
    ),
    "",
    "## Company",
    ...company.map(([name, path, desc]) => `- [${name}](${url(path)}): ${desc}`),
    "",
    "## Articles",
    ...posts.map((p) => `- [${p.title}](${url(`/blog/${p.slug}`)}): ${p.excerpt}`),
    "",
    "## Optional",
    `- [Full text for AI assistants](${url("/llms-full.txt")}): Every FAQ answer and market detail in one file.`,
    `- [Sitemap](${url("/sitemap.xml")})`,
    "",
  ].join("\n");
}

export function llmsFullTxt() {
  const marketSections = regions.flatMap((r) => [
    `### ${r.name} (${url(regionPath(r))})`,
    "",
    r.hero.lede,
    "",
    `- Time zone: ${r.timeZone.difference} ${r.timeZone.callWindow}`,
    `- Privacy & compliance: ${r.compliance.join("; ")}`,
    `- Payments & integrations: ${r.payments.join("; ")}`,
    `- Localisation & accessibility: ${r.localisation.join("; ")}`,
    "",
    ...r.faqs.flatMap((f) => [`**${f.q}**`, f.a, ""]),
  ]);

  return [
    llmsTxt(),
    "## Frequently asked questions",
    "",
    ...faqs.flatMap((f) => [`**${f.q}**`, f.a, ""]),
    "## Market details",
    "",
    ...marketSections,
  ].join("\n");
}
