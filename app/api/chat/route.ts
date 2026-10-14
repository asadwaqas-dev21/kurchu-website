import { ASSISTANT_INSTRUCTION, ASSISTANT_TOOLS } from "@/app/lib/assistant";
import { HISTORY_SENT, MAX_INPUT_CHARS, MAX_REPLY_CHARS } from "@/app/lib/assistant-limits";
import { enquirySubject, enquiryText, type EnquiryFields } from "@/app/lib/enquiry";
import { RATE_LIMITS, clientIp, isSameOrigin, takeRateLimit } from "@/app/lib/request-guard";
import { siteConfig } from "@/app/lib/site-config";

/**
 * "Ask Kurchu" backend. Gemini answers from the facts in lib/assistant.ts and,
 * through function calling, can email a confirmed project brief to the team
 * using the same Resend setup as /api/inquiry.
 *
 * Environment: GEMINI_API_KEY (required); RESEND_API_KEY, RESEND_FROM and
 * ENQUIRY_TO for sending briefs.
 */

const MODEL = "gemini-3.5-flash-lite";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const MAX_IMAGE_BASE64_LENGTH = 2_000_000; // generous for a compressed JPEG under 1280px
const ALLOWED_IMAGE_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type ClientMessage = { role: "user" | "assistant"; content: string };
type ClientImage = { mime: string; data: string };
type Part = { text?: string; functionCall?: { name: string; args?: Record<string, unknown> }; [key: string]: unknown };
type GeminiResponse = { candidates?: { content?: { parts?: Part[] } }[] };

/** Visitor messages must fit the input limit; earlier assistant replies are trimmed, never dropped. */
function toClientMessage(value: unknown): ClientMessage | null {
  if (!value || typeof value !== "object") return null;
  const message = value as Record<string, unknown>;
  if (typeof message.content !== "string" || !message.content.trim()) return null;
  if (message.role === "user") return message.content.length <= MAX_INPUT_CHARS ? { role: "user", content: message.content } : null;
  if (message.role === "assistant") return { role: "assistant", content: message.content.slice(0, MAX_REPLY_CHARS) };
  return null;
}

function isClientImage(value: unknown): value is ClientImage {
  if (!value || typeof value !== "object") return false;
  const image = value as Record<string, unknown>;
  return (
    typeof image.mime === "string" &&
    ALLOWED_IMAGE_MIME.has(image.mime) &&
    typeof image.data === "string" &&
    image.data.length > 0 &&
    image.data.length <= MAX_IMAGE_BASE64_LENGTH
  );
}

const text = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

/** Emails a brief the visitor confirmed in the chat. Returns a short status for the model. */
async function sendBrief(args: Record<string, unknown>) {
  const fields: EnquiryFields = {
    name: text(args.name, 100),
    email: text(args.email, 200),
    company: text(args.company, 150),
    details: text(args.project, 3000),
    answers: [
      ["Platforms", text(args.platforms, 100)],
      ["Market", text(args.market, 100)],
      ["Timeline", text(args.timeline, 100)],
      ["Budget", text(args.budget, 100)],
      ["Source", "Ask Kurchu (website assistant)"],
    ],
  };
  if (fields.name.length < 2 || !EMAIL.test(fields.email)) {
    return { ok: false, message: "The name or email address looks incomplete. Ask the visitor to check it." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[chat] Brief not sent: RESEND_API_KEY is not set.");
    return { ok: false, message: "Sending is not available right now." };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "Kurchu Website <website@kurchu.com>",
        to: [process.env.ENQUIRY_TO || siteConfig.contact.email],
        reply_to: fields.email,
        subject: `${enquirySubject(fields)} · via Ask Kurchu`,
        text: `New project brief from the Ask Kurchu assistant.\n\n${enquiryText(fields)}\n\n— Reply to this email to answer ${fields.name} directly.`,
      }),
    });
    if (!res.ok) {
      console.error("[chat] Resend rejected the brief:", res.status, await res.text());
      return { ok: false, message: "Sending failed." };
    }
    // Log the event only — the visitor's name and email stay out of server logs.
    console.log("[chat] Project brief sent from Ask Kurchu");
    return { ok: true, message: "The brief was emailed to the Kurchu team." };
  } catch (error) {
    console.error("[chat] Brief send failed:", error instanceof Error ? error.message : error);
    return { ok: false, message: "Sending failed." };
  }
}

const replyText = (parts: Part[] | undefined) =>
  (parts ?? [])
    .map((part) => part.text ?? "")
    .join("")
    .trim();

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return Response.json({ code: "forbidden", error: "Forbidden." }, { status: 403 });
  }
  const ip = clientIp(request);
  if (!takeRateLimit(`chat:${ip}`, RATE_LIMITS.chatMessage)) {
    return Response.json(
      { code: "rate_limited", error: `Too many messages. Please try again later or email ${siteConfig.contact.email}.` },
      { status: 429 },
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json({ code: "unconfigured", error: "Chat is not configured yet." }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const rawMessages = Array.isArray(body?.messages) ? body.messages : [];
  const messages = rawMessages
    .slice(-HISTORY_SENT)
    .map(toClientMessage)
    .filter((message): message is ClientMessage => message !== null);
  if (!messages.length || messages[messages.length - 1]?.role !== "user") {
    return Response.json({ error: "Please enter a message." }, { status: 400 });
  }
  const image = isClientImage(body.image) ? body.image : undefined;

  const contents: Array<{ role: string; parts: Part[] }> = messages.map((message, index) => {
    const parts: Part[] = [{ text: message.content.trim() }];
    if (image && message.role === "user" && index === messages.length - 1) {
      parts.push({ inlineData: { mimeType: image.mime, data: image.data } });
    }
    return { role: message.role === "assistant" ? "model" : "user", parts };
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  const callGemini = async (turns: typeof contents) => {
    const payload = JSON.stringify({
      systemInstruction: { parts: [{ text: ASSISTANT_INSTRUCTION }] },
      contents: turns,
      tools: ASSISTANT_TOOLS,
      // Low temperature keeps answers close to the facts; the token cap backs up the 80-word rule.
      generationConfig: { temperature: 0.2, maxOutputTokens: 350 },
    });
    const send = () =>
      fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: payload,
        cache: "no-store",
        signal: controller.signal,
      });
    let response = await send();
    for (const delay of [600, 1_400, 3_000]) {
      if (response.status !== 429 && response.status !== 503) break;
      await new Promise((resolve) => setTimeout(resolve, delay));
      response = await send();
    }
    return response;
  };

  try {
    const response = await callGemini(contents);
    if (!response.ok) {
      console.error(`[chat] Gemini request failed with status ${response.status}`);
      return Response.json({ error: "The assistant is temporarily unavailable. Please try again." }, { status: 502 });
    }
    const parts = ((await response.json()) as GeminiResponse).candidates?.[0]?.content?.parts ?? [];

    const call = parts.find((part) => part.functionCall?.name === "submit_project_brief")?.functionCall;
    if (call) {
      const result = takeRateLimit(`chat-brief:${ip}`, RATE_LIMITS.chatBrief)
        ? await sendBrief(call.args ?? {})
        : { ok: false, message: "Too many briefs from this connection." };

      // Hand the result back so the model can confirm in the visitor's own language.
      const followUp = await callGemini([
        ...contents,
        { role: "model", parts },
        { role: "function", parts: [{ functionResponse: { name: "submit_project_brief", response: { success: result.ok, message: result.message } } }] },
      ]);
      const confirmation = followUp.ok ? replyText(((await followUp.json()) as GeminiResponse).candidates?.[0]?.content?.parts) : "";
      const fallback = result.ok
        ? "Done — your brief has reached the Kurchu team. A senior person will reply by email within one working day."
        : `Sorry, I couldn't send that just now. Please email ${siteConfig.contact.email} or WhatsApp ${siteConfig.contact.phoneDisplay}, and the team will pick it up.`;
      return Response.json({ reply: confirmation || fallback, model: MODEL, briefSent: result.ok });
    }

    const reply = replyText(parts);
    if (!reply) {
      return Response.json({ error: "I could not prepare an answer. Please try another question." }, { status: 502 });
    }
    return Response.json({ reply, model: MODEL });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "AbortError";
    console.error(`[chat] Gemini request ${timedOut ? "timed out" : "could not connect"}: ${error instanceof Error ? error.message : "unknown error"}`);
    return Response.json(
      { error: timedOut ? "The answer took too long. Please try again." : "The assistant is temporarily unavailable. Please try again." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
