"use client";

import { useState } from "react";
import InnerLayout from "@/app/components/shared/InnerLayout";
import Breadcrumbs from "@/app/components/shared/Breadcrumbs";
import { siteConfig } from "@/app/lib/site-config";

/* ── Data ─────────────────────────────────────── */

const serviceOptions = [
  "New Mobile App",
  "MVP",
  "Existing App Upgrade",
  "Ongoing App Support",
  "Not Sure",
];

const budgetRanges = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+",
  "Not sure yet",
];

const nextSteps = [
  {
    step: "01",
    title: "We review your enquiry",
    description:
      "We read through your project details within one business day and assess whether we are a good fit.",
  },
  {
    step: "02",
    title: "Discovery conversation",
    description:
      "If the project is a fit, we arrange a short conversation to understand your requirements, goals and timeline in more detail.",
  },
  {
    step: "03",
    title: "Proposal or next step",
    description:
      "We prepare the appropriate next step — a project proposal, detailed scope document or app audit — depending on what you need.",
  },
];

/* ── Page ──────────────────────────────────────── */

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [service, setService] = useState("New Mobile App");
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    // TODO: Connect to your form backend (e.g. Zoho, Formspree, or custom API).
    // For now, simulate a successful submission.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus("success");
  }

  return (
    <InnerLayout>
      <Breadcrumbs items={[{ label: "Contact", href: "/classic/contact" }]} />

      {/* ── Hero + Form ────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* Left: copy */}
            <div>
              <h1 className="max-w-md text-[2.5rem] leading-[1.08] font-semibold tracking-tight text-[#0b1220] sm:text-[3.25rem]">
                Tell us what you are trying to build or grow.
              </h1>
              <p className="mt-6 max-w-md text-[16.5px] leading-7 text-black/55">
                You do not need a perfect technical brief. Tell us about your business, your current situation and what you want to improve.
              </p>

              {/* Contact info */}
              <div className="mt-10 flex flex-col gap-4 border-t border-black/[0.06] pt-8">
                <div>
                  <p className="text-[12px] font-medium text-black/40">Email</p>
                  <p className="mt-1 text-[14px] font-medium text-[#0b1220]">
                    {siteConfig.contact.email}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-black/40">WhatsApp</p>
                  <p className="mt-1 text-[14px] font-medium text-[#0b1220]">
                    {siteConfig.contact.whatsapp}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-black/40">Location</p>
                  <p className="mt-1 text-[14px] font-medium text-[#0b1220]">
                    {siteConfig.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="rounded-2xl border border-black/[0.07] bg-[#fafbfc] p-6 sm:p-8">
              {status === "success" ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#eff8ff]">
                    <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                      <path d="M3.5 8.5l3 3 6-7" stroke="#1e8fe0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="mt-5 text-[19px] font-semibold text-[#0b1220]">
                    Project details received
                  </h3>
                  <p className="mt-2 max-w-sm text-[14px] leading-6 text-black/55">
                    We will review your enquiry and respond within one business day with next steps.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-[19px] font-semibold text-[#0b1220]">
                    Send project details
                  </h2>
                  <p className="mt-1.5 text-[13.5px] text-black/55">
                    We reply within one business day with next steps.
                  </p>

                  <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className="mb-1.5 block text-[12.5px] font-medium text-black/55">
                          Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          placeholder="Full name"
                          className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-[13.5px] outline-none placeholder:text-black/35 focus:border-[#1e8fe0]"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-company" className="mb-1.5 block text-[12.5px] font-medium text-black/55">
                          Company
                        </label>
                        <input
                          id="contact-company"
                          type="text"
                          placeholder="Company name"
                          className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-[13.5px] outline-none placeholder:text-black/35 focus:border-[#1e8fe0]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-email" className="mb-1.5 block text-[12.5px] font-medium text-black/55">
                          Email *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          placeholder="work@email.com"
                          className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-[13.5px] outline-none placeholder:text-black/35 focus:border-[#1e8fe0]"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className="mb-1.5 block text-[12.5px] font-medium text-black/55">
                          Phone / WhatsApp
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          placeholder="+92 xxx xxxxxxx"
                          className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-[13.5px] outline-none placeholder:text-black/35 focus:border-[#1e8fe0]"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-website" className="mb-1.5 block text-[12.5px] font-medium text-black/55">
                        Current website
                      </label>
                      <input
                        id="contact-website"
                        type="url"
                        placeholder="https://yourwebsite.com"
                        className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-[13.5px] outline-none placeholder:text-black/35 focus:border-[#1e8fe0]"
                      />
                    </div>

                    {/* Service selector */}
                    <div>
                      <p className="mb-2 text-[12.5px] font-medium text-black/55">
                        Service needed *
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {serviceOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setService(option)}
                            className={`rounded-full px-4 py-2 text-[12.5px] font-medium transition-colors ${
                              service === option
                                ? "bg-[#0b1220] text-white"
                                : "border border-black/10 bg-white text-black/60 hover:bg-black/[0.03]"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-budget" className="mb-1.5 block text-[12.5px] font-medium text-black/55">
                        Budget range
                      </label>
                      <select
                        id="contact-budget"
                        defaultValue=""
                        className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-[13.5px] text-black/60 outline-none focus:border-[#1e8fe0]"
                      >
                        <option value="" disabled>Select a range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-timeline" className="mb-1.5 block text-[12.5px] font-medium text-black/55">
                        Timeline / Target launch
                      </label>
                      <input
                        id="contact-timeline"
                        type="text"
                        placeholder="e.g. Q1 2027, ASAP, flexible"
                        className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-[13.5px] outline-none placeholder:text-black/35 focus:border-[#1e8fe0]"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-details" className="mb-1.5 block text-[12.5px] font-medium text-black/55">
                        Project details *
                      </label>
                      <textarea
                        id="contact-details"
                        required
                        rows={5}
                        placeholder="Tell us about your business, what you want to build or improve, and any relevant context."
                        className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-[13.5px] outline-none placeholder:text-black/35 focus:border-[#1e8fe0]"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-[13px] text-red-600">
                        Something went wrong. Please try again or email us directly.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="mt-2 inline-flex items-center justify-center rounded-full bg-[#0b1220] px-6 py-3.5 text-[14.5px] font-medium text-white transition-colors hover:bg-[#182236] disabled:opacity-60"
                    >
                      {status === "loading" ? "Sending…" : "Send Project Details"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── What Happens Next ──────────────────────── */}
      <section className="bg-[#fafbfc] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <h2 className="text-[2rem] leading-[1.15] font-semibold tracking-tight text-[#0b1220] sm:text-[2.25rem]">
            What happens next?
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {nextSteps.map((s) => (
              <div key={s.step} className="border-t-2 border-[#0b1220] pt-5">
                <span className="text-[12px] font-medium text-black/40">{s.step}</span>
                <h3 className="mt-2 text-[17px] font-semibold text-[#0b1220]">{s.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-6 text-black/55">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </InnerLayout>
  );
}
