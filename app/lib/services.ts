/** ──────────────────────────────────────────────
 *  Service lines under the /services hub.
 *  Drives the hub cards, Service structured data, related-service links
 *  on each service page and the "related service" link on blog posts.
 * ──────────────────────────────────────────────*/
import type { ServiceLine } from "./jsonld";

export type ServiceLineDetail = ServiceLine & {
  /** Short label for cards and links. */
  label: string;
  points: string[];
  /** Blog category whose posts belong to this service line. */
  blogCategory: string;
};

export const serviceLines: ServiceLineDetail[] = [
  {
    label: "Mobile apps",
    name: "Mobile App Development",
    path: "/mobile-app-development",
    serviceType: "Mobile application development",
    description:
      "Android and iOS apps — native or Flutter — taken from product strategy and UX through backend, QA, store launch and ongoing support.",
    points: ["iOS & Android", "Flutter & native", "Backend & admin tools"],
    blogCategory: "Mobile apps",
  },
  {
    label: "Websites",
    name: "Web Development",
    path: "/web-development",
    serviceType: "Web development",
    description:
      "Business websites, e-commerce stores and custom web applications built on Next.js, WordPress or Shopify — fast, accessible and easy to update.",
    points: ["Business websites", "E-commerce", "Web applications"],
    blogCategory: "Web development",
  },
  {
    label: "SEO",
    name: "SEO Services",
    path: "/seo-services",
    serviceType: "Search engine optimization",
    description:
      "Technical, local and on-page SEO with content strategy, so the right customers find you on Google in Pakistan and international markets.",
    points: ["Technical SEO", "Local SEO", "Content strategy"],
    blogCategory: "SEO",
  },
];

export function getServiceLine(path: string) {
  return serviceLines.find((service) => service.path === path);
}
