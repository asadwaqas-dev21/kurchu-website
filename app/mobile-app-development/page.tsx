import type { Viewport } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/shared/JsonLd";
import { appIdeaPath, appIdeas } from "@/app/lib/app-ideas";
import { MIN_PRICE, formatUsd, priceFor, type FeatureKey } from "@/app/lib/estimator";
import { faqPageJsonLd, serviceJsonLd } from "@/app/lib/jsonld";
import { buildMetadata } from "@/app/lib/metadata";
import { PRICE_EXAMPLES, PRICE_SCOPE } from "@/app/lib/pricing-copy";
import { getServiceLine } from "@/app/lib/services";
import { Guides } from "@/app/premium-app-development/components/Cities";
import { Faq } from "@/app/premium-app-development/components/Faq";
import { FinalCta } from "@/app/premium-app-development/components/FinalCta";
import { Markets } from "@/app/premium-app-development/components/Markets";
import { PageHero } from "@/app/premium-app-development/components/PageHero";
import { PremiumShell } from "@/app/premium-app-development/components/PremiumShell";
import { Summary } from "@/app/premium-app-development/components/Summary";
import { SectionHead, rv } from "@/app/premium-app-development/components/ui";

// The pillar: "custom mobile app development services". The homepage owns "mobile app development
// company"; platform and MVP intents have their own pages under /services/ (lib/specialist-services.ts).
export const metadata = buildMetadata({
  title: "Custom Mobile App Development Services | Kurchu",
  description: `Custom mobile app development services: iOS, Android, Flutter and React Native apps for startups and businesses, priced by scope from ${formatUsd(MIN_PRICE)}.`,
  path: "/mobile-app-development",
});

export const viewport: Viewport = { themeColor: "#09090A", viewportFit: "cover" };

const idea = (slug: string) => appIdeas.find((i) => i.slug === slug);

/** First-release timelines across the App Ideas plans, from the pricing table — so this page can't contradict the estimator. */
const mvpWeeks = appIdeas.map((i) => priceFor(i.mvp.map(([key]) => key as FeatureKey), "cross-platform", "template").weeks);
const WEEKS = `${Math.min(...mvpWeeks.map((w) => w[0]))}–${Math.max(...mvpWeeks.map((w) => w[1]))} weeks`;

const appTypes: Array<{ title: string; description: string; links?: Array<{ href: string; label: string }> }> = [
  {
    title: "Booking app development",
    description: "Appointment booking apps for service businesses: real-time availability, reminders and deposits.",
    links: [
      { href: appIdeaPath(idea("salon-booking-app")!), label: "Salon booking app" },
      { href: appIdeaPath(idea("doctor-appointment-app")!), label: "Clinic appointments" },
    ],
  },
  {
    title: "Ordering & delivery app development",
    description: "Restaurant ordering apps and delivery apps: menus or catalogues, checkout, live tracking and riders.",
    links: [
      { href: appIdeaPath(idea("food-delivery-app")!), label: "Food delivery app" },
      { href: appIdeaPath(idea("grocery-delivery-app")!), label: "Grocery delivery app" },
    ],
  },
  {
    title: "Marketplace apps",
    description: "Listings, search, chat, payments and reviews connecting buyers and sellers.",
    links: [{ href: appIdeaPath(idea("buy-sell-marketplace-app")!), label: "Buy & sell marketplace" }],
  },
  {
    title: "E-commerce & loyalty apps",
    description: "Fast checkout, drops, back-in-stock alerts, points and rewards for repeat customers.",
    links: [{ href: appIdeaPath(idea("ecommerce-app")!), label: "E-commerce app" }],
  },
  {
    title: "Transport & field apps",
    description: "Live maps, dispatch, driver or technician flows and proof of delivery.",
    links: [{ href: appIdeaPath(idea("taxi-booking-app")!), label: "Taxi & ride-hailing app" }],
  },
  {
    title: "Education & membership apps",
    description: "Parents, students or members in one place — schedules, payments, content and messages.",
    links: [
      { href: appIdeaPath(idea("school-management-app")!), label: "School management app" },
      { href: appIdeaPath(idea("fitness-coaching-app")!), label: "Fitness coaching app" },
    ],
  },
  {
    title: "Custom business apps",
    description: "Client portals, staff tools, inventory and reporting that digitise how your business works.",
    links: [{ href: appIdeaPath(idea("real-estate-app")!), label: "Real estate app" }],
  },
  {
    title: "MVP app development",
    description: "A focused first release that proves the idea with real users before the full build.",
    links: [
      { href: "/services/mvp-app-development", label: "MVP development" },
      { href: "/blog/how-long-does-it-take-to-build-an-mvp", label: "How long an MVP takes" },
    ],
  },
];

const platforms = [
  {
    href: "/services/ios-app-development",
    name: "iOS app development",
    tech: "Swift · SwiftUI",
    when: "Your audience is mostly on iPhone, or the product leans on Apple-only features.",
  },
  {
    href: "/services/android-app-development",
    name: "Android app development",
    tech: "Kotlin · Jetpack Compose",
    when: "Your audience is mostly on Android — common in Pakistan, India and many emerging markets.",
  },
  {
    href: "/services/cross-platform-app-development",
    name: "Flutter app development",
    tech: "Dart · one codebase",
    when: "You need iOS and Android quickly from one team, with a highly custom interface.",
  },
  {
    href: "/services/cross-platform-app-development",
    name: "React Native development",
    tech: "TypeScript · one codebase",
    when: "You want iOS and Android from one codebase and already work with React on the web.",
  },
];

const backend = [
  "Authentication and user roles",
  "Cloud databases and REST or GraphQL APIs",
  "Admin dashboards for your team",
  "Payments, subscriptions and payouts",
  "Push notifications, email and SMS",
  "Maps, location and live tracking",
  "File uploads and storage",
  "Firebase or Supabase backends",
  "Integrations with CRMs, ERPs and POS systems",
];

const existingApps = [
  "Code, architecture and UX audit",
  "New feature development",
  "UI/UX improvements",
  "Performance and stability fixes",
  "Migration to Flutter or native",
  "Ongoing maintenance and OS updates",
];

const launch = [
  "App Store and Google Play listings and screenshots",
  "Privacy declarations and review notes",
  "Submission under your own developer accounts",
  "Phased rollout with crash monitoring and analytics",
  "Documentation and a clean handover",
];

const process = [
  { title: "Discovery", body: "The problem, the users and the business model." },
  { title: "Scope", body: "What the first version includes — and what can wait." },
  { title: "UX & UI design", body: "Flows and screens you can click through before code." },
  { title: "Development", body: "App, backend and admin tools in short sprints." },
  { title: "Testing", body: "Real devices, edge cases and accessibility checks." },
  { title: "Store preparation", body: "Listings, screenshots and compliance." },
  { title: "Launch", body: "Submission, review and production monitoring." },
  { title: "Growth", body: "New features driven by real usage." },
];

const faqs = [
  {
    q: "How much does a custom mobile app cost?",
    a: `With Kurchu, ${PRICE_SCOPE}. ${PRICE_EXAMPLES} You can price your own idea in seconds with the free AI cost estimator; a written scope with a fixed price for the first phase follows a short discovery call.`,
  },
  {
    q: "What is a typical mobile app development timeline?",
    a: `It depends on scope. First releases of the apps in our App Ideas library are estimated at ${WEEKS} from discovery to store launch with one codebase for iOS and Android. Native apps for both platforms, or a custom design, add time; the estimator shows the timeline for your own feature list.`,
  },
  {
    q: "How do you build an app for a business?",
    a: "Start with the problem and the people who will use the app, then decide the smallest first release that solves it. From there: design the key screens, build the app and its admin tools, test on real devices, and launch to the App Store and Google Play. Our process covers each step with something you can review, and the AI cost estimator turns your idea into a feature list and price in seconds.",
  },
  {
    q: "Can one app work on Android and iPhone?",
    a: "Yes. With Flutter or React Native, one codebase produces native-feeling apps for both Android and iOS, which reduces development time and cost. Where a product depends heavily on device-specific features, we may recommend fully native Swift and Kotlin instead, and explain that recommendation and its cost in writing before you decide.",
  },
  {
    q: "Do I need an admin dashboard?",
    a: "Most apps that manage bookings, orders, content or users benefit from one. We build admin interfaces alongside the app, so your team can manage customers, update content, process orders and view reports without contacting a developer. Access is role-based and the dashboard works in any modern browser.",
  },
  {
    q: "Can you integrate the app with my website or existing systems?",
    a: "Yes. The app can share accounts, data and APIs with your website, and connect to systems such as a CRM, ERP or point of sale. Customers use one account everywhere, and one shared backend means less duplicated work and lower long-term maintenance.",
  },
  {
    q: "Do you publish the app to the App Store and Google Play?",
    a: "Yes. We prepare listings, screenshots, descriptions and privacy declarations, handle submission and any reviewer feedback, and resubmit as needed. Everything is submitted under your own developer accounts, so you keep full ownership of the app and its store listings.",
  },
];

export default function MobileAppDevelopmentPage() {
  const service = getServiceLine("/mobile-app-development");
  return (
    <PremiumShell current="services">
      {service && <JsonLd data={serviceJsonLd(service)} />}
      <JsonLd data={faqPageJsonLd(faqs)} />
      <PageHero
        path="/mobile-app-development"
        eyebrow="Mobile app development services"
        lines={["Custom mobile app", "development for", <em key="em">startups & businesses.</em>]}
        lede="iOS and Android apps — native, Flutter or React Native — taken from product strategy and UX through backend, testing, store launch and ongoing support by one senior team."
        meta={["iOS · Android · Flutter · React Native", `Apps from ${formatUsd(MIN_PRICE)}, priced by scope`, "You own 100% of the code"]}
        cta={{ label: "Start a Project" }}
        secondary={{ href: "/app-cost-estimator", label: "Estimate my app free" }}
      />

      <Summary
        title={
          <>
            Mobile app development services <em>with Kurchu.</em>
          </>
        }
        answer={`Kurchu Software Solutions is a custom mobile app development company based in Lahore, Pakistan, building iOS, Android and cross-platform apps for startups and businesses in the US, UK, UAE and Canada. One senior team handles strategy, UX/UI, engineering, backend, testing and store launch. ${PRICE_SCOPE.charAt(0).toUpperCase()}${PRICE_SCOPE.slice(1)}, and clients own all of the code.`}
        facts={[
          ["Platforms", "iOS (Swift), Android (Kotlin), Flutter, React Native"],
          ["Services", "Strategy, UX/UI, app & backend development, QA, store launch, support"],
          ["Pricing", `From ${formatUsd(MIN_PRICE)}, priced by features, platforms and design`],
          ["First release", `${WEEKS} for typical app types (one codebase)`],
          ["Markets", "US, UK, UAE, Canada — working remotely from Lahore"],
          ["Ownership", "All code, designs and accounts in your name"],
        ]}
      />

      <section className="section mkt" id="app-types" aria-labelledby="app-types-title">
        <div className="wrap">
          <SectionHead
            eyebrow="What we build"
            titleId="app-types-title"
            title={
              <>
                Apps for the way <em>your business works.</em>
              </>
            }
            lede="Each type links to a worked plan with features, estimated cost, timeline and wireframes."
          />
          <ul className="mkt-grid n4">
            {appTypes.map((type, i) => (
              <li key={type.title} {...rv(i % 4 ? `${((i % 4) * 0.05).toFixed(2)}s` : undefined)}>
                <div className="mkt-card">
                  <h3>{type.title}</h3>
                  <p>{type.description}</p>
                  {type.links && (
                    <span className="mad-links">
                      {type.links.map((link) => (
                        <Link key={link.href} className="tlink" href={link.href}>
                          {link.label}
                        </Link>
                      ))}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section mkt" id="platforms" aria-labelledby="platforms-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead
            eyebrow="Platforms"
            titleId="platforms-title"
            title={
              <>
                Native or cross-platform — <em>chosen for your product.</em>
              </>
            }
            lede={
              <>
                We recommend one approach in writing, with the cost of each option. Need the screens first? See{" "}
                <Link className="tlink" href="/services/mobile-app-design">
                  mobile app UI/UX design
                </Link>
                . Still deciding? Read{" "}
                <Link className="tlink" href="/blog/flutter-vs-react-native">
                  Flutter vs React Native
                </Link>{" "}
                and{" "}
                <Link className="tlink" href="/blog/flutter-vs-native-mobile-app">
                  Flutter vs native
                </Link>
                .
              </>
            }
          />
          <ul className="mkt-grid n4">
            {platforms.map((platform, i) => (
              <li key={platform.name} {...rv(i ? `${(i * 0.05).toFixed(2)}s` : undefined)}>
                <Link href={platform.href} className="mkt-card">
                  <span className="mkt-code mono">{platform.tech}</span>
                  <h3>{platform.name}</h3>
                  <p>{platform.when}</p>
                  <span className="svl-go">Learn more →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section mk" id="scope" aria-labelledby="scope-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead
            eyebrow="Scope & deliverables"
            titleId="scope-title"
            title={
              <>
                More than the app <em>on your phone.</em>
              </>
            }
          />
          <div className="mk-grid" {...rv()}>
            {[
              { title: "Backend & integrations", items: backend },
              { title: "Existing app support", items: existingApps },
              { title: "Store launch & handover", items: launch },
            ].map((column) => (
              <div className="mk-col" key={column.title}>
                <h3>{column.title}</h3>
                <ul>
                  {column.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section mkt" id="process" aria-labelledby="process-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead
            eyebrow="How it works"
            titleId="process-title"
            title={
              <>
                From idea to store, <em>in eight steps.</em>
              </>
            }
            lede={
              <>
                Every step ends with something you can review.{" "}
                <Link className="tlink" href="/process">
                  See the full process
                </Link>
                .
              </>
            }
          />
          <ol className="mkt-grid n4">
            {process.map((step, i) => (
              <li key={step.title} {...rv(i % 4 ? `${((i % 4) * 0.05).toFixed(2)}s` : undefined)}>
                <div className="mkt-card">
                  <span className="mkt-code mono">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section mkt" id="cost" aria-labelledby="cost-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead
            eyebrow="Cost"
            titleId="cost-title"
            title={
              <>
                Priced by scope, <em>never by the hour.</em>
              </>
            }
            lede={`${PRICE_SCOPE.charAt(0).toUpperCase()}${PRICE_SCOPE.slice(1)}. ${PRICE_EXAMPLES}`}
          />
          <ul className="mkt-grid n3">
            {[
              { href: "/app-cost-estimator", code: "Free · 10 seconds", title: "AI cost estimator", body: "Describe your idea and get features, wireframes, a budget planner and a price." },
              { href: "/app-ideas", code: `${appIdeas.length} app types`, title: "App ideas library", body: "Worked plans with features, cost and timeline for popular apps." },
              { href: "/pricing", code: "How we price", title: "Pricing & running costs", body: "Engagement models, what drives the price and costs outside it." },
            ].map((card, i) => (
              <li key={card.href} {...rv(i ? `${(i * 0.06).toFixed(2)}s` : undefined)}>
                <Link href={card.href} className="mkt-card">
                  <span className="mkt-code mono">{card.code}</span>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                  <span className="svl-go">Open →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Markets
        eyebrow="Where we work"
        title={
          <>
            Building for <em>four markets.</em>
          </>
        }
      />

      <Faq
        items={faqs}
        eyebrow="Mobile app development FAQ"
        title={
          <>
            Questions, <em>answered.</em>
          </>
        }
      />

      <Guides slugs={["how-long-does-it-take-to-build-an-mvp", "flutter-vs-react-native", "how-to-choose-an-app-development-company"]} place="your business" />

      <FinalCta />
    </PremiumShell>
  );
}
