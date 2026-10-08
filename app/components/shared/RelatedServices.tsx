import Link from "next/link";
import { serviceJsonLd } from "@/app/lib/jsonld";
import { getServiceLine, serviceLines } from "@/app/lib/services";
import JsonLd from "./JsonLd";

/**
 * Cross-links a service page to its sibling service lines and back to the
 * /services hub, and emits the page's Service structured data.
 */
export default function RelatedServices({ current }: { current: string }) {
  const service = getServiceLine(current);
  const siblings = serviceLines.filter((s) => s.path !== current);

  return (
    <section className="bg-[#fafbfc] py-20 sm:py-24" aria-labelledby="related-services-title">
      {service && <JsonLd data={serviceJsonLd(service)} />}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="related-services-title" className="text-[1.75rem] leading-tight font-semibold tracking-tight text-[#0b1220] sm:text-[2rem]">
            Related services
          </h2>
          <Link href="/services" className="text-[14.5px] font-semibold text-[#1470c4] hover:text-[#0b1220]">
            All services →
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {siblings.map((s) => (
            <li key={s.path}>
              <Link
                href={s.path}
                className="group flex h-full flex-col rounded-2xl border border-black/[0.07] bg-white p-7 shadow-sm transition-colors hover:border-[#1e8fe0]/40"
              >
                <h3 className="text-[17px] font-semibold text-[#0b1220] group-hover:text-[#1470c4]">{s.name}</h3>
                <p className="mt-2 text-[14px] leading-6 text-black/55">{s.description}</p>
                <span className="mt-5 text-[13.5px] font-semibold text-[#1470c4]">Explore {s.label.toLowerCase()} →</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
