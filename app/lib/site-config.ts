/** ──────────────────────────────────────────────
 *  Site-wide configuration
 *  Replace placeholder values with real business info.
 * ──────────────────────────────────────────────*/

export const siteConfig = {
  name: "Kurchu Software Solutions",
  shortName: "Kurchu",
  tagline: "Websites, apps and SEO that turn visitors into customers.",
  url: "https://www.kurchu.com", // production origin (kurchu.com redirects here)
  location: "Lahore, Pakistan",

  /** Replace with genuine contact info */
  contact: {
    email: "info@thekurchu.com",
    whatsapp: "+923028207226",
    phone: "+923028207226",
  },

  social: {
    linkedin: "#",
    github: "#",
  },
} as const;

export type SiteConfig = typeof siteConfig;
