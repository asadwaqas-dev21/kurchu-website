import type { Viewport } from "next";
import JsonLd from "@/app/components/shared/JsonLd";
import { enquiryWhatsApp } from "@/app/lib/enquiry";
import { faqPageJsonLd } from "@/app/lib/jsonld";
import { buildMetadata } from "@/app/lib/metadata";
import { marketsSentence } from "@/app/lib/regions";
import { siteConfig } from "@/app/lib/site-config";
import { ContactForm } from "@/app/premium-app-development/components/ContactForm";
import { Faq } from "@/app/premium-app-development/components/Faq";
import { PageHero } from "@/app/premium-app-development/components/PageHero";
import { PremiumShell } from "@/app/premium-app-development/components/PremiumShell";
import { Summary } from "@/app/premium-app-development/components/Summary";
import { SectionHead, rv } from "@/app/premium-app-development/components/ui";

export const metadata = buildMetadata({
  title: "Contact Kurchu Software Solutions | Start an App Project",
  description:
    "Tell us about your app — a new product, an MVP or an existing app. Email, call or WhatsApp; a senior team member replies within one working day.",
  path: "/contact",
});

export const viewport: Viewport = { themeColor: "#09090A", viewportFit: "cover" };

const { email, phone, phoneDisplay } = siteConfig.contact;

const methods = [
  { label: "Email", value: email, href: `mailto:${email}`, note: "Best for briefs, documents and attachments." },
  { label: "Phone", value: phoneDisplay, href: `tel:${phone}`, note: "Pakistan (UTC+5) — we call back in your time zone." },
  { label: "WhatsApp", value: phoneDisplay, href: enquiryWhatsApp(), note: "Quick questions and voice notes.", external: true },
];

const contactFaqs = [
  {
    q: "How quickly will Kurchu reply to my enquiry?",
    a: "A senior member of the team replies within one working day, whichever channel you use. Because we work with clients in the UK, USA, Canada and UAE, replies and calls are planned around your time zone rather than ours. If your brief arrives late in your day, you will usually find a thoughtful answer waiting when your next working day begins.",
  },
  {
    q: "What should I include in my project brief?",
    a: "You do not need a perfect technical brief. Tell us what you want to build, who it is for, and what success looks like in the first six months. Mention where the project stands today, any existing designs or apps, and a rough budget and timeline if you have them. We will fill the gaps together during the discovery call.",
  },
  {
    q: "Can we talk before I share project details?",
    a: "Yes. Many clients start with a short call or a WhatsApp message to check whether we are the right fit before sharing anything sensitive. We can discuss the type of product, your market and the shape of the team in general terms first, then go into full detail once you are comfortable. There is no obligation to proceed at any stage.",
  },
  {
    q: "What happens after the discovery call?",
    a: "Within a few working days you receive a written scope: what we recommend building first, the platforms and technical approach, a timeline, the team, and a fixed price for the first phase. If we think a different approach or partner would serve you better, we say so plainly. You decide whether to proceed, with no pressure and no automatic follow-up sequence.",
  },
];

const nextSteps = [
  {
    title: "We review your brief",
    body: "A senior member of the team reads it and replies within one working day — with questions, not a sales script.",
  },
  {
    title: "A short discovery call",
    body: "Thirty minutes in your time zone to understand the product, the users and what success looks like.",
  },
  {
    title: "A written scope",
    body: "A proposal with a fixed price for the first phase, a timeline and the team — or an honest recommendation if we are not the right fit.",
  },
];

export default function ContactPage() {
  return (
    <PremiumShell current="contact" stickyCta={false}>
      <JsonLd data={faqPageJsonLd(contactFaqs)} />
      <PageHero
        path="/contact"
        eyebrow="Contact"
        lines={["Tell us about", "the app you", <em key="em">want to build.</em>]}
        lede={`Whether it is an idea, a set of designs or a live app that needs work, a senior member of the team replies within one working day. We work with clients in ${marketsSentence}.`}
        meta={["Reply within one working day", "Calls booked in your time zone", "You own 100% of the code"]}
        cta={{ label: "Start a guided brief" }}
        pageType="ContactPage"
      />

      <section className="section ct" id="contact-form" aria-labelledby="ct-title" style={{ paddingTop: "clamp(56px,7vw,104px)" }}>
        <div className="wrap ct-grid">
          <div className="ct-side">
            <span className="eyebrow" {...rv()}>
              Get in touch
            </span>
            <h2 className="h2" id="ct-title" {...rv(".05s")}>
              Pick whatever <em>suits you.</em>
            </h2>
            <ul className="ct-methods" {...rv(".1s")}>
              {methods.map((method) => (
                <li key={method.label}>
                  <span className="label">{method.label}</span>
                  <a
                    className="ct-value"
                    href={method.href}
                    {...(method.external ? { target: "_blank", rel: "noopener" } : {})}
                  >
                    {method.value}
                  </a>
                  <span className="ct-note">{method.note}</span>
                </li>
              ))}
              <li>
                <span className="label">Studio</span>
                <span className="ct-value">{siteConfig.location}</span>
                <span className="ct-note">Serving the UK, USA, Canada and UAE.</span>
              </li>
            </ul>
          </div>
          <div className="ct-card" {...rv(".08s")}>
            <span className="label">Project brief</span>
            <h3>Two minutes, and we&apos;ll take it from there.</h3>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="section ct-next" aria-labelledby="ct-next-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead
            tight
            eyebrow="What happens next"
            titleId="ct-next-title"
            title={
              <>
                Three steps, <em>no pressure.</em>
              </>
            }
            lede="From your first message to a written scope with a fixed price for phase one — usually within a week, and never with a hard sell."
          />
          <ol className="ct-steps">
            {nextSteps.map((step, i) => (
              <li key={step.title} {...rv(i ? `${(i * 0.06).toFixed(2)}s` : undefined)}>
                <span className="why-n">{["i.", "ii.", "iii."][i]}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Faq
        items={contactFaqs}
        eyebrow="Before you write"
        title={
          <>
            Questions people ask <em>before reaching out.</em>
          </>
        }
      />

      <Summary
        title={
          <>
            How to reach <em>Kurchu.</em>
          </>
        }
        answer={`You can reach ${siteConfig.name} by email at ${email}, by phone or WhatsApp on ${phoneDisplay}, or through the project brief form on this page. A senior member of the team replies within one working day, and discovery calls are booked in your own time zone.`}
        facts={[
          ["Email", email],
          ["Phone & WhatsApp", phoneDisplay],
          ["Response time", "Within one working day"],
          ["Based in", siteConfig.location],
          ["Markets served", "United Kingdom, United States, Canada, United Arab Emirates"],
          ["First step", "A 30-minute discovery call, then a written scope"],
        ]}
      />
    </PremiumShell>
  );
}
