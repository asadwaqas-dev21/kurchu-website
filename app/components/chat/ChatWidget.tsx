"use client";

import { useEffect, useRef, useState } from "react";
import {
  MessageText,
  Refresh2,
  Send2,
  CloseCircle,
  GalleryAdd,
  Like1,
  Dislike,
} from "iconsax-react";
import { siteConfig } from "@/app/lib/site-config";

type Vote = "up" | "down";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  image?: string;
  error?: boolean;
  vote?: Vote;
};

type ClientImage = { mime: string; data: string };

const INTRO_ID = 1;

const INTRO: Message = {
  id: INTRO_ID,
  role: "assistant",
  content: "Hi, I'm the Kurchu AI assistant. Tell me about the project you're planning or any questions you have about our services.",
};

const STARTERS = [
  "Do you build e-commerce sites?",
  "What are your starting prices?",
  "How does your SEO process work?",
];

/** Photos are sent to the model as a JPEG no wider than 1280px. */
async function shrinkImage(file: File): Promise<ClientImage | undefined> {
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

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INTRO]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [slow, setSlow] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  /* The message box grows with its text, up to about six lines, then
     scrolls inside itself. Empty, it is always one line — the placeholder
     never sets the height. Runs after every keystroke and after a send
     clears the box. */
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    const MAX = 160;
    el.style.height = "auto";
    const next = input ? Math.min(el.scrollHeight, MAX) : 40;
    el.style.height = `${next}px`;
    el.style.overflowY = input && el.scrollHeight > MAX ? "auto" : "hidden";
  }, [input, open]);

  useEffect(() => {
    if (!open || (messages.length === 1 && !pending)) return;
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, pending, open]);

  /* Any page can open Noor without holding a reference to this component:
     dispatch `noor:open` on window (see components/itqan/AskNoor.tsx). */
  useEffect(() => {
    const openFromPage = () => setOpen(true);
    window.addEventListener("noor:open", openFromPage);
    return () => window.removeEventListener("noor:open", openFromPage);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  // A long wait says so in words, so a slow answer never reads as a dead chat.
  // The flag is cleared where a request starts (not here), so the effect only
  // schedules the timer and never sets state synchronously.
  useEffect(() => {
    if (!pending) return;
    const timer = window.setTimeout(() => setSlow(true), 6000);
    return () => window.clearTimeout(timer);
  }, [pending]);

  const reset = () => {
    setMessages([INTRO]);
    setInput("");
  };

  const requestReply = async (nextMessages: Message[], image?: ClientImage) => {
    setSlow(false);
    setPending(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
          image,
        }),
      });
      const data = (await response.json()) as { reply?: string; error?: string };

      setMessages((current) => [
        ...current,
        {
          id: nextId.current++,
          role: "assistant",
          content: response.ok && data.reply
            ? data.reply
            : data.error ?? "I’m unavailable right now. Please try again.",
          error: !response.ok,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: nextId.current++,
          role: "assistant",
          content: "I’m unavailable right now. Please try again or contact us on WhatsApp.",
          error: true,
        },
      ]);
    } finally {
      setPending(false);
    }
  };

  const send = async (suggestion?: string) => {
    const content = (suggestion ?? input).trim();
    if (!content || pending) return;

    const userMessage: Message = {
      id: nextId.current++,
      role: "user",
      content: content.slice(0, 600),
    };
    const nextMessages = [...messages.filter((message) => !message.error), userMessage];
    setMessages(nextMessages);
    setInput("");
    await requestReply(nextMessages);
  };

  const sendPhoto = async (file: File) => {
    if (pending) return;
    const preview = URL.createObjectURL(file);
    const userMessage: Message = {
      id: nextId.current++,
      role: "user",
      content: file.name,
      image: preview,
    };
    const nextMessages = [...messages.filter((message) => !message.error), userMessage];
    setMessages(nextMessages);
    const image = await shrinkImage(file);
    await requestReply(nextMessages, image);
  };

  const vote = (id: number, choice: Vote) => {
    setMessages((current) => current.map((message) => (message.id === id ? { ...message, vote: choice } : message)));
  };

  return (
    <div className="fixed bottom-[6.75rem] right-4 z-50 lg:bottom-6 lg:right-6">
      {open && (
        <>
          {/* Scrim on phones only, where the sheet covers the page anyway. */}
          <button
            type="button"
            aria-label="Close assistant"
            onClick={() => setOpen(false)}
            className="animate-in fade-in fixed inset-0 z-50 bg-ink/20 lg:hidden"
          />
          <section
            id="al-tareeq-chat"
            role="dialog"
            aria-labelledby="al-tareeq-chat-title"
            className="animate-in slide-in-from-bottom fixed inset-x-0 bottom-0 z-50 flex h-[92dvh] flex-col rounded-t-[28px] border border-line bg-bg pb-[env(safe-area-inset-bottom)] duration-300 lg:inset-x-auto lg:bottom-4 lg:right-4 lg:top-4 lg:h-auto lg:w-[440px] lg:rounded-[28px] lg:pb-0 lg:fade-in lg:slide-in-from-bottom-0 lg:slide-in-from-right-4"
          >
            <span aria-hidden className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-line lg:hidden" />

            <header className="flex items-center justify-between gap-3 px-6 pb-3 pt-3 lg:px-7 lg:pt-6">
              <div className="min-w-0">
                <h2 id="al-tareeq-chat-title" className="font-sans truncate text-[16px] font-semibold leading-tight text-ink">
                  Kurchu AI
                </h2>
                <p className="mt-0.5 text-[12px] text-muted">AI assistant</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={reset}
                  aria-label="Start again"
                  className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
                >
                  <Refresh2 size={20} color="currentColor" variant="Outline" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close assistant"
                  className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
                >
                  <CloseCircle size={20} color="currentColor" variant="Outline" />
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-4 lg:px-7" role="log" aria-live="polite" aria-busy={pending}>
              <ol className="flex flex-col gap-6">
                {messages.map((message) =>
                  message.role === "user" ? (
                    <li key={message.id} className="max-w-[82%] self-end">
                      {message.image ? (
                        // eslint-disable-next-line @next/next/no-img-element -- local object URL from the visitor's own file
                        <img src={message.image} alt="" className="w-40 rounded-[16px] object-cover" />
                      ) : (
                        <p className="whitespace-pre-wrap rounded-[20px] bg-surface px-4 py-2.5 text-[15px] leading-relaxed text-ink">
                          {message.content}
                        </p>
                      )}
                    </li>
                  ) : (
                    <li key={message.id} className="max-w-[94%]">
                      <p
                        className={
                          message.error
                            ? "whitespace-pre-wrap text-[16px] leading-relaxed text-danger"
                            : "whitespace-pre-wrap text-[16px] leading-relaxed text-ink"
                        }
                      >
                        {message.content}
                      </p>
                      {message.id !== INTRO_ID && !message.error ? (
                        <div className="mt-1.5 flex gap-0.5 text-muted">
                          {(["up", "down"] as const).map((choice) =>
                            message.vote && message.vote !== choice ? null : (
                              <button
                                key={choice}
                                type="button"
                                disabled={!!message.vote}
                                onClick={() => vote(message.id, choice)}
                                aria-label={choice === "up" ? "Helpful" : "Not helpful"}
                                aria-pressed={message.vote === choice}
                                className="grid size-8 place-items-center rounded-full transition-colors hover:bg-surface hover:text-ink disabled:hover:bg-transparent"
                              >
                                {choice === "up" ? (
                                  <Like1
                                    size={16}
                                    color="currentColor"
                                    variant={message.vote === choice ? "Bold" : "Outline"}
                                    className={message.vote === choice ? "text-ink" : ""}
                                  />
                                ) : (
                                  <Dislike
                                    size={16}
                                    color="currentColor"
                                    variant={message.vote === choice ? "Bold" : "Outline"}
                                    className={message.vote === choice ? "text-ink" : ""}
                                  />
                                )}
                              </button>
                            ),
                          )}
                        </div>
                      ) : null}
                    </li>
                  ),
                )}

                {messages.length === 1 ? (
                  <li className="flex flex-wrap gap-2">
                    {STARTERS.map((starter) => (
                      <button
                        key={starter}
                        type="button"
                        onClick={() => void send(starter)}
                        className="inline-flex min-h-9 items-center rounded-full bg-surface px-3.5 text-[14px] font-medium text-ink transition-colors hover:bg-accent-soft"
                      >
                        {starter}
                      </button>
                    ))}
                  </li>
                ) : null}

                {pending ? (
                  <li>
                    <span aria-hidden className="flex h-6 items-center gap-1.5">
                      <span className="chat-dot size-1.5 rounded-full bg-ink-muted" />
                      <span className="chat-dot size-1.5 rounded-full bg-ink-muted" />
                      <span className="chat-dot size-1.5 rounded-full bg-ink-muted" />
                    </span>
                    <p className="sr-only">Assistant is typing…</p>
                    {slow && <p className="mt-1 text-[13px] leading-relaxed text-muted">Still working on your answer…</p>}
                  </li>
                ) : null}
              </ol>
              <div ref={endRef} />
            </div>

            <div className="px-4 pb-4 lg:px-5 lg:pb-5">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  void send();
                }}
                /* Grows upward with the message, like ChatGPT's composer: the
                   buttons stay on the bottom line, and the radius is a soft
                   28px rather than a pill so several lines still look right. */
                className="flex items-end gap-1 rounded-[1.75rem] bg-surface p-1.5 focus-within:ring-2 focus-within:ring-ink/15"
              >
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  aria-label="Add a photo"
                  className="grid size-10 shrink-0 place-items-center rounded-full text-muted transition-colors hover:text-ink"
                >
                  <GalleryAdd size={20} color="currentColor" variant="Outline" />
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) void sendPhoto(file);
                    event.target.value = "";
                  }}
                />
                <label htmlFor="chat-message" className="sr-only">Message</label>
                <textarea
                  ref={inputRef}
                  id="chat-message"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void send();
                    }
                  }}
                  rows={1}
                  maxLength={600}
                  placeholder="Ask about websites or pricing…"
                  className="min-h-10 flex-1 resize-none overflow-y-hidden bg-transparent px-1 py-2 text-[15px] leading-6 text-ink outline-none placeholder:text-muted"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || pending}
                  aria-label="Send message"
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-white transition-opacity disabled:opacity-30"
                >
                  <Send2 size={20} color="currentColor" variant="Outline" />
                </button>
              </form>
              <p className="mt-2 px-1 text-center text-label text-muted">
                AI can make mistakes. For a confirmed quote,{" "}
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9+]/g, '')}`}
                  target="_blank"
                  rel="noopener"
                  className="text-ink underline underline-offset-2"
                >
                  WhatsApp our team
                </a>
                .
              </p>
            </div>
          </section>
        </>
      )}

      {!open && (
        <>
          {/* Phones open Noor from the sticky action bar (MobileActionBar),
              so there is no floating bubble over the page below lg. */}
          {/* Desktop: labelled pill. */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded="false"
            aria-controls="al-tareeq-chat"
            className="btn-press hidden h-12 items-center gap-2 rounded-full bg-[#0b1220] px-5 text-[14px] font-semibold text-white transition-transform hover:-translate-y-0.5 lg:inline-flex"
          >
            <MessageText size={20} color="currentColor" variant="Outline" />
            Ask AI
          </button>
        </>
      )}
    </div>
  );
}
