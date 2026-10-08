/** ──────────────────────────────────────────────
 *  Project enquiries.
 *
 *  There is no form backend yet, so enquiries are handed to the visitor's own
 *  email app (or WhatsApp) with the brief already written — nothing is lost
 *  and nothing pretends to have been sent. To switch to a backend (CRM,
 *  Resend, Formspree…), POST `fields` from the two callers instead:
 *  app/premium-app-development/components/ContactForm.tsx and the dialog's
 *  submit() in app/premium-app-development/interactions.ts.
 * ──────────────────────────────────────────────*/
import { siteConfig } from "./site-config";

export type EnquiryFields = {
  name: string;
  email: string;
  company?: string;
  details?: string;
  /** Any further answers (service, market, platform, budget…), in display order. */
  answers?: Array<[string, string | string[] | null | undefined]>;
};

function enquiryText({ name, email, company, details, answers = [] }: EnquiryFields) {
  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    ...(company ? [`Company: ${company}`] : []),
    ...answers
      .map(([label, value]) => [label, Array.isArray(value) ? value.join(", ") : value] as const)
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`),
  ];
  return `${lines.join("\n")}${details ? `\n\nProject details:\n${details}` : ""}`;
}

export function enquiryMailto(fields: EnquiryFields) {
  const subject = `Project enquiry — ${fields.name}${fields.company ? ` (${fields.company})` : ""}`;
  return `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(enquiryText(fields))}`;
}

const whatsappNumber = siteConfig.contact.whatsapp.replace(/[^0-9]/g, "");

export function enquiryWhatsApp(fields?: EnquiryFields) {
  const text = fields ? `Hi Kurchu, I'd like to discuss an app project.\n\n${enquiryText(fields)}` : "Hi Kurchu, I'd like to discuss an app project.";
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}
