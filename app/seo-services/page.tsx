import { buildMetadata } from "@/app/lib/metadata";
import InnerLayout from "@/app/components/shared/InnerLayout";
import Breadcrumbs from "@/app/components/shared/Breadcrumbs";
import PageHero from "@/app/components/shared/PageHero";
import SectionHeading from "@/app/components/shared/SectionHeading";
import { CheckIcon } from "@/app/components/shared/ServiceCard";
import FAQSection from "@/app/components/shared/FAQSection";
import CTASection from "@/app/components/shared/CTASection";

export const metadata = buildMetadata({
  title: "SEO Services in Lahore & Pakistan | Kurchu Software Solutions",
  description:
    "Technical SEO, local SEO, on-page optimisation, SEO content and search strategy for businesses in Lahore, Pakistan and international markets.",
  path: "/seo-services",
});

/* ── Data ─────────────────────────────────────── */

const seoServices = [
  { title: "SEO Audit", description: "Comprehensive analysis of technical health, content, structure, and competitive positioning." },
  { title: "Keyword Research", description: "Identify the searches your customers actually make and prioritise terms with genuine business value." },
  { title: "Competitor Research", description: "Analyse competitor visibility, content strategy, backlink profiles and identify actionable gaps." },
  { title: "Technical SEO", description: "Fix crawlability, indexation, site speed, structured data and architecture issues that limit visibility." },
  { title: "On-page SEO", description: "Optimise page titles, headings, content, internal links and metadata for target search queries." },
  { title: "Local SEO", description: "Improve visibility in Google Maps, local search results and location-specific queries." },
  { title: "Google Business Profile", description: "Set up, verify, optimise and maintain your Google Business Profile for local visibility." },
  { title: "SEO Content", description: "Plan and create content that answers genuine search intent and supports your service pages." },
  { title: "Internal Linking", description: "Build a logical link structure that helps users and search engines navigate your site effectively." },
  { title: "Authority Building", description: "Earn relevant links, citations and mentions that strengthen your domain authority over time." },
  { title: "SEO Reporting", description: "Monthly reports covering rankings, traffic, conversions and the work completed during each period." },
];

const technicalSeoItems = [
  "Crawlability and indexation",
  "XML sitemap configuration",
  "Canonical URL management",
  "Redirect strategy and implementation",
  "Site architecture review",
  "Core Web Vitals optimisation",
  "Mobile usability",
  "Internal link structure",
  "Structured data implementation",
  "Duplicate content resolution",
];

const localSeoItems = [
  "Google Business Profile setup and optimisation",
  "Consistent NAP information across directories",
  "Local service pages for target areas",
  "Local citation building",
  "Review strategy and management",
  "Local structured data",
  "Location-focused content",
];

const campaignProcess = [
  {
    phase: "Month 1",
    title: "Research and technical foundations",
    items: [
      "SEO audit and competitor analysis",
      "Keyword research and prioritisation",
      "Technical SEO fixes",
      "Google Business Profile setup",
      "Analytics and tracking configuration",
    ],
  },
  {
    phase: "Month 2–3",
    title: "Fixes, optimisation and content expansion",
    items: [
      "Service page optimisation",
      "Local SEO implementation",
      "Content creation and publishing",
      "Internal linking improvements",
      "On-page optimisation across key pages",
    ],
  },
  {
    phase: "Ongoing",
    title: "Content growth and authority building",
    items: [
      "New content based on search demand",
      "Authority building and link acquisition",
      "Internal linking expansion",
      "Conversion rate improvements",
      "Performance analysis and strategy refinement",
    ],
  },
];

const modernSearchChannels = [
  { label: "Google organic search", description: "Traditional blue-link results for informational and commercial queries." },
  { label: "Local results and Google Maps", description: "Map pack visibility for location-based service searches." },
  { label: "Rich results", description: "FAQ, review, and structured data enhanced listings." },
  { label: "AI-assisted search experiences", description: "Visibility in AI-generated summaries and conversational search results." },
];

const faqs = [
  {
    q: "How quickly does SEO work?",
    a: "Early technical fixes can produce improvements within weeks. Meaningful ranking movement for competitive terms typically requires three to six months of consistent work. Results depend on the starting position, competition and the scope of work.",
  },
  {
    q: "Do you guarantee first-page rankings?",
    a: "No. No SEO provider can guarantee specific rankings because search algorithms are controlled by Google, not by any external company. We focus on building strong technical foundations, creating genuinely useful content and improving authority over time.",
  },
  {
    q: "Do you provide local SEO?",
    a: "Yes. Local SEO is a core part of our service. We optimise Google Business Profiles, build local citations, create location-focused content and implement local structured data to improve visibility in map and local search results.",
  },
  {
    q: "Do you write SEO content?",
    a: "Yes. We plan content around genuine search intent and customer needs, then write and publish it. Content exists to answer real questions your customers have — not simply to create more pages.",
  },
  {
    q: "Can you fix technical SEO problems?",
    a: "Yes. Because we are also a development company, we can implement technical SEO fixes directly — including site speed improvements, structured data, redirect management, crawl fixes and architecture changes.",
  },
  {
    q: "Can Kurchu redesign my website and handle SEO?",
    a: "Yes. Handling both development and SEO under one roof means technical recommendations are implemented correctly during the build, redirects are managed properly during migration, and SEO strategy informs the site structure from the start.",
  },
];

/* ── Page ──────────────────────────────────────── */

export default function SeoServicesPage() {
  return (
    <InnerLayout>
      <Breadcrumbs items={[{ label: "SEO Services", href: "/seo-services" }]} />

      <PageHero
        badge="SEO Services"
        heading="SEO focused on qualified visibility, not vanity rankings."
        description="Ranking for keywords that never create business has little value. Kurchu builds SEO strategies around how potential customers actually search for your products and services."
        primaryCta="Request an SEO Audit"
        primaryHref="/contact"
      />

      {/* ── SEO Services Grid ─────────────────────── */}
      <section className="bg-[#fafbfc] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            heading="SEO services"
            description="From technical foundations to content strategy and local visibility. Each service can be part of an ongoing campaign or delivered as standalone work."
          />

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {seoServices.map((s) => (
              <div key={s.title} className="flex flex-col rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm">
                <h3 className="text-[16px] font-semibold text-[#0b1220]">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-5 text-black/55">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technical SEO ──────────────────────────── */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="max-w-md text-[2rem] leading-[1.15] font-semibold tracking-tight text-[#0b1220] sm:text-[2.25rem]">
                Technical SEO
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-7 text-black/55">
                Technical SEO ensures search engines can efficiently crawl, understand and index your website. Without strong technical foundations, content and authority building deliver diminished results.
              </p>
              <a
                href="/web-development"
                className="mt-6 inline-block text-[13.5px] font-medium text-[#1e8fe0] hover:text-[#1470c4]"
              >
                Learn about our web development →
              </a>
            </div>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {technicalSeoItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[14px] text-black/60">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Local SEO ──────────────────────────────── */}
      <section className="bg-[#fafbfc] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="max-w-md text-[2rem] leading-[1.15] font-semibold tracking-tight text-[#0b1220] sm:text-[2.25rem]">
                Local SEO
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-7 text-black/55">
                For businesses that serve customers in specific geographic areas, local SEO improves visibility in Google Maps, the local map pack and location-modified search queries.
              </p>
            </div>

            <ul className="grid grid-cols-1 gap-3">
              {localSeoItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[14px] text-black/60">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Content Strategy ───────────────────────── */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[2rem] leading-[1.15] font-semibold tracking-tight text-[#0b1220] sm:text-[2.25rem]">
              SEO content strategy
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-black/55">
              Content should exist to answer genuine search intent and customer needs — not simply to create more pages. We plan content around the questions, comparisons and decisions your potential customers make during the buying process, then create useful pages that earn visibility and build trust.
            </p>
          </div>
        </div>
      </section>

      {/* ── Campaign Process ───────────────────────── */}
      <section className="bg-[#0b1220] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="max-w-md text-[2rem] leading-[1.15] font-semibold tracking-tight text-white sm:text-[2.25rem]">
            SEO campaign process
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-7 text-white/55">
            SEO is an ongoing process. These phases outline a typical campaign progression, though the exact timing depends on each project.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {campaignProcess.map((phase) => (
              <div key={phase.phase} className="rounded-xl bg-white/[0.04] p-6">
                <span className="text-[12px] font-medium text-[#5fb3ef]">{phase.phase}</span>
                <h3 className="mt-2 text-[17px] font-semibold text-white">{phase.title}</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[13px] leading-5 text-white/60">
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                        <path d="M3.5 8.5l3 3 6-7" stroke="#5fb3ef" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO + Development ──────────────────────── */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="max-w-md text-[2rem] leading-[1.15] font-semibold tracking-tight text-[#0b1220] sm:text-[2.25rem]">
                SEO and development under one roof.
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-7 text-black/55">
                Many SEO agencies identify technical problems but cannot fix them. Because Kurchu builds websites and applications, our technical SEO recommendations are implemented directly — without sending a list of changes to a separate development team and waiting weeks for action.
              </p>
              <a
                href="/web-development"
                className="mt-6 inline-block text-[13.5px] font-medium text-[#1e8fe0] hover:text-[#1470c4]"
              >
                Explore web development →
              </a>
            </div>

            <div className="rounded-2xl border border-black/[0.07] bg-[#fafbfc] p-8">
              <div className="flex flex-col gap-6">
                {[
                  { label: "Identify", detail: "Find the technical SEO issue" },
                  { label: "Implement", detail: "Fix it directly in the codebase" },
                  { label: "Verify", detail: "Confirm the fix in search tools" },
                  { label: "Monitor", detail: "Track the impact over time" },
                ].map((step, i) => (
                  <div key={step.label} className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0b1220] text-[12px] font-semibold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-[15px] font-semibold text-[#0b1220]">{step.label}</p>
                      <p className="mt-0.5 text-[13px] text-black/50">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Modern Search ──────────────────────────── */}
      <section className="bg-[#fafbfc] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            heading="Visibility across modern search"
            description="Search is no longer just ten blue links. We build visibility across the different ways people now find businesses online."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {modernSearchChannels.map((c) => (
              <div key={c.label} className="rounded-2xl border border-black/[0.07] bg-white p-7 shadow-sm">
                <h3 className="text-[16px] font-semibold text-[#0b1220]">{c.label}</h3>
                <p className="mt-2 text-[13.5px] leading-6 text-black/55">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────── */}
      <FAQSection heading="SEO FAQ" items={faqs} />

      {/* ── Final CTA ──────────────────────────────── */}
      <CTASection
        heading="Want to know what is holding your website back?"
        ctaLabel="Request an SEO Consultation"
        ctaHref="/contact"
        dark
      />
    </InnerLayout>
  );
}
