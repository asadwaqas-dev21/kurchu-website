"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DocumentDownload, Link21, TickCircle, Whatsapp } from "iconsax-react";
import { enquiryMailto, submitEnquiry, type EnquiryFields } from "@/app/lib/enquiry";
import { decodeEstimate, shareUrl, sharedCodeFromHash, type Estimate, type Range } from "@/app/lib/estimate-share";
import { DESIGNS, MAX_IDEA_CHARS, PLATFORMS, formatUsd, getFeature, type BudgetFit as Fit, type Design, type FeatureKey, type Platform } from "@/app/lib/estimator";
import { siteConfig } from "@/app/lib/site-config";
import { AppWireframes } from "./AppWireframes";
import { BudgetFit } from "./BudgetFit";
import { RunningCosts } from "./RunningCosts";
import { Arr } from "./ui";

const EXAMPLES = [
  { label: "Salon booking", idea: "A booking app for my hair salon: clients pick a stylist and time slot, pay a deposit, and get reminders before the appointment." },
  { label: "Bakery ordering", idea: "An app for a local bakery where customers order cakes ahead, choose pickup or delivery, and collect loyalty points." },
  { label: "Fitness coaching", idea: "A fitness coaching app where trainers share weekly workout plans and clients log progress and chat with their coach." },
];

const price = (r: Range) => `${formatUsd(r.low)} – ${formatUsd(r.high)}`;
const weeks = (r: Range) => `${r.weeks[0]}–${r.weeks[1]} weeks`;

/** Plain-text estimate, attached to the brief the visitor sends to the team. */
function estimateText(idea: string, e: Estimate, fit: Fit | null) {
  const line = (f: Estimate["features"][number]) => `- ${f.label} (${formatUsd(f.low)}–${formatUsd(f.high)})`;
  return [
    ...(idea ? [`Idea: ${idea}`, ""] : []),
    `${e.name}: ${e.summary}`,
    "",
    `Estimated first release (MVP): ${price(e.mvp)}, ${weeks(e.mvp)}`,
    `Estimated full product: ${price(e.full)}, ${weeks(e.full)}`,
    `Platform: ${e.platformLabel} · Design: ${DESIGNS.find((d) => d.value === e.design)?.label}`,
    "",
    "MVP features:",
    ...e.features.filter((f) => f.phase === "mvp").map(line),
    "Later features:",
    ...e.features.filter((f) => f.phase === "later").map(line),
    ...(fit
      ? [
          "",
          `Visitor's budget: ${formatUsd(fit.budget)} → scope estimated ${formatUsd(fit.low)}–${formatUsd(fit.high)} (${PLATFORMS.find((p) => p.value === fit.platform)?.label})`,
          `In budget: ${fit.keys.map((k) => getFeature(k)?.label).join(", ")}`,
          ...(fit.deferred.length ? [`Moved to version 2: ${fit.deferred.map((k) => getFeature(k)?.label).join(", ")}`] : []),
        ]
      : []),
  ].join("\n");
}

export function IdeaEstimator() {
  const [idea, setIdea] = useState("");
  const [platform, setPlatform] = useState<Platform | "unsure">("unsure");
  const [design, setDesign] = useState<Design>("template");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [sendState, setSendState] = useState<"idle" | "invalid" | "sending" | "sent" | "failed">("idle");
  const [contact, setContact] = useState({ name: "", email: "" });
  const [shared, setShared] = useState(false);
  const [shareState, setShareState] = useState<"idle" | "copied" | "failed">("idle");
  const [budgetFit, setBudgetFit] = useState<Fit | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // A shared link carries the whole estimate in its #fragment: decode it locally — no AI, no server.
  useEffect(() => {
    const load = async () => {
      const code = sharedCodeFromHash(window.location.hash);
      if (!code) return;
      const decoded = await decodeEstimate(code);
      if (!decoded) {
        setState("error");
        setMessage("That share link looks incomplete. Ask for the link again, or describe your own idea below.");
        return;
      }
      setEstimate(decoded);
      setShared(true);
      setState("done");
      window.requestAnimationFrame(() => resultRef.current?.scrollIntoView({ block: "start" }));
    };
    load();
    window.addEventListener("hashchange", load);
    return () => window.removeEventListener("hashchange", load);
  }, []);

  const clearShared = () => {
    setShared(false);
    setEstimate(null);
    setState("idle");
    window.history.replaceState(null, "", window.location.pathname);
    document.getElementById("ie-idea")?.focus();
  };

  // WhatsApp's share screen lets the visitor pick any chat — themselves, a partner or a co-founder.
  const shareWhatsApp = async () => {
    if (!estimate) return;
    const url = await shareUrl(estimate);
    const text = `${estimate.name} — app estimate from Kurchu: ${formatUsd(estimate.mvp.low)}–${formatUsd(estimate.mvp.high)} for the first release.\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  };

  const share = async () => {
    if (!estimate) return;
    try {
      const url = await shareUrl(estimate);
      window.history.replaceState(null, "", url);
      // Phones get the native share sheet; desktops copy the link.
      if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
        await navigator.share({ title: `${estimate.name} — app estimate`, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
      setShareState("copied");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return; // share sheet dismissed
      setShareState("failed");
    }
    window.setTimeout(() => setShareState("idle"), 3000);
  };

  const run = async (event: React.FormEvent) => {
    event.preventDefault();
    if (idea.trim().length < 20 || state === "loading") {
      setState("error");
      setMessage("Please describe your idea in a sentence or two — who it's for and what it does.");
      return;
    }
    setState("loading");
    setMessage("");
    setSendState("idle");
    if (shared) {
      setShared(false);
      window.history.replaceState(null, "", window.location.pathname);
    }
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: idea.trim(), platform: platform === "unsure" ? undefined : platform, design }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; result?: Estimate; message?: string; error?: string };
      if (res.ok && data.ok && data.result) {
        setEstimate(data.result);
        setState("done");
        window.requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
      } else {
        setEstimate(null);
        setState("error");
        setMessage(data.message || data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setState("error");
      setMessage("We couldn't reach the estimator. Check your connection and try again.");
    }
  };

  const brief = (): EnquiryFields | null =>
    estimate
      ? {
          name: contact.name.trim(),
          email: contact.email.trim(),
          details: estimateText(idea.trim(), estimate, budgetFit),
          answers: [["Source", "AI app cost estimator"]],
        }
      : null;

  const sendToTeam = async (event: React.FormEvent) => {
    event.preventDefault();
    const fields = brief();
    if (!fields || fields.name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email)) {
      setSendState("invalid");
      return;
    }
    setSendState("sending");
    setSendState((await submitEnquiry(fields)) ? "sent" : "failed");
  };

  const mvp = estimate?.features.filter((f) => f.phase === "mvp") ?? [];
  const later = estimate?.features.filter((f) => f.phase === "later") ?? [];
  // Memoised so the budget slider sees stable lists between renders.
  const mvpKeys = useMemo(() => estimate?.features.filter((f) => f.phase === "mvp").map((f) => f.key as FeatureKey) ?? [], [estimate]);
  const laterKeys = useMemo(() => estimate?.features.filter((f) => f.phase === "later").map((f) => f.key as FeatureKey) ?? [], [estimate]);
  const fields = brief();

  return (
    <>
      <form className="ie-form" onSubmit={run} noValidate>
        <div className="field full">
          <label htmlFor="ie-idea">
            Your app idea <i>*</i>
          </label>
          <textarea
            id="ie-idea"
            rows={5}
            maxLength={MAX_IDEA_CHARS}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Who is it for, what problem does it solve, and what should people be able to do in the app?"
            aria-describedby="ie-idea-help"
          />
          <p id="ie-idea-help" className="ie-help">
            <span>The more you describe, the more accurate the estimate.</span>
            <span className="mono">
              {idea.length}/{MAX_IDEA_CHARS}
            </span>
          </p>
          {!idea && (
            <div className="ie-examples">
              <span className="label">Try an example</span>
              {EXAMPLES.map((example) => (
                <button key={example.label} type="button" className="ak-starter" onClick={() => setIdea(example.idea)}>
                  {example.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <fieldset className="ie-choice">
          <legend className="label">Platforms</legend>
          <div className="seg ie-seg">
            {[{ value: "unsure", label: "Not sure", hint: "We'll recommend" }, ...PLATFORMS].map((option) => (
              <label className="opt" key={option.value}>
                <input type="radio" name="platform" value={option.value} checked={platform === option.value} onChange={() => setPlatform(option.value as Platform | "unsure")} />
                <span>
                  {option.label}
                  <small>{option.hint}</small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="ie-choice">
          <legend className="label">Design</legend>
          <div className="seg ie-seg">
            {DESIGNS.map((option) => (
              <label className="opt" key={option.value}>
                <input type="radio" name="design" value={option.value} checked={design === option.value} onChange={() => setDesign(option.value)} />
                <span>
                  {option.label}
                  <small>{option.hint}</small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="ie-submit">
          <button type="submit" className="btn btn-primary" disabled={state === "loading"}>
            {state === "loading" ? "Analysing your idea…" : "Estimate my app"} <Arr />
          </button>
          {state === "error" && (
            <p className="ie-error" role="alert">
              {message}
            </p>
          )}
          {state === "loading" && <p className="ie-wait">Reading your idea, choosing features and pricing them — about 10 seconds.</p>}
        </div>
      </form>

      {state === "done" && estimate && (
        <div className="ie-result" ref={resultRef} aria-live="polite">
          <div className="ie-print-head" aria-hidden="true">
            <b>Kurchu Software Solutions</b>
            <span>
              App estimate · {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {siteConfig.url.replace("https://", "")} ·{" "}
              {siteConfig.contact.email}
            </span>
          </div>
          {shared && (
            <div className="ie-shared">
              <span>
                <b>Shared estimate.</b> Someone sent you this plan — prices are from Kurchu&apos;s current pricing table.
              </span>
              <button type="button" className="ak-starter" onClick={clearShared}>
                Estimate your own idea
              </button>
            </div>
          )}
          <div className="ie-top">
            <div className="ie-idea">
              <span className="label">Your idea, sharpened</span>
              <h3>{estimate.name}</h3>
              <p>{estimate.summary}</p>
            </div>
            <div className="ie-price">
              <span className="label">Estimated first release (MVP)</span>
              <p className="ie-amount">{price(estimate.mvp)}</p>
              <p className="ie-sub">{weeks(estimate.mvp)} · {estimate.platformLabel}</p>
              {later.length > 0 && (
                <p className="ie-full">
                  Full product with later features: <b>{price(estimate.full)}</b> · {weeks(estimate.full)}
                </p>
              )}
              {estimate.platformReason && <p className="ie-why">{estimate.platformReason}</p>}
              <p className="ie-note">Indicative estimate from our pricing table — not a quote. A fixed price follows a short discovery call.</p>
            </div>
          </div>

          <div className="ie-actions">
            <button type="button" className="btn btn-ghost btn-sm" onClick={share}>
              {shareState === "copied" ? <TickCircle size={17} variant="Bold" color="currentColor" /> : <Link21 size={17} variant="Linear" color="currentColor" />}
              {shareState === "copied" ? "Link copied" : shareState === "failed" ? "Couldn't copy — try again" : "Copy share link"}
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={shareWhatsApp}>
              <Whatsapp size={17} variant="Linear" color="currentColor" />
              Send to WhatsApp
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => window.print()}>
              <DocumentDownload size={17} variant="Linear" color="currentColor" />
              Download PDF
            </button>
            <span className="ie-actions-note">The link holds the whole estimate — anyone can open it, no sign-up.</span>
          </div>

          <BudgetFit
            key={`${estimate.name}|${estimate.platform}|${estimate.design}|${mvpKeys.join()}|${laterKeys.join()}`}
            mvp={mvpKeys} later={laterKeys} platform={estimate.platform} design={estimate.design} onChange={setBudgetFit} />

          <div className="ie-wire">
            <div className="ie-wire-head">
              <span className="label">{budgetFit ? `Your app at ${formatUsd(budgetFit.budget)}` : "Your app, sketched"}</span>
              <p>Rough wireframes drawn from your feature list — screenshot them and share. The real design comes later.</p>
            </div>
            <AppWireframes name={estimate.name} features={budgetFit ? budgetFit.keys : mvpKeys} />
          </div>

          <div className="ie-features">
            {[
              { title: "First release (MVP)", items: mvp },
              { title: "Add later", items: later },
            ]
              .filter((group) => group.items.length)
              .map((group) => (
                <div className="ie-group" key={group.title}>
                  <h4 className="label">{group.title}</h4>
                  <ul>
                    {group.items.map((feature) => (
                      <li key={feature.key}>
                        <div>
                          <b>{feature.label}</b>
                          <span>{feature.reason}</span>
                        </div>
                        <span className="mono">
                          {formatUsd(feature.low)}–{formatUsd(feature.high)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>

          <RunningCosts
            build={budgetFit ?? estimate.mvp}
            platform={budgetFit?.platform ?? estimate.platform}
            features={budgetFit?.keys ?? mvpKeys}
          />

          <div className="mk-grid ie-notes">
            {[
              { title: "Make the idea stronger", items: estimate.improvements },
              { title: "Advice for launch", items: estimate.advice },
              { title: "We'd ask you", items: estimate.questions },
            ]
              .filter((column) => column.items.length)
              .map((column) => (
                <div className="mk-col" key={column.title}>
                  <h3>{column.title}</h3>
                  <ul>
                    {column.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>

          <form className="ie-send" onSubmit={sendToTeam} noValidate>
            <div>
              <h3>Get a fixed price for this plan</h3>
              <p>Send this estimate to the team. A senior person replies by email within one working day — no obligation.</p>
            </div>
            {sendState === "sent" ? (
              <p className="ie-sent" role="status">
                Sent. We&apos;ll reply to {contact.email} within one working day.
              </p>
            ) : (
              <>
                <div className="fields">
                  <div className="field">
                    <label htmlFor="ie-name">Name</label>
                    <input id="ie-name" autoComplete="name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
                  </div>
                  <div className="field">
                    <label htmlFor="ie-email">Email</label>
                    <input id="ie-email" type="email" autoComplete="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
                  </div>
                </div>
                <div className="ie-submit">
                  <button type="submit" className="btn btn-primary" disabled={sendState === "sending"}>
                    {sendState === "sending" ? "Sending…" : "Send my estimate"} <Arr />
                  </button>
                  {sendState === "invalid" && (
                    <p className="ie-error" role="alert">
                      Please add your name and a valid email address.
                    </p>
                  )}
                  {sendState === "failed" && fields && (
                    <p className="ie-error" role="alert">
                      We couldn&apos;t send it just now. <a href={enquiryMailto(fields)}>Send it from your email app</a> instead.
                    </p>
                  )}
                </div>
              </>
            )}
          </form>
        </div>
      )}
    </>
  );
}
