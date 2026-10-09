import { enquirySubject, enquiryText, type EnquiryFields } from "@/app/lib/enquiry";
import { siteConfig } from "@/app/lib/site-config";

/**
 * Receives project briefs from the contact form and the "Start a Project"
 * dialog and emails them to the team through Resend.
 *
 * Environment: RESEND_API_KEY (required), RESEND_FROM (a sender on a domain
 * verified in Resend) and ENQUIRY_TO (defaults to the site's contact email).
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { name: 100, email: 200, company: 150, details: 5000, answer: 200 };

// Basic per-instance rate limit: 5 enquiries per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const clean = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

function parse(body: Record<string, unknown>): EnquiryFields | null {
  const fields: EnquiryFields = {
    name: clean(body.name, LIMITS.name),
    email: clean(body.email, LIMITS.email),
    company: clean(body.company, LIMITS.company),
    details: clean(body.details, LIMITS.details),
    answers: Array.isArray(body.answers)
      ? body.answers.slice(0, 12).flatMap((pair): Array<[string, string | string[]]> => {
          if (!Array.isArray(pair) || typeof pair[0] !== "string") return [];
          const value = Array.isArray(pair[1])
            ? pair[1].filter((v): v is string => typeof v === "string").map((v) => v.slice(0, LIMITS.answer)).slice(0, 10)
            : clean(pair[1], LIMITS.answer);
          return [[pair[0].slice(0, 40), value]];
        })
      : [],
  };
  if (fields.name.length < 2 || !EMAIL.test(fields.email)) return null;
  return fields;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "website" field; pretend success and drop it.
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "Too many enquiries — please try again shortly." }, { status: 429 });
  }

  const fields = parse(body);
  if (!fields) return Response.json({ ok: false, error: "Please add your name and a valid email." }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Enquiry not sent: RESEND_API_KEY is not set.");
    return Response.json({ ok: false, error: "Email is not configured." }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || "Kurchu Website <website@kurchu.com>",
      to: [process.env.ENQUIRY_TO || siteConfig.contact.email],
      reply_to: fields.email,
      subject: enquirySubject(fields),
      text: `New project brief from the website.\n\n${enquiryText(fields)}\n\n— Reply to this email to answer ${fields.name} directly.`,
    }),
  });

  if (!res.ok) {
    console.error("Resend rejected the enquiry:", res.status, await res.text());
    return Response.json({ ok: false, error: "Could not send right now." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
