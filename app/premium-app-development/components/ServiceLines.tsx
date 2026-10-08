import Link from "next/link";
import JsonLd from "@/app/components/shared/JsonLd";
import { serviceListJsonLd } from "@/app/lib/jsonld";
import { serviceLines } from "@/app/lib/services";
import { SectionHead, rv } from "./ui";

/** Hub-and-spoke links from /services to each service line page. */
export function ServiceLines() {
  return (
    <section className="section svl" id="service-lines" aria-labelledby="svl-title">
      <JsonLd data={serviceListJsonLd(serviceLines)} />
      <div className="wrap">
        <SectionHead
          eyebrow="Service lines"
          titleId="svl-title"
          title={
            <>
              Three service lines, <em>one standard.</em>
            </>
          }
          lede="Pick one or combine them. Strategy, design and engineering stay in the same team either way — so your app, your website and your search visibility are built to work together."
        />
        <ul className="svl-grid">
          {serviceLines.map((service, i) => (
            <li key={service.path} {...rv(i ? `${(i * 0.06).toFixed(2)}s` : undefined)}>
              <Link href={service.path} className="svl-card">
                <span className="svl-n mono">{String(i + 1).padStart(2, "0")}</span>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <ul className="svl-points">
                  {service.points.map((point) => (
                    <li className="chip" key={point}>
                      {point}
                    </li>
                  ))}
                </ul>
                <span className="svl-go">
                  Explore {service.label.toLowerCase()}
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="svl-more" {...rv(".1s")}>
          Planning a budget?{" "}
          <Link className="tlink" href="/pricing">
            See pricing &amp; project estimates
          </Link>
        </p>
      </div>
    </section>
  );
}
