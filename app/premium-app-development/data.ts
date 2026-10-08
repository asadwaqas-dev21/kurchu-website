/** Copy for the repeated blocks on the page. */

import { regionPath, regions } from "@/app/lib/regions";
import { siteConfig } from "@/app/lib/site-config";

export const email = siteConfig.contact.email;

/** Top-level pages. `section` is the matching section id on the one-page homepage. */
export const navLinks = [
  { href: "/services", label: "Services", section: "services" },
  { href: "/work", label: "Work", section: "work" },
  { href: "/process", label: "Process", section: "process" },
  { href: "/technology", label: "Technology", section: "technology" },
  { href: "/about", label: "About", section: "about" },
];

export const drawerLinks = [...navLinks, { href: "/#faq", label: "FAQ", section: "faq" }];

export const trustFacts: Array<{ value: string; unit?: string; label: string }> = [
  { value: "38", label: "Products shipped to the App Store and Google Play" },
  { value: "9", label: "Countries, from London and Dubai to Toronto" },
  { value: "12", unit: "yrs", label: "Average senior experience across the core team" },
  { value: "3.1", unit: "yrs", label: "Average length of a client relationship after launch" },
];

export const domains = [
  "Fintech",
  "Healthcare",
  "Mobility",
  "Marketplaces",
  "Logistics",
  "Hospitality",
  "B2B operations",
];

export const services = [
  {
    title: "Product Strategy",
    body: "Before a line of code, we pressure-test the idea: who it's for, what they'll pay for, and the smallest version that proves it. You leave with a scope you can defend to investors and a plan your engineers can estimate.",
    chips: ["Product discovery", "MVP definition", "Competitive analysis", "Feature prioritisation", "Technical planning"],
  },
  {
    title: "UX/UI Design",
    body: "Research-led journeys, then a visual system with real taste. Every key flow is prototyped and tested with users before it reaches engineering — so the expensive mistakes happen in Figma, not in production.",
    chips: ["User research", "Information architecture", "User journeys", "Wireframes", "Interactive prototypes", "Design systems"],
  },
  {
    title: "Mobile App Development",
    body: "Native Swift and Kotlin when the device is the product. Flutter or React Native when one codebase across both stores is the smarter bet. We'll tell you which — and why — in writing.",
    chips: ["iOS · SwiftUI", "Android · Compose", "Flutter", "React Native", "Offline-first"],
  },
  {
    title: "Backend Engineering",
    body: "The parts users never see but always feel: typed APIs, sensible data models, secure authentication, payments that reconcile and notifications that arrive on time. Built to be handed to your future team without a rewrite.",
    chips: ["APIs", "Databases", "Authentication", "Payments", "Notifications", "Cloud infrastructure"],
  },
  {
    title: "Quality Engineering",
    body: "Automated tests on every merge, manual passes across a real device matrix, and performance budgets we actually measure. Release candidates go out with a QA report, not a hope.",
    chips: ["Automated testing", "Device validation", "Performance budgets", "Security review", "Release readiness"],
  },
  {
    title: "Launch & Growth",
    body: "We handle store submission, phased rollouts and the analytics you'll need to decide what to build next. After launch, we stay on as your product team — or hand over cleanly to yours.",
    chips: ["App Store", "Google Play", "Analytics", "Monitoring", "Maintenance", "Release roadmap"],
  },
];

export const ideaSteps = [
  { title: "Sketch", desc: "A whiteboard conversation becomes a shared picture of the product — the screens that matter, the moment users should feel." },
  { title: "Wireframe", desc: "Structure without decoration. We agree on hierarchy, content and flow while changes are still cheap." },
  { title: "Design system", desc: "Colour, type, spacing and components defined once as tokens — shared by design and code from day one." },
  { title: "Prototype", desc: "Clickable, realistic flows put in front of real users. We measure where they hesitate, then fix it." },
  { title: "Engineering", desc: "Every screen becomes typed, tested components wired to real APIs — the same structure you approved." },
  { title: "Live product", desc: "Signed, reviewed and released to both stores — with analytics and monitoring watching from minute one." },
];

export const ideaArtifacts = [
  { tag: "PDF", title: "product-brief.pdf", sub: "Workshop output · 14 pages" },
  { tag: "FIG", title: "Core flows", sub: "32 frames · 3 journeys" },
  { tag: "{ }", title: "tokens.json", sub: "148 tokens · light & dark" },
  { tag: "UX", title: "Usability round 2", sub: "8 participants · 94% success" },
  { tag: "CI", title: "Build 1.0.0 (42)", sub: "All checks passed" },
  { tag: "V1", title: "Live on both stores", sub: "Phased rollout · 100%" },
];

export const galleryItems = [
  { screen: "novaHome", name: "Nova Pay", label: "Home" },
  { screen: "lumenBooking", name: "Lumen Health", label: "Booking" },
  { screen: "arcaDiscover", name: "Arca", label: "Discover" },
  { screen: "moveLive", name: "Move", label: "Live journey" },
  { screen: "novaInsights", name: "Nova Pay", label: "Insights" },
  { screen: "arcaCheckout", name: "Arca", label: "Checkout" },
  { screen: "lumenHome", name: "Lumen Health", label: "Today" },
  { screen: "moveMap", name: "Move", label: "Trip selection" },
] as const;

export const processSteps = [
  {
    name: "Discovery",
    dur: "1–2 weeks",
    body: "Workshops with your team, interviews with real users, a hard look at competitors. We find the riskiest assumption and decide how to test it.",
    decisions: ["Who the first users are", "The problem worth paying for"],
    involvement: ["Two workshops, 2–3 hours each", "Access to customers if available"],
    deliverable: "Product brief",
    deliverableNote: "Problem, audience, success metrics and scope.",
  },
  {
    name: "Strategy",
    dur: "1 week",
    body: "We turn findings into a prioritised roadmap, draw the MVP line and recommend a technical approach — native or cross-platform — with costs for each option.",
    decisions: ["MVP scope and success metrics", "Platform and stack choice"],
    involvement: ["Roadmap review session", "Sign-off on scope"],
    deliverable: "Feature roadmap",
    deliverableNote: "Prioritised scope with an MVP line and estimates.",
  },
  {
    name: "UX",
    dur: "2–3 weeks",
    body: "Information architecture, user journeys and wireframes for every key flow. We test with users before visual design, while change is still nearly free.",
    decisions: ["Navigation model", "Content and data per screen"],
    involvement: ["Weekly flow reviews", "Observe user sessions"],
    deliverable: "Validated user flow",
    deliverableNote: "Core journeys, tested with real users.",
  },
  {
    name: "UI Design",
    dur: "2–4 weeks",
    body: "A visual system with real character — type, colour, motion and components — then every screen in high fidelity, including the empty, loading and error states.",
    decisions: ["Visual direction", "Motion and interaction rules"],
    involvement: ["Direction review", "Final design sign-off"],
    deliverable: "Interactive prototype",
    deliverableNote: "High-fidelity, clickable, built on a token-based design system.",
  },
  {
    name: "Engineering",
    dur: "6–16 weeks",
    body: "Two-week sprints with a demo at the end of each. You install real builds on your own phone every week — not slides about progress.",
    decisions: ["Sprint priorities", "Trade-offs as they surface"],
    involvement: ["Fortnightly demo, 45 minutes", "Shared Slack channel"],
    deliverable: "Production builds",
    deliverableNote: "Weekly TestFlight and Play builds you can install.",
  },
  {
    name: "Testing",
    dur: "Continuous + 1–2 weeks",
    body: "Automated tests run on every merge. Before release, a full regression across our device matrix, performance profiling and a security review.",
    decisions: ["Release-blocking issues", "Go / no-go for launch"],
    involvement: ["User acceptance testing", "Release sign-off"],
    deliverable: "QA report",
    deliverableNote: "Test coverage, device matrix and known issues.",
  },
  {
    name: "Launch",
    dur: "1 week",
    body: "Store listings, screenshots, privacy declarations and review notes, handled. We ship as a phased rollout with crash monitoring and analytics live from minute one.",
    decisions: ["Launch date and rollout pace", "Day-one success signals"],
    involvement: ["Store account access", "Launch-day stand-by"],
    deliverable: "Store-ready release",
    deliverableNote: "Listings, review notes, phased rollout plan.",
  },
  {
    name: "Growth",
    dur: "Ongoing",
    body: "We read the data with you, talk to users again and plan the next releases. Keep us as your product team, or take the keys with full documentation.",
    decisions: ["Next three releases", "Team model going forward"],
    involvement: ["Monthly product review", "Quarterly roadmap"],
    deliverable: "Iteration roadmap",
    deliverableNote: "What to build next, ranked by evidence.",
  },
];

export const principles = [
  { title: "Native when the device is the product.", body: "Camera, sensors, wallets, widgets and heavy animation get Swift and Kotlin." },
  { title: "Cross-platform when speed to both stores matters.", body: "Flutter or React Native, with native modules where they earn their place." },
  { title: "Boring infrastructure, interesting product.", body: "Proven databases and managed cloud, so your budget goes into what users see." },
];

export const specs = [
  { key: "ARCHITECTURE", title: "Modular, feature-based codebases", body: "Decisions recorded as ADRs so the reasoning survives the people." },
  { key: "CODEBASE", title: "Typed, linted, reviewed on every pull request", body: "No merge without a second senior engineer's approval." },
  { key: "AUTOMATION", title: "CI builds, tests and signs every merge", body: "Installable builds for your team, daily if you want them." },
  { key: "SECURITY", title: "OAuth 2.0 / OIDC, encrypted storage", body: "Checks aligned with OWASP MASVS before every major release." },
  { key: "ANALYTICS", title: "Event schema agreed during design", body: "So launch day answers questions instead of raising them." },
  { key: "APIS", title: "Versioned contracts and latency budgets", body: "Generated clients mean the app and server can't silently drift." },
  { key: "PERFORMANCE", title: "Cold-start and frame-time budgets", body: "Measured on mid-range devices, not just the latest flagship." },
  { key: "RELEASES", title: "Feature flags and phased rollouts", body: "Problems reach 5% of users, not all of them." },
  { key: "HANDOVER", title: "Documentation your next hire can use", body: "Setup in under an hour, or we fix the docs." },
];

export const pipeline = [
  { label: "Lint & type check", result: "0 issues" },
  { label: "Unit tests", result: "412 passed" },
  { label: "UI tests · device farm", result: "86 passed" },
  { label: "Build & sign", result: "iOS · Android" },
  { label: "Phased rollout", result: "25% → 100%" },
];

export const meters = [
  { label: "Crash-free sessions", value: "99.94%", fill: "96%", budget: "92%" },
  { label: "Cold start · budget 1.5s", value: "1.1s", fill: "62%", budget: "84%" },
  { label: "API p95 · budget 300ms", value: "142ms", fill: "42%", budget: "90%" },
];

export const reasons = [
  { n: "i.", title: "Product thinking before code", body: "We challenge assumptions before expensive engineering begins — and we'll say so if a feature shouldn't be built." },
  { n: "ii.", title: "One team, start to finish", body: "Designers and engineers work in the same sprints. Nothing gets thrown over a wall between departments." },
  { n: "iii.", title: "Senior hands on critical decisions", body: "Architecture, data models and security are owned by engineers with a decade or more of shipping behind them." },
  { n: "iv.", title: "Transparent delivery", body: "Fixed scopes per phase, visible milestones, fortnightly demos and a shared channel. You never chase us for status." },
  { n: "v.", title: "Built for the next version", body: "Architecture accounts for the features on your roadmap, so version two is an extension, not a rewrite." },
  { n: "vi.", title: "Business context matters", body: "Every technical choice is weighed against your runway, your market and your revenue model — not ours." },
];

export const models = [
  {
    letter: "A",
    badge: "Most common",
    title: "MVP Launch",
    forWho: "For founders going from concept to first release.",
    timeline: "12–16 weeks",
    team: "Product lead, designer, 2–3 engineers, QA",
    pricing: "Fixed scope per phase",
    points: ["Discovery & UX/UI", "Mobile & backend", "QA & store launch"],
    cta: "Plan an MVP",
    preset: { type: "MVP" },
  },
  {
    letter: "B",
    title: "Full Product",
    forWho: "For complex, end-to-end platforms with several apps.",
    timeline: "5–9 months",
    team: "Cross-functional squad of 6–9",
    pricing: "Milestone-based",
    points: ["Multiple apps & admin", "Complex integrations", "Compliance support"],
    cta: "Discuss a platform",
    preset: { type: "Business platform" },
  },
  {
    letter: "C",
    title: "Dedicated Team",
    forWho: "For funded companies needing ongoing capacity.",
    timeline: "6 months minimum",
    team: "Shaped around your roadmap",
    pricing: "Monthly retainer",
    points: ["Embedded in your rituals", "Scale up or down monthly", "Product lead included"],
    cta: "Build a team",
    preset: { need: ["Full product team"] },
  },
  {
    letter: "D",
    title: "App Upgrade",
    forWho: "For live apps that need modernising or rebuilding.",
    timeline: "2-week audit, then phased",
    team: "Senior engineers + designer",
    pricing: "Fixed audit, then fixed phases",
    points: ["Code & UX audit", "Incremental migration", "No big-bang rewrites"],
    cta: "Book an audit",
    preset: { type: "Existing app upgrade", stage: "Existing product" },
  },
];

export const testimonials = [
  {
    quote: "They talked us out of two features in the first week. That decision saved us a month of build and gave us a cleaner launch.",
    initials: "HB",
    name: "Helena Brandt",
    role: "COO · Logistics scale-up · Operations app",
  },
  {
    quote: "Every Friday we had a build on our phones. As a non-technical founder, that's the first time I've always known exactly where a project stood.",
    initials: "RM",
    name: "Rami Mansour",
    role: "Founder · Wellness booking · MVP",
  },
  {
    quote: "Our in-house engineers took over the codebase after launch with almost no ramp-up. The documentation was better than our own.",
    initials: "JO",
    name: "Julia Okafor",
    role: "VP Engineering · Retail group · App rebuild",
  },
];

export const faqs = [
  {
    q: "How much does it cost to build an app?",
    a: "It depends on scope, platforms and integrations, so we never quote blind. As a guide, focused MVPs typically start in the mid five figures, while full platforms with several apps and an admin panel run into six. After a short discovery call we send a written scope with a fixed price for the first phase, so you know the commitment before any work begins.",
  },
  {
    q: "How long does a mobile app take?",
    a: "Most MVPs take 12–16 weeks from discovery to store launch, with design and engineering overlapping so the first installable build arrives early. Larger platforms with several apps and an admin panel take five to nine months. Those are usually released in phases, so real users arrive and give feedback long before the full scope is finished, and priorities can shift with evidence.",
  },
  {
    q: "Native or cross-platform?",
    a: "Native Swift and Kotlin suit products that lean heavily on device features, demanding animation, top performance or strict platform conventions. Cross-platform Flutter or React Native suits products that need to reach both stores quickly with one team and one codebase. We recommend one approach in writing during strategy, with the costs and trade-offs of each option explained, so the final decision is yours.",
  },
  {
    q: "Can you build an MVP first?",
    a: "Yes — it is how most of our engagements start. We define the smallest product that tests your riskiest assumption, build it to production standard rather than as a throwaway prototype, and architect it so version two extends it instead of replacing it. You launch sooner, learn from real users, and spend the larger budget only once the idea has earned it.",
  },
  {
    q: "Can you improve an existing app?",
    a: "Yes. We start with a fixed-price, two-week audit of your code, architecture and user experience. You receive a prioritised report of what to keep, what to fix and what to rebuild, plus a phased plan with clear costs and timelines. We favour incremental migration over risky big-bang rewrites, so your app keeps serving customers and earning revenue while it steadily improves.",
  },
  {
    q: "Do you design the UX/UI as well?",
    a: "Yes. User research, flows, prototypes and visual design are done in-house by designers who work in the same sprints as our engineers, so nothing is lost in a hand-off. Key journeys are tested with real users before engineering starts. We can also work from your existing designs or design system and extend it wherever the product needs new screens or flows.",
  },
  {
    q: "Who owns the source code?",
    a: "You do. All code, designs and documentation are assigned to you, and the repositories, cloud accounts and app store listings live in your own accounts from day one rather than ours. If you ever move to an in-house team or another partner, everything they need is already in your hands, with documentation written so a new engineer can start quickly.",
  },
  {
    q: "Do you publish the app to the stores?",
    a: "Yes. We prepare the store listings, screenshots, privacy declarations and review notes, then submit the app under your own Apple and Google developer accounts. We answer reviewer questions and handle any rejections until the app is approved and live. Releases go out as phased rollouts with crash monitoring and analytics running, so any problems reach a small share of users first.",
  },
  {
    q: "What happens after launch?",
    a: "Most clients keep us on a monthly plan covering monitoring, operating-system updates, bug fixes and new releases, with a monthly product review to decide what to build next. If you are building an in-house team instead, we hand over the codebase with full documentation and paired onboarding sessions, so your engineers can take ownership confidently without a long and costly ramp-up period.",
  },
  {
    q: "How do you communicate during development?",
    a: "You get a shared Slack channel, a named product lead and a fortnightly demo with an installable build you can try on your own phone. Every week we also send a short written summary of progress, decisions made and risks to watch. Questions in the channel are answered within one working day, so you never need to chase anyone for a status update.",
  },
];

export const inquiryStarters = [
  { title: "Just an idea", sub: "Need help shaping it", preset: { stage: "Idea", type: "New mobile app" } },
  { title: "Designs ready", sub: "Need it engineered", preset: { stage: "Design ready" } },
  { title: "Live app", sub: "Needs to scale or improve", preset: { stage: "Existing product", type: "Existing app upgrade" } },
  { title: "Not sure yet", sub: "Let's talk it through", preset: { type: "Not sure yet" } },
];

/** Footer = the site map in miniature: every hub and service line is linked from every page. */
export const footerColumns: Array<{ title: string; links: Array<{ href: string; label: string; external?: boolean }> }> = [
  {
    title: "Services",
    links: [
      { href: "/services", label: "All services" },
      { href: "/mobile-app-development", label: "Mobile app development" },
      { href: "/web-development", label: "Web development" },
      { href: "/seo-services", label: "SEO services" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Markets",
    links: [
      ...regions.map((region) => ({ href: regionPath(region), label: region.name })),
      { href: "/locations", label: "All locations" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/work", label: "Work" },
      { href: "/process", label: "Process" },
      { href: "/technology", label: "Technology" },
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: "/contact", label: "Start a project" },
      { href: `mailto:${email}`, label: "Email us" },
      ...Object.entries(siteConfig.social)
        .filter(([, href]) => href.startsWith("http"))
        .map(([name, href]) => ({ href, label: `${name[0].toUpperCase()}${name.slice(1)} ↗`, external: true })),
    ],
  },
];
