"use client";

import { useState } from "react";
import { ArrowDown2, MessageText } from "iconsax-react";
import { faqPageJsonLd } from "@/app/lib/jsonld";
import JsonLd from "./JsonLd";

export interface FAQItem {
  q: string;
  a: string;
}

/**
 * Reusable FAQ section: intro + "Ask AI" card on the left,
 * numbered accordion on the right. Used on the homepage and service pages.
 */
export default function FAQSection({
  eyebrow = "Got questions?",
  heading = "Frequently asked questions",
  description = "Everything you need to know before starting a project with Kurchu Software Solutions.",
  items,
  id,
  className = "py-24 sm:py-28",
  schema = true,
}: {
  eyebrow?: string;
  heading?: string;
  description?: string;
  items: FAQItem[];
  id?: string;
  className?: string;
  /** Emit FAQPage structured data. Turn off if the same questions already appear on another indexed page. */
  schema?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id={id} className={`bg-white ${className}`}>
      {schema && <JsonLd data={faqPageJsonLd(items)} />}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-14">
        {/* Left: intro + Ask AI */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <span className="inline-block border-b border-black/15 pb-2 text-[13px] font-semibold tracking-[0.08em] text-black/55 uppercase">
            {eyebrow}
          </span>
          <h2 className="mt-6 max-w-sm text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.03em] text-[#0b1220] sm:text-[3.25rem]">
            {heading}
          </h2>
          <p className="mt-6 max-w-md text-[15.5px] leading-7 text-black/60">{description}</p>

          <div className="mt-10 max-w-md rounded-3xl bg-[#f5f7fa] p-7 sm:p-8">
            <h3 className="text-[19px] font-semibold text-[#0b1220]">Something else?</h3>
            <p className="mt-2 text-[14.5px] leading-6 text-black/55">
              Our AI assistant answers questions about our services at any hour.
            </p>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("noor:open"))}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#0b1220] px-6 py-3 text-[14px] font-semibold text-[#0b1220] transition-colors hover:bg-[#0b1220] hover:text-white"
            >
              <MessageText size={17} color="currentColor" />
              Ask AI
            </button>
          </div>
        </div>

        {/* Right: numbered accordion */}
        <div className="flex flex-col gap-3.5">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="rounded-3xl bg-[#f5f7fa] transition-colors">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[15px] font-semibold transition-colors ${
                      isOpen ? "bg-[#1e8fe0] text-white" : "bg-[#dcf0ff] text-[#1470c4]"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="flex-1 text-[16px] leading-snug font-medium text-[#0b1220] sm:text-[17px]">
                    {item.q}
                  </span>
                  <ArrowDown2
                    size={18}
                    color="#0b1220"
                    className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-6 text-[15px] leading-7 text-black/60 sm:px-6">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
