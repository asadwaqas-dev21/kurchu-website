"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How long does a website take?",
    a: "The timeline for building a website varies based on the scope and complexity of your project. A standard business website typically takes between 4 to 8 weeks from initial design to launch. However, more complex e-commerce platforms or custom applications will require additional time. We always provide a detailed, week-by-week timeline in your initial proposal so you know exactly what to expect.",
  },
  {
    q: "Do you work with clients outside Pakistan?",
    a: "Yes, absolutely! We successfully partner with businesses and organizations worldwide. Our team is highly experienced in managing projects remotely. We ensure smooth communication by scheduling calls, delivering proposals, and providing regular progress reports at times that are convenient for your specific timezone. Distance is never a barrier to delivering exceptional software and SEO results for our international clients.",
  },
  {
    q: "Will I own the website and code?",
    a: "Yes, you will have complete ownership. Once the project is completed and paid in full, we transfer all intellectual property rights to you. This includes the source code, design files, graphics, and all written content. We believe in total transparency and do not use vendor lock-in tactics. You are entirely free to host the site wherever you choose and modify it as you see fit.",
  },
  {
    q: "When will SEO show results?",
    a: "Search engine optimization is a long-term strategy. While some early technical fixes and on-page optimizations can produce noticeable improvements within just a few weeks, meaningful and sustained ranking movement for competitive keywords typically requires 3 to 6 months of consistent effort. We focus on building a strong foundation and earning quality authority to ensure your results are durable rather than just a temporary spike.",
  },
  {
    q: "Can you take over an existing site or app?",
    a: "Yes, we frequently take over existing websites and applications. Our process begins with a comprehensive technical audit of your current codebase and infrastructure. We will honestly evaluate what is working, flag any underlying issues that are worth rebuilding, and then smoothly transition the hosting, content management, and ongoing development to our team. We ensure your digital assets continue to operate flawlessly during the handover.",
  },
];

const needs = ["Website", "Mobile app", "SEO", "Not sure yet"];

export default function FaqContact() {
  const [openIndex, setOpenIndex] = useState(0);
  const [need, setNeed] = useState("Website");

  return (
    <section id="faq" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-[2rem] leading-[1.15] font-semibold tracking-tight text-[#0b1220] sm:text-[2.25rem]">
              Questions before you start
            </h2>

            <div className="mt-8 flex flex-col">
              {faqs.map((item, i) => {
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
                      <p className="pb-5 pr-8 text-[13.5px] leading-6 text-black/55 text-justify">
                        {item.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div id="contact" className="rounded-2xl border border-black/[0.07] bg-[#fafbfc] p-6 sm:p-8">
            <h3 className="text-[19px] font-semibold text-[#0b1220]">
              Tell us about your project
            </h3>
            <p className="mt-1.5 text-[13.5px] text-black/55">
              We reply within one business day with next steps.
            </p>

            <form className="mt-6 flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Full name"
                  className="rounded-lg border border-black/10 bg-white px-4 py-3 text-[13.5px] outline-none placeholder:text-black/35 focus:border-[#1e8fe0]"
                />
                <input
                  type="email"
                  placeholder="Work email"
                  className="rounded-lg border border-black/10 bg-white px-4 py-3 text-[13.5px] outline-none placeholder:text-black/35 focus:border-[#1e8fe0]"
                />
              </div>

              <div>
                <p className="mb-2 text-[12.5px] font-medium text-black/55">
                  What do you need?
                </p>
                <div className="flex flex-wrap gap-2">
                  {needs.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setNeed(option)}
                      className={`rounded-full px-4 py-2 text-[12.5px] font-medium transition-colors ${
                        need === option
                          ? "bg-[#0b1220] text-white"
                          : "border border-black/10 bg-white text-black/60"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Current website (optional)"
                  className="rounded-lg border border-black/10 bg-white px-4 py-3 text-[13.5px] outline-none placeholder:text-black/35 focus:border-[#1e8fe0]"
                />
                <select
                  defaultValue=""
                  className="rounded-lg border border-black/10 bg-white px-4 py-3 text-[13.5px] text-black/60 outline-none focus:border-[#1e8fe0]"
                >
                  <option value="" disabled>
                    Budget
                  </option>
                  <option>Select a range</option>
                </select>
              </div>

              <textarea
                placeholder="Project details — what are you building, and what should it achieve?"
                rows={4}
                className="rounded-lg border border-black/10 bg-white px-4 py-3 text-[13.5px] outline-none placeholder:text-black/35 focus:border-[#1e8fe0]"
              />

              <div className="mt-2 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href="#"
                  className="text-[13px] font-medium text-[#1e8fe0] hover:text-[#1470c4]"
                >
                  Prefer a call? Book a 20-minute consultation
                </a>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-[#0b1220] px-6 py-3 text-[13.5px] font-medium text-white transition-colors hover:bg-[#182236]"
                >
                  Send project details
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
