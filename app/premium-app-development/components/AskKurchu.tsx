"use client";

import { useEffect, useRef, useState } from "react";
import { CloseCircle, Dislike, GalleryAdd, Like1, MessageText1, Refresh2, Send2, TickCircle } from "iconsax-react";
import { MAX_INPUT_CHARS, MAX_VISITOR_MESSAGES } from "@/app/lib/assistant-limits";
import { siteConfig } from "@/app/lib/site-config";

/**
 * "Ask Kurchu" — the site assistant (backend: /api/chat). Any page can open it
 * with a `data-ask-kurchu` element or by dispatching "askkurchu:open" on window.
 */

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
  image?: string;
  error?: boolean;
  briefSent?: boolean;
  vote?: "up" | "down";
};

const INTRO_ID = 1;
const INTRO =
  "Hi, I'm Ask Kurchu. Ask me about pricing, timelines, our process or the markets we work in — or tell me about your app and I can send your brief to the team.";
const STARTERS = [
  "How much does an app cost?",
  "How long does an MVP take?",
  "Flutter or native — which should I choose?",
  "I'd like to start a project",
];
const UNAVAILABLE = `Sorry, I can't answer right now. Please email ${siteConfig.contact.email} or WhatsApp ${siteConfig.contact.phoneDisplay}.`;
const WHATSAPP = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hi Kurchu, I'd like to discuss an app project.")}`;

/** Iconsax, drawn in the current text colour like the rest of the dark design. */
const ic = { color: "currentColor", "aria-hidden": true } as const;

const intro = (): ChatMessage => ({ id: INTRO_ID, role: "assistant", content: INTRO });

/** Photos are sent to the model as a JPEG no wider than 1280px. */
async function shrinkImage(file: File) {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return { mime: "image/jpeg", data: canvas.toDataURL("image/jpeg", 0.82).split(",")[1] };
  } catch {
    return undefined;
  }
}

/** Loaded on demand by AskKurchuLauncher, which mounts it already open. */
export function AskKurchu({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [intro()]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [slow, setSlow] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const nextId = useRef(2);

  // Open from anywhere: "askkurchu:open" on window, or a click on [data-ask-kurchu].
  useEffect(() => {
    const openFromEvent = () => setOpen(true);
    const openFromClick = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest?.("[data-ask-kurchu]")) {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("askkurchu:open", openFromEvent);
    document.addEventListener("click", openFromClick);
    return () => {
      window.removeEventListener("askkurchu:open", openFromEvent);
      document.removeEventListener("click", openFromClick);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  // Grow the textarea with its content, up to a cap.
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${input ? Math.min(el.scrollHeight, 140) : 44}px`;
    el.style.overflowY = input && el.scrollHeight > 140 ? "auto" : "hidden";
  }, [input, open]);

  useEffect(() => {
    if (!open || (messages.length === 1 && !pending)) return;
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, pending, open]);

  useEffect(() => {
    if (!pending) return;
    const timer = window.setTimeout(() => setSlow(true), 6000);
    return () => window.clearTimeout(timer);
  }, [pending]);

  const atLimit = messages.filter((m) => m.role === "user").length >= MAX_VISITOR_MESSAGES;
  const charsLeft = MAX_INPUT_CHARS - input.length;

  const close = () => {
    setOpen(false);
    window.requestAnimationFrame(() => launcherRef.current?.focus());
  };

  const reset = () => {
    setMessages([intro()]);
    setInput("");
  };

  const requestReply = async (history: ChatMessage[], image?: { mime: string; data: string }) => {
    setSlow(false);
    setPending(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })), image }),
      });
      const data = (await response.json().catch(() => ({}))) as { reply?: string; error?: string; briefSent?: boolean };
      setMessages((current) => [
        ...current,
        {
          id: nextId.current++,
          role: "assistant",
          content: response.ok && data.reply ? data.reply : data.error || UNAVAILABLE,
          error: !response.ok,
          briefSent: !!data.briefSent,
        },
      ]);
    } catch {
      setMessages((current) => [...current, { id: nextId.current++, role: "assistant", content: UNAVAILABLE, error: true }]);
    } finally {
      setPending(false);
    }
  };

  const send = async (suggestion?: string) => {
    const content = (suggestion ?? input).trim();
    if (!content || pending || atLimit) return;
    const history = [
      ...messages.filter((m) => !m.error),
      { id: nextId.current++, role: "user" as const, content: content.slice(0, MAX_INPUT_CHARS) },
    ];
    setMessages(history);
    setInput("");
    await requestReply(history);
  };

  const sendPhoto = async (file: File) => {
    if (pending || atLimit) return;
    const history = [
      ...messages.filter((m) => !m.error),
      {
        id: nextId.current++,
        role: "user" as const,
        content: `Shared an image: ${file.name}`.slice(0, MAX_INPUT_CHARS),
        image: URL.createObjectURL(file),
      },
    ];
    setMessages(history);
    await requestReply(history, await shrinkImage(file));
  };

  const vote = (id: number, choice: "up" | "down") =>
    setMessages((current) => current.map((m) => (m.id === id ? { ...m, vote: choice } : m)));

  return (
    <div className="ak">
      {open && (
        <>
          <button type="button" className="ak-scrim" aria-label="Close Ask Kurchu" onClick={close} />
          <section className="ak-panel" role="dialog" aria-modal="true" aria-labelledby="ak-title">
            <span className="ak-grabber" aria-hidden="true" />
            <header className="ak-head">
              <span className="ak-mark" aria-hidden="true">
                <MessageText1 size={18} variant="Linear" {...ic} />
              </span>
              <div className="ak-head-copy">
                <h2 id="ak-title">Ask Kurchu</h2>
                <p>AI assistant · answers from kurchu.com</p>
              </div>
              <button type="button" className="ak-icon" onClick={reset} aria-label="Start over">
                <Refresh2 size={19} variant="Linear" {...ic} />
              </button>
              <button type="button" className="ak-icon" onClick={close} aria-label="Close">
                <CloseCircle size={20} variant="Linear" {...ic} />
              </button>
            </header>

            <div className="ak-log" role="log" aria-live="polite" aria-busy={pending}>
              <ol>
                {messages.map((message) =>
                  message.role === "user" ? (
                    <li key={message.id} className="ak-msg ak-msg--user">
                      {message.image ? (
                        // eslint-disable-next-line @next/next/no-img-element -- local object URL of the visitor's own file
                        <img src={message.image} alt="Image you shared" className="ak-img" />
                      ) : (
                        <p className="ak-bubble">{message.content}</p>
                      )}
                    </li>
                  ) : (
                    <li key={message.id} className="ak-msg">
                      <p className={message.error ? "ak-text ak-text--error" : "ak-text"}>{message.content}</p>
                      {message.briefSent && (
                        <span className="ak-badge">
                          <TickCircle size={14} variant="Bold" {...ic} /> Brief sent to the team
                        </span>
                      )}
                      {message.id !== INTRO_ID && !message.error && (
                        <div className="ak-vote">
                          {(["up", "down"] as const).map((choice) => {
                            if (message.vote && message.vote !== choice) return null;
                            const VoteIcon = choice === "up" ? Like1 : Dislike;
                            return (
                              <button
                                key={choice}
                                type="button"
                                className={`ak-icon ak-icon--sm${message.vote === choice ? " is-on" : ""}`}
                                disabled={!!message.vote}
                                aria-pressed={message.vote === choice}
                                aria-label={choice === "up" ? "Helpful" : "Not helpful"}
                                onClick={() => vote(message.id, choice)}
                              >
                                <VoteIcon size={15} variant={message.vote === choice ? "Bold" : "Linear"} {...ic} />
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </li>
                  ),
                )}

                {messages.length === 1 && (
                  <li className="ak-starters">
                    {STARTERS.map((starter) => (
                      <button key={starter} type="button" className="ak-starter" onClick={() => send(starter)}>
                        {starter}
                      </button>
                    ))}
                  </li>
                )}

                {atLimit && !pending && (
                  <li className="ak-limit">
                    <p>
                      This conversation has reached its {MAX_VISITOR_MESSAGES}-message limit. Start a new one, or email{" "}
                      <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> and a senior person
                      will reply within one working day.
                    </p>
                    <button type="button" className="ak-starter" onClick={reset}>
                      Start a new conversation
                    </button>
                  </li>
                )}

                {pending && (
                  <li className="ak-msg">
                    <span className="ak-typing" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="sr-only">Ask Kurchu is typing</span>
                    {slow && <p className="ak-slow">Still working on it — thanks for waiting.</p>}
                  </li>
                )}
              </ol>
              <div ref={endRef} />
            </div>

            <div className="ak-foot">
              <form
                className="ak-composer"
                onSubmit={(event) => {
                  event.preventDefault();
                  send();
                }}
              >
                <button
                  type="button"
                  className="ak-icon"
                  disabled={atLimit || pending}
                  onClick={() => fileRef.current?.click()}
                  aria-label="Share a screenshot or sketch"
                >
                  <GalleryAdd size={19} variant="Linear" {...ic} />
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  hidden
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) sendPhoto(file);
                    event.target.value = "";
                  }}
                />
                <label htmlFor="ak-input" className="sr-only">
                  Your question
                </label>
                <textarea
                  ref={inputRef}
                  id="ak-input"
                  className="ak-input"
                  rows={1}
                  maxLength={MAX_INPUT_CHARS}
                  disabled={atLimit}
                  aria-describedby="ak-count"
                  value={input}
                  placeholder={atLimit ? "Start a new conversation to keep asking" : "Ask about pricing, timelines, markets…"}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      send();
                    }
                  }}
                />
                <button type="submit" className="ak-send" disabled={!input.trim() || pending || atLimit} aria-label="Send">
                  <Send2 size={18} variant="Bold" {...ic} />
                </button>
              </form>
              <p id="ak-count" className={`ak-count${charsLeft <= 100 ? " is-shown" : ""}`} aria-live="polite">
                {charsLeft <= 100 ? `${charsLeft} characters left` : ""}
              </p>
              <p className="ak-note">
                AI answers can be wrong. For anything important, email{" "}
                <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> or{" "}
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  WhatsApp us
                </a>
                .
              </p>
            </div>
          </section>
        </>
      )}

      {!open && (
        <button ref={launcherRef} type="button" className="ak-launch" onClick={() => setOpen(true)} aria-haspopup="dialog">
          <MessageText1 size={18} variant="Linear" {...ic} />
          Ask Kurchu
        </button>
      )}
    </div>
  );
}
