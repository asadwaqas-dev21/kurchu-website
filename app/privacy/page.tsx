import type { Viewport } from "next";
import { privacyPolicy } from "@/app/lib/legal";
import { buildMetadata } from "@/app/lib/metadata";
import { LegalDocument } from "@/app/premium-app-development/components/LegalDocument";
import { PremiumShell } from "@/app/premium-app-development/components/PremiumShell";

export const metadata = buildMetadata({
  title: "Privacy Policy | Kurchu Software Solutions",
  description:
    "How Kurchu Software Solutions handles personal information: what we collect, why, how long we keep it, and your rights in the UK, USA, Canada and UAE.",
  path: "/privacy",
});

export const viewport: Viewport = { themeColor: "#09090A", viewportFit: "cover" };

export default function PrivacyPage() {
  return (
    <PremiumShell stickyCta={false}>
      <LegalDocument doc={privacyPolicy} />
    </PremiumShell>
  );
}
