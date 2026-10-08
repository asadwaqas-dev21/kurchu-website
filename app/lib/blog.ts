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
