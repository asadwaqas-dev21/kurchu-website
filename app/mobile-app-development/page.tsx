import { buildMetadata } from "@/app/lib/metadata";
import InnerLayout from "@/app/components/shared/InnerLayout";
import Breadcrumbs from "@/app/components/shared/Breadcrumbs";
import PageHero from "@/app/components/shared/PageHero";
import SectionHeading from "@/app/components/shared/SectionHeading";
import { CheckIcon } from "@/app/components/shared/ServiceCard";
import TechStack from "@/app/components/shared/TechStack";
import FAQSection from "@/app/components/shared/FAQSection";
import CTASection from "@/app/components/shared/CTASection";
import RelatedServices from "@/app/components/shared/RelatedServices";

export const metadata = buildMetadata({
  title: "Mobile App Development Company — UK, USA, Canada & UAE | Kurchu",
  description:
    "Custom iOS and Android app development with Flutter, Firebase and Supabase for businesses in the UK, USA, Canada and UAE — from UX to launch and support.",
  path: "/mobile-app-development",
});

/* ── Data ─────────────────────────────────────── */

const appTypes = [
  {
    title: "Business Applications",
    description: "Custom apps that digitise core business workflows — staff management, client portals and service delivery tools.",
  },
  {
    title: "Booking Applications",
    description: "Real-time scheduling, availability management, reminders and payment integration for service-based businesses.",
  },
  {
    title: "Restaurant & Ordering Apps",
    description: "Menu management, online ordering, table booking and kitchen display systems for hospitality businesses.",
  },
  {
    title: "Delivery Applications",
    description: "Order tracking, driver assignment, route optimisation and customer notifications for logistics workflows.",
  },
  {
    title: "Marketplace Apps",
    description: "Multi-vendor platforms connecting buyers and sellers with listings, payments and review systems.",
  },
  {
    title: "Customer Loyalty Apps",
    description: "Points, rewards, push notification campaigns and engagement analytics to increase repeat business.",
  },
  {
    title: "Internal Operations Apps",
    description: "Field service tools, inventory management, reporting dashboards and team communication for internal teams.",
  },
  {
    title: "MVP Development",
    description: "Focused first releases that validate a product idea with real users before committing to a full feature set.",
  },
];

const backendFeatures = [
  "User authentication",
  "Cloud databases",
  "REST and GraphQL APIs",
  "Admin dashboards",
  "Payment processing",
  "Push notifications",
  "File uploads and storage",
  "Analytics and event tracking",
  "Maps and location services",
  "Third-party API integrations",
  "Firebase backend services",
  "Supabase backend services",
];

const processSteps = [
  { title: "Product Discovery", description: "Understand the problem the app should solve, the users and the business model." },
  { title: "Feature Scope", description: "Define what the first version includes and what can wait for a future release." },
  { title: "UX & UI Design", description: "Design the user experience, navigation and visual interface across all key screens." },
  { title: "Development", description: "Build the app, backend services and admin tools in iterative development sprints." },
  { title: "Testing", description: "Device testing, performance profiling, edge-case handling and accessibility checks." },
  { title: "Store Preparation", description: "Prepare App Store and Google Play listings, screenshots, descriptions and compliance." },
  { title: "Launch", description: "Submit the app for review, manage the release and configure production monitoring." },
  { title: "Ongoing Development", description: "New features, performance improvements, user feedback and platform updates after launch." },
];

const existingAppSupport = [
  "New feature development",
  "UI/UX improvements",
  "Backend integrations",
  "Flutter migration",
  "Admin dashboard development",
  "Ongoing maintenance",
  "Performance improvements",
];

const technologies = [
  { name: "Flutter", description: "Cross-platform framework for building native Android and iOS apps from one codebase." },
  { name: "Dart", description: "Strongly typed language optimised for building fast mobile interfaces." },
  { name: "Firebase", description: "Authentication, cloud functions, real-time database and hosting from Google." },
  { name: "Supabase", description: "Open-source backend with PostgreSQL, authentication and real-time subscriptions." },
  { name: "REST APIs", description: "Standard API architecture for connecting apps to existing services and data." },
  { name: "Google Play & App Store", description: "Store submission, listing optimisation and compliance management." },
];

const faqs = [
  {
    q: "Can one app work on Android and iPhone?",
    a: "Yes. Using Flutter, we build from a single codebase that compiles to native Android and iOS applications. This reduces development time and cost while keeping smooth, native-feeling performance on both platforms. Where a product depends heavily on device-specific features, we may recommend fully native Swift and Kotlin instead, and we explain that recommendation and its costs in writing before you decide.",
  },
  {
    q: "Do I need an admin dashboard?",
    a: "Most apps that manage bookings, orders, content or users benefit from an admin dashboard. We build admin interfaces alongside the app, so your team can manage customers, update content, process orders and view reports without contacting a developer. Access is role-based, so staff only see what they need, and the dashboard works in any modern browser on desktop or tablet.",
  },
  {
    q: "Can you integrate the app with my website?",
    a: "Yes. If you have an existing website, or are building one alongside the app, we can share authentication, data and APIs between both platforms. Customers then use one account everywhere, see the same orders and content on web and mobile, and enjoy a consistent experience. A single shared backend also means less duplicated work and lower long-term maintenance costs for your business.",
  },
  {
    q: "Can Kurchu assist with App Store and Google Play submission?",
    a: "Yes. We prepare the store listings, screenshots, app descriptions and privacy policies, then handle the full submission process for both the App Store and Google Play. We also manage any reviewer feedback or compliance issues during approval and resubmit as needed. Submissions are made under your own developer accounts, so you keep full ownership of the app and its store listings.",
  },
  {
    q: "How much does an app cost?",
    a: "App costs depend on the number of screens, features, backend complexity and integrations required, so we never quote blind. We scope every project individually and provide a written proposal with clear, itemised pricing before any work begins. Projects are usually split into phases with a fixed price for each, so you can launch a focused first version and expand it later.",
  },
];

/* ── Page ──────────────────────────────────────── */

export default function MobileAppDevelopmentPage() {
  return (
    <InnerLayout>
      <Breadcrumbs path="/mobile-app-development" />

      <PageHero
        badge="Mobile App Development"
        heading="Mobile apps designed around a real reason to exist."
        description="When customers need frequent access, booking, ordering, notifications, location features or a dedicated digital experience, a mobile app can become an important part of the business. Kurchu designs and develops custom mobile applications for startups and established businesses."
        primaryCta="Discuss Your App Idea"
        primaryHref="/contact"
      />

      {/* ── App Types Grid ────────────────────────── */}
      <section className="bg-[#fafbfc] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <SectionHeading
            heading="Types of apps we build"
            description="Every app starts with a clear use case. We build mobile applications for businesses that need customers or teams to interact through a dedicated, always-available interface."
          />

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {appTypes.map((app) => (
              <div
                key={app.title}
                className="flex flex-col rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm"
              >
                <h3 className="text-[16px] font-semibold text-[#0b1220]">{app.title}</h3>
                <p className="mt-2 text-[13px] leading-5 text-black/55">{app.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Flutter Section ────────────────────────── */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="max-w-md text-[2rem] leading-[1.15] font-semibold tracking-tight text-[#0b1220] sm:text-[2.25rem]">
                Cross-platform development with Flutter
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-7 text-black/55">
                Flutter allows us to build Android and iOS applications from a single shared codebase. This means faster development, lower cost and consistent behaviour across devices — without sacrificing native performance.
              </p>
              <p className="mt-4 max-w-md text-[14px] leading-6 text-black/45">
                Flutter is not always the right choice. For projects requiring deep native platform integration or highly platform-specific features, we recommend the most appropriate approach during discovery.
              </p>
            </div>

            <div className="rounded-2xl border border-black/[0.07] bg-[#fafbfc] p-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "One codebase", detail: "Shared code for Android and iOS" },
                  { label: "Native performance", detail: "Compiled to native ARM code" },
                  { label: "Fast iteration", detail: "Hot reload during development" },
                  { label: "Lower cost", detail: "One team, one build, two platforms" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[15px] font-semibold text-[#0b1220]">{item.label}</p>
                    <p className="mt-1 text-[12px] text-black/50">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Backend & Integrations ─────────────────── */}
      <section className="bg-[#fafbfc] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <SectionHeading
            heading="Backend and integrations"
            description="Most apps require server-side logic, data storage and third-party integrations. We build the backend alongside the app so everything works together."
          />

          <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {backendFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[14px] text-black/60">
                <CheckIcon />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── App Development Process ────────────────── */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <SectionHeading
            heading="App development process"
            description="Structured stages from idea validation through store submission and ongoing development."
          />

          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* ── MVP Section ────────────────────────────── */}
      <section className="bg-[#0b1220] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="max-w-md text-[2rem] leading-[1.15] font-semibold tracking-tight text-white sm:text-[2.25rem]">
                Start with the features that prove the idea.
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-7 text-white/55">
                Building every feature before launch is risky and expensive. A minimum viable product focuses on the core functionality that lets real users validate the concept. Kurchu helps define what belongs in the first release and what can be added once the idea is proven.
              </p>
              <a
                href="/contact"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-[13.5px] font-medium text-[#0b1220] transition-colors hover:bg-white/90"
              >
                Discuss an MVP
              </a>
            </div>

            <div className="rounded-xl bg-white/[0.04] p-6">
              <p className="text-[13px] font-semibold text-white">Typical MVP scope</p>
              <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {["Core user flow", "Authentication", "Essential screens", "Backend API", "Admin basics", "Store submission"].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13px] leading-5 text-white/60">
                    <CheckIcon light />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Existing App Support ───────────────────── */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <SectionHeading
            heading="Existing app support"
            description="Already have an app that needs improvement, new features or ongoing development? We take over existing projects and improve them."
          />

          <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {existingAppSupport.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[14px] text-black/60">
                <CheckIcon />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Technology ─────────────────────────────── */}
      <TechStack
        heading="Technology"
        description="We select technology based on each project's requirements. These are the tools we use most frequently for mobile app development."
        technologies={technologies}
      />

      {/* ── FAQ ────────────────────────────────────── */}
      <FAQSection heading="App development FAQ" items={faqs} />

      {/* ── Final CTA ──────────────────────────────── */}
      <RelatedServices current="/mobile-app-development" />

      <CTASection
        heading="Have an app idea?"
        description="Tell us what people should be able to do inside the application and what business problem you want it to solve."
        ctaLabel="Request an App Consultation"
        ctaHref="/contact"
        dark
      />
    </InnerLayout>
  );
}
