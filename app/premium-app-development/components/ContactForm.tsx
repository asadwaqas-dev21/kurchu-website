"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { enquiryMailto, enquiryWhatsApp, type EnquiryFields } from "@/app/lib/enquiry";
import { siteConfig } from "@/app/lib/site-config";
import { Arr } from "./ui";

const SERVICES = ["New mobile app", "MVP", "Existing app upgrade", "Ongoing app support", "Not sure yet"];
const MARKETS = ["United Kingdom", "United States", "Canada", "United Arab Emirates", "Other"];
const BUDGETS = ["Under $25k", "$25k – $60k", "$60k – $150k", "$150k+", "Not sure yet"];

type Errors = Partial<Record<"name" | "email", string>>;

/**
 * Contact form. Hands the finished brief to the visitor's email app (or
 * WhatsApp) — see lib/enquiry.ts for why, and how to switch to a backend.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<EnquiryFields | null>(null);

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

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fields = read(e.currentTarget);
    if (!validate(fields)) return;
    setSent(fields);
    window.location.href = enquiryMailto(fields);
  }

  if (sent) {
    return (
      <div className="cf-done" role="status">
        <div className="done-ic">
          <svg viewBox="0 0 24 24">
            <path d="m5 12 5 5 9-10" />
          </svg>
        </div>
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
      </div>
    );
  }

  return (
    <form className="cf" onSubmit={onSubmit} noValidate aria-label="Project enquiry">
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
        <button type="submit" className="btn btn-primary">
          Send my brief <Arr />
        </button>
        <p className="cf-fine">
          Opens your email app with your brief ready to send. We reply within one working day. See our{" "}
          <Link href="/privacy">privacy policy</Link>.
        </p>
      </div>
    </form>
  );
}
