import type { Metadata, Viewport } from "next";
import "./premium.css";
import { faqs } from "./data";
import { fontVariables } from "./fonts";
import { Engagement } from "./components/Engagement";
import { Engineering } from "./components/Engineering";
import { Estimator } from "./components/Estimator";
import { Faq } from "./components/Faq";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Hero } from "./components/Hero";
import { IdeaToProduct } from "./components/IdeaToProduct";
import { InquiryModal } from "./components/InquiryModal";
import { Nav } from "./components/Nav";
import { PremiumRoot } from "./components/PremiumRoot";
import { Process } from "./components/Process";
import { Services } from "./components/Services";
import { Technology } from "./components/Technology";
import { Testimonials } from "./components/Testimonials";
import { Trust } from "./components/Trust";
import { WhyUs } from "./components/WhyUs";
import { Work } from "./components/Work";

const title = "Kurchu Software Solutions — Mobile App Development Company";
const description =
  "Kurchu designs, engineers and launches iOS, Android and cross-platform apps for founders and operating teams. Senior-led, fixed-scope phases, and you own the code.";

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
    // `js` hides [data-reveal] content until the observer reveals it.
    <PremiumRoot className={`kp js ${fontVariables}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
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
      </main>
      <Footer />
      <InquiryModal />
    </PremiumRoot>
  );
}
