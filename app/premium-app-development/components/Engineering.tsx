import { meters, pipeline, specs } from "../data";
import { Check, SectionHead, rv, vars } from "./ui";

export function Engineering() {
  return (
    <section className="section" aria-labelledby="eng-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead
          tight
          eyebrow="06 — Engineering standard"
          titleId="eng-title"
          title={
            <>
              The spec sheet <em>behind every build.</em>
            </>
          }
          lede="Quality isn't a value statement. It's a list of things that happen on every project, whether anyone is watching or not."
        />
        <div className="eng-grid">
          <dl {...rv()}>
            {specs.map((spec) => (
              <div className="spec" key={spec.key}>
                <dt>{spec.key}</dt>
                <dd>
                  <b>{spec.title}</b>
                  <span>{spec.body}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="health" id="health" aria-label="Example release dashboard">
            <div className="health-top">
              <b>
                Release 2.4.0 <small>RC3</small>
              </b>
              <span className="status">Healthy</span>
            </div>
            <ul className="pipe" id="pipe">
              {pipeline.map((stage) => (
                <li key={stage.label}>
                  <span className="ck">
                    <Check />
                  </span>
                  <span>{stage.label}</span>
                  <span>{stage.result}</span>
                </li>
              ))}
            </ul>
            <div className="meters">
              {meters.map((meter) => (
                <div className="meter" key={meter.label}>
                  <div className="r">
                    <span>{meter.label}</span>
                    <b>{meter.value}</b>
                  </div>
                  <div className="bar">
                    <i style={vars({ "--v": meter.fill })}></i>
                    <em style={{ left: meter.budget }}></em>
                  </div>
                </div>
              ))}
            </div>
            <p className="health-note">Example release dashboard</p>
          </div>
        </div>
      </div>
    </section>
  );
}
