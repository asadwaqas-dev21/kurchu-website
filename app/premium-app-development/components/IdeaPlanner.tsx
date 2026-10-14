"use client";

import { useState } from "react";
import { formatUsd, priceFor, type BudgetFit as Fit, type FeatureKey } from "@/app/lib/estimator";
import { AppWireframes } from "./AppWireframes";
import { BudgetFit } from "./BudgetFit";
import { RunningCosts } from "./RunningCosts";

/**
 * Budget slider + wireframes for an App Ideas page. Runs entirely in the
 * browser from the pricing table — no AI and no server calls.
 */
export function IdeaPlanner({ sampleName, mvp, later }: { sampleName: string; mvp: FeatureKey[]; later: FeatureKey[] }) {
  const [fit, setFit] = useState<Fit | null>(null);
  return (
    <div className="ie-result" style={{ marginTop: 0 }}>
      <BudgetFit mvp={mvp} later={later} platform="cross-platform" design="template" onChange={setFit} />
      <div className="ie-wire">
        <div className="ie-wire-head">
          <span className="label">{fit ? `The app at ${formatUsd(fit.budget)}` : "The first release, sketched"}</span>
          <p>Rough wireframes of the first release — move the budget slider to see what changes.</p>
        </div>
        <AppWireframes name={sampleName} features={fit ? fit.keys : mvp} />
      </div>
      <RunningCosts build={fit ?? priceFor(mvp, "cross-platform", "template")} platform={fit?.platform ?? "cross-platform"} features={fit ? fit.keys : mvp} />
    </div>
  );
}
