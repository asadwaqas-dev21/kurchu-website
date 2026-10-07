import { reasons } from "../data";
import { rv } from "./ui";

export function WhyUs() {
  return (
    <section className="section" id="about" aria-labelledby="why-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="why-head">
          <div>
            <span className="eyebrow" {...rv()}>
              07 — Why Kurchu
            </span>
            <h2 className="h2" id="why-title" {...rv(".05s")}>
              A product team, <em>not a vendor.</em>
            </h2>
          </div>
          <p className="lede" {...rv(".1s")}>
            We&apos;re deliberately small and senior. We take on a handful of products at a time so the people you meet in the pitch are the people who build.
          </p>
        </div>
        <div className="why-list">
          {reasons.map((reason, i) => (
            <div key={reason.n} className="why" {...rv(i % 2 ? ".06s" : undefined)}>
              <span className="why-n">{reason.n}</span>
              <div>
                <h3>{reason.title}</h3>
                <p>{reason.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
