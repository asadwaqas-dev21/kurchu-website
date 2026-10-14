/** ──────────────────────────────────────────────
 *  AI app cost estimator — the pricing table.
 *
 *  The AI only chooses features from this list and suggests a platform; the
 *  price is always calculated here, so the same features always give the same
 *  price and nothing the visitor types can change the numbers.
 *
 *  DRAFT FIGURES (USD): prices start from $100 as agreed. Every range below is
 *  a placeholder to confirm before launch — edit the numbers, not the logic.
 * ──────────────────────────────────────────────*/

export type FeatureKey =
  | "accounts"
  | "social_login"
  | "profiles"
  | "push"
  | "email_sms"
  | "roles"
  | "listings"
  | "search"
  | "cart_checkout"
  | "payments"
  | "subscriptions"
  | "booking"
  | "maps"
  | "tracking"
  | "chat"
  | "reviews"
  | "media"
  | "streaming"
  | "social"
  | "loyalty"
  | "admin"
  | "analytics"
  | "ai"
  | "languages"
  | "offline"
  | "integrations";

export type Feature = { key: FeatureKey; label: string; low: number; high: number; weeks: number };

/** Every app gets this: project setup, navigation, app icon, testing and store submission. */
export const FOUNDATION = { label: "App foundation & store launch", low: 100, high: 250, weeks: 1 };

export const FEATURES: Feature[] = [
  { key: "accounts", label: "Sign-up & login", low: 80, high: 200, weeks: 0.5 },
  { key: "social_login", label: "Google & Apple sign-in", low: 40, high: 100, weeks: 0.3 },
  { key: "profiles", label: "User profiles", low: 50, high: 120, weeks: 0.4 },
  { key: "push", label: "Push notifications", low: 50, high: 120, weeks: 0.4 },
  { key: "email_sms", label: "Email & SMS notifications", low: 60, high: 150, weeks: 0.4 },
  { key: "roles", label: "Multiple user roles", low: 150, high: 350, weeks: 0.8 },
  { key: "listings", label: "Product or service listings", low: 120, high: 300, weeks: 0.8 },
  { key: "search", label: "Search & filters", low: 80, high: 200, weeks: 0.5 },
  { key: "cart_checkout", label: "Cart & checkout", low: 150, high: 400, weeks: 1 },
  { key: "payments", label: "Online payments", low: 120, high: 300, weeks: 0.7 },
  { key: "subscriptions", label: "Subscriptions & memberships", low: 150, high: 350, weeks: 0.8 },
  { key: "booking", label: "Booking & scheduling", low: 150, high: 400, weeks: 1 },
  { key: "maps", label: "Maps & location", low: 100, high: 250, weeks: 0.6 },
  { key: "tracking", label: "Live order or delivery tracking", low: 200, high: 500, weeks: 1.2 },
  { key: "chat", label: "In-app chat", low: 200, high: 500, weeks: 1.2 },
  { key: "reviews", label: "Reviews & ratings", low: 60, high: 150, weeks: 0.4 },
  { key: "media", label: "Photo & video uploads", low: 80, high: 200, weeks: 0.5 },
  { key: "streaming", label: "Video or audio streaming", low: 300, high: 800, weeks: 1.5 },
  { key: "social", label: "Social feed, likes & sharing", low: 150, high: 400, weeks: 1 },
  { key: "loyalty", label: "Loyalty points & rewards", low: 120, high: 300, weeks: 0.7 },
  { key: "admin", label: "Admin dashboard (web)", low: 250, high: 700, weeks: 1.5 },
  { key: "analytics", label: "Analytics & reports", low: 120, high: 300, weeks: 0.7 },
  { key: "ai", label: "AI features (assistant, recommendations)", low: 250, high: 700, weeks: 1.5 },
  { key: "languages", label: "Multiple languages / Arabic RTL", low: 100, high: 250, weeks: 0.6 },
  { key: "offline", label: "Offline mode & sync", low: 150, high: 400, weeks: 1 },
  { key: "integrations", label: "Integrations (CRM, ERP, POS, other APIs)", low: 150, high: 400, weeks: 1 },
];

export const FEATURE_KEYS = FEATURES.map((feature) => feature.key);
const byKey = new Map(FEATURES.map((feature) => [feature.key, feature]));
export const getFeature = (key: string) => byKey.get(key as FeatureKey);

export type Platform = "ios" | "android" | "cross-platform" | "native-both";
export const PLATFORMS: Array<{ value: Platform; label: string; factor: number; hint: string }> = [
  { value: "cross-platform", label: "iOS + Android (one codebase)", factor: 1.25, hint: "Flutter or React Native" },
  { value: "native-both", label: "iOS + Android (native)", factor: 1.8, hint: "Swift and Kotlin" },
  { value: "ios", label: "iOS only", factor: 1, hint: "Swift" },
  { value: "android", label: "Android only", factor: 1, hint: "Kotlin" },
];

export type Design = "template" | "custom";
export const DESIGNS: Array<{ value: Design; label: string; factor: number; hint: string }> = [
  { value: "template", label: "Clean, ready-made design", factor: 1, hint: "Fastest, lowest cost" },
  { value: "custom", label: "Custom UI/UX design", factor: 1.3, hint: "Unique look, user research" },
];

export const MIN_PRICE = 100;

/** Longest idea a visitor can submit. */
export const MAX_IDEA_CHARS = 1500;

const round = (value: number) => (value < 1000 ? Math.round(value / 10) * 10 : Math.round(value / 50) * 50);

/** Price and timeline for a set of features, on a platform and design level. */
export function priceFor(keys: FeatureKey[], platform: Platform, design: Design) {
  const items = keys.flatMap((key) => byKey.get(key) ?? []);
  const factor = (PLATFORMS.find((p) => p.value === platform)?.factor ?? 1) * (DESIGNS.find((d) => d.value === design)?.factor ?? 1);
  const low = Math.max(MIN_PRICE, round((FOUNDATION.low + items.reduce((sum, f) => sum + f.low, 0)) * factor));
  const high = Math.max(low, round((FOUNDATION.high + items.reduce((sum, f) => sum + f.high, 0)) * factor));
  // Two platforms in parallel add testing time; a custom design adds a design phase.
  const weeks =
    (FOUNDATION.weeks + items.reduce((sum, f) => sum + f.weeks, 0)) * (platform === "native-both" ? 1.5 : platform === "cross-platform" ? 1.1 : 1) +
    (design === "custom" ? 1 : 0);
  return { low, high, weeks: [Math.max(1, Math.round(weeks)), Math.max(2, Math.ceil(weeks * 1.4))] as [number, number] };
}

export const formatUsd = (value: number) => `$${value.toLocaleString("en-US")}`;

/* ── Budget fitting ─────────────────────────────
 * Runs in the browser on the features an estimate already chose — no AI.
 * A scope "fits" when the middle of its price range is within the budget.
 */

/** Supporting features, dropped first (in this order) when a budget is tight. Anything not listed is core. */
const DROP_ORDER: FeatureKey[] = [
  "analytics",
  "loyalty",
  "reviews",
  "social_login",
  "languages",
  "email_sms",
  "offline",
  "integrations",
  "subscriptions",
  "media",
  "profiles",
  "search",
  "push",
  "admin",
  "maps",
  "roles",
  "payments",
  "accounts",
];

const midpoint = (range: { low: number; high: number }) => (range.low + range.high) / 2;
const isSingle = (platform: Platform) => platform === "ios" || platform === "android";

export type BudgetFit = {
  budget: number;
  keys: FeatureKey[];
  /** MVP features moved to a later version to fit. */
  deferred: FeatureKey[];
  /** "Later" features the budget can already include. */
  added: FeatureKey[];
  platform: Platform;
  design: Design;
  /** Plain-language changes made to fit, in the order applied. */
  changes: string[];
  low: number;
  high: number;
  weeks: [number, number];
  fits: boolean;
  /** The most valuable feature just out of reach, and roughly how much more it needs. */
  next?: { key: FeatureKey; extra: number };
};

/** Cheapest useful version: the most core feature, one platform, ready-made design. */
export function smallestScope(mvp: FeatureKey[]) {
  const core = mvp.find((key) => !DROP_ORDER.includes(key)) ?? mvp[mvp.length - 1];
  return midpoint(priceFor(core ? [core] : [], "android", "template"));
}

export function fitToBudget(budget: number, mvp: FeatureKey[], later: FeatureKey[], platform: Platform, design: Design): BudgetFit {
  let keys = [...mvp];
  let currentPlatform = platform;
  let currentDesign = design;
  const changes: string[] = [];
  const deferred: FeatureKey[] = [];
  const fits = () => midpoint(priceFor(keys, currentPlatform, currentDesign)) <= budget;

  // 1. Cheaper delivery choices before cutting anything users would notice.
  if (!fits() && currentDesign === "custom") {
    currentDesign = "template";
    changes.push("Ready-made design instead of a custom UI/UX");
  }
  if (!fits() && currentPlatform === "native-both") {
    currentPlatform = "cross-platform";
    changes.push("One codebase for iOS and Android instead of two native apps");
  }
  // 2. Supporting features, then one platform, then core features (least core first).
  const order = [...DROP_ORDER.filter((key) => keys.includes(key)), ...[...keys].reverse().filter((key) => !DROP_ORDER.includes(key))];
  for (const key of order) {
    if (fits() || keys.length <= 1) break;
    if (!DROP_ORDER.includes(key) && !isSingle(currentPlatform)) {
      currentPlatform = "android";
      changes.push("Launch on one platform first (Android), add iOS in version 2");
      if (fits()) break;
    }
    keys = keys.filter((k) => k !== key);
    deferred.push(key);
  }
  if (!fits() && !isSingle(currentPlatform)) {
    currentPlatform = "android";
    changes.push("Launch on one platform first (Android), add iOS in version 2");
  }

  // 3. Room to spare: bring "later" features forward, in the order the plan listed them.
  const added: FeatureKey[] = [];
  if (!deferred.length && !changes.length) {
    for (const key of later) {
      if (midpoint(priceFor([...keys, key], currentPlatform, currentDesign)) <= budget) {
        keys = [...keys, key];
        added.push(key);
      }
    }
  }

  const price = priceFor(keys, currentPlatform, currentDesign);
  const candidates = [...[...deferred].reverse(), ...later.filter((key) => !keys.includes(key))];
  const nextKey = candidates[0];
  const next = nextKey
    ? { key: nextKey, extra: Math.max(10, Math.ceil((midpoint(priceFor([...keys, nextKey], currentPlatform, currentDesign)) - budget) / 10) * 10) }
    : undefined;

  return {
    budget,
    keys,
    deferred,
    added,
    platform: currentPlatform,
    design: currentDesign,
    changes,
    low: price.low,
    high: price.high,
    weeks: price.weeks,
    fits: fits(),
    next,
  };
}
