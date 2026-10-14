import { outsideCosts, priceDrivers, quoteSteps } from "../data";
import { SectionHead, rv } from "./ui";

/** The factors that move a quote, grouped so the reader can place their own project. */
export function PriceDrivers() {
  return (
    <section className="section mk" id="price-drivers" aria-labelledby="drivers-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead
          eyebrow="What drives the price"
          titleId="drivers-title"
          title={
            <>
              Three things decide <em>what an app costs.</em>
            </>
          }
          lede="Screens are rarely the expensive part. Integrations and requirements — the work users never see — usually decide the budget, so we price them as separate lines."
        />
        <div className="mk-grid" {...rv()}>
          {priceDrivers.map((group) => (
            <div className="mk-col" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** From first call to approved scope. */
export function QuoteSteps() {
  return (
    <section className="section mkt" id="quote" aria-labelledby="quote-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead
          eyebrow="How a quote is built"
          titleId="quote-title"
          title={
            <>
              A fixed price <em>before any work begins.</em>
            </>
          }
        />
        <ol className={`mkt-grid n${quoteSteps.length}`}>
          {quoteSteps.map((step, i) => (
            <li key={step.title} {...rv(i ? `${(i * 0.06).toFixed(2)}s` : undefined)}>
              <div className="mkt-card">
                <span className="mkt-code mono">{String(i + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Running costs outside the proposal — a real <table>, so it can be quoted. */
export function OutsideCosts() {
  return (
    <section className="section mkt-tbl" id="running-costs" aria-labelledby="costs-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead
          eyebrow="Running costs"
          titleId="costs-title"
          title={
            <>
              Costs outside our price, <em>in your name.</em>
            </>
          }
          lede="Every app has a few running costs paid directly to other providers. They are listed here so nothing arrives as a surprise — and every account is opened in your company's name."
        />
        <div className="tbl-wrap" {...rv()}>
          <table className="tbl">
            <caption className="sr-only">Running costs of a mobile app that are paid directly to providers</caption>
            <thead>
              <tr>
                <th scope="col">Cost</th>
                <th scope="col">Typical amount</th>
                <th scope="col">What it covers</th>
              </tr>
            </thead>
            <tbody>
              {outsideCosts.map((cost) => (
                <tr key={cost.item}>
                  <th scope="row">{cost.item}</th>
                  <td>{cost.amount}</td>
                  <td>{cost.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
