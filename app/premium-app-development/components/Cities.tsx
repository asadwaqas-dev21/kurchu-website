import Link from "next/link";
import type { ReactNode } from "react";
import { getPost } from "@/app/lib/blog";
import { cityPath, citiesIn, type City } from "@/app/lib/cities";
import { regionPath, regionPhrase, regions, type Region } from "@/app/lib/regions";
import { SectionHead, rv } from "./ui";

const Go = ({ children }: { children: ReactNode }) => (
  <span className="svl-go">
    {children}
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  </span>
);

/**
 * Grid of a market's city pages. On a city page, pass `exclude` to list the
 * other cities plus a card back to the market page.
 */
export function CityLinks({
  region,
  exclude,
  eyebrow,
  title,
  lede,
}: {
  region: Region;
  /** Slug of the current city page, left out of the grid. */
  exclude?: string;
  eyebrow: string;
  title: ReactNode;
  lede?: string;
}) {
  const list = citiesIn(region).filter((city) => city.slug !== exclude);
  const count = list.length + (exclude ? 1 : 0);
  return (
    <section className="section mkt" id="cities" aria-labelledby="cities-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead eyebrow={eyebrow} titleId="cities-title" title={title} lede={lede} />
        <ul className={`mkt-grid n${count}`}>
          {list.map((city, i) => (
            <li key={city.slug} {...rv(i ? `${(i * 0.06).toFixed(2)}s` : undefined)}>
              <Link href={cityPath(city)} className="mkt-card" hrefLang={region.hreflang}>
                <span className="mkt-code mono">{region.countryCode}</span>
                <h3>{city.name}</h3>
                <p>{city.sectors.slice(0, 3).join(" · ")}</p>
                <span className="mkt-tz">{city.timeZone.zone}</span>
                <Go>App development in {city.name}</Go>
              </Link>
            </li>
          ))}
          {exclude && (
            <li {...rv(`${(list.length * 0.06).toFixed(2)}s`)}>
              <Link href={regionPath(region)} className="mkt-card" hrefLang={region.hreflang}>
                <span className="mkt-code mono">{region.countryCode}</span>
                <h3>All of {regionPhrase(region)}</h3>
                <p>{region.privacyLaw}</p>
                <span className="mkt-tz">{region.timeZone.zone}</span>
                <Go>How we work in {regionPhrase(region)}</Go>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}

/** Every city page, grouped by market — the hub's direct links to each one. */
export function CityIndex() {
  return (
    <section className="section mkt" id="cities" aria-labelledby="city-index-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead
          eyebrow="Cities"
          titleId="city-index-title"
          title={
            <>
              App development <em>by city.</em>
            </>
          }
          lede="Each city page covers the local sectors, laws, payment providers and working hours we plan around."
        />
        <ul className={`mkt-grid n${regions.length}`}>
          {regions.map((region, i) => (
            <li key={region.slug} {...rv(i ? `${(i * 0.06).toFixed(2)}s` : undefined)}>
              <div className="mkt-card">
                <span className="mkt-code mono">{region.countryCode}</span>
                <h3>{region.name}</h3>
                <ul>
                  {citiesIn(region).map((city) => (
                    <li key={city.slug} style={{ padding: "6px 0" }}>
                      <Link className="tlink" href={cityPath(city)} hrefLang={region.hreflang}>
                        App development in {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Blog guides relevant to a market, linked from its market and city pages. */
export function Guides({ slugs, place }: { slugs: string[]; place: string }) {
  const posts = slugs.flatMap((slug) => getPost(slug) ?? []);
  if (posts.length === 0) return null;
  return (
    <section className="section mkt" id="guides" aria-labelledby="guides-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead
          eyebrow="Guides"
          titleId="guides-title"
          title={
            <>
              Planning an app <em>for {place}?</em>
            </>
          }
        />
        <ul className={`mkt-grid n${posts.length}`}>
          {posts.map((post, i) => (
            <li key={post.slug} {...rv(i ? `${(i * 0.06).toFixed(2)}s` : undefined)}>
              <Link href={`/blog/${post.slug}`} className="mkt-card">
                <span className="mkt-code mono">{post.category}</span>
                <h3>{post.title}</h3>
                <Go>Read the guide</Go>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** App types typical for a city's sectors. */
export function CityApps({ city }: { city: City }) {
  return (
    <section className="section mkt" id="city-apps" aria-labelledby="city-apps-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead
          eyebrow={`Apps we build in ${city.name}`}
          titleId="city-apps-title"
          title={
            <>
              What {city.name} businesses <em>ask us to build.</em>
            </>
          }
        />
        <ul className={`mkt-grid n${city.appIdeas.length}`}>
          {city.appIdeas.map((idea, i) => (
            <li key={idea.title} {...rv(i ? `${(i * 0.06).toFixed(2)}s` : undefined)}>
              <div className="mkt-card">
                <span className="mkt-code mono">{String(i + 1).padStart(2, "0")}</span>
                <h3>{idea.title}</h3>
                <p>{idea.desc}</p>
              </div>
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

/** What is specific about building apps in one city: sectors, local rules, integrations, time zone. */
export function CityDetails({ city }: { city: City }) {
  return (
    <section className="section mk" id="city-details" aria-labelledby="ck-title">
      <div className="wrap">
        <SectionHead
          eyebrow={`Built for ${city.name}`}
          titleId="ck-title"
          title={
            <>
              Building apps <em>in {city.name}.</em>
            </>
          }
          lede={city.context}
        />
        <div className="mk-grid" {...rv()}>
          <Column title={`Sectors we build for in ${city.name}`} items={city.sectors} />
          <Column title="Laws & rules we plan around" items={city.rules} />
          <Column title="Payments & integrations" items={city.integrations} />
        </div>
        <div className="mk-tz" {...rv(".08s")}>
          <div>
            <span className="label">Time zone · {city.timeZone.zone}</span>
            <p className="mk-tz-diff">{city.timeZone.difference}</p>
          </div>
          <p className="mk-tz-call">{city.timeZone.callWindow}</p>
        </div>
        <p className="mk-sources">
          <span className="label">Official guidance</span>
          {city.sources.map((source) => (
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
