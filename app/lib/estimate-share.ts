/** ──────────────────────────────────────────────
 *  Shareable estimates — no database, no AI.
 *
 *  An estimate is packed into the link's #fragment (compressed with the
 *  browser's own CompressionStream). The fragment never reaches the server, so
 *  sharing costs nothing and stays private between the people holding the link.
 *  Opening a link validates every field and recalculates prices from the
 *  pricing table, so an edited link can't show made-up numbers.
 * ──────────────────────────────────────────────*/
import { DESIGNS, PLATFORMS, getFeature, priceFor, type Design, type FeatureKey, type Platform } from "./estimator";

export type Range = { low: number; high: number; weeks: [number, number] };

export type Estimate = {
  name: string;
  summary: string;
  improvements: string[];
  features: Array<{ key: FeatureKey; label: string; phase: "mvp" | "later"; reason: string; low: number; high: number }>;
  platform: Platform;
  platformLabel: string;
  platformReason: string;
  design: Design;
  advice: string[];
  questions: string[];
  mvp: Range;
  full: Range;
};

/** What travels in the link — text and choices only; prices are always recalculated. */
type Packed = {
  v: 1;
  n: string;
  s: string;
  f: Array<[string, "m" | "l", string]>;
  p: string;
  r: string;
  d: string;
  i: string[];
  a: string[];
  q: string[];
};

const text = (value: unknown, max: number) => (typeof value === "string" ? value.slice(0, max) : "");
const texts = (value: unknown, count: number, max: number) =>
  (Array.isArray(value) ? value : []).map((item) => text(item, max)).filter(Boolean).slice(0, count);

/** Full estimate from validated parts: labels and prices come from the pricing table. */
export function buildEstimate(parts: {
  name: string;
  summary: string;
  features: Array<{ key: FeatureKey; phase: "mvp" | "later"; reason: string }>;
  platform: Platform;
  platformReason: string;
  design: Design;
  improvements: string[];
  advice: string[];
  questions: string[];
}): Estimate {
  const features = parts.features.map((f) => {
    const feature = getFeature(f.key)!;
    return { key: feature.key, label: feature.label, phase: f.phase, reason: f.reason, low: feature.low, high: feature.high };
  });
  const mvpKeys = features.filter((f) => f.phase === "mvp").map((f) => f.key);
  return {
    ...parts,
    features,
    platformLabel: PLATFORMS.find((p) => p.value === parts.platform)!.label,
    mvp: priceFor(mvpKeys, parts.platform, parts.design),
    full: priceFor(features.map((f) => f.key), parts.platform, parts.design),
  };
}

/** The compact form stored in share links (also used to pre-build links for the App Ideas pages). */
export function packEstimate(e: Estimate): Packed {
  return {
    v: 1,
    n: e.name,
    s: e.summary,
    f: e.features.map((f) => [f.key, f.phase === "later" ? "l" : "m", f.reason]),
    p: e.platform,
    r: e.platformReason,
    d: e.design,
    i: e.improvements,
    a: e.advice,
    q: e.questions,
  };
}

/** Rejects anything malformed; keeps only known features, platforms and designs. */
function unpack(raw: unknown): Estimate | null {
  if (!raw || typeof raw !== "object") return null;
  const data = raw as Record<string, unknown>;
  if (data.v !== 1 || !Array.isArray(data.f)) return null;
  const seen = new Set<string>();
  const features = data.f
    .filter((item): item is [string, string, string] => Array.isArray(item) && typeof item[0] === "string")
    .filter(([key]) => getFeature(key) && !seen.has(key) && seen.add(key))
    .slice(0, 14)
    .map(([key, phase, reason]) => ({ key: key as FeatureKey, phase: phase === "l" ? ("later" as const) : ("mvp" as const), reason: text(reason, 200) }));
  if (!features.length) return null;
  if (!features.some((f) => f.phase === "mvp")) features[0].phase = "mvp";
  const platform = PLATFORMS.some((p) => p.value === data.p) ? (data.p as Platform) : "cross-platform";
  const design = DESIGNS.some((d) => d.value === data.d) ? (data.d as Design) : "template";
  return buildEstimate({
    name: text(data.n, 60) || "Your app",
    summary: text(data.s, 600),
    features,
    platform,
    platformReason: text(data.r, 240),
    design,
    improvements: texts(data.i, 5, 240),
    advice: texts(data.a, 4, 240),
    questions: texts(data.q, 3, 200),
  });
}

/* ── base64url <-> bytes ─────────────────────── */
const toBase64Url = (bytes: Uint8Array) => {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};
const fromBase64Url = (value: string) => {
  const binary = atob(value.replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
};

async function transform(bytes: Uint8Array, stream: CompressionStream | DecompressionStream) {
  const output = new Blob([bytes as BlobPart]).stream().pipeThrough(stream);
  return new Uint8Array(await new Response(output).arrayBuffer());
}

const MAX_CODE_LENGTH = 12_000;

/** "z" + deflate when the browser supports it, otherwise "j" + plain JSON — both base64url. */
export async function encodeEstimate(e: Estimate) {
  const json = new TextEncoder().encode(JSON.stringify(packEstimate(e)));
  if (typeof CompressionStream !== "undefined") {
    return `z${toBase64Url(await transform(json, new CompressionStream("deflate-raw")))}`;
  }
  return `j${toBase64Url(json)}`;
}

export async function decodeEstimate(code: string): Promise<Estimate | null> {
  if (!code || code.length > MAX_CODE_LENGTH) return null;
  try {
    const kind = code[0];
    let bytes = fromBase64Url(code.slice(1));
    if (kind === "z") {
      if (typeof DecompressionStream === "undefined") return null;
      bytes = await transform(bytes, new DecompressionStream("deflate-raw"));
    } else if (kind !== "j") {
      return null;
    }
    return unpack(JSON.parse(new TextDecoder().decode(bytes)));
  } catch {
    return null;
  }
}

/** The link for an estimate on the estimator page. */
export async function shareUrl(e: Estimate) {
  return `${window.location.origin}/app-cost-estimator#e=${await encodeEstimate(e)}`;
}

export const sharedCodeFromHash = (hash: string) => new URLSearchParams(hash.replace(/^#/, "")).get("e") ?? "";
