import type { ReactNode } from "react";
import { rv } from "./ui";

/**
 * Answer-first summary: one self-contained paragraph that directly answers the
 * page's main question, plus a definition list of key facts. Written so an
 * answer engine can quote it without needing the rest of the page.
 */
export function Summary({
  title,
  answer,
  facts,
}: {
  title: ReactNode;
  answer: string;
  facts: Array<[string, string]>;
}) {
  return (
    <section className="sum" aria-labelledby="sum-title">
      <div className="wrap sum-grid">
        <div>
          <span className="eyebrow" {...rv()}>
            In short
          </span>
          <h2 className="sum-h" id="sum-title" {...rv(".05s")}>
            {title}
          </h2>
        </div>
        <div {...rv(".08s")}>
          <p className="sum-answer">{answer}</p>
          <dl className="sum-facts">
            {facts.map(([term, detail]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
