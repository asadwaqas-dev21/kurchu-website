/** ──────────────────────────────────────────────
 *  Project enquiries.
 *
 *  Both the contact form and the "Start a Project" dialog POST to
 *  /api/inquiry, which emails the brief to the team through Resend. If that
 *  request fails, the brief is handed to the visitor's own email app or
 *  WhatsApp instead, so an enquiry is never silently lost.
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

/** Plain-text version of a brief — used for the team email, mailto and WhatsApp. */
export function enquiryText({ name, email, company, details, answers = [] }: EnquiryFields) {
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

export function enquirySubject(fields: EnquiryFields) {
  return `Project enquiry — ${fields.name}${fields.company ? ` (${fields.company})` : ""}`;
}

export function enquiryMailto(fields: EnquiryFields) {
  return `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(enquirySubject(fields))}&body=${encodeURIComponent(enquiryText(fields))}`;
}

const whatsappNumber = siteConfig.contact.whatsapp.replace(/[^0-9]/g, "");

export function enquiryWhatsApp(fields?: EnquiryFields) {
  const text = fields ? `Hi Kurchu, I'd like to discuss an app project.\n\n${enquiryText(fields)}` : "Hi Kurchu, I'd like to discuss an app project.";
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Send a brief to the team. Resolves true when the server accepted it;
 * false means the caller should fall back to email or WhatsApp.
 * `trap` is the hidden honeypot field — real visitors leave it empty.
 */
export async function submitEnquiry(fields: EnquiryFields, trap = ""): Promise<boolean> {
  try {
    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...fields, website: trap }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
