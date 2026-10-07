import type { CSSProperties, ReactNode } from "react";
import type { ScreenName } from "../screens";
import { Device, SectionHead, rv, vars } from "./ui";

type Placement = {
  screen: ScreenName;
  transform: string;
  depth: number;
  className?: string;
};

/** A device floating inside a case-study stage, with parallax depth. */
function StageDevice({ screen, transform, depth, className }: Placement) {
  return (
    <div className={`cs-p${className ? ` ${className}` : ""}`} style={{ transform }}>
      <div className="cs-par" style={vars({ "--dp": depth })}>
        <div className="cs-in">
          <Device screen={screen} />
        </div>
      </div>
    </div>
  );
}

function StageTag({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span className="cs-tag" style={{ color }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color }}></span>
      {children}
    </span>
  );
}

function Facts({ items }: { items: Array<[string, string]> }) {
  return (
    <>
      {items.map(([term, detail]) => (
        <div key={term}>
          <dt>{term}</dt>
          <dd>{detail}</dd>
        </div>
      ))}
    </>
  );
}

function Result({ figure, children, ...props }: { figure: string; children: ReactNode } & Partial<ReturnType<typeof rv>>) {
  return (
    <div className="case-result" {...props}>
      <b>{figure}</b>
      <p>
        {children}
        <small>Illustrative outcome · concept study</small>
      </p>
    </div>
  );
}

const cs = (value: CSSProperties) => value;

export function Work() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <SectionHead
          eyebrow="03 — Selected work"
          titleId="work-title"
          title={
            <>
              Four products, <em>four identities.</em>
            </>
          }
          lede="Product concepts that show how we think across fintech, health, mobility and commerce. Each has its own brand, its own constraints and its own definition of done. Full client case studies are shared under NDA on request."
        />

        {/* Case 01 · Nova Pay */}
        <article className="case case-full" data-case="" aria-labelledby="c1-t">
          <div className="case-stage" data-par="">
            <div
              className="cs-bg"
              style={cs({
                background:
                  "radial-gradient(60% 80% at 50% 110%,rgba(203,243,107,.22),transparent 70%),radial-gradient(90% 90% at 50% 100%,#17200F 0%,#0B0E09 60%,#070807 100%)",
              })}
            ></div>
            <span className="cs-word serif" style={{ color: "rgba(203,243,107,.05)" }} aria-hidden="true">
              nova
            </span>
            <StageTag color="#CBF36B">Concept case study · 01</StageTag>
            <div className="cs-rig shift-sm" aria-hidden="true">
              <StageDevice className="hide-sm" screen="novaInsights" transform="translate3d(-158%,-47%,-140px) rotateY(16deg)" depth={-8} />
              <StageDevice screen="novaTransfer" transform="translate3d(48%,-52%,-120px) rotateY(-16deg)" depth={-12} />
              <StageDevice screen="novaHome" transform="translate3d(-56%,-49%,40px) rotateY(-3deg)" depth={16} />
            </div>
          </div>
          <div className="case-info">
            <div className="case-head" {...rv()}>
              <span className="label">Fintech · Digital wallet</span>
              <h3 className="case-title" id="c1-t">
                Nova Pay
              </h3>
              <p className="case-cat">A calmer wallet for people paid in more than one currency.</p>
            </div>
            <div className="case-right" {...rv(".08s")}>
              <p className="case-chal">
                Freelancers juggling three currencies needed a wallet that felt calmer than a bank and faster than a spreadsheet — without hiding fees or exchange rates.
              </p>
              <dl className="case-dl">
                <Facts
                  items={[
                    ["Our role", "Strategy, UX/UI, iOS & Android, backend"],
                    ["Platforms", "iOS (SwiftUI) · Android (Compose)"],
                    ["Scope", "14-week MVP · 46 screens · KYC · multi-currency ledger"],
                  ]}
                />
              </dl>
              <Result figure="< 40s">to complete a first international transfer in moderated prototype testing.</Result>
            </div>
          </div>
        </article>

        {/* Case 02 · Lumen Health */}
        <article className="case case-split" data-case="" aria-labelledby="c2-t">
          <div className="case-stage" data-par="">
            <div className="cs-bg" style={cs({ background: "radial-gradient(80% 70% at 30% 20%,#E9EFE9,#CCDAD2 60%,#B5C9BF)" })}></div>
            <span className="cs-word serif" style={{ color: "rgba(28,93,88,.08)", fontSize: "clamp(110px,16vw,240px)" }} aria-hidden="true">
              Lumen
            </span>
            <StageTag color="#1C5D58">Concept case study · 02</StageTag>
            <div className="cs-rig" aria-hidden="true">
              <StageDevice screen="lumenHome" transform="translate3d(-102%,-46%,0) rotateY(8deg)" depth={10} />
              <StageDevice screen="lumenBooking" transform="translate3d(2%,-54%,-60px) rotateY(-8deg)" depth={-10} />
            </div>
          </div>
          <div className="case-info">
            <div className="case-head" {...rv()}>
              <span className="label">Healthcare · Patient platform</span>
              <h3 className="case-title" id="c2-t">
                Lumen Health
              </h3>
              <p className="case-cat">Specialist care, booked like a table.</p>
            </div>
            <p className="case-chal" {...rv(".05s")}>
              Make booking a specialist feel effortless for patients — without hiding the clinical nuance that doctors and regulators need to see.
            </p>
            <dl className="case-dl" {...rv(".1s")}>
              <Facts
                items={[
                  ["Our role", "Research, UX/UI, Flutter, integrations"],
                  ["Platforms", "iOS & Android (Flutter)"],
                  ["Scope", "Patient app · clinician scheduling · video consults"],
                  ["Integrations", "Calendar sync · payments · secure messaging"],
                ]}
              />
            </dl>
            <Result figure="9 → 4" {...rv(".15s")}>
              steps from search to confirmed appointment in the tested prototype.
            </Result>
          </div>
        </article>

        {/* Case 03 · Move */}
        <article className="case case-split rev" data-case="" aria-labelledby="c3-t">
          <div className="case-info">
            <div className="case-head" {...rv()}>
              <span className="label">Urban mobility · Real-time</span>
              <h3 className="case-title" id="c3-t">
                Move
              </h3>
              <p className="case-cat">City journeys where every second counts.</p>
            </div>
            <p className="case-chal" {...rv(".05s")}>
              Ride-hailing lives or dies on trust in the map. Every second of lag between the car and the dot on screen erodes it — especially on mid-range Android devices.
            </p>
            <dl className="case-dl" {...rv(".1s")}>
              <Facts
                items={[
                  ["Our role", "Product strategy, UX, React Native, realtime backend"],
                  ["Platforms", "iOS · Android"],
                  ["Scope", "Rider app · live tracking · fare engine"],
                  ["Stack", "React Native · Node.js · WebSockets · PostgreSQL"],
                ]}
              />
            </dl>
            <Result figure="< 1s" {...rv(".15s")}>
              location-to-screen latency on mid-range Android in load tests.
            </Result>
          </div>
          <div className="case-stage" data-par="">
            <div
              className="cs-bg"
              style={cs({
                background: "radial-gradient(70% 60% at 70% 30%,rgba(255,194,75,.16),transparent 65%),linear-gradient(160deg,#1A1C20,#0E0F12)",
              })}
            ></div>
            <svg className="cs-word" style={{ width: "120%", height: "120%", opacity: 0.5 }} viewBox="0 0 400 400" aria-hidden="true">
              <g fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="10">
                <path d="M-20 120 L420 80" />
                <path d="M-20 260 L420 300" />
                <path d="M110 -20 L150 420" />
                <path d="M290 -20 L250 420" />
              </g>
            </svg>
            <StageTag color="#FFC24B">Concept case study · 03</StageTag>
            <div className="cs-rig" aria-hidden="true">
              <StageDevice screen="moveMap" transform="translate3d(-104%,-52%,-40px) rotateY(10deg)" depth={-10} />
              <StageDevice screen="moveLive" transform="translate3d(4%,-47%,30px) rotateY(-8deg)" depth={12} />
            </div>
          </div>
        </article>

        {/* Case 04 · Arca */}
        <article className="case case-full" data-case="" aria-labelledby="c4-t">
          <div className="case-stage" data-par="">
            <div className="cs-bg" style={cs({ background: "radial-gradient(70% 90% at 50% 100%,#E6DED2,#CFC4B4 55%,#B7AA97)" })}></div>
            <span className="cs-word serif" style={{ color: "rgba(28,26,23,.07)", letterSpacing: ".2em" }} aria-hidden="true">
              ARCA
            </span>
            <StageTag color="#1C1A17">Concept case study · 04</StageTag>
            <div className="cs-rig" aria-hidden="true">
              <StageDevice className="hide-sm" screen="arcaDiscover" transform="translate3d(-170%,-46%,-120px) rotateY(18deg) rotateZ(-4deg)" depth={-10} />
              <StageDevice screen="arcaProduct" transform="translate3d(-50%,-52%,40px)" depth={14} />
              <StageDevice className="hide-sm" screen="arcaCheckout" transform="translate3d(70%,-46%,-120px) rotateY(-18deg) rotateZ(4deg)" depth={-10} />
            </div>
          </div>
          <div className="case-info">
            <div className="case-head" {...rv()}>
              <span className="label">Commerce · Curated marketplace</span>
              <h3 className="case-title" id="c4-t">
                Arca
              </h3>
              <p className="case-cat">The restraint of a gallery, the speed of commerce.</p>
            </div>
            <div className="case-right" {...rv(".08s")}>
              <p className="case-chal">
                An independent design marketplace needed to make 400 makers feel like one considered collection — and make checkout disappear for returning customers.
              </p>
              <dl className="case-dl">
                <Facts
                  items={[
                    ["Our role", "Brand-in-app, UX/UI, iOS, payments"],
                    ["Platforms", "iOS (SwiftUI) · web storefront"],
                    ["Scope", "Discovery · product pages · Stripe checkout · maker tools"],
                  ]}
                />
              </dl>
              <Result figure="3 taps">from product page to confirmed order for returning customers.</Result>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
