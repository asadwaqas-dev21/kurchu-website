"use client";

import { useEffect, useMemo, useState } from "react";
import { PLATFORMS, fitToBudget, formatUsd, getFeature, priceFor, smallestScope, type BudgetFit as Fit, type Design, type FeatureKey, type Platform } from "@/app/lib/estimator";

const label = (key: FeatureKey) => getFeature(key)?.label ?? key;
const mid = (range: { low: number; high: number }) => (range.low + range.high) / 2;

/**
 * "What can I get for my budget?" — slides the estimate's scope to a budget,
 * entirely in the browser from the pricing table (no AI). Reports the fitted
 * scope up, or null while the visitor hasn't touched the slider.
 */
export function BudgetFit({
  mvp,
  later,
  platform,
  design,
  onChange,
}: {
  mvp: FeatureKey[];
  later: FeatureKey[];
  platform: Platform;
  design: Design;
  onChange: (fit: Fit | null) => void;
}) {
  const { min, max, step, recommended } = useMemo(() => {
    const full = mid(priceFor([...mvp, ...later], platform, design));
    const rec = mid(priceFor(mvp, platform, design));
    const stepSize = full > 3000 ? 50 : 10;
    const floor = Math.floor(smallestScope(mvp) / stepSize) * stepSize;
    const ceil = Math.max(floor + stepSize * 20, Math.ceil((full * 1.1) / stepSize) * stepSize);
    return { min: Math.max(stepSize, floor - stepSize * 4), max: ceil, step: stepSize, recommended: Math.round(rec / stepSize) * stepSize };
  }, [mvp, later, platform, design]);

  // The parent remounts this component (via `key`) for each new estimate, so it starts at that estimate's budget.
  const [budget, setBudget] = useState(recommended);
  const [touched, setTouched] = useState(false);

  const fit = useMemo(() => fitToBudget(budget, mvp, later, platform, design), [budget, mvp, later, platform, design]);

  useEffect(() => {
    onChange(touched ? fit : null);
  }, [fit, touched, onChange]);

  const percent = ((budget - min) / (max - min)) * 100;
  const platformLabel = PLATFORMS.find((p) => p.value === fit.platform)?.label ?? "";

  return (
    <div className="ie-budget">
      <div className="ie-budget-head">
        <div>
          <span className="label">Fit to my budget</span>
          <h3>What can I get for my budget?</h3>
          <p>Slide to your budget — the plan, price and wireframes adjust instantly.</p>
        </div>
        <output className="ie-budget-value" htmlFor="ie-budget">
          {formatUsd(budget)}
        </output>
      </div>

      <input
        id="ie-budget"
        type="range"
        className="ie-range"
        min={min}
        max={max}
        step={step}
        value={budget}
        style={{ "--fill": `${percent}%` } as React.CSSProperties}
        aria-valuetext={`${formatUsd(budget)} budget`}
        onChange={(event) => {
          setBudget(Number(event.target.value));
          setTouched(true);
        }}
      />
      <div className="ie-range-scale">
        <span>{formatUsd(min)}</span>
        {touched && (
          <button type="button" className="ie-reset" onClick={() => { setBudget(recommended); setTouched(false); }}>
            Back to recommended plan
          </button>
        )}
        <span>{formatUsd(max)}</span>
      </div>

      {touched && (
        <div className="ie-budget-result" aria-live="polite">
          {fit.fits ? (
            <p className="ie-budget-status">
              <b>{formatUsd(budget)}</b> covers a first release with {fit.keys.length} feature{fit.keys.length === 1 ? "" : "s"} — estimated{" "}
              <b>
                {formatUsd(fit.low)}–{formatUsd(fit.high)}
              </b>
              , {fit.weeks[0]}–{fit.weeks[1]} weeks · {platformLabel}.
            </p>
          ) : (
            <p className="ie-budget-status is-short">
              The smallest useful version of this app is about <b>{formatUsd(Math.round(mid(fit) / 10) * 10)}</b> — one core feature on one platform. Here&apos;s
              what that includes.
            </p>
          )}

          {fit.changes.length > 0 && (
            <ul className="ie-budget-changes">
              {fit.changes.map((change) => (
                <li key={change}>{change}</li>
              ))}
            </ul>
          )}

          <div className="ie-chips">
            {fit.keys.map((key) => (
              <span key={key} className={`ie-chip${fit.added.includes(key) ? " is-added" : ""}`}>
                {fit.added.includes(key) ? "+ " : ""}
                {label(key)}
              </span>
            ))}
            {fit.deferred.map((key) => (
              <span key={key} className="ie-chip is-out" title="Moves to version 2">
                {label(key)}
              </span>
            ))}
          </div>
          {fit.deferred.length > 0 && <p className="ie-budget-note">Crossed-out features move to version 2 — nothing is lost, it just comes later.</p>}
          {fit.next && (
            <p className="ie-budget-next">
              Add about <b>{formatUsd(fit.next.extra)}</b> to include <b>{label(fit.next.key)}</b>.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
