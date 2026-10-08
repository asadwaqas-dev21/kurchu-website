import { buildMetadata } from "@/app/lib/metadata";
import InnerLayout from "@/app/components/shared/InnerLayout";
import Breadcrumbs from "@/app/components/shared/Breadcrumbs";
import PageHero from "@/app/components/shared/PageHero";
import CTASection from "@/app/components/shared/CTASection";

export const metadata = buildMetadata({
  title: "About Kurchu Software Solutions | Lahore, Pakistan",
  description:
    "Learn about Kurchu Software Solutions, a web development, mobile app development and SEO company based in Lahore and serving businesses internationally.",
  path: "/classic/about",
  noIndex: true,
});

/* ── Data ─────────────────────────────────────── */

const principles = [
  {
    title: "Clear before clever",
    description:
      "Good technology solves a business problem in a way the people using it can understand. Complexity that does not serve the user or the business is removed.",
  },
  {
    title: "Scope before development",
    description:
      "Every project begins with a clear, written scope that defines what is being built, what it costs and when it will be delivered — before any development starts.",
  },
  {
    title: "Ownership instead of lock-in",
    description:
      "You own the code, design files and content. There are no proprietary platforms, mandatory hosting packages or recurring fees that create dependency.",
  },
  {
    title: "Business problems before technology",
    description:
      "Technology decisions are made based on what the project needs — not based on trends, preferences or the most interesting framework available.",
  },
  {
    title: "Long-term thinking",
    description:
      "Decisions about architecture, content and SEO are made with the understanding that a digital product should improve over years, not just look good at launch.",
  },
];

const devSeoReasons = [
  {
    heading: "Good websites need visibility",
    description:
      "A well-built website that nobody can find produces little business value. SEO should be considered from the first technical decision, not added after launch.",
  },
  {
    heading: "SEO depends on good technology",
    description:
      "Page speed, mobile usability, crawlable structure and structured data are technical requirements. Fixing them requires development capability, not just recommendations.",
  },
  {
    heading: "Apps need clear user problems",
    description:
      "Building features without understanding user needs creates products that feel complete but are rarely used. Discovery and planning come before design.",
  },
  {
    heading: "Strategy, development and growth work together",
    description:
      "Separating strategy, development and marketing across different agencies creates communication gaps. Combining them under one team produces better, faster results.",
  },
];

/* ── Page ──────────────────────────────────────── */

export default function AboutPage() {
  return (
    <InnerLayout>
      <Breadcrumbs items={[{ label: "About", href: "/about" }]} />

      <PageHero
        heading="We build the technology. Then we help people find it."
        description="Kurchu Software Solutions is a digital development company based in Lahore, Pakistan. We help businesses design, build and grow digital products through website development, mobile application development and SEO."
      />

      {/* ── Why Dev + SEO ──────────────────────────── */}
      <section className="bg-[#fafbfc] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <h2 className="max-w-lg text-[2rem] leading-[1.15] font-semibold tracking-tight text-[#0b1220] sm:text-[2.25rem]">
            Why development and SEO belong together
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {devSeoReasons.map((r) => (
              <div key={r.heading} className="rounded-2xl border border-black/[0.07] bg-white p-7 shadow-sm">
                <h3 className="text-[17px] font-semibold text-[#0b1220]">{r.heading}</h3>
                <p className="mt-3 text-[14px] leading-6 text-black/55">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Principles ─────────────────────────────── */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <h2 className="max-w-md text-[2rem] leading-[1.15] font-semibold tracking-tight text-[#0b1220] sm:text-[2.25rem]">
            How we work
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-7 text-black/55">
            These principles guide how we scope, plan and deliver every project.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <div key={p.title} className="border-t-2 border-[#0b1220] pt-6">
                <span className="text-[12px] font-medium text-black/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-[17px] font-semibold text-[#0b1220]">{p.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-6 text-black/55">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location ───────────────────────────────── */}
      <section className="bg-[#0b1220] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="max-w-md text-[2rem] leading-[1.15] font-semibold tracking-tight text-white sm:text-[2.25rem]">
                Based in Lahore, working internationally.
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-7 text-white/55">
                Kurchu Software Solutions is based in Lahore, Pakistan. We work with businesses locally and internationally — managing communication, proposals and project delivery remotely across time zones.
              </p>
              <a
                href="/contact"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-[13.5px] font-medium text-[#0b1220] transition-colors hover:bg-white/90"
              >
                Get in touch
              </a>
            </div>

            <div className="rounded-xl bg-white/[0.04] p-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[
                  { label: "Location", value: "Lahore, Pakistan" },
                  { label: "Working hours", value: "Mon – Fri, flexible across timezones" },
                  { label: "Languages", value: "English, Urdu" },
                  { label: "Communication", value: "Email, WhatsApp, video calls" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[12px] font-medium text-white/40">{item.label}</p>
                    <p className="mt-1 text-[14px] font-medium text-white/80">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Summary ───────────────────────── */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <h2 className="text-[2rem] leading-[1.15] font-semibold tracking-tight text-[#0b1220] sm:text-[2.25rem]">
            What we do
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                title: "Web Development",
                description: "Business websites, e-commerce, web applications and custom platforms.",
                href: "/web-development",
              },
              {
                title: "Mobile App Development",
                description: "Android and iOS applications using Flutter, with backend and admin tools.",
                href: "/mobile-app-development",
              },
              {
                title: "SEO Services",
                description: "Technical SEO, local SEO, content strategy and ongoing search optimisation.",
                href: "/seo-services",
              },
            ].map((service) => (
              <a
                key={service.title}
                href={service.href}
                className="group flex flex-col rounded-2xl border border-black/[0.07] bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="text-[17px] font-semibold text-[#0b1220]">{service.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-black/55">{service.description}</p>
                <span className="mt-auto pt-5 text-[13.5px] font-medium text-[#1e8fe0] group-hover:text-[#1470c4]">
                  Learn more →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────── */}
      <CTASection
        heading="Have a project in mind?"
        ctaLabel="Start a Conversation"
        ctaHref="/contact"
        dark
      />
    </InnerLayout>
  );
}
