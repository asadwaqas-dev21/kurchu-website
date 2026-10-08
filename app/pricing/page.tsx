import { buildMetadata } from "@/app/lib/metadata";
import InnerLayout from "@/app/components/shared/InnerLayout";
import Breadcrumbs from "@/app/components/shared/Breadcrumbs";
import PageHero from "@/app/components/shared/PageHero";
import SectionHeading from "@/app/components/shared/SectionHeading";
import { CheckIcon } from "@/app/components/shared/ServiceCard";

export const metadata = buildMetadata({
  title: "Pricing & Project Estimates | Kurchu Software Solutions",
  description:
    "Transparent pricing for mobile app projects, app upgrades and ongoing support. Request a detailed scope and fixed-price quote for your app.",
  path: "/pricing",
});

/* ── Data ─────────────────────────────────────── */

const engagements = [
  {
    title: "Mobile App Projects",
    description: "Android and iOS applications with backend services and admin tools.",
    includes: [
      "Product discovery",
      "UX/UI design",
      "Flutter development",
      "Backend and API development",
      "Testing and QA",
      "Store submission and launch",
    ],
    cta: "Request App Scope",
  },
  {
    title: "App Upgrades",
    description: "Live apps that need modernising, stabilising or extending.",
    includes: [
      "Fixed-price two-week audit",
      "Code, architecture and UX review",
      "Prioritised improvement plan",
      "Incremental migration",
      "Testing and QA",
      "Phased release",
    ],
    cta: "Request an App Audit",
  },
  {
    title: "Ongoing Support",
    description: "A monthly plan that keeps your app healthy and moving forward after launch.",
    includes: [
      "Monitoring and crash reporting",
      "Operating-system updates",
      "Bug fixes",
      "New releases",
      "Monthly product review",
      "Documentation kept current",
    ],
    cta: "Discuss a Support Plan",
  },
];

const pricingFactors = [
  "Project scope and complexity",
  "Number of screens and user roles",
  "Custom functionality requirements",
  "Third-party integrations",
  "Backend and API complexity",
  "Platforms — iOS, Android or both",
  "Admin dashboard requirements",
  "Ongoing support and maintenance",
];

/* ── Page ──────────────────────────────────────── */

export default function PricingPage() {
  return (
    <InnerLayout>
      <Breadcrumbs path="/pricing" />

      <PageHero
        heading="Honest pricing starts with clear scope."
        description="Every project is different. We scope each engagement individually and provide a written proposal with clear pricing before any work begins. No hourly billing surprises."
      />

      {/* ── Engagement Types ───────────────────────── */}
      <section className="bg-[#fafbfc] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {engagements.map((eng) => (
              <div
                key={eng.title}
                className="flex flex-col rounded-2xl border border-black/[0.07] bg-white p-7"
              >
                <h3 className="text-[19px] font-semibold text-[#0b1220]">{eng.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-black/55">
                  {eng.description}
                </p>

                <ul className="mt-5 flex flex-col gap-2.5 border-t border-black/[0.06] pt-5">
                  {eng.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[13.5px] text-black/60">
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="/contact"
                  className="mt-7 inline-flex items-center justify-center rounded-full bg-[#0b1220] px-5 py-3 text-[13.5px] font-medium text-white transition-colors hover:bg-[#182236]"
                >
                  {eng.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Factors ────────────────────────── */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <SectionHeading
            heading="What affects pricing"
            description="Every quote is based on the specific requirements of your project. These are the main factors that influence the final figure."
          />

          <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {pricingFactors.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[14px] text-black/60">
                <CheckIcon />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────── */}
      <section className="bg-[#fafbfc] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <SectionHeading
            heading="How pricing works"
            description="A straightforward process from first conversation to signed proposal."
          />

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Free consultation",
                description: "We discuss your project, understand the requirements and assess whether we are a good fit.",
              },
              {
                step: "02",
                title: "Detailed scope",
                description: "We document everything that will be built, including features, deliverables, timeline and pricing.",
              },
              {
                step: "03",
                title: "Written proposal",
                description: "You receive a clear proposal. If you approve, we begin. If not, there is no obligation or charge.",
              },
            ].map((s) => (
              <div key={s.step} className="border-t-2 border-[#0b1220] pt-5">
                <span className="text-[12px] font-medium text-black/40">{s.step}</span>
                <h3 className="mt-2 text-[17px] font-semibold text-[#0b1220]">{s.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-6 text-black/55">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </InnerLayout>
  );
}
