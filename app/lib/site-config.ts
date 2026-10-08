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
    email: "info@thekurchu.com",
    whatsapp: "+923028207226",
    phone: "+923028207226",
    /** Phone number as shown on the page. */
    phoneDisplay: "+92 3028207226",
  },

  social: {
    linkedin: "#",
    github: "#",
  },
} as const;

export type SiteConfig = typeof siteConfig;
