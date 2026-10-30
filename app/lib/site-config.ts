/** ──────────────────────────────────────────────
 *  Site-wide configuration
 *  Replace placeholder values with real business info.
 * ──────────────────────────────────────────────*/

export const siteConfig = {
  name: "Kurchu Software Solutions",
  shortName: "Kurchu",
  tagline: "Mobile apps, designed and engineered to be kept.",
  url: "https://www.kurchu.com", // production origin (kurchu.com redirects here)
  location: "Lahore, Pakistan",

  /** Replace with genuine contact info */
  contact: {
    email: "info@kurchu.com",
    whatsapp: "+923028207226",
    phone: "+923028207226",
    /** Phone number as shown on the page. */
    phoneDisplay: "+92 3028207226",
  },

  social: {
    facebook: "https://www.facebook.com/thekurchu/",
    linkedin: "#",
    github: "#",
  },

  /** People credited on articles: the visible byline and the BlogPosting `author` (Person). */
  authors: {
    "sameer-ahmad": {
      name: "Sameer Ahmad",
      jobTitle: "Founder",
      /** 400×400 JPG made from public/Founder/sameer ahmad.png. */
      image: "/team/sameer-ahmad.jpg",
      linkedin: "https://www.linkedin.com/in/sameer-ahmad-basra",
    },
    "asad-waqas": {
      name: "Asad Waqas",
      jobTitle: "App Developer, Web Developer & SEO Engineer",
      /** 400×400 JPG made from public/team/asad-waqas.avif. */
      image: "/team/asad-waqas.jpg",
      linkedin: "https://www.linkedin.com/in/asad-waqas-software-developer",
    },
  },
} as const;

export type AuthorId = keyof typeof siteConfig.authors;
/** Credited on every article that doesn't name its own author. */
export const DEFAULT_AUTHOR: AuthorId = "sameer-ahmad";

/**
 * A team member with their on-site profile (/about#<id>) and the schema.org `@id` declared once in
 * the root layout's graph, so every article and the Organization point at the same Person.
 */
export function personFor(id: AuthorId) {
  return { id, ...siteConfig.authors[id], profile: `/about#${id}`, schemaId: `${siteConfig.url}/#person-${id}` };
}

export type SiteConfig = typeof siteConfig;
