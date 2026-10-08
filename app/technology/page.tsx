import type { Viewport } from "next";
import { buildMetadata } from "@/app/lib/metadata";
import { Engineering } from "@/app/premium-app-development/components/Engineering";
import { FinalCta } from "@/app/premium-app-development/components/FinalCta";
import { PageHero } from "@/app/premium-app-development/components/PageHero";
import { PremiumShell } from "@/app/premium-app-development/components/PremiumShell";
import { Technology } from "@/app/premium-app-development/components/Technology";

export const metadata = buildMetadata({
  title: "Technology & Engineering Standards | Kurchu Software Solutions",
  description:
    "Swift, Kotlin, Flutter and React Native apps on typed APIs, PostgreSQL and managed cloud — with CI, automated tests, security checks and phased rollouts.",
  path: "/technology",
});

export const viewport: Viewport = { themeColor: "#09090A", viewportFit: "cover" };

export default function TechnologyPage() {
  return (
    <PremiumShell current="technology">
      <PageHero
        path="/technology"
        eyebrow="Technology & engineering"
        lines={["The stack behind", "apps that", <em key="em">keep working.</em>]}
        lede="Swift, Kotlin, Flutter and React Native on the client; typed APIs, PostgreSQL and managed cloud behind them. Chosen for your product's next three years — not for our CV."
        meta={["Native or cross-platform, in writing", "Typed end to end", "CI, tests and phased rollouts"]}
        cta={{ label: "Start a Project" }}
        secondary={{ href: "/process", label: "See our process" }}
      />
      <Technology />
      <Engineering />
      <FinalCta />
    </PremiumShell>
  );
}
