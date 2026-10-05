/** ──────────────────────────────────────────────
 *  Blog posts ("News & insights").
 *  Add a new object to `posts` to publish an article —
 *  the homepage, /blog and /blog/[slug] pick it up automatically.
 * ──────────────────────────────────────────────*/

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO date
  readTime: string;
  image: string;
  imageAlt: string;
  sections: BlogSection[];
};

export const posts: BlogPost[] = [
  {
    slug: "how-much-does-a-business-website-cost",
    title: "How much does a business website cost in 2026?",
    excerpt:
      "A clear breakdown of what drives website pricing — from page count and design to integrations — so you can budget with confidence.",
    category: "Web development",
    date: "2026-09-24",
    readTime: "6 min read",
    image: "/blog/website-cost.svg",
    imageAlt: "Illustration of a website layout with a price tag",
    sections: [
      {
        heading: "Why quotes vary so much",
        paragraphs: [
          "Ask five agencies to price the same website and you will often get five very different numbers. That is rarely because someone is overcharging — it is because each one has imagined a different project. One quote might cover a template with your logo dropped in; another covers custom design, copywriting, SEO setup and a booking system.",
          "The fastest way to compare quotes fairly is to understand what actually drives the cost.",
        ],
      },
      {
        heading: "The five things that shape the price",
        paragraphs: ["Almost every website budget comes down to the same handful of factors:"],
        bullets: [
          "Number of unique page layouts — ten pages that share one template cost far less than ten individually designed pages.",
          "Design depth — a refined template versus a fully custom design system built around your brand.",
          "Content — whether you supply text and photos, or need copywriting and photography sourced for you.",
          "Functionality — forms, bookings, payments, member areas, multilingual content and CRM integrations each add scope.",
          "SEO and performance groundwork — technical SEO, page speed work and analytics setup done properly at launch.",
        ],
      },
      {
        heading: "Typical ranges",
        paragraphs: [
          "For a professional, fixed-scope business website built to rank and convert, our projects start from $3,500. E-commerce stores and custom web applications sit higher because they involve product catalogues, payments and business logic, and we scope those individually.",
          "Be wary of prices that seem too good to be true. Very cheap websites often skip the parts you cannot see on day one — accessibility, speed, security updates and search foundations — and those gaps become expensive later.",
        ],
      },
      {
        heading: "How to get an accurate quote",
        paragraphs: [
          "You do not need a perfect technical brief. Share what your business does, which pages you think you need, any features you have in mind and a few websites you like. With that, any good agency can give you a realistic range and a written scope, so you know exactly what is included before any work begins.",
        ],
      },
    ],
  },
  {
    slug: "local-seo-checklist-google-maps",
    title: "Local SEO checklist: how to rank higher on Google Maps",
    excerpt:
      "Practical steps any service business can take to appear in the local map pack and win more calls from nearby customers.",
    category: "SEO",
    date: "2026-09-10",
    readTime: "7 min read",
    image: "/blog/local-seo.svg",
    imageAlt: "Illustration of a map pin above rising ranking bars",
    sections: [
      {
        heading: "Why the map pack matters",
        paragraphs: [
          "When someone searches for a service “near me”, the first thing they usually see is a map with three businesses listed underneath. Those three spots attract a large share of the clicks and calls. For plumbers, cleaners, clinics, removals companies and other local businesses, appearing there can matter more than anything else in search.",
        ],
      },
      {
        heading: "Start with your Google Business Profile",
        paragraphs: ["Your profile is the foundation of local rankings. Make sure it is complete and accurate:"],
        bullets: [
          "Choose the most specific primary category and add relevant secondary categories.",
          "Keep your name, address and phone number identical everywhere they appear online.",
          "Add real photos of your team, premises and work — and keep adding them.",
          "List your services with short descriptions and set accurate opening hours.",
          "Post updates and offers regularly so the profile stays active.",
        ],
      },
      {
        heading: "Earn reviews consistently",
        paragraphs: [
          "Reviews influence both rankings and whether people choose you. Ask every happy customer, make it easy with a direct review link, and reply to every review — positive or negative — politely and promptly. A steady flow of recent reviews beats a burst of old ones.",
        ],
      },
      {
        heading: "Support it with your website",
        paragraphs: [
          "Google cross-checks your profile against your website. Create a dedicated page for each core service and, where relevant, each area you serve. Include your address and phone number, embed a map, add local business structured data and make sure every page loads quickly on mobile.",
        ],
      },
      {
        heading: "Be patient and measure",
        paragraphs: [
          "Some fixes show results within weeks, but meaningful, durable movement for competitive local searches typically takes three to six months. Track calls, direction requests and form enquiries — not just rankings — so you can see the real business impact.",
        ],
      },
    ],
  },
  {
    slug: "flutter-vs-native-mobile-app",
    title: "Flutter vs native: choosing the right approach for your app",
    excerpt:
      "One codebase or two? We compare cost, speed, performance and long-term maintenance to help you pick the right path for your app.",
    category: "Mobile apps",
    date: "2026-08-27",
    readTime: "5 min read",
    image: "/blog/flutter-vs-native.svg",
    imageAlt: "Illustration of two smartphones side by side",
    sections: [
      {
        heading: "The decision in one sentence",
        paragraphs: [
          "If you need an app on both iOS and Android with a sensible budget and timeline, a cross-platform framework like Flutter is usually the right choice. If your app depends heavily on cutting-edge device features or platform-specific experiences, native development can be worth the extra investment.",
        ],
      },
      {
        heading: "Where Flutter shines",
        paragraphs: ["Flutter lets one team build a single codebase that runs on both platforms. In practice that means:"],
        bullets: [
          "Lower build cost, because you are not paying for two separate apps.",
          "Faster launches and quicker updates, since features ship to both platforms at once.",
          "A consistent design across iOS and Android.",
          "Simpler long-term maintenance with one codebase to test and update.",
        ],
      },
      {
        heading: "When native makes sense",
        paragraphs: [
          "Native apps, built with Swift for iOS and Kotlin for Android, give direct access to every platform API on day one. They are a strong fit for apps built around advanced camera or AR features, heavy background processing, deep hardware integrations, or experiences that should feel unmistakably “Apple” or “Android”.",
        ],
      },
      {
        heading: "Our recommendation",
        paragraphs: [
          "For most business apps — booking systems, customer portals, marketplaces, loyalty apps and internal tools — Flutter delivers native-quality performance at a lower total cost. We start every app project with a short discovery phase to confirm the right approach for your specific features before any code is written.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
