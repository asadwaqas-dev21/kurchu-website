/** ──────────────────────────────────────────────
 *  How the site talks about price — one source, calculated from the pricing
 *  table in lib/estimator.ts. Change a price there and every FAQ, city page,
 *  the pricing page and Ask Kurchu follow, so nothing contradicts the
 *  estimator.
 * ──────────────────────────────────────────────*/
import { appIdeas } from "./app-ideas";
import { MIN_PRICE, formatUsd, priceFor, type FeatureKey } from "./estimator";

const firstRelease = (slug: string) => {
  const idea = appIdeas.find((i) => i.slug === slug);
  return idea ? priceFor(idea.mvp.map(([key]) => key as FeatureKey), "cross-platform", "template") : undefined;
};
const range = (r?: { low: number; high: number }) => (r ? `${formatUsd(r.low)}–${formatUsd(r.high)}` : "");

/** Mid-sentence clause — reads after "With us," or "With Kurchu,". */
export const PRICE_SCOPE = `prices start from ${formatUsd(MIN_PRICE)} and grow with the app's scope — every feature, platform and design choice adds a set amount from our published price table`;

/** Two concrete examples from the App Ideas plans, as a full sentence. */
export const PRICE_EXAMPLES = `For example, a salon booking app's first release is estimated at ${range(firstRelease("salon-booking-app"))}, and a food delivery app's at ${range(firstRelease("food-delivery-app"))}.`;

/** First-release timelines of every App Ideas plan (one codebase, ready-made design), shortest first. */
const mvpPlans = appIdeas
  .map((idea) => ({ idea, release: firstRelease(idea.slug)! }))
  .sort((a, b) => a.release.weeks[0] - b.release.weeks[0] || a.release.weeks[1] - b.release.weeks[1]);

/** "5–13 weeks" — the span of typical MVP timelines, from the price table. */
export const MVP_WEEKS = `${Math.min(...mvpPlans.map((p) => p.release.weeks[0]))}–${Math.max(...mvpPlans.map((p) => p.release.weeks[1]))} weeks`;

/** Table rows for "how long does an MVP take by app type": app, core features, weeks. */
export const MVP_TIMELINE_ROWS = mvpPlans.map(({ idea, release }) => [
  idea.name,
  `${idea.mvp.length} core features`,
  `${release.weeks[0]}–${release.weeks[1]} weeks`,
]);

/** Shortest and longest plans, for a one-sentence example. */
export const MVP_WEEKS_EXAMPLE = (() => {
  const first = mvpPlans[0];
  const last = mvpPlans[mvpPlans.length - 1];
  const weeks = (p: (typeof mvpPlans)[number]) => `${p.release.weeks[0]}–${p.release.weeks[1]} weeks`;
  return `For example, a ${first.idea.name.toLowerCase()} is estimated at ${weeks(first)}, and a ${last.idea.name.toLowerCase()} at ${weeks(last)}.`;
})();

/** "What does MVP development cost?" — from the same table. */
export const MVP_COST_ANSWER = `It depends on what the first release must do: ${PRICE_SCOPE}. ${PRICE_EXAMPLES} The App Ideas library lists MVP development cost for ${appIdeas.length} popular app types, and the AI estimator prices your own idea.`;

/** "What does booking app development cost?" — salon, clinic and cleaning plans. */
export const BOOKING_COST_ANSWER = `Booking app development with Kurchu is priced from our feature table: a salon booking app's first release is estimated at ${range(firstRelease("salon-booking-app"))}, a clinic appointment app at ${range(firstRelease("doctor-appointment-app"))} and a cleaning business app at ${range(firstRelease("cleaning-service-app"))}. Calendars, reminders and an admin dashboard are included; extras such as loyalty or reviews add to the price.`;
