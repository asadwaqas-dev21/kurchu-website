import { buildMetadata } from "@/app/lib/metadata";
import InnerLayout from "@/app/components/shared/InnerLayout";
import Breadcrumbs from "@/app/components/shared/Breadcrumbs";
import PageHero from "@/app/components/shared/PageHero";
import SectionHeading from "@/app/components/shared/SectionHeading";
import { CheckIcon } from "@/app/components/shared/ServiceCard";
import TechStack from "@/app/components/shared/TechStack";
import FAQSection from "@/app/components/shared/FAQSection";
import CTASection from "@/app/components/shared/CTASection";

export const metadata = buildMetadata({
  title: "Web Development Company in Lahore | Kurchu Software Solutions",
  description:
    "Custom websites, WordPress, Shopify, Next.js and web applications built by Kurchu Software Solutions for businesses in Pakistan and worldwide.",
  path: "/web-development",
});

/* ── Data ─────────────────────────────────────── */

const services = [
  {
    title: "Business Websites",
    description:
      "Professional websites for startups, service companies and established businesses. Designed around clear calls to action and the information your customers actually need.",
  },
  {
    title: "WordPress Development",
    description:
      "Flexible, manageable websites for teams that need to update content internally. Custom themes, plugin configuration and reliable hosting setup.",
  },
  {
    title: "Shopify & E-commerce",
    description:
      "Online stores designed around product discovery, conversions, payments and straightforward management. Shopify, WooCommerce and custom solutions.",
  },
  {
    title: "Next.js & React Development",
    description:
      "Performance-focused custom websites and interfaces for businesses requiring greater flexibility, faster load times and modern development architecture.",
  },
  {
    title: "Custom Web Applications",
    description:
      "Dashboards, portals, booking systems, SaaS products and internal web tools. Built around your specific workflows and business logic.",
  },
  {
    title: "Website Redesign",
    description:
      "Modernise an outdated, slow or difficult-to-use website while protecting important content and search visibility through careful migration planning.",
  },
];

const included = [
  "UX planning",
  "Responsive design",
  "Frontend development",
  "CMS configuration",
  "Forms and booking systems",
  "E-commerce functionality",
  "Payment integrations",
  "Analytics setup",
  "Technical SEO foundations",
  "Structured data where appropriate",
  "Performance optimisation",
  "Security configuration",
  "Redirects and migration",
  "Deployment and hosting setup",
  "Documentation and handover",
];

const processSteps = [
  { title: "Discovery", description: "Understand your business, customers and goals." },
  { title: "Structure", description: "Plan pages, information architecture and user flows." },
  { title: "Design", description: "Create responsive interface designs you review before development." },
  { title: "Development", description: "Build, integrate and optimise every page and feature." },
  { title: "Testing", description: "Cross-browser testing, accessibility review and performance checks." },
  { title: "Launch", description: "Deploy, configure analytics, and complete the handover." },
  { title: "Support", description: "Ongoing maintenance, updates and growth after launch." },
];

const technologies = [
  { name: "Next.js", description: "Server-rendered React framework for fast, SEO-friendly web applications." },
  { name: "React", description: "Component-based UI library for building interactive interfaces." },
  { name: "TypeScript", description: "Typed JavaScript for more reliable, maintainable codebases." },
  { name: "WordPress", description: "Content management for teams that need to edit pages and posts themselves." },
  { name: "Shopify", description: "Hosted e-commerce platform for product-based businesses." },
  { name: "Supabase", description: "Open-source backend with authentication, database and real-time features." },
  { name: "Firebase", description: "Google-backed backend for authentication, hosting and cloud functions." },
];

const seoFeatures = [
  "Crawlable navigation structure",
  "Logical page architecture",
  "Proper heading hierarchy",
  "Page-level metadata",
  "Internal linking strategy",
  "Performance optimisation",
  "Mobile usability",
  "Structured data where appropriate",
];

const faqs = [
  {
    q: "How long does website development take?",
    a: "Timelines depend on scope. A business website typically takes four to eight weeks from discovery to launch. E-commerce and custom web applications require longer depending on functionality, integrations and content volume. Every proposal includes a week-by-week timeline.",
  },
  {
    q: "Can I update the website myself?",
    a: "Yes. If content management is part of the brief, we configure a CMS — typically WordPress or a headless solution — so your team can edit pages, blog posts and product listings without touching code.",
  },
  {
    q: "Do I own the finished website?",
    a: "Yes. You own the code, design files and all content once the project is paid in full. There is no ongoing lock-in or proprietary platform dependency.",
  },
  {
    q: "Can you redesign my current website?",
    a: "Yes. We audit the existing site, identify what to preserve and what to improve, plan redirects for important pages, and rebuild with a modern stack while protecting existing search visibility.",
  },
  {
    q: "Can Kurchu provide website development and SEO together?",
    a: "Yes. Because we handle both development and SEO, technical recommendations are implemented directly rather than passed between separate agencies. This tends to produce better results and fewer communication delays.",
  },
];

/* ── Page ──────────────────────────────────────── */

export default function WebDevelopmentPage() {
  return (
    <InnerLayout>
      <Breadcrumbs items={[{ label: "Web Development", href: "/web-development" }]} />

      <PageHero
        badge="Web Development"
        heading="Web development built around what your customers need to do next."
        description="A business website should create action. Whether you need more enquiries, bookings, online sales, customer accounts or a custom digital platform, Kurchu designs and develops websites around real business goals."
        primaryCta="Request a Website Quote"
        primaryHref="/contact"
        secondaryCta="View Our Work"
        secondaryHref="/work"
      />

      {/* ── Services Grid ─────────────────────────── */}
      <section className="bg-[#fafbfc] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <SectionHeading
            heading="Website services"
            description="From single-page business sites to complex web applications. Every project includes planning, responsive design, performance and SEO foundations."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="flex flex-col rounded-2xl border border-black/[0.07] bg-white p-7 shadow-sm"
              >
                <h3 className="text-[17px] font-semibold text-[#0b1220]">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-black/55">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What is Included ──────────────────────── */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <SectionHeading
            heading="What is included"
            description="Every website project includes the foundations needed for a professional, findable and maintainable website."
          />

          <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[14px] text-black/60">
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Technology ─────────────────────────────── */}
      <TechStack
        heading="Technology selected for the project"
        description="We recommend technology based on project requirements, team capability and long-term maintenance — not personal preference."
        technologies={technologies}
      />

      {/* ── Development Process ────────────────────── */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <SectionHeading
            heading="Development process"
            description="Clear stages so you always know what has been completed, what is next and when the project will be ready."
          />

          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {processSteps.map((step, i) => (
              <div key={step.title} className="border-t-2 border-[#0b1220] pt-5">
                <span className="text-[12px] font-medium text-black/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-[17px] font-semibold text-[#0b1220]">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-5 text-black/55">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO-Ready Development ──────────────────── */}
      <section className="bg-[#0b1220] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="max-w-md text-[2rem] leading-[1.15] font-semibold tracking-tight text-white sm:text-[2.25rem]">
                SEO should be part of the build, not an afterthought.
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-7 text-white/55">
                Retrofitting SEO into a finished website often means reworking structure, rewriting content and fixing performance issues that could have been avoided. Kurchu considers search visibility from the first technical decision.
              </p>
              <a
                href="/seo-services"
                className="mt-6 inline-block text-[13.5px] font-medium text-[#5fb3ef] hover:text-white"
              >
                Learn about our SEO services →
              </a>
            </div>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {seoFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13.5px] leading-5 text-white/60">
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                    <path d="M3.5 8.5l3 3 6-7" stroke="#5fb3ef" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────── */}
      <FAQSection heading="Web development FAQ" items={faqs} />

      {/* ── Final CTA ──────────────────────────────── */}
      <CTASection
        heading="Ready to build a better website?"
        ctaLabel="Get a Website Development Quote"
        ctaHref="/contact"
        dark
      />
    </InnerLayout>
  );
}
