import { email, faqs } from "../data";
import { rv } from "./ui";

export function Faq() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title" style={{ paddingTop: 0 }}>
      <div className="wrap faq-grid">
        <div className="faq-side">
          <span className="eyebrow" {...rv()}>
            11 — FAQ
          </span>
          <h2 className="h2" id="faq-title" {...rv(".05s")}>
            Straight <em>answers.</em>
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
          {faqs.map((item, i) => (
            <div className="faq-item" key={item.q}>
              <button className="faq-q" id={`faq-q${i}`} aria-expanded="false" aria-controls={`faq-a${i}`}>
                {item.q}
                <span className="faq-ic" aria-hidden="true"></span>
              </button>
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
