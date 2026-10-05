import { buildMetadata } from "@/app/lib/metadata";
import InnerLayout from "@/app/components/shared/InnerLayout";
import Breadcrumbs from "@/app/components/shared/Breadcrumbs";
import PageHero from "@/app/components/shared/PageHero";
import ProcessTimeline from "@/app/components/shared/ProcessTimeline";
import CTASection from "@/app/components/shared/CTASection";
import type { ProcessStep } from "@/app/components/shared/ProcessTimeline";

export const metadata = buildMetadata({
  title: "Our Web & App Development Process | Kurchu",
  description:
    "From discovery and scoping through design, development, testing, launch and ongoing support. A clear, structured project process for every engagement.",
  path: "/process",
});

/* ── Data ─────────────────────────────────────── */

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Understand the business, the customers, the goals and the constraints before committing to any scope or technology decisions.",
    items: [
      "Business objectives",
      "Target customers",
      "Requirements gathering",
      "Existing systems review",
      "Competitor analysis",
      "Constraints and timeline",
    ],
  },
  {
    number: "02",
    title: "Scope",
    description:
      "Document everything that will be built, delivered and expected — so both sides agree on the project before work begins.",
    items: [
      "Functionality specification",
      "Deliverables list",
      "Assumptions and responsibilities",
      "Milestone schedule",
      "Pricing and payment terms",
      "Expected timeline",
    ],
  },
  {
    number: "03",
    title: "UX and Design",
    description:
      "Plan the structure, design the interface and confirm the responsive behaviour before development starts.",
    items: [
      "Page architecture",
      "User flows",
      "Wireframes where needed",
      "Interface design",
      "Responsive behaviour",
    ],
  },
  {
    number: "04",
    title: "Development",
    description:
      "Build the approved functionality and design using the selected technology stack, with regular progress updates and staging previews.",
  },
  {
    number: "05",
    title: "Review & Testing",
    description:
      "Systematically test the build across devices and scenarios before launch.",
    items: [
      "Responsive behaviour",
      "Major browser testing",
      "Important user workflows",
      "Forms and integrations",
      "Performance profiling",
      "Accessibility basics",
    ],
  },
  {
    number: "06",
    title: "Launch",
    description:
      "Deploy the website or application and complete all launch configuration — DNS, analytics, monitoring and any necessary redirects.",
  },
  {
    number: "07",
    title: "Support & Growth",
    description:
      "After launch, the product continues to improve through ongoing support and iterative development.",
    items: [
      "Maintenance and updates",
      "Feature development",
      "SEO and content growth",
      "Performance improvements",
      "Technical support",
    ],
  },
];

/* ── Page ──────────────────────────────────────── */

export default function ProcessPage() {
  return (
    <InnerLayout>
      <Breadcrumbs items={[{ label: "Process", href: "/process" }]} />

      <PageHero
        heading="A clear process from idea to launch."
        description="Good projects are easier when everyone understands what happens next. Kurchu uses defined project stages so requirements, design decisions and development progress remain visible throughout delivery."
      />

      {/* ── Timeline ───────────────────────────────── */}
      <section className="bg-[#fafbfc] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <ProcessTimeline steps={steps} />
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────── */}
      <CTASection
        heading="Know what is being built before you pay for surprises."
        ctaLabel="Tell Us About Your Project"
        ctaHref="/contact"
        dark
      />
    </InnerLayout>
  );
}
