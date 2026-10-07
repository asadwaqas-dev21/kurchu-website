import { Fragment } from "react";
import { domains, trustFacts } from "../data";
import { rv } from "./ui";

// NOTE: the figures in trustFacts are placeholders — replace with verified numbers.
export function Trust() {
  return (
    <section className="trust" aria-label="Studio credentials">
      <div className="wrap">
        <div className="trust-grid">
          <p className="trust-statement" {...rv()}>
            Founders bring us an idea, a prototype or an app that has stopped scaling.{" "}
            <span>We bring the product judgement, design craft and engineering discipline to</span>{" "}
            <em>ship the next version properly.</em>
          </p>
          <div className="facts" {...rv(".1s")}>
            {trustFacts.map((fact) => (
              <div className="fact" key={fact.label}>
                <b>
                  {fact.value}
                  {fact.unit && <sup>{fact.unit}</sup>}
                </b>
                <span>{fact.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="domains" {...rv(undefined, "fade")}>
          <span className="label">Domains we know well</span>
          {domains.map((domain, i) => (
            <Fragment key={domain}>
              <span className="d">{domain}</span>
              {i < domains.length - 1 && <span className="sep"></span>}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
