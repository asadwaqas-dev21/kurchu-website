import type { ReactNode } from "react";
import "../premium.css";
import { fontVariables } from "../fonts";
import { Footer } from "./Footer";
import { InquiryModal } from "./InquiryModal";
import { Nav } from "./Nav";
import { PremiumRoot } from "./PremiumRoot";

/**
 * Shared frame for every page in the new design: scoped styles, fonts,
 * nav, footer, sticky mobile CTA and the inquiry dialog.
 */
export function PremiumShell({ current, children }: { current?: string; children: ReactNode }) {
  return (
    // `js` hides [data-reveal] content until the observer reveals it.
    <PremiumRoot className={`kp js ${fontVariables}`}>
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
