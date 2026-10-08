import type { Metadata, Viewport } from "next";
import { faqs } from "./data";
import { Engagement } from "./components/Engagement";
import { Engineering } from "./components/Engineering";
import { Estimator } from "./components/Estimator";
import { Faq } from "./components/Faq";
import { FinalCta } from "./components/FinalCta";
import { Gallery } from "./components/Gallery";
import { Hero } from "./components/Hero";
import { IdeaToProduct } from "./components/IdeaToProduct";
import { PremiumShell } from "./components/PremiumShell";
import { Process } from "./components/Process";
import { Services } from "./components/Services";
import { Technology } from "./components/Technology";
import { Testimonials } from "./components/Testimonials";
import { Trust } from "./components/Trust";
import { WhyUs } from "./components/WhyUs";
import { Work } from "./components/Work";

// Brand-level title: the specific service keywords belong to /services and the
// service line pages, so the homepage does not compete with them.
const title = "Kurchu Software Solutions — App, Web & Software Development";
const description =
  "Kurchu designs, engineers and launches mobile apps, websites and web platforms for founders and operating teams — senior-led from Lahore for clients worldwide, with SEO built in.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", siteName: "Kurchu Software Solutions", locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#09090A",
  viewportFit: "cover",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function PremiumAppDevelopmentPage() {
  return (
    <PremiumShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Trust />
      <Services />
      <IdeaToProduct />
      <Work />
      <Gallery />
      <Process />
      <Technology />
      <Engineering />
      <WhyUs />
      <Engagement />
      <Estimator />
      <Testimonials />
      <Faq />
      <FinalCta />
    </PremiumShell>
  );
}
