import { models } from "../data";
import { Arr, Check, SectionHead, inquiry, rv } from "./ui";

export function Engagement() {
  return (
    <section className="section" id="engagement" aria-labelledby="eng-models-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead
          eyebrow="08 — Ways to work together"
          titleId="eng-models-title"
          title={
            <>
              Four ways in. <em>One standard.</em>
            </>
          }
          lede="Pick the shape that matches where you are. Most products start with an MVP and move to a dedicated team once they've found traction."
        />
        <div className="models" {...rv()}>
          {models.map((model) => {
            const featured = "badge" in model;
            return (
              <div className={`model${featured ? " feat" : ""}`} key={model.letter}>
                <div className="model-top">
                  <span className="mono">{model.letter}</span>
                  {featured && (
                    <span className="pill-tag">
                      <span className="dot"></span>
                      {model.badge}
                    </span>
                  )}
                </div>
                <div>
                  <h3>{model.title}</h3>
                  <p className="for">{model.forWho}</p>
                </div>
                <div className="kv">
                  <span className="label">Typical timeline</span>
                  <b>{model.timeline}</b>
                </div>
                <div className="kv">
                  <span className="label">Team</span>
                  <b>{model.team}</b>
                </div>
                <div className="kv">
                  <span className="label">Pricing</span>
                  <b>{model.pricing}</b>
                </div>
                <ul>
                  {model.points.map((point) => (
                    <li key={point}>
                      <Check />
                      {point}
                    </li>
                  ))}
                </ul>
                <button
                  className={`btn ${featured ? "btn-primary" : "btn-ghost has-arr"} btn-sm btn-full go`}
                  {...inquiry(model.preset)}
                >
                  {model.cta} <Arr />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
