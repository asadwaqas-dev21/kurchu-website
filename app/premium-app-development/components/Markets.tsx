import Link from "next/link";
import type { ReactNode } from "react";
import { regionPath, regionPhrase, regions, type Region } from "@/app/lib/regions";
import { SectionHead, rv } from "./ui";

/** Grid of the four target markets, linking to each market page. */
export function Markets({
  exclude,
  eyebrow = "Where we work",
  title = (
    <>
      Built for four markets, <em>from one team.</em>
    </>
  ),
  lede = "We work with founders and operating teams in the UK, USA, Canada and the UAE — each with its own privacy law, payment rails and working hours. Here is how we handle yours.",
}: {
  /** Slug of the current market page, left out of the grid. */
  exclude?: string;
  eyebrow?: string;
  title?: ReactNode;
  lede?: string;
}) {
  const list = regions.filter((region) => region.slug !== exclude);
  return (
    <section className="section mkt" id="markets" aria-labelledby="markets-title">
      <div className="wrap">
        <SectionHead eyebrow={eyebrow} titleId="markets-title" title={title} lede={lede} />
        <ul className={`mkt-grid n${list.length}`}>
          {list.map((region, i) => (
            <li key={region.slug} {...rv(i ? `${(i * 0.06).toFixed(2)}s` : undefined)}>
              <Link href={regionPath(region)} className="mkt-card" hrefLang={region.hreflang}>
                <span className="mkt-code mono">{region.countryCode}</span>
                <h3>{region.name}</h3>
                <p>{region.cities.join(" · ")}</p>
                <span className="mkt-tz">{region.timeZone.zone}</span>
                <span className="svl-go">
                  How we work in {regionPhrase(region)}
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Column({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mk-col">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/** What is specific about building for one market: law, payments, localisation, time zone. */
export function MarketDetails({ region }: { region: Region }) {
  const where = regionPhrase(region);
  return (
    <section className="section mk" id="market-details" aria-labelledby="mk-title">
      <div className="wrap">
        <SectionHead
          eyebrow={`Built for ${where}`}
          titleId="mk-title"
          title={
            <>
              What changes when you build <em>for {where}.</em>
            </>
          }
          lede={`Privacy law, payment providers and user expectations differ by market. These are planned into the product from discovery, not patched in before launch.`}
        />
        <div className="mk-grid" {...rv()}>
          <Column title="Privacy & compliance" items={region.compliance} />
          <Column title="Payments & integrations" items={region.payments} />
          <Column title="Localisation & accessibility" items={region.localisation} />
        </div>
        <div className="mk-tz" {...rv(".08s")}>
          <div>
            <span className="label">Time zone · {region.timeZone.zone}</span>
            <p className="mk-tz-diff">{region.timeZone.difference}</p>
          </div>
          <p className="mk-tz-call">{region.timeZone.callWindow}</p>
        </div>
        <p className="mk-sources">
          <span className="label">Official guidance</span>
          {region.sources.map((source) => (
            <a className="tlink" href={source.url} target="_blank" rel="noopener" key={source.url}>
              {source.label}
            </a>
          ))}
        </p>
        <p className="mk-note">
          We build to these requirements alongside your legal and compliance advisers — final sign-off on regulatory questions should
          come from them.
        </p>
      </div>
    </section>
  );
}

/** Side-by-side comparison of the four markets — a real <table>, so it can be quoted. */
export function MarketsTable() {
  return (
    <section className="section mkt-tbl" aria-labelledby="mkt-tbl-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead
          eyebrow="At a glance"
          titleId="mkt-tbl-title"
          title={
            <>
              How the four markets <em>compare.</em>
            </>
          }
          lede="The headline differences we plan for in discovery — time zone, the privacy law your product must respect, the payment rails your customers expect, and the languages your interface needs."
        />
        <div className="tbl-wrap" {...rv()}>
          <table className="tbl">
            <caption className="sr-only">Comparison of Kurchu&apos;s four target markets</caption>
            <thead>
              <tr>
                <th scope="col">Market</th>
                <th scope="col">Time vs Lahore</th>
                <th scope="col">Key privacy law</th>
                <th scope="col">Local payments</th>
                <th scope="col">Interface languages</th>
              </tr>
            </thead>
            <tbody>
              {regions.map((region) => (
                <tr key={region.slug}>
                  <th scope="row">
                    <Link href={regionPath(region)} hrefLang={region.hreflang}>
                      {region.name}
                    </Link>
                  </th>
                  <td>{region.timeZone.difference}</td>
                  <td>{region.privacyLaw}</td>
                  <td>{region.payments.slice(0, 2).join("; ")}</td>
                  <td>{region.languages}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
