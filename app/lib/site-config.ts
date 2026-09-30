/** ──────────────────────────────────────────────
 *  Site-wide configuration
 *  Replace placeholder values with real business info.
 * ──────────────────────────────────────────────*/

export const siteConfig = {
  name: "Kurchu Software Solutions",
  shortName: "Kurchu",
  tagline: "Websites, apps and SEO that turn visitors into customers.",
  url: "https://kurchu.com", // TODO: replace with production URL
  location: "Lahore, Pakistan",

  /** Replace with genuine contact info */
  contact: {
    email: "[your-email@kurchu.com]",
    whatsapp: "[+92-xxx-xxxxxxx]",
    phone: "[+92-xxx-xxxxxxx]",
  },

  social: {
    linkedin: "#",
    github: "#",
  },
} as const;

export type SiteConfig = typeof siteConfig;
