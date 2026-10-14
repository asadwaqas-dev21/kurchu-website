/** ──────────────────────────────────────────────
 *  Abuse protection for API routes that spend money (Gemini) or send email
 *  (Resend). Cheapest checks first:
 *   1. Same-origin: browsers always send Origin on a fetch POST, so a request
 *      with none, or from another site, did not come from these pages.
 *   2. Per-IP sliding-window rate limit. It lives in memory, so on Vercel it
 *      holds per function instance only — a brake, not a hard quota. For a
 *      hard limit, add a Vercel Firewall rate-limit rule on /api/*.
 * ──────────────────────────────────────────────*/

const buckets = new Map<string, number[]>();
const MAX_TRACKED_KEYS = 5_000;

export type RateRule = { limit: number; windowMs: number };

export const RATE_LIMITS = {
  /** Far above a real conversation; caps Gemini spend from one connection. */
  chatMessage: { limit: 30, windowMs: 10 * 60_000 },
  /** Briefs the assistant may email to the team from one connection. */
  chatBrief: { limit: 3, windowMs: 60 * 60_000 },
  /** New AI app cost estimates (cached repeats are free and not counted); each is a longer model call. */
  estimate: { limit: 4, windowMs: 10 * 60_000 },
} satisfies Record<string, RateRule>;

export function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return (forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown").trim();
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** Records a hit for `key`; false once the key is over its limit for the window. */
export function takeRateLimit(key: string, { limit, windowMs }: RateRule) {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) {
    buckets.set(key, recent);
    return false;
  }
  recent.push(now);
  buckets.set(key, recent);
  if (buckets.size > MAX_TRACKED_KEYS) {
    const oldest = buckets.keys().next().value;
    if (oldest !== undefined) buckets.delete(oldest);
  }
  return true;
}
