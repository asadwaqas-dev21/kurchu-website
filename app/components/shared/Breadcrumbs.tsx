/**
 * Breadcrumb navigation for inner pages, plus matching BreadcrumbList JSON-LD.
 *
 * Pass `path` to build the trail from the site architecture in lib/routes.ts
 * (Home → Services → Web Development); `items` is kept for pages outside it.
 */
import { breadcrumbJsonLd } from "@/app/lib/jsonld";
import { breadcrumbTrail } from "@/app/lib/routes";
import { siteConfig } from "@/app/lib/site-config";
import JsonLd from "./JsonLd";

interface Crumb {
  label: string;
  href: string;
}

export default function Breadcrumbs({ path, items }: { path?: string; items?: Crumb[] }) {
  const crumbs: Crumb[] = path
    ? breadcrumbTrail(path).map((c) => ({ label: c.name, href: c.path }))
    : [{ label: "Home", href: "/" }, ...(items ?? [])];

  const jsonLd = path
    ? breadcrumbJsonLd(path)
    : {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.label,
          item: `${siteConfig.url}${c.href}`,
        })),
      };

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav aria-label="Breadcrumb" className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <ol className="flex items-center gap-2 py-3 text-[12.5px] text-black/40">
            {crumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i === crumbs.length - 1 ? (
                  <span className="font-medium text-[#0b1220]" aria-current="page">
                    {c.label}
                  </span>
                ) : (
                  <a href={c.href} className="hover:text-[#0b1220] transition-colors">
                    {c.label}
                  </a>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
