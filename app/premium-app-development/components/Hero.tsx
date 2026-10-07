import { Arr, Device, inquiry } from "./ui";

const flexRow = { display: "flex", gap: "12px", alignItems: "center" } as const;

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true"></div>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="pill-tag hero-fade">
            <span className="dot"></span>Mobile software solutions · iOS, Android &amp; cross-platform
          </span>
          <h1 className="h1" id="hero-title">
            <span className="ln">
              <span>Mobile products,</span>
            </span>
            <span className="ln">
              <span>designed and</span>
            </span>
            <span className="ln">
              <span>engineered</span>
            </span>
            <span className="ln">
              <span>
                <em>to be kept.</em>
              </span>
            </span>
          </h1>
          <p className="lede hero-sub hero-fade d2">
            Kurchu is a senior product team for founders and operators. Strategy, UX, engineering and launch are run by the same people — so the app you approve in design is the app that ships.
          </p>
          <div className="hero-ctas hero-fade d3">
            <button className="btn btn-primary" data-magnetic="" {...inquiry()}>
              Start a Project <Arr />
            </button>
            <a className="btn btn-ghost" href="#work">
              See selected work
            </a>
          </div>
        </div>

        <div className="hero-stage" id="heroStage" aria-hidden="true">
          <div className="stage-glow"></div>
          <div className="stage-horizon"></div>
          <div className="stage-floor"></div>
          <div className="stage-rig" id="stageRig">
            <div className="hp hp-l">
              <div className="flo">
                <Device screen="lumenHome" />
              </div>
            </div>
            <div className="hp hp-r">
              <div className="flo">
                <Device screen="moveMap" />
              </div>
            </div>
            <div className="hp hp-c">
              <div className="flo">
                <Device screen="novaHome" />
              </div>
            </div>
            <div className="fcard fc-1">
              <div className="fc-flo" style={flexRow}>
                <span className="fi">
                  <svg viewBox="0 0 24 24">
                    <path d="m5 12 5 5 9-10" />
                  </svg>
                </span>
                <span>
                  <b>Transfer sent</b>
                  <small>£250.00 to Omar · 1.2s</small>
                </span>
              </div>
            </div>
            <div className="fcard fc-2">
              <div className="fc-flo" style={flexRow}>
                <span className="fi">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
                  </svg>
                </span>
                <span>
                  <b>Build 2.4.0 (318)</b>
                  <small>Ready for review · iOS &amp; Android</small>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="hero-meta hero-fade d3">
          <div>
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            Discovery sprint in 10 working days
          </div>
          <div>
            <svg viewBox="0 0 24 24">
              <path d="M16 11a4 4 0 1 0-8 0M4 20c1.5-3 4.5-5 8-5s6.5 2 8 5" />
            </svg>
            Senior-led. No junior hand-offs.
          </div>
          <div>
            <svg viewBox="0 0 24 24">
              <rect x="5" y="10" width="14" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
            You own 100% of the code
          </div>
          <span className="scroll-cue">
            <i></i>Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
