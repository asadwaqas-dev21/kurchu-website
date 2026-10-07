import { principles } from "../data";
import { rv } from "./ui";

const clients = [
  { name: "iOS", stack: "Swift · SwiftUI" },
  { name: "Android", stack: "Kotlin · Jetpack Compose" },
  { name: "Cross-platform", stack: "Flutter · React Native" },
  { name: "Web & admin", stack: "React · Next.js · TypeScript" },
];

function Connector({ label }: { label: string }) {
  return (
    <div className="conn" aria-hidden="true">
      <i></i>
      <i></i>
      <i></i>
      <em>{label}</em>
    </div>
  );
}

function Layer({ title, kicker, children }: { title: string; kicker: string; children: React.ReactNode }) {
  return (
    <div className="layer">
      <div className="layer-k">
        <b>{title}</b>
        <small>{kicker}</small>
      </div>
      <div className="layer-v">{children}</div>
    </div>
  );
}

export function Technology() {
  return (
    <section className="section" id="technology" aria-labelledby="tech-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="tech-grid">
          <div className="tech-copy">
            <span className="eyebrow" {...rv()}>
              05 — Technology
            </span>
            <h2 className="h2" id="tech-title" {...rv(".05s")}>
              Architecture first. <em>Logos second.</em>
            </h2>
            <p className="lede" {...rv(".1s")}>
              We choose tools for the product&apos;s next three years, not for our CV. Here&apos;s how a typical system fits together.
            </p>
            <ul className="princ" {...rv(".15s")}>
              {principles.map((item) => (
                <li key={item.title}>
                  <b>{item.title}</b>
                  <span>{item.body}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="arch" id="arch" {...rv(".1s")} aria-label="Typical system architecture">
            <div className="arch-top">
              <span className="label">Reference architecture</span>
              <span className="pill-tag">
                <span className="dot"></span>Typed end to end
              </span>
            </div>
            <div className="layer client">
              <div className="layer-k">
                <b>Mobile &amp; web apps</b>
                <small>Client layer</small>
              </div>
              <div className="clients">
                {clients.map((client) => (
                  <div className="cl" key={client.name}>
                    <b>{client.name}</b>
                    <span>{client.stack}</span>
                  </div>
                ))}
              </div>
            </div>
            <Connector label="HTTPS · GraphQL / REST" />
            <Layer title="API layer" kicker="Contracts">
              <span className="chip">
                <b>Node.js</b>
              </span>
              <span className="chip">
                <b>Python</b>
              </span>
              <span className="chip">OpenAPI</span>
              <span className="chip">Webhooks</span>
              <span className="chip">Rate limiting</span>
            </Layer>
            <Connector label="Events · queues" />
            <Layer title="Services" kicker="Integrations">
              <span className="chip">Auth · OIDC</span>
              <span className="chip">
                Payments · <b>Stripe</b>
              </span>
              <span className="chip">Push notifications</span>
              <span className="chip">Maps &amp; location</span>
              <span className="chip">Analytics</span>
              <span className="chip">Realtime</span>
            </Layer>
            <Connector label="Migrations · backups" />
            <Layer title="Data" kicker="Storage">
              <span className="chip">
                <b>PostgreSQL</b>
              </span>
              <span className="chip">Redis</span>
              <span className="chip">Object storage</span>
              <span className="chip">Search</span>
            </Layer>
            <Connector label="IaC · monitoring" />
            <Layer title="Cloud" kicker="Infrastructure">
              <span className="chip">
                <b>AWS</b>
              </span>
              <span className="chip">
                <b>Firebase</b>
              </span>
              <span className="chip">
                <b>Supabase</b>
              </span>
              <span className="chip">CI/CD</span>
            </Layer>
          </div>
        </div>
      </div>
    </section>
  );
}
