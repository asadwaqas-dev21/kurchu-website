import Link from "next/link";
import { Fragment } from "react";
import JsonLd from "@/app/components/shared/JsonLd";
import { breadcrumbJsonLd, webPageJsonLd } from "@/app/lib/jsonld";
import type { LegalDoc } from "@/app/lib/legal";
import { breadcrumbTrail } from "@/app/lib/routes";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** Long-form legal page: title, last-updated date, contents and numbered sections. */
export function LegalDocument({ doc }: { doc: LegalDoc }) {
  const trail = breadcrumbTrail(doc.path);
  return (
    <article className="legal" aria-labelledby="legal-title">
      <JsonLd data={breadcrumbJsonLd(doc.path)} />
      <JsonLd data={webPageJsonLd({ path: doc.path, name: doc.title, dateModified: doc.updated })} />
      <div className="wrap legal-wrap">
        <header className="legal-head">
          <nav className="ph-crumb" aria-label="Breadcrumb">
            {trail.map((crumb, i) =>
              i === trail.length - 1 ? (
                <span aria-current="page" key={crumb.path}>
                  {crumb.name}
                </span>
              ) : (
                <Fragment key={crumb.path}>
                  <Link href={crumb.path}>{crumb.name}</Link>
                  <span aria-hidden="true">/</span>
                </Fragment>
              ),
            )}
          </nav>
          <h1 id="legal-title">{doc.title}</h1>
          <p className="legal-updated">
            Last updated <time dateTime={doc.updated}>{formatDate(doc.updated)}</time>
          </p>
          <p className="legal-intro">{doc.intro}</p>
        </header>

        <div className="legal-body">
          <nav className="legal-toc" aria-label="Contents">
            <span className="label">Contents</span>
            <ol>
              {doc.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.heading}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="legal-sections">
            {doc.sections.map((section, i) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-h`}>
                <h2 id={`${section.id}-h`}>
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                  {section.heading}
                </h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
