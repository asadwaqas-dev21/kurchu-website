import type { CSSProperties, ReactNode } from "react";
import { services } from "../data";
import { Device, SectionHead } from "./ui";

const roadmap = [
  { title: "Now", items: ["Onboarding + KYC", "Send & receive", "Card controls"], key: true },
  { title: "Next", items: ["Spending insights", "Shared pots", "Multi-currency"] },
  { title: "Later", items: ["Invoicing", "Business accounts", "Open banking"] },
];

const flowScreens: Array<{ key?: boolean; children: ReactNode }> = [
  {
    children: (
      <>
        <i className="t"></i>
        <i className="big"></i>
        <i></i>
        <i style={{ width: "70%" }}></i>
        <i className="btn"></i>
      </>
    ),
  },
  {
    children: (
      <>
        <i className="t"></i>
        <i></i>
        <i></i>
        <i style={{ width: "50%" }}></i>
        <i className="big" style={{ height: "22%" }}></i>
        <i className="btn"></i>
      </>
    ),
  },
  {
    key: true,
    children: (
      <>
        <i className="t"></i>
        <i className="big" style={{ height: "40%" }}></i>
        <i></i>
        <i className="btn"></i>
      </>
    ),
  },
  {
    children: (
      <>
        <i className="t" style={{ width: "40%" }}></i>
        <i className="big" style={{ height: "20%", borderRadius: "50%", width: "40%", margin: "20% auto 0" }}></i>
        <i style={{ width: "70%", margin: "0 auto" }}></i>
        <i className="btn"></i>
      </>
    ),
  },
];

const graphNodes: Array<{ label: string; left: string; top: string; core?: boolean }> = [
  { label: "API Gateway", left: "50%", top: "50%", core: true },
  { label: "Auth · OIDC", left: "18%", top: "17%" },
  { label: "Payments", left: "82%", top: "17%" },
  { label: "Ledger", left: "14%", top: "61%" },
  { label: "Push", left: "86%", top: "61%" },
  { label: "PostgreSQL", left: "30%", top: "90%" },
  { label: "Events", left: "70%", top: "90%" },
];

// One entry per device in the QA matrix: "" = passed, "w" = warning, "tab" = tablet.
const matrix = ["", "", "", "w", "", "", "", "", "", "", "tab", "tab"];

const previewBodies: ReactNode[] = [
  // 01 Strategy
  <>
    <div className="pv-cap">
      <span className="label">Roadmap · v0.3</span>
      <span className="label">Week 2 of discovery</span>
    </div>
    <div className="road">
      {roadmap.map((col) => (
        <div className="road-col" key={col.title}>
          <h4>{col.title}</h4>
          {col.items.map((item) => (
            <span className={col.key ? "k" : undefined} key={item}>
              {item}
            </span>
          ))}
        </div>
      ))}
      <div className="road-line">MVP line</div>
    </div>
    <div className="pv-foot">
      <div>
        <b>Product brief</b>Problem, audience, success metrics, scope
      </div>
      <span className="label">14 pp</span>
    </div>
  </>,
  // 02 UX/UI
  <>
    <div className="pv-cap">
      <span className="label">Flow · First transfer</span>
      <span className="label">Tested · 8 users</span>
    </div>
    <div>
      <div className="flow">
        {flowScreens.map((screen, i) => (
          <div className={`fs${screen.key ? " k" : ""}`} key={i}>
            {screen.children}
          </div>
        ))}
      </div>
      <div className="flow-lbl">
        <span>Recipient</span>
        <span>Amount</span>
        <span>Review</span>
        <span>Sent</span>
      </div>
    </div>
    <div className="pv-foot">
      <div>
        <b>Validated user flow</b>Task success 61% → 94% across two rounds
      </div>
      <span className="label">Prototype</span>
    </div>
  </>,
  // 03 Mobile
  <>
    <div className="pv-cap">
      <span className="label">Production build</span>
      <span className="label">iOS 17+ · Android 9+</span>
    </div>
    <div className="pv-dev">
      <Device screen="novaTransfer" />
      <div className="pv-tags">
        <span className="chip">SwiftUI</span>
        <span className="chip">Compose</span>
        <span className="chip">Flutter</span>
      </div>
    </div>
    <div className="pv-foot">
      <div>
        <b>One codebase, or two?</b>We recommend in writing, with trade-offs
      </div>
    </div>
  </>,
  // 04 Backend
  <>
    <div className="pv-cap">
      <span className="label">Service map</span>
      <span className="label">p95 · 142ms</span>
    </div>
    <div className="graph">
      <svg viewBox="0 0 100 82" preserveAspectRatio="none">
        <path d="M50 41 L18 14" />
        <path className="p" d="M50 41 L82 14" />
        <path d="M50 41 L14 50" />
        <path className="p" d="M50 41 L86 50" />
        <path d="M50 41 L30 74" />
        <path d="M50 41 L70 74" />
      </svg>
      {graphNodes.map((node) => (
        <span className={`gnode${node.core ? " core" : ""}`} style={{ left: node.left, top: node.top }} key={node.label}>
          {node.label}
        </span>
      ))}
    </div>
    <div className="pv-foot">
      <div>
        <b>Typed contracts</b>OpenAPI spec, generated clients, versioned
      </div>
    </div>
  </>,
  // 05 QA
  <>
    <div className="pv-cap">
      <span className="label">Device matrix · RC 2.4.0</span>
      <span className="label">23 / 24 passed</span>
    </div>
    <div style={{ marginBlock: "auto" } as CSSProperties}>
      <div className="matrix">
        {matrix.map((kind, i) => (
          <span className={kind || undefined} key={i}></span>
        ))}
      </div>
      <div className="qa-read">
        <div>
          <b>99.94%</b>
          <span>Crash-free sessions</span>
        </div>
        <div>
          <b>1.1s</b>
          <span>Cold start, mid-range Android</span>
        </div>
      </div>
    </div>
    <div className="pv-foot">
      <div>
        <b>QA report</b>Every release candidate, signed off
      </div>
    </div>
  </>,
  // 06 Launch
  <>
    <div className="pv-cap">
      <span className="label">Release · 2.4.0</span>
      <span className="label">Phased rollout</span>
    </div>
    <div className="store">
      <div className="store-top">
        <div className="store-ic">n</div>
        <div>
          <b>Nova Pay</b>
          <small>Finance · Concept app</small>
        </div>
        <span className="store-get">Get</span>
      </div>
      <div className="store-stats">
        <div>
          <b>4.8</b>Rating
        </div>
        <div>
          <b>#12</b>Finance
        </div>
        <div>
          <b>4+</b>Age
        </div>
      </div>
      <div className="rollout">
        <div className="r">
          <span>Rollout</span>
          <span>72% of users</span>
        </div>
        <div className="bar">
          <i></i>
        </div>
      </div>
    </div>
    <div className="pv-foot">
      <div>
        <b>Store-ready release</b>Listings, screenshots, review notes, monitoring
      </div>
    </div>
  </>,
];

function Preview({ index, active }: { index: number; active?: boolean }) {
  return (
    <div className={`pv${active ? " is-active" : ""}`} data-pv={index}>
      {previewBodies[index]}
    </div>
  );
}

export function Services() {
  return (
    <section className="section" id="services" aria-labelledby="services-title" style={{ paddingTop: "clamp(64px,8vw,120px)" }}>
      <div className="wrap">
        <SectionHead
          eyebrow="01 — Services"
          titleId="services-title"
          title={
            <>
              Everything a serious app needs, <em>under one roof.</em>
            </>
          }
          lede="Engage us for a single discipline or the whole product. Either way, design and engineering sit in the same team, in the same rituals, accountable to the same outcome."
        />

        <div className="svc-layout">
          <div className="svc-list" id="svcList">
            {services.map((service, i) => (
              <div className={`svc${i === 0 ? " is-active" : ""}`} data-svc={i} key={service.title}>
                <button className="svc-btn" aria-expanded={i === 0} aria-controls={`svc-b${i}`} id={`svc-h${i}`}>
                  <span className="svc-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="svc-title">{service.title}</span>
                  <span className="svc-plus" aria-hidden="true"></span>
                </button>
                <div className="svc-body" id={`svc-b${i}`} role="region" aria-labelledby={`svc-h${i}`}>
                  <div>
                    <div className="svc-inner">
                      <p>{service.body}</p>
                      <ul>
                        {service.chips.map((chip) => (
                          <li className="chip" key={chip}>
                            {chip}
                          </li>
                        ))}
                      </ul>
                      <div className="mob-pv" aria-hidden="true">
                        <Preview index={i} active />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="svc-aside" aria-hidden="true">
            <div className="svc-pv" id="svcPreview">
              {services.map((service, i) => (
                <Preview index={i} active={i === 0} key={service.title} />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
