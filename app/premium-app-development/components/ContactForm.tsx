"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { enquiryMailto, enquiryWhatsApp, submitEnquiry, type EnquiryFields } from "@/app/lib/enquiry";
import { siteConfig } from "@/app/lib/site-config";
import { Arr } from "./ui";

const SERVICES = ["New mobile app", "MVP", "Existing app upgrade", "Ongoing app support", "Not sure yet"];
const MARKETS = ["United Kingdom", "United States", "Canada", "United Arab Emirates", "Other"];
const BUDGETS = ["Under $25k", "$25k – $60k", "$60k – $150k", "$150k+", "Not sure yet"];

type Errors = Partial<Record<"name" | "email", string>>;

/**
 * Contact form. Sends the brief to /api/inquiry (emailed to the team via
 * Resend); if that fails, hands it to the visitor's email app or WhatsApp.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<EnquiryFields | null>(null);
  /** "delivered" = our server accepted it; "fallback" = handed to the visitor's email app. */
  const [mode, setMode] = useState<"delivered" | "fallback">("delivered");
  const [sending, setSending] = useState(false);

  function read(form: HTMLFormElement): EnquiryFields {
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    return {
      name: value("name"),
      email: value("email"),
      company: value("company"),
      details: value("details"),
      answers: [
        ["Looking for", value("service")],
        ["Market", value("market")],
        ["Budget", value("budget")],
      ],
    };
  }

  function validate(fields: EnquiryFields) {
    const next: Errors = {};
    if (fields.name.length < 2) next.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email)) next.email = "Please enter a valid email.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = read(form);
    if (!validate(fields)) return;
    setSending(true);
    const delivered = await submitEnquiry(fields, String(new FormData(form).get("website") ?? ""));
    setSending(false);
    setMode(delivered ? "delivered" : "fallback");
    setSent(fields);
    if (!delivered) window.location.href = enquiryMailto(fields);
  }

  if (sent) {
    return (
      <div className="cf-done" role="status">
        <div className="done-ic">
          <svg viewBox="0 0 24 24">
            <path d="m5 12 5 5 9-10" />
          </svg>
        </div>
        {mode === "delivered" ? (
          <>
            <h3>Thank you, {sent.name.split(" ")[0]} — we have your brief.</h3>
            <p>
              A senior member of the team will reply to <strong>{sent.email}</strong> within one working day with a few questions and
              suggested times for a call. If you would rather talk sooner, message us on WhatsApp.
            </p>
            <div className="cf-acts">
              <a className="btn btn-ghost" href={enquiryWhatsApp(sent)} target="_blank" rel="noopener">
                Message us on WhatsApp
              </a>
            </div>
          </>
        ) : (
          <>
        <h3>Your brief is ready, {sent.name.split(" ")[0]}.</h3>
        <p>
          Your email app should have opened with everything filled in — press <strong>send</strong> and a senior member of the team will
          reply within one working day. If it didn&apos;t open, send it on WhatsApp or email{" "}
          <a className="tlink" href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.contact.email}
          </a>
          .
        </p>
        <div className="cf-acts">
          <a className="btn btn-primary" href={enquiryWhatsApp(sent)} target="_blank" rel="noopener">
            Send on WhatsApp <Arr />
          </a>
          <button type="button" className="btn btn-ghost" onClick={() => setSent(null)}>
            Edit my brief
          </button>
        </div>
          </>
        )}
      </div>
    );
  }

  return (
    <form className="cf" onSubmit={onSubmit} noValidate aria-label="Project enquiry">
      {/* Honeypot: hidden from people, filled in by spam bots. */}
      <div className="cf-trap" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="fields">
        <div className={`field${errors.name ? " err" : ""}`}>
          <label htmlFor="cf-name">
            Name <i>*</i>
          </label>
          <input id="cf-name" name="name" autoComplete="name" placeholder="Your name" aria-invalid={!!errors.name} required />
          <span className="msg" aria-live="polite">
            {errors.name}
          </span>
        </div>
        <div className={`field${errors.email ? " err" : ""}`}>
          <label htmlFor="cf-email">
            Email <i>*</i>
          </label>
          <input id="cf-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" aria-invalid={!!errors.email} required />
          <span className="msg" aria-live="polite">
            {errors.email}
          </span>
        </div>
        <div className="field full">
          <label htmlFor="cf-company">Company</label>
          <input id="cf-company" name="company" autoComplete="organization" placeholder="Company or project name" />
        </div>
        <div className="field">
          <label htmlFor="cf-service">Looking for</label>
          <select id="cf-service" name="service" defaultValue={SERVICES[0]}>
            {SERVICES.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="cf-market">Your market</label>
          <select id="cf-market" name="market" defaultValue={MARKETS[0]}>
            {MARKETS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="field full">
          <label htmlFor="cf-budget">Approximate budget</label>
          <select id="cf-budget" name="budget" defaultValue="">
            <option value="">Prefer not to say</option>
            {BUDGETS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="field full">
          <label htmlFor="cf-details">Project details</label>
          <textarea id="cf-details" name="details" placeholder="What are you building, who is it for, and what does success look like?"></textarea>
        </div>
      </div>
      <div className="cf-acts">
        <button type="submit" className="btn btn-primary" disabled={sending}>
          {sending ? "Sending…" : "Send my brief"} <Arr />
        </button>
        <p className="cf-fine">
          Sent straight to our team. A senior member replies within one working day. See our{" "}
          <Link href="/privacy">privacy policy</Link>.
        </p>
      </div>
    </form>
  );
}
