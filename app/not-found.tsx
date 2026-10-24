import type { Metadata } from "next";
import Link from "next/link";
import { PremiumShell } from "@/app/premium-app-development/components/PremiumShell";
import { Arr } from "@/app/premium-app-development/components/ui";

// Shown for any unmatched URL and for notFound() calls. Next adds noindex and returns 404.
export const metadata: Metadata = {
  title: "Page not found | Kurchu",
  description: "The page you were looking for doesn't exist. Find Kurchu's mobile app development services, pricing and guides instead.",
};

const links = [
  { href: "/mobile-app-development", label: "Mobile app development" },
  { href: "/services", label: "All services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/app-ideas", label: "App ideas" },
  { href: "/blog", label: "Guides" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <PremiumShell>
      <section className="ph" aria-labelledby="page-title">
        <div className="hero-bg" aria-hidden="true"></div>
        <div className="wrap">
          <div className="ph-grid">
            <div>
              <span className="pill-tag hero-fade">
                <span className="dot"></span>
                404 · Page not found
              </span>
              <h1 className="h1" id="page-title">
                <span className="ln">
                  <span>This page</span>
                </span>
                <span className="ln">
                  <span>doesn&apos;t exist,</span>
                </span>
                <span className="ln">
                  <span>
                    <em>but your app can.</em>
                  </span>
                </span>
              </h1>
            </div>
            <div className="ph-side">
              <p className="lede hero-fade d2">
                The link may be old or mistyped. Try one of these instead:{" "}
                {links.map((link, i) => (
                  <span key={link.href}>
                    <Link className="tlink" href={link.href}>
                      {link.label}
                    </Link>
                    {i < links.length - 1 ? ", " : "."}
                  </span>
                ))}
              </p>
              <div className="hero-ctas hero-fade d3">
                <Link className="btn btn-primary" href="/">
                  Back to home <Arr />
                </Link>
                <Link className="btn btn-ghost" href="/contact">
                  Start a project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PremiumShell>
  );
}
