import type { ReactNode } from "react";
import { email, faqs } from "../data";
import { rv } from "./ui";

/**
 * Accordion FAQ. Answers are always in the server HTML (only visually
 * collapsed), so search and answer engines can read every one of them.
 */
export function Faq({
  items = faqs,
  eyebrow = "11 — FAQ",
  title = (
    <>
      Straight <em>answers.</em>
    </>
  ),
}: {
  items?: Array<{ q: string; a: string }>;
  eyebrow?: string;
  title?: ReactNode;
}) {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title" style={{ paddingTop: 0 }}>
      <div className="wrap faq-grid">
        <div className="faq-side">
          <span className="eyebrow" {...rv()}>
            {eyebrow}
          </span>
          <h2 className="h2" id="faq-title" {...rv(".05s")}>
            {title}
          </h2>
          <p {...rv(".1s")}>
            Something we haven&apos;t covered? Write to{" "}
            <a className="tlink" href={`mailto:${email}`}>
              {email}
            </a>{" "}
            — a senior person replies within one working day.
          </p>
        </div>
        <div className="faq-list" id="faqList" {...rv()}>
          {items.map((item, i) => (
            <div className="faq-item" key={item.q}>
              <h3>
                <button className="faq-q" id={`faq-q${i}`} aria-expanded="false" aria-controls={`faq-a${i}`}>
                  {item.q}
                  <span className="faq-ic" aria-hidden="true"></span>
                </button>
              </h3>
              <div className="faq-a" id={`faq-a${i}`} role="region" aria-labelledby={`faq-q${i}`}>
                <div>
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
