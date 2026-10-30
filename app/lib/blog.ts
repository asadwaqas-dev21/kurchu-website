/** ──────────────────────────────────────────────
 *  Blog posts ("News & insights").
 *  Add a new object to `posts` to publish an article —
 *  the homepage, /blog and /blog/[slug] pick it up automatically.
 * ──────────────────────────────────────────────*/
import { DEFAULT_AUTHOR, personFor, type AuthorId } from "./site-config";

export type BlogSection = {
  /** Phrase as the question a reader would search for — answer engines match on it. */
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  /** A comparison table; rendered as a real <table> so it can be quoted. */
  table?: { caption: string; headers: string[]; rows: string[][] };
};

export type BlogPost = {
  slug: string;
  title: string;
  /** Shorter <title> when `title` runs past ~60 characters and Google would cut it off. */
  seoTitle?: string;
  excerpt: string;
  /** Meta description (≤160 characters) when `excerpt` is longer. */
  metaDescription?: string;
  category: string;
  date: string; // ISO date
  readTime: string;
  image: string;
  imageAlt: string;
  sections: BlogSection[];
  /** Answer-first summary (40–70 words) shown under the title as "In short". */
  summary?: string;
  /** Highlighted next step shown right under the summary — e.g. "see the timeline for your idea". */
  cta?: { title: string; body: string; href: string; label: string };
  takeaways?: string[];
  /** FAQ answers are 60–65 words each and emitted as FAQPage schema. */
  faqs?: Array<{ q: string; a: string }>;
  /** ISO date of the last substantive update, if after `date`. */
  updated?: string;
  keywords?: string[];
  relatedLinks?: Array<{ href: string; label: string }>;
  /** Key in siteConfig.authors; defaults to DEFAULT_AUTHOR. */
  author?: AuthorId;
};

import { newPosts } from "./blog-posts";
import { flutterVsNative } from "./blog-posts/flutter-vs-native";

export const posts: BlogPost[] = [
  ...newPosts,
  flutterVsNative,
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

/**
 * Raster copy of a post's cover (public/blog/<name>.png, 1200×750) for share cards,
 * Article schema and the image sitemap — Google doesn't use SVG for those. The page
 * itself keeps the sharper, lighter SVG.
 */
export function postShareImage(post: BlogPost) {
  return post.image.replace(/\.svg$/, ".png");
}

/** The person credited on a post. */
export function postAuthor(post: BlogPost) {
  return personFor(post.author ?? DEFAULT_AUTHOR);
}

export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
