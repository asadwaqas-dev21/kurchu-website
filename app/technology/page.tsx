import type { Viewport } from "next";
import Link from "next/link";
import { buildMetadata } from "@/app/lib/metadata";
import { Engineering } from "@/app/premium-app-development/components/Engineering";
import { FinalCta } from "@/app/premium-app-development/components/FinalCta";
import { PageHero } from "@/app/premium-app-development/components/PageHero";
import { PremiumShell } from "@/app/premium-app-development/components/PremiumShell";
import { Technology } from "@/app/premium-app-development/components/Technology";
import { SectionHead, rv } from "@/app/premium-app-development/components/ui";

export const metadata = buildMetadata({
  title: "Mobile App Technology Stack & Frameworks | Kurchu",
  description:
    "The mobile app tech stack we use: Swift, Kotlin, Flutter and React Native on typed APIs, PostgreSQL and managed cloud, with CI, tests and phased rollouts.",
  path: "/technology",
});

export const viewport: Viewport = { themeColor: "#09090A", viewportFit: "cover" };

const frameworks = [
  {
    name: "Native iOS",
    href: "/services/ios-app-development",
    language: "Swift, SwiftUI",
    bestFor: "iPhone-first products, Apple Pay, widgets and demanding media or animation",
    tradeOff: "iOS only — Android needs a second app",
  },
  {
    name: "Native Android",
    href: "/services/android-app-development",
    language: "Kotlin, Jetpack Compose",
    bestFor: "Android-first markets, field and hardware apps, background work and entry-level phones",
    tradeOff: "Android only — iOS needs a second app",
  },
  {
    name: "Flutter",
    href: "/services/cross-platform-app-development",
    language: "Dart",
    bestFor: "iOS and Android from one codebase with a highly custom, animated interface",
    tradeOff: "Some device SDKs need a native plugin",
  },
  {
    name: "React Native",
    href: "/services/cross-platform-app-development",
    language: "TypeScript",
    bestFor: "iOS and Android from one codebase for teams already using React on the web",
    tradeOff: "Complex animation needs extra care",
  },
];

export default function TechnologyPage() {
  return (
    <PremiumShell current="technology">
      <PageHero
        path="/technology"
        eyebrow="Technology & engineering"
        lines={["The mobile app", "tech stack behind", <em key="em">apps that keep working.</em>]}
        lede="Swift, Kotlin, Flutter and React Native on the client; typed APIs, PostgreSQL and managed cloud behind them. Chosen for your product's next three years — not for our CV."
        meta={["Native or cross-platform, in writing", "Typed end to end", "CI, tests and phased rollouts"]}
        cta={{ label: "Start a Project" }}
        secondary={{ href: "/process", label: "See our process" }}
      />
      <Technology />
      <section className="section mkt" id="frameworks" aria-labelledby="frameworks-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead
            eyebrow="Frameworks"
            titleId="frameworks-title"
            title={
              <>
                Which mobile framework <em>fits your app?</em>
              </>
            }
            lede="There is no single best framework for mobile app development — there is the best fit for your product, team and budget. This is how we compare them before recommending one in writing."
          />
          <div className="tbl-wrap" {...rv()}>
            <table className="tbl">
              <caption className="sr-only">Mobile app frameworks compared: language, best fit and trade-offs</caption>
              <thead>
                <tr>
                  <th scope="col">Framework</th>
                  <th scope="col">Language</th>
                  <th scope="col">Best for</th>
                  <th scope="col">Trade-off</th>
                </tr>
              </thead>
              <tbody>
                {frameworks.map((row) => (
                  <tr key={row.name}>
                    <th scope="row">
                      <Link href={row.href}>{row.name}</Link>
                    </th>
                    <td>{row.language}</td>
                    <td>{row.bestFor}</td>
                    <td>{row.tradeOff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Engineering />
      <FinalCta />
    </PremiumShell>
  );
}
