/**
 * Progressive-enhancement layer for the premium-app-development page.
 *
 * The page markup is rendered on the server; `initPremiumPage` attaches the
 * scroll, motion, estimator, FAQ and inquiry-dialog behaviour to it and
 * returns a cleanup function (so React Strict Mode / client navigation can
 * mount it repeatedly without leaking listeners).
 */

import { enquiryMailto, enquiryWhatsApp, submitEnquiry } from "@/app/lib/enquiry";

type Preset = Record<string, string | string[] | undefined>;

type InquiryState = {
  type: string | null;
  platform: string | null;
  need: string[];
  stage: string | null;
  budget: string | null;
  timeline: string | null;
  [key: string]: string | string[] | null;
};

type Step = {
  key: string;
  title: string;
  hint: string;
  kind: "single" | "multi" | "form";
  opts?: Array<[string, string?]>;
};

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

const STEPS: Step[] = [
  { key: "type", title: "What are you building?", hint: "Pick the closest — we'll refine it together.", kind: "single", opts: [["New mobile app", "A product that doesn't exist yet"], ["Existing app upgrade", "Modernise, rebuild or extend"], ["MVP", "The smallest version that proves it"], ["Business platform", "Apps, admin and integrations"], ["Not sure yet", "Help me figure it out"]] },
  { key: "platform", title: "Which platforms?", hint: "“Not decided” is a perfectly good answer.", kind: "single", opts: [["iOS"], ["Android"], ["Both"], ["Not decided"]] },
  { key: "need", title: "What do you need from us?", hint: "Select everything that applies.", kind: "multi", opts: [["Strategy", "Discovery, scope, roadmap"], ["UX/UI", "Research, flows, visual design"], ["Development", "iOS, Android, cross-platform"], ["Backend", "APIs, data, integrations"], ["Full product team", "End to end, one team"]] },
  { key: "stage", title: "Where is the project today?", hint: "So we know where to start.", kind: "single", opts: [["Idea", "A clear problem, no designs yet"], ["Wireframes", "Rough flows exist"], ["Design ready", "High-fidelity designs done"], ["Existing product", "Live in the stores"]] },
  { key: "budget", title: "Approximate budget?", hint: "Helps us propose the right shape of team. Shared in confidence.", kind: "single", opts: [["Under $25k"], ["$25k – $60k"], ["$60k – $150k"], ["$150k+"], ["Not sure yet"]] },
  { key: "timeline", title: "Ideal timeline?", hint: "When would you like to start?", kind: "single", opts: [["As soon as possible", "Within 4 weeks"], ["1–3 months"], ["3–6 months"], ["Just exploring"]] },
  { key: "contact", title: "Last step — where should we reply?", hint: "A senior member of the team replies within one working day.", kind: "form" },
];

const LEVELS = ["Lean", "Medium", "Substantial", "Complex"];
const TIMELINES = ["6–10 weeks", "12–18 weeks", "18–28 weeks", "28+ weeks, released in phases"];
const TEAMS = [
  "Product lead, designer, 2 engineers",
  "Product lead, designer, 2–3 engineers, QA",
  "Product lead, 2 designers, 4 engineers, QA",
  "Dedicated squad of 7–9 across product, design, mobile, backend and QA",
];
const STARTS: Record<string, string> = {
  idea: "2-week discovery sprint",
  design: "1-week design & technical review",
  existing: "2-week code & UX audit",
};

export function initPremiumPage(root: HTMLElement): () => void {
  const $ = <T extends HTMLElement = HTMLElement>(selector: string, ctx: ParentNode = root) =>
    ctx.querySelector<T>(selector);
  const $$ = <T extends HTMLElement = HTMLElement>(selector: string, ctx: ParentNode = root) =>
    Array.from(ctx.querySelectorAll<T>(selector));

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const disposers: Array<() => void> = [];
  const listen = <K extends keyof HTMLElementEventMap>(
    target: EventTarget,
    type: K | string,
    handler: (e: never) => void,
    options?: AddEventListenerOptions,
  ) => {
    target.addEventListener(type, handler as EventListener, options);
    disposers.push(() => target.removeEventListener(type, handler as EventListener, options));
  };
  const timers = new Set<number>();
  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      timers.delete(id);
      fn();
    }, ms);
    timers.add(id);
    return id;
  };
  const observe = (observer: IntersectionObserver, elements: Element[]) => {
    elements.forEach((el) => observer.observe(el));
    disposers.push(() => observer.disconnect());
  };

  // SMIL path animation (the Move map) can't be paused with CSS.
  if (reduce) $$<HTMLElement>("svg").forEach((s) => (s as unknown as SVGSVGElement).pauseAnimations?.());

  /* ---------- Navigation ---------- */
  const nav = $("#nav")!;
  const toggle = $("#navToggle")!;
  const drawer = $("#drawer")!;
  drawer.inert = true;

  function setNav(open: boolean) {
    root.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    drawer.setAttribute("aria-hidden", String(!open));
    drawer.inert = !open;
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) $("a", drawer)?.focus({ preventScroll: true });
  }
  listen(toggle, "click", () => setNav(!root.classList.contains("nav-open")));
  $$("a", drawer).forEach((a) => listen(a, "click", () => setNav(false)));
  listen(window, "resize", () => {
    if (window.innerWidth > 1024 && root.classList.contains("nav-open")) setNav(false);
  });

  // On the one-page homepage the current link follows the section in view;
  // inner pages mark their own link on the server (data-page on #nav).
  if (!nav.dataset.page) {
    const navLinks = $$<HTMLAnchorElement>(".nav-links a[data-section]");
    observe(
      new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            navLinks.forEach((a) => a.classList.toggle("is-current", a.dataset.section === e.target.id));
          });
        },
        { rootMargin: "-45% 0px -50% 0px" },
      ),
      navLinks.map((a) => document.getElementById(a.dataset.section!)).filter((el): el is HTMLElement => !!el),
    );
  }

  /* ---------- Reveals ---------- */
  const pipeItems = $$("#pipe li");
  const finishPipeline = () => pipeItems.forEach((li) => { li.classList.remove("run"); li.classList.add("done"); });
  function runPipeline() {
    if (reduce) return finishPipeline();
    pipeItems.forEach((li, k) => {
      later(() => li.classList.add("run"), 300 + k * 520);
      later(() => { li.classList.remove("run"); li.classList.add("done"); }, 300 + k * 520 + 440);
    });
  }
  const revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        revealIO.unobserve(e.target);
        if (e.target.id === "health") runPipeline();
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );
  observe(revealIO, $$("[data-reveal],[data-case],#health,#arch").filter((el) => !el.classList.contains("is-in")));
  disposers.push(finishPipeline);

  if (!root.classList.contains("is-loaded")) later(() => root.classList.add("is-loaded"), 80);

  // Every optional section below registers what it needs to do on scroll / resize.
  const onScrollFns: Array<(y: number) => void> = [];
  const onResizeFns: Array<() => void> = [];

  /* ---------- Hero motion (homepage) ---------- */
  const hero = $("#top");
  const rig = $("#stageRig");
  const stage = $("#heroStage");
  if (hero && rig && stage) {
    const small = window.matchMedia("(max-width: 640px)");
    let heroVisible = true;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    let pointerActive = false;
    let heroFrame = 0;

    const heroLoop = (t: number) => {
      heroFrame = 0;
      if (!heroVisible || reduce) return;
      if (!pointerActive) {
        tx = Math.sin(t / 4200) * 0.22;
        ty = Math.cos(t / 5300) * 0.14;
      }
      cx += (tx - cx) * 0.055;
      cy += (ty - cy) * 0.055;
      const base = small.matches ? [6, -12, 0] : [7, -16, 1.5];
      rig.style.transform = `rotateX(${(base[0] - cy * 7).toFixed(3)}deg) rotateY(${(base[1] + cx * 12).toFixed(3)}deg) rotateZ(${base[2]}deg)`;
      heroFrame = requestAnimationFrame(heroLoop);
    };
    observe(
      new IntersectionObserver((entries) => {
        heroVisible = entries[0].isIntersecting;
        if (heroVisible && !reduce && !heroFrame) heroFrame = requestAnimationFrame(heroLoop);
      }),
      [hero],
    );
    disposers.push(() => cancelAnimationFrame(heroFrame));
    if (!reduce) {
      listen(hero, "pointermove", (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        pointerActive = true;
        const r = hero.getBoundingClientRect();
        tx = (e.clientX - r.left) / r.width - 0.5;
        ty = (e.clientY - r.top) / r.height - 0.5;
      });
      listen(hero, "pointerleave", () => { pointerActive = false; tx = 0; ty = 0; });
      onScrollFns.push((y) => {
        if (y <= window.innerHeight * 1.2) stage.style.transform = `translate3d(0,${(y * 0.1).toFixed(1)}px,0)`;
      });
    }
  }

  /* ---------- Services ---------- */
  const svcs = $$(".svc");
  const svcPreview = $("#svcPreview");
  const pvs = svcPreview ? $$(".pv", svcPreview) : [];
  let svcActive = 0;
  const showPv = (i: number) => pvs.forEach((p, k) => p.classList.toggle("is-active", k === i));
  function setSvc(i: number) {
    svcActive = i;
    svcs.forEach((s, k) => {
      const on = k === i;
      s.classList.toggle("is-active", on);
      $(".svc-btn", s)!.setAttribute("aria-expanded", String(on));
    });
    if (i >= 0) showPv(i);
  }
  svcs.forEach((s, i) => {
    const b = $(".svc-btn", s)!;
    listen(b, "click", () => setSvc(s.classList.contains("is-active") ? -1 : i));
    if (fine) listen(b, "mouseenter", () => showPv(i));
  });
  const svcList = $("#svcList");
  if (fine && svcList) listen(svcList, "mouseleave", () => { if (svcActive >= 0) showPv(svcActive); });

  /* ---------- Idea → product ---------- */
  const i2p = $("#idea");
  if (i2p) {
    const evLayers = $$(".ev-l", i2p);
    const i2pBtns = $$(".i2p-step", i2p);
    const artifacts = $$("#i2pArtifact .a", i2p);
    const i2pMobN = $("#i2pMobN", i2p)!, i2pMobT = $("#i2pMobT", i2p)!, i2pMobD = $("#i2pMobD", i2p)!;
    let i2pCur = -1;
    onScrollFns.push(() => {
      const r = i2p.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      if (r.bottom < -100 || r.top > window.innerHeight + 100) return;
      const p = clamp(-r.top / total, 0, 1);
      i2p.style.setProperty("--p", p.toFixed(4));
      const s = Math.min(5, Math.floor(p * 6));
      if (s === i2pCur) return;
      i2pCur = s;
      i2p.setAttribute("data-stage", String(s));
      evLayers.forEach((l) => l.classList.toggle("on", Number(l.getAttribute("data-i")) <= s));
      i2pBtns.forEach((b, k) => {
        b.classList.toggle("is-active", k === s);
        b.setAttribute("aria-current", k === s ? "step" : "false");
      });
      artifacts.forEach((a, k) => a.classList.toggle("on", k === s));
      const btn = i2pBtns[s];
      if (btn) {
        i2pMobN.textContent = `0${s + 1} / 06`;
        i2pMobT.textContent = $(".t", btn)!.lastChild!.textContent;
        i2pMobD.textContent = $(".d span", btn)!.textContent;
      }
    });
    onResizeFns.push(() => { i2pCur = -1; });
    i2pBtns.forEach((b, k) =>
      listen(b, "click", () => {
        const top = i2p.getBoundingClientRect().top + window.scrollY;
        const total = i2p.offsetHeight - window.innerHeight;
        window.scrollTo({ top: top + (total * (k + 0.5)) / 6, behavior: reduce ? "auto" : "smooth" });
      }),
    );
  }

  /* ---------- Gallery ---------- */
  const gallery = $("#gallery");
  const track = $("#gTrack");
  if (gallery && track) {
    onScrollFns.push(() => {
      if (reduce || window.innerWidth <= 640) { track.style.transform = ""; return; }
      const r = gallery.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const p = clamp((window.innerHeight - r.top) / (window.innerHeight + r.height), 0, 1);
      const max = Math.max(0, track.scrollWidth - window.innerWidth);
      track.style.transform = `translate3d(${(-max * p).toFixed(1)}px,0,0)`;
    });
  }

  /* ---------- Process ---------- */
  const procList = $("#procList");
  if (procList) {
    const steps = $$(".step", procList);
    const procFill = $("#procFill", procList)!;
    const procCur = $("#procCur")!, procName = $("#procName")!, procDel = $("#procDel")!, procDelD = $("#procDelD")!;
    const segs = $$("#procSegs i");
    let procIdx = 0;
    const setProc = (i: number) => {
      if (i === procIdx) return;
      procIdx = i;
      steps.forEach((s, k) => { s.classList.toggle("is-active", k === i); s.classList.toggle("is-past", k < i); });
      segs.forEach((s, k) => s.classList.toggle("on", k <= i));
      procCur.textContent = String(i + 1).padStart(2, "0");
      procName.textContent = $("h3", steps[i])!.textContent;
      procDel.textContent = steps[i].getAttribute("data-del");
      procDelD.textContent = steps[i].getAttribute("data-deld");
      [procCur, procName, procDel].forEach((el) => {
        el.classList.remove("flash");
        void el.offsetWidth;
        el.classList.add("flash");
      });
    };
    observe(
      new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) setProc(steps.indexOf(e.target as HTMLElement)); }),
        { rootMargin: "-42% 0px -52% 0px" },
      ),
      steps,
    );
    onScrollFns.push(() => {
      const r = procList.getBoundingClientRect();
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
      const p = clamp((window.innerHeight * 0.5 - r.top) / r.height, 0, 1);
      procFill.style.transform = `scaleY(${p.toFixed(4)})`;
    });
  }

  /* ---------- Mobile sticky CTA ---------- */
  const mcta = $("#mcta");
  if (mcta) {
    const finalSection = $("#contact");
    onScrollFns.push((y) => {
      const beforeFinal = !finalSection || finalSection.getBoundingClientRect().top > window.innerHeight * 0.6;
      mcta.classList.toggle("is-visible", y > window.innerHeight * 0.7 && beforeFinal);
    });
  }

  /* ---------- Scroll (single rAF-throttled handler) ---------- */
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 12);
    onScrollFns.forEach((fn) => fn(y));
  }
  let ticking = false;
  listen(window, "scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { onScroll(); ticking = false; });
  }, { passive: true });
  listen(window, "resize", () => { onResizeFns.forEach((fn) => fn()); onScroll(); });
  onScroll();

  /* ---------- Inquiry dialog ---------- */
  const modal = $("#inquiry")!;
  const form = $<HTMLFormElement>("#inqForm")!;
  const btnNext = $<HTMLButtonElement>("#dlgNext")!;
  const btnBack = $<HTMLButtonElement>("#dlgBack")!;
  const foot = $("#dlgFoot")!;
  const bar = $("#dlgBar")!;
  const stepLabel = $("#dlgStep")!;
  const inertTargets = () => ["#main", "#nav", ".footer", "#mcta"].map((s) => $(s)).filter((el): el is HTMLElement => !!el);

  let state: InquiryState = { type: null, platform: null, need: [], stage: null, budget: null, timeline: null };
  let cur = 0;
  let lastFocus: HTMLElement | null = null;
  let advanceTimer = 0;

  function buildForm() {
    form.innerHTML = STEPS.map((s, i) => {
      if (s.kind === "form") {
        return (
          `<div class="qstep" data-i="${i}" role="group" aria-labelledby="qh${i}"><h3 class="qh" id="qh${i}" tabindex="-1">${s.title}</h3><p class="qhint">${s.hint}</p>` +
          '<div class="fields">' +
          '<div class="field"><label for="f-name">Name <i>*</i></label><input id="f-name" name="name" autocomplete="name" placeholder="Your name" required><span class="msg" aria-live="polite"></span></div>' +
          '<div class="field"><label for="f-email">Email <i>*</i></label><input id="f-email" name="email" type="email" autocomplete="email" placeholder="you@company.com" required><span class="msg" aria-live="polite"></span></div>' +
          '<div class="field full"><label for="f-company">Company</label><input id="f-company" name="company" autocomplete="organization" placeholder="Company or project name"></div>' +
          '<div class="field full"><label for="f-details">Project details</label><textarea id="f-details" name="details" placeholder="What are you building, who is it for, and what does success look like?"></textarea></div>' +
          "</div></div>"
        );
      }
      const type = s.kind === "multi" ? "checkbox" : "radio";
      const options = (s.opts ?? [])
        .map(
          (o) =>
            `<label class="qopt${s.kind === "multi" ? " multi" : ""}"><input type="${type}" name="${s.key}" value="${escapeHtml(o[0])}"><span><span>${o[0]}${o[1] ? `<small>${o[1]}</small>` : ""}</span></span></label>`,
        )
        .join("");
      return `<fieldset class="qstep" data-i="${i}"><legend class="qh" tabindex="-1">${s.title}</legend><p class="qhint">${s.hint}</p><div class="qopts">${options}</div></fieldset>`;
    }).join("");

    // Picking with a pointer advances automatically; keyboard users confirm with Enter / Continue.
    $$<HTMLInputElement>("input[type=radio]", form).forEach((input) => {
      input.addEventListener("change", () => { state[input.name] = input.value; syncNext(); });
      input.closest("label")!.addEventListener("pointerup", () => {
        clearTimeout(advanceTimer);
        advanceTimer = window.setTimeout(() => {
          if (state[input.name] && cur < STEPS.length - 1) go(cur + 1);
        }, 360);
      });
    });
    $$<HTMLInputElement>("input[type=checkbox]", form).forEach((input) =>
      input.addEventListener("change", () => {
        state.need = $$<HTMLInputElement>("input[name=need]:checked", form).map((x) => x.value);
        syncNext();
      }),
    );
  }

  function answered(i: number) {
    const s = STEPS[i];
    if (s.kind === "multi") return state.need.length > 0;
    if (s.kind === "single") return !!state[s.key];
    return true;
  }
  const syncNext = () => { btnNext.disabled = !answered(cur); };

  function go(i: number, focus = true) {
    const dir = i < cur ? -1 : 1;
    cur = i;
    $$(".qstep", form).forEach((el, k) => {
      el.classList.remove("back");
      el.classList.toggle("is-active", k === i);
      if (k === i && dir < 0) el.classList.add("back");
    });
    stepLabel.textContent = `Step ${i + 1} of ${STEPS.length}`;
    bar.style.width = `${((i + 1) / STEPS.length) * 100}%`;
    btnBack.style.visibility = i === 0 ? "hidden" : "visible";
    btnNext.firstChild!.nodeValue = i === STEPS.length - 1 ? "Send inquiry " : "Continue ";
    syncNext();
    form.scrollTop = 0;
    if (focus) $(".qstep.is-active .qh", form)?.focus({ preventScroll: true });
  }

  function validate() {
    let ok = true;
    const rules: Array<[string, (v: string) => boolean, string]> = [
      ["f-name", (v) => v.trim().length > 1, "Please add your name."],
      ["f-email", (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()), "Please enter a valid email."],
    ];
    rules.forEach(([id, test, message]) => {
      const input = $<HTMLInputElement>(`#${id}`, form)!;
      const field = input.closest(".field")!;
      const good = test(input.value);
      field.classList.toggle("err", !good);
      $(".msg", field as HTMLElement)!.textContent = good ? "" : message;
      input.setAttribute("aria-invalid", String(!good));
      if (!good && ok) { input.focus(); ok = false; }
    });
    return ok;
  }

  async function submit() {
    if (!validate()) return;
    const value = (id: string) => $<HTMLInputElement>(`#${id}`, form)!.value.trim();
    const data = {
      type: state.type, platform: state.platform, need: state.need, stage: state.stage, budget: state.budget, timeline: state.timeline,
      name: value("f-name"), email: value("f-email"), company: value("f-company"), details: value("f-details"),
    };
    // Send to /api/inquiry; if that fails, hand the brief to the visitor's email app.
    const enquiry = {
      name: data.name,
      email: data.email,
      company: data.company,
      details: data.details,
      answers: [
        ["Building", data.type],
        ["Platforms", data.platform],
        ["Needs", data.need],
        ["Stage", data.stage],
        ["Budget", data.budget],
        ["Timeline", data.timeline],
      ] as Array<[string, string | string[] | null]>,
    };
    const chips = ([data.type, data.platform, data.stage, data.budget, data.timeline, ...data.need] as Array<string | null>)
      .filter((c): c is string => !!c)
      .map((c) => `<span class="chip">${escapeHtml(c)}</span>`)
      .join("");
    btnNext.disabled = true;
    btnNext.firstChild!.nodeValue = "Sending… ";
    const delivered = await submitEnquiry(enquiry);
    btnNext.disabled = false;
    const firstName = escapeHtml(data.name.split(" ")[0]);
    const tick = '<div class="done" role="status"><div class="done-ic"><svg viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></svg></div>';
    if (delivered) {
      form.innerHTML =
        tick +
        `<h3 class="qh" tabindex="-1">Thank you, ${firstName} — we have your brief.</h3>` +
        `<p class="qhint">A senior member of the team will reply to <strong style="color:var(--text);font-weight:500">${escapeHtml(data.email)}</strong> within one working day with a few questions and suggested times for a call.</p>` +
        `<div class="done-sum">${chips}</div></div>`;
      foot.style.display = "none";
      bar.style.width = "100%";
      stepLabel.textContent = "Received";
      $(".qh", form)!.focus();
      return;
    }
    form.innerHTML =
      tick +
      `<h3 class="qh" tabindex="-1">Your brief is ready, ${firstName}.</h3>` +
      `<p class="qhint">Your email app should have opened with everything filled in — press <strong style="color:var(--text);font-weight:500">send</strong> and a senior member of the team will reply within one working day. If it didn't open, send it on WhatsApp instead.</p>` +
      `<div class="done-sum">${chips}</div>` +
      `<p style="margin-top:24px"><a class="btn btn-primary btn-sm" href="${enquiryWhatsApp(enquiry)}" target="_blank" rel="noopener">Send on WhatsApp</a></p></div>`;
    window.location.href = enquiryMailto(enquiry);
    foot.style.display = "none";
    bar.style.width = "100%";
    stepLabel.textContent = "Ready to send";
    $(".qh", form)!.focus();
  }

  listen(btnNext, "click", () => {
    if (cur === STEPS.length - 1) return submit();
    if (answered(cur)) go(cur + 1);
  });
  listen(btnBack, "click", () => { if (cur > 0) go(cur - 1); });

  function openInquiry(preset: Preset | null, trigger: HTMLElement | null) {
    if (root.classList.contains("nav-open")) setNav(false);
    lastFocus = trigger ?? (document.activeElement as HTMLElement | null);
    state = { type: null, platform: null, need: [], stage: null, budget: null, timeline: null };
    buildForm();
    foot.style.display = "";
    Object.entries(preset ?? {}).forEach(([key, val]) => {
      if (val === undefined) return;
      if (key === "details") { $<HTMLTextAreaElement>("#f-details", form)!.value = String(val); return; }
      if (key === "need" && Array.isArray(val)) {
        state.need = [...val];
        val.forEach((v) => { const input = form.querySelector<HTMLInputElement>(`input[name="need"][value="${v}"]`); if (input) input.checked = true; });
        return;
      }
      state[key] = val as string;
      const input = form.querySelector<HTMLInputElement>(`input[name="${key}"][value="${val}"]`);
      if (input) input.checked = true;
    });
    go(0, false);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.documentElement.style.overflow = "hidden";
    inertTargets().forEach((el) => (el.inert = true));
    later(() => $(".qstep.is-active .qh", form)?.focus({ preventScroll: true }), 60);
  }
  function closeInquiry() {
    if (!modal.classList.contains("is-open")) return;
    clearTimeout(advanceTimer);
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
    inertTargets().forEach((el) => (el.inert = false));
    lastFocus?.focus?.({ preventScroll: true });
  }
  disposers.push(() => {
    clearTimeout(advanceTimer);
    closeInquiry();
    setNav(false);
  });

  listen(root, "click", (e: MouseEvent) => {
    const target = e.target as Element;
    const opener = target.closest<HTMLElement>("[data-open-inquiry]");
    if (opener) {
      e.preventDefault();
      let preset: Preset | null = null;
      try {
        const raw = opener.getAttribute("data-preset");
        preset = raw ? JSON.parse(raw) : null;
      } catch {
        preset = null;
      }
      openInquiry(preset, opener);
      return;
    }
    if (target.closest("[data-close]") && modal.contains(target)) closeInquiry();
  });

  listen(document, "keydown", (e: KeyboardEvent) => {
    const modalOpen = modal.classList.contains("is-open");
    if (e.key === "Escape") {
      if (modalOpen) closeInquiry();
      else if (root.classList.contains("nav-open")) { setNav(false); toggle.focus(); }
    }
    if (!modalOpen) return;
    const el = e.target as HTMLElement;
    if (e.key === "Enter" && el.tagName !== "TEXTAREA" && el.tagName !== "BUTTON" && foot.style.display !== "none") {
      e.preventDefault();
      if (!btnNext.disabled) btnNext.click();
    }
    if (e.key === "Tab") {
      const focusable = $$<HTMLElement>('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])', $(".dialog", modal)!).filter(
        (n) => !(n as HTMLButtonElement).disabled && n.offsetParent !== null && getComputedStyle(n).visibility !== "hidden",
      );
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && (document.activeElement === first || !modal.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- Estimator ---------- */
  const estForm = $<HTMLFormElement>("#estForm");
  if (estForm) {
    const scopeEl = $("#estScope")!;
    let lastLevel = -1;
    let estState = { platform: "both", stage: "idea", complexity: "mvp", feats: [] as string[], level: 0 };

    const estimate = () => {
      const fd = new FormData(estForm);
      const platform = String(fd.get("platform"));
      const stage = String(fd.get("stage"));
      const complexity = String(fd.get("complexity"));
      const feats = fd.getAll("feat").map(String);

      const stageWeight: Record<string, number> = { idea: 2, design: 0, existing: 1.5 };
      const complexityWeight: Record<string, number> = { mvp: 0, standard: 3, advanced: 6 };
      const featWeight: Record<string, number> = { auth: 0.5, payments: 1.5, maps: 1.5, chat: 2, push: 0.5, admin: 2, subs: 1.5 };
      let score = (platform === "both" ? 2 : 1) + stageWeight[stage] + complexityWeight[complexity];
      feats.forEach((f) => (score += featWeight[f] ?? 0));
      const level = score <= 4.5 ? 0 : score <= 8.5 ? 1 : score <= 12.5 ? 2 : 3;

      const notes: string[] = [];
      if (platform === "both" && complexity !== "advanced") notes.push("One cross-platform codebase (Flutter or React Native) could cover both stores efficiently.");
      if (platform === "both" && complexity === "advanced") notes.push("At this ambition, native iOS and Android builds are likely worth the investment.");
      if (feats.includes("payments")) notes.push("Payments via Stripe keep card data out of your PCI scope.");
      if (feats.includes("chat")) notes.push("Chat implies realtime infrastructure and moderation tooling.");
      if (feats.includes("admin")) notes.push("An admin panel is a second product — we'd scope it on its own.");
      if (feats.includes("subs")) notes.push("Subscriptions need App Store and Play billing plus receipt validation.");
      if (feats.includes("maps")) notes.push("Live location needs battery and accuracy testing on real devices.");
      if (stage === "existing") notes.push("We'd start by auditing what to keep — rewrites are rarely the answer.");

      scopeEl.innerHTML = level === 1 ? "<em>Medium</em>" : LEVELS[level];
      if (level !== lastLevel) {
        scopeEl.classList.remove("flash");
        void scopeEl.offsetWidth;
        scopeEl.classList.add("flash");
        lastLevel = level;
      }
      $$("#estMeter i").forEach((i, k) => i.classList.toggle("on", k <= level));
      $("#estTime")!.textContent = TIMELINES[level];
      $("#estTeam")!.textContent = TEAMS[level];
      $("#estStart")!.textContent = STARTS[stage];
      $("#estNotes")!.innerHTML = notes.slice(0, 3).map((n) => `<li>${n}</li>`).join("");
      $("#featCount")!.textContent = `${feats.length} selected`;
      estState = { platform, stage, complexity, feats, level };
    };
    listen(estForm, "submit", (e: Event) => e.preventDefault());
    listen(estForm, "change", estimate);
    estimate();
    listen($("#estCta")!, "click", (e: MouseEvent) => {
      const platformLabel: Record<string, string> = { ios: "iOS", android: "Android", both: "Both" };
      const stageLabel: Record<string, string> = { idea: "Idea", design: "Design ready", existing: "Existing product" };
      const type = estState.stage === "existing" ? "Existing app upgrade" : estState.complexity === "mvp" ? "MVP" : "New mobile app";
      openInquiry(
        {
          type,
          platform: platformLabel[estState.platform],
          stage: stageLabel[estState.stage],
          details: `Estimator: ${LEVELS[estState.level]} scope. Features: ${estState.feats.join(", ") || "none selected"}.`,
        },
        e.currentTarget as HTMLElement,
      );
    });
  }

  /* ---------- FAQ ---------- */
  $$(".faq-item").forEach((item) => {
    const q = $(".faq-q", item)!;
    listen(q, "click", () => {
      const open = !item.classList.contains("is-open");
      item.classList.toggle("is-open", open);
      q.setAttribute("aria-expanded", String(open));
    });
  });

  /* ---------- Micro-interactions ---------- */
  if (fine && !reduce) {
    $$("[data-magnetic]").forEach((el) => {
      listen(el, "pointermove", (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.16;
        const y = (e.clientY - r.top - r.height / 2) * 0.26;
        el.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
      });
      listen(el, "pointerleave", () => { el.style.translate = "0px 0px"; });
    });
    $$("[data-par]").forEach((el) => {
      listen(el, "pointermove", (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        el.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      });
      listen(el, "pointerleave", () => { el.style.setProperty("--mx", "0"); el.style.setProperty("--my", "0"); });
    });
  }

  return () => {
    timers.forEach((id) => clearTimeout(id));
    timers.clear();
    // Run in reverse so the dialog/nav reset happens before listeners are removed.
    [...disposers].reverse().forEach((dispose) => dispose());
    document.documentElement.style.overflow = "";
  };
}
