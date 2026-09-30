import { buildMetadata } from "@/app/lib/metadata";
import InnerLayout from "@/app/components/shared/InnerLayout";
import Breadcrumbs from "@/app/components/shared/Breadcrumbs";
import PageHero from "@/app/components/shared/PageHero";
import CTASection from "@/app/components/shared/CTASection";

export const metadata = buildMetadata({
  title: "Web, App & SEO Projects | Kurchu Software Solutions",
  description:
    "Case studies and project examples from Kurchu Software Solutions. Website development, mobile app development and SEO projects for businesses worldwide.",
  path: "/work",
});

/* ── Data ─────────────────────────────────────── */

const projects = [
  {
    variant: "light" as const,
    tags: ["Website", "SEO"],
    client: "[Client Name]",
    industry: "[Industry]",
    description: "Website rebuild and local SEO campaign for a service-based business.",
    technology: "Next.js · Tailwind CSS · Google Business Profile",
    outcome: "[Verified Result]",
    outcomeLabel: "[Result description]",
  },
  {
    variant: "dark" as const,
    tags: ["Mobile App", "Dashboard"],
    client: "[Client Name]",
    industry: "[Industry]",
    description: "Booking app with admin dashboard for a UAE-based service company.",
    technology: "Flutter · Supabase · Firebase",
    outcome: "[Verified Result]",
    outcomeLabel: "[Result description]",
  },
  {
    variant: "light" as const,
    tags: ["E-commerce", "Website"],
    client: "[Client Name]",
    industry: "[Industry]",
    description: "Shopify store design and development with product photography direction.",
    technology: "Shopify · Custom Theme · SEO",
    outcome: "[Verified Result]",
    outcomeLabel: "[Result description]",
  },
  {
    variant: "dark" as const,
    tags: ["Web Application", "API"],
    client: "[Client Name]",
    industry: "[Industry]",
    description: "Custom internal dashboard and reporting platform for operations management.",
    technology: "React · TypeScript · Supabase",
    outcome: "[Verified Result]",
    outcomeLabel: "[Result description]",
  },
];

/* ── Case Study Detail Template (reusable structure) ── */
const caseStudyStructure = [
  "Overview",
  "Client / Industry",
  "Challenge",
  "Strategy",
  "What We Built",
  "Technology",
  "Outcome",
  "Gallery",
  "Testimonial",
  "Next Project",
];

/* ── Page ──────────────────────────────────────── */

export default function WorkPage() {
  return (
    <InnerLayout>
      <Breadcrumbs items={[{ label: "Work", href: "/work" }]} />

      <PageHero
        heading="Work measured by what changed."
        description="Screenshots show what a project looked like. A useful case study explains the problem, the work and the outcome."
      />

      {/* ── Project Grid ───────────────────────────── */}
      <section className="bg-[#fafbfc] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {projects.map((p, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white"
              >
                {/* Preview area */}
                <div
                  className={`flex h-56 items-center justify-center ${
                    p.variant === "dark" ? "bg-[#0b1220]" : "bg-[#eff8ff]"
                  }`}
                >
                  {p.variant === "light" ? (
                    <span className="rounded-lg border-2 border-dashed border-[#1e8fe0]/30 px-8 py-10 text-[12px] font-medium text-[#1e8fe0]/60">
                      [Project screenshot]
                    </span>
                  ) : (
                    <div className="flex items-end gap-3">
                      <span className="flex h-32 w-20 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-center text-[9px] font-medium text-white/40">
                        [App screen]
                      </span>
                      <span className="flex h-40 w-20 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-center text-[9px] font-medium text-white/40">
                        [App screen]
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[15px] font-semibold text-[#0b1220]">{p.client}</p>
                      <p className="mt-0.5 text-[12px] text-black/40">{p.industry}</p>
                    </div>
                    <div className="flex gap-2">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-black/[0.04] px-3 py-1 text-[11.5px] font-medium text-black/55"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="mt-3 text-[14px] leading-6 text-black/55">
                    {p.description}
                  </p>

                  <p className="mt-3 text-[11.5px] font-medium text-black/35">
                    {p.technology}
                  </p>

                  <div className="mt-5 border-t border-black/[0.06] pt-4">
                    <p className="text-[18px] font-semibold text-[#0b1220]">{p.outcome}</p>
                    <p className="text-[12px] text-black/40">{p.outcomeLabel}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case Study Structure Note ──────────────── */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <h2 className="text-[2rem] leading-[1.15] font-semibold tracking-tight text-[#0b1220] sm:text-[2.25rem]">
            Case study structure
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-black/55">
            Each detailed case study follows a consistent structure so you can understand the context, the work and the results.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {caseStudyStructure.map((item, i) => (
              <div key={item} className="rounded-xl border border-black/[0.07] bg-[#fafbfc] p-4">
                <span className="text-[11px] font-medium text-black/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-1 text-[13px] font-semibold text-[#0b1220]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────── */}
      <CTASection
        heading="Have a project you would like to discuss?"
        ctaLabel="Start a Conversation"
        ctaHref="/contact"
        dark
      />
    </InnerLayout>
  );
}
