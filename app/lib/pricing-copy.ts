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

/** "What does MVP development cost?" — from the same table. */
export const MVP_COST_ANSWER = `It depends on what the first release must do: ${PRICE_SCOPE}. ${PRICE_EXAMPLES} The App Ideas library lists MVP development cost for ${appIdeas.length} popular app types, and the AI estimator prices your own idea.`;

/** "What does booking app development cost?" — salon, clinic and cleaning plans. */
export const BOOKING_COST_ANSWER = `Booking app development with Kurchu is priced from our feature table: a salon booking app's first release is estimated at ${range(firstRelease("salon-booking-app"))}, a clinic appointment app at ${range(firstRelease("doctor-appointment-app"))} and a cleaning business app at ${range(firstRelease("cleaning-service-app"))}. Calendars, reminders and an admin dashboard are included; extras such as loyalty or reviews add to the price.`;
