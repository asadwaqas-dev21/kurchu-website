"use client";

import { useState } from "react";

export interface FAQItem {
  q: string;
  a: string;
}

/**
 * Reusable FAQ accordion. Identical interaction pattern to the homepage FAQ.
 */
export default function FAQSection({
  heading = "Frequently asked questions",
  items,
}: {
  heading?: string;
  items: FAQItem[];
}) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="text-[2rem] leading-[1.15] font-semibold tracking-tight text-[#0b1220] sm:text-[2.25rem]">
          {heading}
        </h2>

        <div className="mt-10 flex flex-col">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="border-b border-black/[0.08]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[14.5px] font-medium text-[#0b1220]">
                    {item.q}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={`shrink-0 transition-transform ${isOpen ? "rotate-45" : ""}`}
                  >
                    <path
                      d="M8 2.5v11M2.5 8h11"
                      stroke="#0b1220"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                {isOpen && (
                  <p className="pb-5 pr-8 text-[13.5px] leading-6 text-black/55">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
