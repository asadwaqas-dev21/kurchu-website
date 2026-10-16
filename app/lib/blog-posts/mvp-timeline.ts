import type { BlogPost } from "../blog";
import { MVP_TIMELINE_ROWS, MVP_WEEKS, MVP_WEEKS_EXAMPLE } from "../pricing-copy";

// Timelines come from the same price table as the AI estimator and the App Ideas
// pages (lib/estimator.ts), so this guide can never contradict them.
export const mvpTimeline: BlogPost = {
  slug: "how-long-does-it-take-to-build-an-mvp",
  title: "How long does it take to build an MVP app?",
  excerpt: `Most app MVPs take ${MVP_WEEKS} from discovery to store launch, depending on scope. Here is where that time goes, what speeds it up and how to see the timeline for your own idea.`,
  metaDescription: `Most app MVPs take ${MVP_WEEKS} from discovery to store launch. See timelines by app type, where the time goes and what speeds an MVP up.`,
  category: "Product strategy",
  date: "2026-10-08",
  updated: "2026-10-15",
  readTime: "7 min read",
  image: "/blog/mvp-timeline.svg",
  imageAlt: "Illustration of a project timeline leading to a launched mobile app",
  keywords: ["MVP timeline", "how long to build an MVP", "how long to build an app", "MVP app development", "app development timeline", "minimum viable product"],
  summary: `A focused mobile app MVP typically takes ${MVP_WEEKS} from discovery to launch on the App Store and Google Play. Apps with one user role and few features sit at the short end; payments, live tracking, several user roles or an admin dashboard push it towards the long end. ${MVP_WEEKS_EXAMPLE}`,
  cta: {
    title: "See the timeline for your own idea",
    body: "Describe your app and the free AI estimator shows the features, a week-by-week timeline range and the price — in about ten seconds.",
    href: "/app-cost-estimator",
    label: "Estimate my app",
  },
  takeaways: [
    `Plan for ${MVP_WEEKS} for a focused MVP; larger platforms with several apps take several months.`,
    "Scope, not coding speed, is the biggest driver of the timeline.",
    "Overlapping design and engineering gets an installable build into your hands sooner.",
    "Payments, integrations and store review are the usual hidden delays.",
    "Cutting features is faster and safer than cutting testing.",
  ],
  sections: [
    {
      heading: "What counts as an MVP?",
      paragraphs: [
        "A minimum viable product is the smallest version of your app that lets real users complete the one job that matters most — and lets you learn whether they value it. It is not a clickable prototype and it is not a half-finished full product. It is production-quality software with a deliberately narrow scope.",
        "That distinction matters for the timeline. A prototype can be ready in days, but it cannot take payments, store data securely or survive App Store review. A full product can take most of a year. An MVP sits between the two: real enough to launch, small enough to ship in a few weeks.",
      ],
    },
    {
      heading: "How long does an MVP take for different types of app?",
      paragraphs: [
        "These are estimated first-release timelines for common app types, built for iOS and Android from one codebase with a ready-made design. Each has a worked plan with features and cost in our App Ideas library; native apps or a custom design add time.",
      ],
      table: {
        caption: "Estimated MVP timeline by app type",
        headers: ["App type", "First release", "Estimated timeline"],
        rows: MVP_TIMELINE_ROWS,
      },
    },
    {
      heading: "What does a typical MVP timeline look like?",
      paragraphs: [
        "Every project is different, but a well-run MVP follows the same shape. Here is a mid-sized example of about ten weeks, such as a booking or ordering app. Stages overlap on purpose — engineering starts on the first approved flows while design finishes the rest.",
      ],
      table: {
        caption: "Example ten-week MVP timeline by stage",
        headers: ["Stage", "When", "What you receive"],
        rows: [
          ["Discovery", "Week 1", "A product brief: users, the core problem, success metrics and risks"],
          ["Strategy & scope", "Week 2", "A prioritised feature list with a clear MVP line and a technical approach"],
          ["UX & UI design", "Weeks 2–4", "User flows and a clickable prototype of the key screens"],
          ["Engineering", "Weeks 3–9", "Installable builds every sprint, wired to a real backend"],
          ["Testing", "Continuous, plus week 9", "A QA report across a real device matrix"],
          ["Launch", "Week 10", "Store listings, submission and a phased rollout"],
        ],
      },
    },
    {
      heading: "What makes an MVP take longer?",
      paragraphs: ["Most delays have nothing to do with how fast developers type. The usual culprits are:"],
      bullets: [
        "Scope creep — new features added mid-build without removing others.",
        "Several user roles, such as customers, staff and admins, each needing their own flows.",
        "Payments, identity checks or subscriptions, which add provider onboarding and extra review.",
        "Integrations with legacy systems that have poor documentation or slow vendor support.",
        "Regulated data, such as health or financial information, which needs extra security and documentation.",
        "Slow decisions — waiting a week for feedback on a design can cost a week of the schedule.",
        "App Store or Google Play rejections that need fixes and resubmission.",
      ],
    },
    {
      heading: "How can you launch faster without cutting corners?",
      paragraphs: ["Speed comes from focus and good defaults, not from skipping quality. The most reliable levers are:"],
      bullets: [
        "Choose one core journey and make it excellent; everything else waits for version two.",
        "Use a cross-platform framework such as Flutter or React Native when you need both stores.",
        "Rely on proven services for authentication, payments and push notifications instead of building them.",
        "Name one decision-maker on your side who can approve designs within a day or two.",
        "Start with a ready-made design system so new screens are assembled, not invented.",
        "Release as a phased rollout, so you can launch sooner and expand safely.",
      ],
    },
    {
      heading: "Does native or cross-platform change the timeline?",
      paragraphs: [
        "Usually, yes. A single cross-platform codebase avoids building and testing two separate apps, which typically shortens an MVP that needs both iOS and Android. Native Swift and Kotlin still make sense when the product depends heavily on device features, demanding animation or platform-specific experiences — but they are rarely the fastest route to a first release.",
      ],
    },
    {
      heading: "What should you have ready before you start?",
      paragraphs: ["You do not need a perfect brief, but having these ready can save a week or more:"],
      bullets: [
        "A short description of the problem and the people who have it.",
        "Two or three competitor or reference apps, with what you like and dislike about each.",
        "A rough list of must-have features, separated from nice-to-haves.",
        "Brand assets — logo, colours and fonts — if you already have them.",
        "Apple Developer and Google Play Console accounts in your company's name.",
        "Time in your calendar for weekly reviews during the build.",
      ],
    },
    {
      heading: "How does Kurchu run MVP projects?",
      paragraphs: [
        `We start with a short discovery sprint, then scope the MVP in fixed-price phases. You install a real build on your own phone at every demo, and you own all of the code, designs and store accounts from day one. Typical first releases are estimated at ${MVP_WEEKS}; the free AI cost estimator shows the timeline and price for your own feature list.`,
      ],
    },
  ],
  faqs: [
    {
      q: "Can an MVP be built faster?",
      a: `Yes — by narrowing the scope, not by skipping quality. An MVP with one user role, no payments and few integrations sits at the short end of the ${MVP_WEEKS} range, especially with a ready-made design. Squeezing further usually means skipped testing or user research, which costs more after launch than it saves before it. It is better to cut features than to cut quality.`,
    },
    {
      q: "Is an MVP the same as a prototype?",
      a: "No. A prototype is a clickable mock-up used to test ideas and flows with users before engineering starts; it cannot store data, take payments or be published. An MVP is real, production-quality software with a deliberately small scope, released to actual customers in the App Store and Google Play. Most good MVPs are built after a prototype has been tested.",
    },
    {
      q: "How long does App Store and Google Play review take?",
      a: "Review is often completed within a day or two, but it varies. New apps, new developer accounts, payments, subscriptions and anything involving health or children can attract closer scrutiny and longer waits, and a rejection means fixing and resubmitting. We plan a buffer for store submission, so review never decides your launch date at the last minute.",
    },
    {
      q: "What happens after the MVP launches?",
      a: "Launch is the start of learning, not the finish line. In the first weeks you watch crash reports, analytics and user feedback, fix the issues that matter and decide what to build next based on evidence. Most teams move into a rhythm of releases every two to four weeks, expanding the product gradually as real usage shows what customers value most.",
    },
    {
      q: "Should I build my MVP for iOS and Android at the same time?",
      a: "Usually yes, if your customers use both platforms, because a cross-platform framework lets one team ship both apps from a single codebase with little extra time. If your audience is heavily concentrated on one platform, or the app relies on platform-specific features, launching on one store first can be sensible. Your user research should decide, not habit or guesswork about your audience.",
    },
  ],
  relatedLinks: [
    { href: "/services/mvp-app-development", label: "MVP app development for startups" },
    { href: "/app-cost-estimator", label: "See the timeline and price for your own idea" },
    { href: "/app-ideas", label: "MVP plans for popular app types" },
    { href: "/process", label: "Our eight-stage delivery process" },
    { href: "/mobile-app-development", label: "Mobile app development services" },
    { href: "/blog/flutter-vs-react-native", label: "Flutter vs React Native: which should you choose?" },
  ],
};
