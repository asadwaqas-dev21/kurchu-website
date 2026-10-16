/** ──────────────────────────────────────────────
 *  Specialist service pages under /mobile-app-development (the pillar).
 *
 *  Each page owns one buyer intent from the keyword clustering workbook, so
 *  they don't compete with the pillar or each other. They show no prices or
 *  timelines: each ends with the approved quotation steps instead (data.ts).
 * ──────────────────────────────────────────────*/
import type { ServiceLine } from "./jsonld";

export type SpecialistService = ServiceLine & {
  slug: string;
  /** Short name for breadcrumbs and cards. */
  short: string;
  seoTitle: string;
  metaDescription: string;
  eyebrow: string;
  /** H1 lines; the last one is set in italics. */
  lines: [string, string, string];
  lede: string;
  meta: [string, string, string];
  answer: string;
  facts: Array<[string, string]>;
  /** "Who it's for" cards. */
  fit: { title: string; lede: string; items: Array<{ title: string; body: string }> };
  /** What we build / deliver, as three columns. */
  scope: { title: string; columns: Array<{ title: string; items: string[] }> };
  steps: { title: string; items: Array<{ title: string; body: string }> };
  /** Quotation section: page-specific heading and intro above the approved quote steps. */
  quote: { title: string; lede: string };
  faqs: Array<{ q: string; a: string }>;
  /** Blog guides shown at the end (slugs). */
  guides: string[];
  /** Sibling specialist pages to cross-link (slugs). */
  related: string[];
};

export const specialistServices: SpecialistService[] = [
  {
    slug: "cross-platform-app-development",
    short: "Cross-Platform App Development",
    name: "Cross-Platform App Development",
    path: "/services/cross-platform-app-development",
    serviceType: "Cross-platform mobile application development",
    description: "iOS and Android apps from one Flutter or React Native codebase — designed, built, tested and launched to both stores by one team.",
    seoTitle: "Cross-Platform App Development Services | Kurchu",
    metaDescription: "Cross-platform app development services with Flutter and React Native: one codebase for iOS and Android, built and launched by a senior team. Priced by scope.",
    eyebrow: "Cross-platform & hybrid app development",
    lines: ["Cross-platform app", "development: one codebase,", "both app stores."],
    lede: "Flutter and React Native apps for iOS and Android, built by one senior team from a single codebase — native-feeling, fully tested on both platforms and launched to the App Store and Google Play.",
    meta: ["Flutter · React Native", "iOS and Android from one team", "You own 100% of the code"],
    answer:
      "Cross-platform app development means building one app, from one codebase, that runs on both iOS and Android. Kurchu Software Solutions builds cross-platform apps with Flutter or React Native for startups and businesses in the US, UK, UAE and Canada, and recommends native Swift and Kotlin instead when a product genuinely needs it. One team designs, builds, tests and launches the app to both stores.",
    facts: [
      ["Frameworks", "Flutter (Dart) and React Native (TypeScript)"],
      ["Platforms", "iOS and Android, phones and tablets"],
      ["Typical saving", "One codebase instead of two native apps"],
      ["Backend", "Firebase, Supabase or a custom Node.js and PostgreSQL API"],
      ["Testing", "Real iPhones and Android devices before every release"],
      ["Ownership", "All code, designs and store accounts in your name"],
    ],
    fit: {
      title: "When cross-platform is the right call",
      lede: "Most business apps are a good fit. These are the signs:",
      items: [
        { title: "You need both stores at launch", body: "Your customers use iPhones and Android phones, and launching on one store first would leave half of them waiting." },
        { title: "Budget and speed matter", body: "One codebase means one team, one set of features to build and test, and updates that reach both platforms together." },
        { title: "Your interface is custom", body: "Flutter draws every pixel itself, so a distinctive brand looks identical on both platforms without two separate implementations." },
        { title: "You already use React", body: "React Native shares language and patterns with a React website, so web and mobile teams can work from the same skills." },
        { title: "You want a small team long term", body: "Fewer codebases to maintain keeps the cost of every future release, and every OS update, lower." },
        { title: "Not a fit: heavy device work", body: "Advanced AR, demanding audio or video processing and deep hardware integrations are usually better served by native iOS and Android apps." },
      ],
    },
    scope: {
      title: "What a cross-platform build includes",
      columns: [
        { title: "App & interface", items: ["UX flows and UI design for both platforms", "Platform conventions respected where users expect them", "Arabic and right-to-left layouts when needed", "Accessibility to WCAG 2.2 AA"] },
        { title: "Native features", items: ["Push notifications and deep links", "Camera, location, maps and file uploads", "Apple Pay, Google Pay and in-app purchases", "Native modules written in Swift or Kotlin when a plugin falls short"] },
        { title: "Backend & launch", items: ["Authentication, roles and admin dashboard", "APIs, database and cloud hosting", "Automated builds for both stores", "App Store and Google Play submission"] },
      ],
    },
    steps: {
      title: "How we choose between Flutter and React Native",
      items: [
        { title: "Your existing stack", body: "A React web team points towards React Native; no existing stack leaves the choice open." },
        { title: "Interface ambition", body: "Highly custom, animated interfaces often favour Flutter's own rendering engine." },
        { title: "Plugins you need", body: "We check that payments, maps and other SDKs you need are mature on the framework." },
        { title: "Written recommendation", body: "You get one recommendation with its trade-offs and cost in writing, before any code." },
      ],
    },
    quote: {
      title: "A fixed quote for your cross-platform app",
      lede: "Every cross-platform project is priced from its own scope — the features, integrations and design it needs — never by the hour. Start with a free discovery call and get a written scope with a fixed price for the first phase.",
    },
    faqs: [
      {
        q: "What is the difference between cross-platform and hybrid apps?",
        a: "Both use one codebase for iOS and Android, but they work differently. Older hybrid apps show a web page inside an app shell, which can feel slow and out of place. Modern cross-platform frameworks like Flutter and React Native render real app interfaces and reach native device features, so users get a fast, native-feeling app. We build with Flutter and React Native, not web-view hybrids.",
      },
      {
        q: "Is Flutter or React Native better for my app?",
        a: "Neither wins everywhere. Flutter suits highly custom, animated interfaces and teams starting fresh; React Native suits teams that already use React and TypeScript on the web. Both produce production-quality apps for iOS and Android. During discovery we compare your features, integrations and team against both, then recommend one in writing with its trade-offs and the cost of each option.",
      },
      {
        q: "Do cross-platform apps perform as well as native apps?",
        a: "For most business apps, users are unlikely to notice a difference: screens are smooth, start-up is quick and device features work as expected. The gap appears in specialised products such as heavy 3D, advanced augmented reality or real-time audio processing. If your app depends on those, we will say so and recommend native Swift and Kotlin, or a native module inside the cross-platform app.",
      },
      {
        q: "Can I hire a dedicated cross-platform team?",
        a: "Yes. Besides fixed-price projects, Kurchu offers a dedicated team model for funded companies that need ongoing capacity: Flutter or React Native engineers, a designer and a product lead working inside your rituals, scaled up or down monthly. You keep full ownership of the code and the store accounts, and the team works within your business hours for the UK, US, UAE or Canada.",
      },
      {
        q: "Can you convert my existing native app to Flutter or React Native?",
        a: "Yes, usually in phases rather than one big rewrite. We start with a fixed-price audit of the current apps, then plan a migration that keeps the live app serving customers — for example rebuilding one section at a time, or launching the new app once it reaches feature parity. The audit tells you honestly whether migrating will save money over maintaining two native apps.",
      },
    ],
    guides: ["flutter-vs-react-native", "flutter-vs-native-mobile-app", "how-long-does-it-take-to-build-an-mvp"],
    related: ["ios-app-development", "android-app-development", "mvp-app-development"],
  },
  {
    slug: "ios-app-development",
    short: "iOS App Development",
    name: "iOS App Development",
    path: "/services/ios-app-development",
    serviceType: "iOS application development",
    description: "Custom iPhone and iPad apps in Swift and SwiftUI — designed, built, tested and launched to the App Store by one team.",
    seoTitle: "Custom iOS App Development Services | Kurchu",
    metaDescription: "Custom iOS app development services: iPhone and iPad apps in Swift and SwiftUI, built to Apple's guidelines and launched to the App Store. Priced by scope.",
    eyebrow: "iOS app development",
    lines: ["Custom iOS app", "development for", "iPhone and iPad."],
    lede: "Native iPhone and iPad apps in Swift and SwiftUI — designed for iOS conventions, engineered for performance and launched to the App Store under your own developer account.",
    meta: ["Swift · SwiftUI", "iPhone and iPad", "App Store submission included"],
    answer:
      "Kurchu Software Solutions provides custom iOS app development for startups and businesses in the US, UK, UAE and Canada: native iPhone and iPad apps written in Swift and SwiftUI, designed around Apple's Human Interface Guidelines and launched to the App Store. When the same app is also needed on Android, we compare a native build with one cross-platform codebase and recommend one in writing.",
    facts: [
      ["Languages", "Swift and SwiftUI"],
      ["Devices", "iPhone and iPad"],
      ["Apple features", "Apple Pay, Sign in with Apple, push notifications, widgets"],
      ["Testing", "TestFlight builds on your own iPhone every sprint"],
      ["Launch", "App Store listing, privacy details and review handled"],
      ["Ownership", "Code and App Store account in your name"],
    ],
    fit: {
      title: "When a native iOS app makes sense",
      lede: "A native iOS build is the right choice when:",
      items: [
        { title: "Your customers are on iPhone", body: "Many premium consumer and business audiences in the US, UK and UAE are mostly on iOS, so launching there first focuses the budget." },
        { title: "You rely on Apple features", body: "Apple Pay, Sign in with Apple, widgets and other Apple frameworks work best, and earliest, in native Swift." },
        { title: "Performance is the product", body: "Camera, media, offline data or heavy animation benefit from direct access to Apple's frameworks." },
        { title: "You need an iPad experience", body: "Split view, larger layouts and Apple Pencil support are designed properly, not stretched from a phone screen." },
        { title: "You are adding to an iOS app", body: "We extend and modernise existing Swift and Objective-C apps, starting with an audit of the codebase." },
        { title: "Consider cross-platform if", body: "You need Android at the same time on a tight budget — one Flutter or React Native codebase is often better value." },
      ],
    },
    scope: {
      title: "What an iOS build includes",
      columns: [
        { title: "Design for iOS", items: ["Flows and screens following Apple's Human Interface Guidelines", "Dynamic Type, dark mode and VoiceOver support", "iPad layouts where your users need them", "A clickable prototype before engineering"] },
        { title: "Engineering", items: ["Swift and SwiftUI, with UIKit where it is the better tool", "Apple Pay, in-app purchases and subscriptions", "Push notifications, deep links and widgets", "Backend, APIs and an admin dashboard"] },
        { title: "App Store launch", items: ["TestFlight beta builds every sprint", "App Store listing, screenshots and privacy details", "Review notes and any resubmissions", "Crash monitoring and a phased release"] },
      ],
    },
    steps: {
      title: "From idea to the App Store",
      items: [
        { title: "Discovery", body: "Users, the core journey and which Apple features matter." },
        { title: "Design", body: "iOS-native flows and a prototype you can tap through." },
        { title: "Build", body: "Sprints with a TestFlight build on your phone at each demo." },
        { title: "Launch", body: "App Store review, phased release and monitoring." },
      ],
    },
    quote: {
      title: "A fixed quote for your iOS app",
      lede: "Your iOS project is priced from its own scope — the screens, Apple features and integrations it needs, and whether Android should follow. Start with a free discovery call and get a written scope with a fixed price for the first phase.",
    },
    faqs: [
      {
        q: "Should I build for iOS first or for both platforms?",
        a: "It depends on where your customers are. If your audience is mostly on iPhone, or the product relies on Apple-only features, launching on iOS first focuses the budget and lets you learn before adding Android. If customers are split between platforms, one cross-platform codebase usually reaches both for less than two native apps. Your own analytics or market research should decide, and we help interpret it.",
      },
      {
        q: "Do I need a Mac or an Apple Developer account?",
        a: "You do not need a Mac, but you do need an Apple Developer Program membership in your company's name, which Apple charges for annually. We guide you through enrolment, then build, test and submit the app under your account, so the App Store listing, reviews and revenue always belong to you rather than to us. We never publish client apps under our own account.",
      },
      {
        q: "How long does App Store review take?",
        a: "Apple often reviews apps within a day or two, but timing varies. New developer accounts, payments, subscriptions, health data and apps for children can attract closer review, and a rejection means fixing and resubmitting. We prepare privacy details, demo accounts and review notes in advance to avoid common rejections, and plan a buffer so review never decides your launch date at the last minute.",
      },
      {
        q: "Can you update or take over my existing iOS app?",
        a: "Yes. We start with a fixed-price audit of the code, architecture, dependencies and App Store standing, then give you a prioritised plan: what to keep, what to fix and what to rebuild. Older Objective-C or UIKit code can be modernised to Swift and SwiftUI step by step, while the live app keeps serving customers. Access is transferred into your own accounts as part of the handover.",
      },
      {
        q: "Do you design for iPad as well as iPhone?",
        a: "Yes, when your users need it. iPad apps get layouts designed for the larger screen, split view and multitasking rather than a stretched phone interface, and Apple Pencil support where it is useful. We recommend an iPad version only when it serves your users, because every extra device adds design, testing and maintenance to each future release, and we price it separately so you can decide.",
      },
    ],
    guides: ["flutter-vs-native-mobile-app", "how-long-does-it-take-to-build-an-mvp", "how-to-choose-an-app-development-company"],
    related: ["android-app-development", "cross-platform-app-development", "mobile-app-design"],
  },
  {
    slug: "android-app-development",
    short: "Android App Development",
    name: "Android App Development",
    path: "/services/android-app-development",
    serviceType: "Android application development",
    description: "Custom Android apps in Kotlin and Jetpack Compose — designed, built, tested across real devices and launched to Google Play by one team.",
    seoTitle: "Android App Development Services | Kurchu",
    metaDescription: "Custom Android app development services: Kotlin and Jetpack Compose apps, tested on real devices and launched to Google Play by one senior team.",
    eyebrow: "Android app development",
    lines: ["Custom Android app", "development for every", "phone your customers own."],
    lede: "Native Android apps in Kotlin and Jetpack Compose — designed for Material conventions, tested across a real device matrix and launched to Google Play under your own developer account.",
    meta: ["Kotlin · Jetpack Compose", "Tested on real devices", "Google Play launch included"],
    answer:
      "Kurchu Software Solutions provides custom Android app development for startups and businesses in the US, UK, UAE and Canada: native apps written in Kotlin and Jetpack Compose, tested across a matrix of real devices and Android versions, and launched to Google Play. Companies outsourcing Android development get one senior team for design, engineering, backend and launch, and keep all of the code.",
    facts: [
      ["Languages", "Kotlin and Jetpack Compose"],
      ["Devices", "Phones and tablets across Android versions and screen sizes"],
      ["Android features", "Google Pay, push notifications, widgets, background work"],
      ["Testing", "A real device matrix, plus Google Play internal testing"],
      ["Launch", "Play Console listing, data safety form and release tracks"],
      ["Ownership", "Code and Play Console account in your name"],
    ],
    fit: {
      title: "When a native Android app makes sense",
      lede: "A native Android build is the right choice when:",
      items: [
        { title: "Your market is Android-first", body: "In many markets most customers use Android, so a native app gives them the fastest, most reliable experience." },
        { title: "The app runs in the field", body: "Driver, technician and warehouse apps rely on background location, offline data and rugged or budget devices." },
        { title: "You need deep device access", body: "Bluetooth hardware, scanners, kiosks and background services are easiest to build and support natively." },
        { title: "Low-end phones matter", body: "Native Kotlin lets us tune memory use, app size and start-up time for entry-level devices." },
        { title: "You are outsourcing Android", body: "We take over or extend an existing Kotlin or Java app, starting with an audit of the codebase." },
        { title: "Consider cross-platform if", body: "You need iOS at the same time on a tight budget — one Flutter or React Native codebase is often better value." },
      ],
    },
    scope: {
      title: "What an Android build includes",
      columns: [
        { title: "Design for Android", items: ["Material-aligned flows, gestures and back navigation", "Layouts for small phones, large phones and tablets", "Dark theme, font scaling and TalkBack support", "A clickable prototype before engineering"] },
        { title: "Engineering", items: ["Kotlin and Jetpack Compose", "Offline data and reliable background work", "Google Pay, Play Billing and subscriptions", "Backend, APIs and an admin dashboard"] },
        { title: "Google Play launch", items: ["Internal, closed and open testing tracks", "Store listing, screenshots and data safety form", "Staged rollout with crash and ANR monitoring", "Target API level kept current with Play rules"] },
      ],
    },
    steps: {
      title: "From idea to Google Play",
      items: [
        { title: "Discovery", body: "Users, devices and the Android versions you must support." },
        { title: "Design", body: "Android-native flows and a prototype you can tap through." },
        { title: "Build", body: "Sprints with an installable build on your phone at each demo." },
        { title: "Launch", body: "Play review, staged rollout and monitoring." },
      ],
    },
    quote: {
      title: "A fixed quote for your Android app",
      lede: "Your Android project is priced from its own scope — the features, devices and integrations it needs, and whether iOS should follow. Start with a free discovery call and get a written scope with a fixed price for the first phase.",
    },
    faqs: [
      {
        q: "Is it harder to build for Android than for iOS?",
        a: "It is different rather than harder. Android runs on thousands of device models from many manufacturers, with different screen sizes, Android versions and manufacturer customisations, so testing takes more care. We agree a device matrix based on your users, test on real phones throughout the build, and use Google Play's testing tracks and staged rollouts to catch problems before every customer sees them.",
      },
      {
        q: "What do I need to publish on Google Play?",
        a: "You need a Google Play developer account in your company's name, which has a one-time registration fee and identity verification. We prepare the store listing, screenshots, content rating and data safety form, run internal and closed testing, then publish with a staged rollout. Everything stays under your account, so the listing, reviews and revenue always belong to you, not to us.",
      },
      {
        q: "Can I outsource Android development to Kurchu?",
        a: "Yes. You can outsource Android development to us as a fixed-price project, or with a dedicated team that works inside your own processes. We work remotely from Lahore, Pakistan, with calls inside UK, US, UAE or Canadian business hours, weekly installable builds and a shared channel. You own the code, repositories and Play Console account from day one.",
      },
      {
        q: "Should I build native Android or use Flutter?",
        a: "If you need both Android and iOS on a sensible budget, one Flutter or React Native codebase is usually the better value. Native Kotlin is worth it when the app depends on deep device access — background services, Bluetooth hardware, scanners or kiosks — or must run well on entry-level phones. We recommend one approach in writing during discovery, with the cost of each option.",
      },
      {
        q: "Can you take over an existing Android app?",
        a: "Yes. We start with a fixed-price audit of the code, libraries, architecture and Play Console status, including target API level and policy warnings. You receive a prioritised plan of what to keep, fix or rebuild, and older Java code can move to Kotlin and Jetpack Compose step by step while the live app keeps serving customers. Access moves into your own accounts at handover.",
      },
    ],
    guides: ["flutter-vs-native-mobile-app", "how-long-does-it-take-to-build-an-mvp", "how-to-choose-an-app-development-company"],
    related: ["ios-app-development", "cross-platform-app-development", "mvp-app-development"],
  },
  {
    slug: "mvp-app-development",
    short: "MVP App Development",
    name: "MVP App Development",
    path: "/services/mvp-app-development",
    serviceType: "MVP and startup app development",
    description: "MVP app development for startups: a focused, production-quality first release on iOS and Android, scoped to test the riskiest assumption first.",
    seoTitle: "MVP App Development for Startups | Kurchu",
    metaDescription: "MVP app development for startups: a focused first release on iOS and Android, built to production standard, with a written scope and a fixed price per phase.",
    eyebrow: "MVP & startup app development",
    lines: ["MVP app development", "for startups, built", "to learn from real users."],
    lede: "A focused first release on iOS and Android — scoped around your riskiest assumption, built to production standard and launched to real users, so the larger budget is spent once the idea has earned it.",
    meta: ["Discovery sprint first", "Production-quality, not a prototype", "Priced by scope"],
    answer:
      "MVP app development is building the smallest production-quality version of an app that lets real users complete its core job. Kurchu Software Solutions builds MVPs for startups and new business ventures in the US, UK, UAE and Canada: a short discovery sprint, a written scope with a fixed price, and an iOS and Android app launched to the stores, architected so version two extends it rather than replaces it.",
    facts: [
      ["Starts with", "A discovery sprint and a written MVP scope"],
      ["Platforms", "iOS and Android, usually from one codebase"],
      ["Quality", "Production-ready, store-approved software"],
      ["Pricing", "Fixed price per phase, agreed in a written scope"],
      ["After launch", "Analytics, feedback and a phased roadmap"],
      ["Ownership", "All code, designs and accounts in your name"],
    ],
    fit: {
      title: "Who our MVP service is for",
      lede: "It suits founders and teams who need evidence before a bigger investment:",
      items: [
        { title: "Pre-seed and seed founders", body: "You need a live product in users' hands to prove demand to customers, partners or investors." },
        { title: "Businesses testing a new line", body: "An established company trialling a new digital product without committing a full product budget." },
        { title: "Non-technical founders", body: "You bring the market knowledge; we bring product, design and engineering, and explain every decision." },
        { title: "Founders with a prototype", body: "A clickable mock-up or no-code version has shown interest, and now needs real, scalable software." },
        { title: "Teams with a deadline", body: "A launch event, a pilot customer or a fundraise sets the date, and the scope is cut to meet it." },
        { title: "Not a fit: everything at once", body: "If every feature must ship in version one, a full product engagement is more honest than calling it an MVP." },
      ],
    },
    scope: {
      title: "What an MVP includes",
      columns: [
        { title: "Discovery & scope", items: ["Users, the core problem and success metrics", "The riskiest assumption to test first", "A prioritised feature list with a clear MVP line", "A written scope with a fixed price"] },
        { title: "Design & build", items: ["Flows and a clickable prototype of key screens", "iOS and Android app, usually one codebase", "Backend, authentication and a simple admin panel", "Analytics events tied to your success metrics"] },
        { title: "Launch & learn", items: ["App Store and Google Play submission", "Crash monitoring and a phased rollout", "A review of real usage after launch", "A roadmap for version two, based on evidence"] },
      ],
    },
    steps: {
      title: "How an MVP project runs",
      items: [
        { title: "Discovery sprint", body: "The problem, users, risks and what success looks like." },
        { title: "Scope & price", body: "The MVP line, the technical approach and a fixed price." },
        { title: "Design & build", body: "Overlapping sprints with an installable build at every demo." },
        { title: "Launch & learn", body: "Store launch, then decisions driven by real usage." },
      ],
    },
    quote: {
      title: "A fixed quote for your MVP",
      lede: "The MVP line agreed in discovery sets the price: what is in the first release, and what deliberately waits. Start with a free discovery call and get a written scope with a fixed price for the first phase.",
    },
    faqs: [
      {
        q: "What is the difference between an MVP and a prototype?",
        a: "A prototype is a clickable mock-up used to test ideas and flows before engineering; it cannot store data, take payments or be published. An MVP is real, production-quality software with a deliberately narrow scope, released to actual users in the App Store and Google Play. Most good MVPs are built after a prototype has been tested with a handful of real users.",
      },
      {
        q: "How do you decide what goes into an MVP?",
        a: "We start from the one job users must be able to complete and the assumption that would sink the business if it were wrong. Features that test that assumption go in; everything else is listed for later, with a reason. The result is a written scope with a clear MVP line, so you can see exactly what is included and what was deliberately left out.",
      },
      {
        q: "Will my MVP need to be rebuilt later?",
        a: "It should not. We build MVPs to production standard — real backend, security, tests and store-approved apps — and plan the architecture around the features on your roadmap, so version two extends the code rather than replacing it. What changes after launch is the product direction, guided by real usage, not the foundations it was built on.",
      },
      {
        q: "Can you help a non-technical founder?",
        a: "Yes. You bring the market, customers and business model; we handle product, design, engineering and launch, and explain every technical decision in plain language with its cost. You receive weekly installable builds to review on your own phone, and all code, accounts and documentation are yours from day one.",
      },
      {
        q: "What happens after the MVP launches?",
        a: "Launch is the start of learning. In the first weeks we watch crash reports, analytics and feedback, fix what matters and review the evidence with you against the success metrics agreed in discovery. From there you choose the next step: iterate on the MVP, expand into a full product, or continue with a dedicated team on a monthly basis.",
      },
    ],
    guides: ["how-long-does-it-take-to-build-an-mvp", "how-to-choose-an-app-development-company", "flutter-vs-react-native"],
    related: ["cross-platform-app-development", "mobile-app-design", "ios-app-development"],
  },
  {
    slug: "mobile-app-design",
    short: "Mobile App UI/UX Design",
    name: "Mobile App UI/UX Design",
    path: "/services/mobile-app-design",
    serviceType: "Mobile app UI/UX design",
    description: "Mobile app UX/UI design: research, user flows, wireframes, clickable prototypes and a design system, by designers who work alongside engineers.",
    seoTitle: "Mobile App UI/UX Design Services | Kurchu",
    metaDescription: "Mobile app UI/UX design services: research, user flows, wireframes, prototypes and design systems for iOS and Android, by designers who work with engineers.",
    eyebrow: "Mobile app UI/UX design",
    lines: ["Mobile app UI/UX", "design that users", "understand on first tap."],
    lede: "Research, user flows, wireframes, clickable prototypes and a design system for iOS and Android — by designers who sit in the same sprints as the engineers who build it.",
    meta: ["UX research · UI design", "Prototypes tested with users", "Design-only or design and build"],
    answer:
      "Mobile app UI/UX design turns a product idea into flows, screens and a clickable prototype that real users can test before code is written. Kurchu Software Solutions designs iOS and Android apps for startups and businesses in the US, UK, UAE and Canada — from research and wireframes to a full design system — either as a design-only engagement or as the first phase of building the app.",
    facts: [
      ["UX", "Research, user flows, information architecture, wireframes"],
      ["UI", "Visual design, components and a design system"],
      ["Prototype", "Clickable, tested with real users before build"],
      ["Platforms", "iOS and Android conventions, phones and tablets"],
      ["Accessibility", "Designed to WCAG 2.2 AA"],
      ["Handover", "Design files, specs and assets in your accounts"],
    ],
    fit: {
      title: "Who our design service is for",
      lede: "Design-only or design and build, it suits:",
      items: [
        { title: "Founders before the build", body: "Test the idea with a clickable prototype and get accurate development quotes from a finished design." },
        { title: "Apps users struggle with", body: "Poor reviews, drop-offs in sign-up or checkout and support tickets that point to confusing screens." },
        { title: "Teams with their own developers", body: "You have engineers but need product design, with specs and components they can build from directly." },
        { title: "Brands moving to mobile", body: "A strong web or retail brand that needs to feel just as distinctive inside an app." },
        { title: "Bilingual and Arabic apps", body: "Right-to-left layouts designed from the first wireframe, not mirrored at the end." },
        { title: "Products growing up", body: "A design system that keeps new features consistent as the app and the team grow." },
      ],
    },
    scope: {
      title: "What app design includes",
      columns: [
        { title: "UX design", items: ["Stakeholder and user interviews", "User journeys and information architecture", "Wireframes for every key flow", "Usability testing of a clickable prototype"] },
        { title: "UI design", items: ["Visual direction built from your brand", "High-fidelity screens for iOS and Android", "Light and dark themes where needed", "Accessible colour, type and touch targets"] },
        { title: "Design system & handover", items: ["Reusable components and design tokens", "Motion and interaction notes", "Specs and assets ready for developers", "Files in your own accounts"] },
      ],
    },
    steps: {
      title: "How a design project runs",
      items: [
        { title: "Research", body: "Who the users are, what they need and where they struggle." },
        { title: "Flows & wireframes", body: "The structure of the app before any visual design." },
        { title: "UI & prototype", body: "High-fidelity screens you can click through on a phone." },
        { title: "Test & hand over", body: "Usability testing, fixes and a developer-ready design system." },
      ],
    },
    quote: {
      title: "A fixed quote for your app design",
      lede: "Design-only or design and build, the price follows the scope: the flows, screens and research your product needs. Start with a free discovery call and get a written scope with a fixed price for the first phase.",
    },
    faqs: [
      {
        q: "What is the difference between UX and UI design?",
        a: "UX design is how the app works: who uses it, the journeys they take, the structure of screens and how easily people complete tasks. UI design is how it looks and feels: layout, colour, typography, components and motion. Good apps need both, in that order — a beautiful interface cannot rescue a confusing flow, so we settle the UX with wireframes before visual design starts.",
      },
      {
        q: "Can you design my app without building it?",
        a: "Yes. A design-only engagement delivers tested user flows, high-fidelity screens, a clickable prototype and a design system with developer-ready specs. Many founders use it to validate an idea with users or investors and to get accurate build quotes. If you later build with us, the design phase is already done; if you build elsewhere, everything is in your own accounts.",
      },
      {
        q: "Do iOS and Android need different designs?",
        a: "Mostly not, but the details matter. One design language can serve both, while navigation patterns, back behaviour, system controls and some gestures follow each platform's conventions so the app feels at home. We design shared components once and note the platform differences, which keeps the app consistent for your brand and familiar for users on both iPhone and Android.",
      },
      {
        q: "How do you test a design before development?",
        a: "We put a clickable prototype in front of real users from your target audience and watch them complete key tasks, such as signing up, booking or paying. Where they hesitate or fail, we fix the flow and test again. It costs a fraction of changing built software, and it gives you evidence — not opinions — about what to build first.",
      },
      {
        q: "Can you redesign an existing app?",
        a: "Yes. We start by reviewing analytics, store reviews and support issues alongside a walkthrough of the current app, then prioritise the flows that cost you the most users. Redesigns usually ship in phases — for example onboarding first, then checkout — so improvements reach customers quickly and each change can be measured, rather than waiting months for a single big release.",
      },
    ],
    guides: ["arabic-rtl-app-development-uae", "how-long-does-it-take-to-build-an-mvp", "how-to-choose-an-app-development-company"],
    related: ["mvp-app-development", "ios-app-development", "android-app-development"],
  },
];

export const getSpecialistService = (slug: string) => specialistServices.find((service) => service.slug === slug);
