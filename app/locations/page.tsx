import type { Viewport } from "next";
import { buildMetadata } from "@/app/lib/metadata";
import { regionLanguageAlternates, regions } from "@/app/lib/regions";
import { FinalCta } from "@/app/premium-app-development/components/FinalCta";
import { Markets, MarketsTable } from "@/app/premium-app-development/components/Markets";
import { PageHero } from "@/app/premium-app-development/components/PageHero";
import { Summary } from "@/app/premium-app-development/components/Summary";
import { PremiumShell } from "@/app/premium-app-development/components/PremiumShell";

// Hub of the four market pages and their hreflang x-default.
export const metadata = buildMetadata({
  title: "Mobile App Development for the UK, USA, Canada & UAE | Kurchu",
  description:
    "iOS, Android and cross-platform apps for businesses in the UK, USA, Canada and UAE — planned around each market's privacy law, payments and time zone.",
  path: "/locations",
  languages: regionLanguageAlternates(),
});

export const viewport: Viewport = { themeColor: "#09090A", viewportFit: "cover" };

export default function LocationsPage() {
  return (
    <PremiumShell>
      <PageHero
        path="/locations"
        eyebrow="Markets we serve"
        lines={["Mobile apps", "for the UK, USA,", <em key="em">Canada and the UAE.</em>]}
        lede="One senior team in Lahore, working with founders and operators in four markets. Each market page covers the privacy law, payment providers, languages and working hours we plan your product around."
        meta={["United Kingdom · United States", "Canada · United Arab Emirates", "One team, every market"]}
        cta={{ label: "Start a Project" }}
        secondary={{ href: "/services", label: "Our services" }}
        pageType="CollectionPage"
      />
      <Summary
        title={
          <>
            Where Kurchu <em>works.</em>
          </>
        }
        answer="Kurchu Software Solutions builds mobile apps for businesses in four markets: the United Kingdom, the United States, Canada and the United Arab Emirates. Each product is planned around that market's privacy law, payment providers, languages and time zone, by one senior team based in Lahore, Pakistan."
        facts={regions.map((region) => [region.name, `${region.privacyLaw} · ${region.languages}`])}
      />
      <Markets
        eyebrow="Choose your market"
        title={
          <>
            Four markets, <em>one standard.</em>
          </>
        }
      />
      <MarketsTable />
      <FinalCta />
    </PremiumShell>
  );
}
