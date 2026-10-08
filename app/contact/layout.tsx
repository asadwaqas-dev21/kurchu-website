import { buildMetadata } from "@/app/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact Kurchu Software Solutions | Start a Project",
  description:
    "Tell us about your app — a new product, an MVP or an existing app that needs work. We reply within one business day with next steps.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
