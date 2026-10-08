import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import JsonLd from "@/app/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/app/lib/jsonld";
import { breadcrumbTrail } from "@/app/lib/routes";
import { Arr, inquiry } from "./ui";

type Props = {
  /** URL path of this page; its breadcrumb trail comes from lib/routes.ts. */
  path: string;
  eyebrow: string;
  /** One entry per heading line; the last usually holds the italic accent. */
  lines: ReactNode[];
  lede: ReactNode;
  meta: string[];
  cta: { label: string; preset?: Record<string, string | string[]> };
  secondary?: { href: string; label: string };
};

/** Top-of-page hero for the inner pages — the page's only <h1>. */
export function PageHero({ path, eyebrow, lines, lede, meta, cta, secondary }: Props) {
  const trail = breadcrumbTrail(path);

  return (
    <section className="ph" aria-labelledby="page-title">
      <JsonLd data={breadcrumbJsonLd(path)} />
      <div className="hero-bg" aria-hidden="true"></div>
      <div className="wrap">
        <nav className="ph-crumb hero-fade" aria-label="Breadcrumb">
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
        <div className="ph-grid">
          <div>
            <span className="pill-tag hero-fade">
              <span className="dot"></span>
              {eyebrow}
            </span>
            <h1 className="h1" id="page-title">
              {lines.map((line, i) => (
                <span className="ln" key={i}>
                  <span>{line}</span>
                </span>
              ))}
            </h1>
          </div>
          <div className="ph-side">
            <p className="lede hero-fade d2">{lede}</p>
            <div className="hero-ctas hero-fade d3">
              <button className="btn btn-primary" data-magnetic="" {...inquiry(cta.preset)}>
                {cta.label} <Arr />
              </button>
              {secondary && (
                <Link className="btn btn-ghost" href={secondary.href}>
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="hero-meta ph-meta hero-fade d3">
          {meta.map((item) => (
            <div key={item}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m5 12 5 5 9-10" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
