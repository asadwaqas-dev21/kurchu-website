/** ──────────────────────────────────────────────
 *  Service lines. Kurchu now offers mobile app development only; the list
 *  shape is kept so a future service line is a one-entry change. Drives
 *  Service structured data, llms.txt and the blog's related-service link.
 * ──────────────────────────────────────────────*/
import type { ServiceLine } from "./jsonld";

export type ServiceLineDetail = ServiceLine & {
  /** Short label for links, written as it should appear mid-sentence ("Explore mobile apps"). */
  label: string;
  points: string[];
  /** Blog category whose posts belong to this service line. */
  blogCategory: string;
};

export const serviceLines: ServiceLineDetail[] = [
  {
    label: "mobile apps",
    name: "Mobile App Development",
    path: "/mobile-app-development",
    serviceType: "Mobile application development",
    description:
      "Android and iOS apps — native or Flutter — taken from product strategy and UX through backend, QA, store launch and ongoing support.",
    points: ["iOS & Android", "Flutter & native", "Backend & admin tools"],
    blogCategory: "Mobile apps",
  },
];

export function getServiceLine(path: string) {
  return serviceLines.find((service) => service.path === path);
}
