import { ideaArtifacts, ideaSteps } from "../data";
import { Device } from "./ui";

/** Scroll-pinned section: one phone evolves from sketch to live product. */
export function IdeaToProduct() {
  return (
    <section className="i2p" id="idea" data-stage="0" aria-labelledby="i2p-title">
      <div className="i2p-sticky">
        <div className="i2p-mob" aria-hidden="true">
          <span className="eyebrow">02 — Idea to product</span>
          <p className="h2">
            Watch an idea <em>become an app.</em>
          </p>
        </div>
        <div className="wrap i2p-grid">
          <div className="i2p-copy">
            <span className="eyebrow">02 — Idea to product</span>
            <h2 className="h2" id="i2p-title">
              Watch an idea <em>become an app.</em>
            </h2>
            <ol className="i2p-steps" id="i2pSteps">
              {ideaSteps.map((step, i) => (
                <li key={step.title}>
                  <button className={`i2p-step${i === 0 ? " is-active" : ""}`} data-go={i}>
                    <span className="t">
                      <small>{String(i + 1).padStart(2, "0")}</small>
                      {step.title}
                    </span>
                    <span className="d">
                      <span>{step.desc}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <div className="i2p-visual" aria-hidden="true">
            <div className="glow"></div>
            <div className="i2p-rig">
              <Device screen="evolve" />
            </div>
            <div className="artifact" id="i2pArtifact">
              {ideaArtifacts.map((artifact, i) => (
                <div className={`a${i === 0 ? " on" : ""}`} key={artifact.title}>
                  <i>{artifact.tag}</i>
                  <span>
                    <b>{artifact.title}</b>
                    <small>{artifact.sub}</small>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="i2p-mob-step" id="i2pMob" aria-live="polite">
          <div className="r">
            <span id="i2pMobN">01 / 06</span>
            <span>Scroll</span>
          </div>
          <b id="i2pMobT">Sketch</b>
          <p id="i2pMobD">A whiteboard conversation becomes a shared picture of the product.</p>
          <div className="bar">
            <i></i>
          </div>
        </div>
      </div>
    </section>
  );
}
