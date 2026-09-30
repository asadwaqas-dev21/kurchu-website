/**
 * Breadcrumb navigation for inner pages.
 * Adds JSON-LD BreadcrumbList structured data.
 */
import { siteConfig } from "@/app/lib/site-config";

interface Crumb {
  label: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const crumbs: Crumb[] = [{ label: "Home", href: "/" }, ...items];

  const jsonLd = {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ol className="flex items-center gap-2 py-3 text-[12.5px] text-black/40">
            {crumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i === crumbs.length - 1 ? (
                  <span className="font-medium text-[#0b1220]">{c.label}</span>
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
