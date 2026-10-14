/** ──────────────────────────────────────────────
 *  First-year cost of an app — build price plus what it costs to run.
 *
 *  Calculated in the browser from the tables below (no AI, no server).
 *  Store fees are the real published amounts; hosting, service add-ons and
 *  maintenance plans are DRAFT ranges in USD to confirm before launch.
 * ──────────────────────────────────────────────*/
import type { FeatureKey, Platform } from "./estimator";

type Range = [number, number];

/** Monthly active users → typical hosting/backend cost per month, and how much usage-based services scale. */
export const USER_TIERS: Array<{ value: string; label: string; hint: string; hosting: Range; scale: number }> = [
  { value: "500", label: "Up to 500", hint: "Launch & pilot", hosting: [0, 10], scale: 0.2 },
  { value: "5k", label: "Up to 5,000", hint: "Early traction", hosting: [20, 60], scale: 1 },
  { value: "25k", label: "Up to 25,000", hint: "Growing", hosting: [60, 200], scale: 3 },
  { value: "100k", label: "Up to 100,000", hint: "Scaling", hosting: [200, 600], scale: 8 },
];

/** Usage-based services some features need, per month at ~5,000 users (scaled by tier). */
const SERVICES: Array<{ label: string; features: FeatureKey[]; monthly: Range }> = [
  { label: "Maps & location services", features: ["maps", "tracking"], monthly: [10, 40] },
  { label: "Real-time chat service", features: ["chat"], monthly: [10, 30] },
  { label: "Video hosting & streaming", features: ["streaming"], monthly: [20, 100] },
  { label: "AI model usage", features: ["ai"], monthly: [10, 50] },
  { label: "SMS & email sending", features: ["email_sms"], monthly: [10, 40] },
  { label: "Photo & file storage", features: ["media"], monthly: [5, 20] },
];

export const PLANS: Array<{ value: string; label: string; hint: string; monthly: Range }> = [
  { value: "none", label: "No plan", hint: "Pay per fix", monthly: [0, 0] },
  { value: "essential", label: "Essential care", hint: "Fixes & OS updates", monthly: [60, 120] },
  { value: "growth", label: "Growth", hint: "Plus new features", monthly: [180, 360] },
];

const APPLE_YEARLY = 99; // Apple Developer Program
const GOOGLE_ONCE = 25; // Google Play registration

const onIos = (platform: Platform) => platform !== "android";
const onAndroid = (platform: Platform) => platform !== "ios";
const round = (value: number) => (value < 100 ? Math.round(value) : Math.round(value / 10) * 10);

export type CostLine = { label: string; note: string; low: number; high: number };

export function firstYearCost(opts: {
  build: { low: number; high: number };
  platform: Platform;
  features: FeatureKey[];
  users: string;
  plan: string;
}) {
  const tier = USER_TIERS.find((t) => t.value === opts.users) ?? USER_TIERS[0];
  const plan = PLANS.find((p) => p.value === opts.plan) ?? PLANS[0];
  const monthly: CostLine[] = [
    { label: "Hosting & backend", note: "per month", low: tier.hosting[0], high: tier.hosting[1] },
    ...SERVICES.filter((service) => service.features.some((key) => opts.features.includes(key))).map((service) => ({
      label: service.label,
      note: "per month",
      low: round(service.monthly[0] * tier.scale),
      high: round(service.monthly[1] * tier.scale),
    })),
    ...(plan.monthly[1] ? [{ label: `Maintenance — ${plan.label}`, note: "per month, optional", low: plan.monthly[0], high: plan.monthly[1] }] : []),
  ];
  const oneOff: CostLine[] = [
    { label: "Building the app", note: "one-off", low: opts.build.low, high: opts.build.high },
    ...(onIos(opts.platform) ? [{ label: "Apple Developer Program", note: "per year", low: APPLE_YEARLY, high: APPLE_YEARLY }] : []),
    ...(onAndroid(opts.platform) ? [{ label: "Google Play registration", note: "one-time", low: GOOGLE_ONCE, high: GOOGLE_ONCE }] : []),
  ];
  const perMonth = { low: monthly.reduce((s, l) => s + l.low, 0), high: monthly.reduce((s, l) => s + l.high, 0) };
  const yearOne = {
    low: oneOff.reduce((s, l) => s + l.low, 0) + perMonth.low * 12,
    high: oneOff.reduce((s, l) => s + l.high, 0) + perMonth.high * 12,
  };
  return { oneOff, monthly, perMonth, yearOne };
}
