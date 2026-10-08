import type { Viewport } from "next";
import { termsOfUse } from "@/app/lib/legal";
import { buildMetadata } from "@/app/lib/metadata";
import { LegalDocument } from "@/app/premium-app-development/components/LegalDocument";
import { PremiumShell } from "@/app/premium-app-development/components/PremiumShell";

export const metadata = buildMetadata({
  title: "Terms of Use | Kurchu Software Solutions",
  description:
    "The terms that govern use of the Kurchu Software Solutions website, including our AI assistant, intellectual property and the limits of our liability.",
  path: "/terms",
});

export const viewport: Viewport = { themeColor: "#09090A", viewportFit: "cover" };

export default function TermsPage() {
  return (
    <PremiumShell stickyCta={false}>
      <LegalDocument doc={termsOfUse} />
    </PremiumShell>
  );
}
