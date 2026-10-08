import type { ReactNode } from "react";
import "../premium.css";
import { fontVariables } from "../fonts";
import { Footer } from "./Footer";
import { InquiryModal } from "./InquiryModal";
import { Nav } from "./Nav";
import { PremiumRoot } from "./PremiumRoot";

/**
 * Shared frame for every page in the new design: scoped styles, fonts,
 * nav, footer, sticky mobile CTA and the inquiry dialog. `lang` overrides the
 * document language on regional pages, e.g. "en-GB".
 */
export function PremiumShell({ current, lang, children }: { current?: string; lang?: string; children: ReactNode }) {
  return (
    // `js` hides [data-reveal] content until the observer reveals it.
    <PremiumRoot className={`kp js ${fontVariables}`} lang={lang}>
      {/* Without JavaScript the reveal animations never run — show everything instead. */}
      <noscript>
        <style>{`.kp.js [data-reveal]{opacity:1;transform:none;clip-path:none}.kp .h1 .ln>span,.kp .hero-fade,.kp .cs-in{transform:none;opacity:1}`}</style>
      </noscript>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav current={current} />
      <main id="main">{children}</main>
      <Footer />
      <InquiryModal />
    </PremiumRoot>
  );
}
