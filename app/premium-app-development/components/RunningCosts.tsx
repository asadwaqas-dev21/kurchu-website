"use client";

import { useState } from "react";
import { formatUsd, type FeatureKey, type Platform } from "@/app/lib/estimator";
import { PLANS, USER_TIERS, firstYearCost, type CostLine } from "@/app/lib/running-costs";

const money = (low: number, high: number) => (low === high ? formatUsd(low) : `${formatUsd(low)} – ${formatUsd(high)}`);

/**
 * "What it really costs in year one" — build price plus running costs, from
 * the tables in lib/running-costs.ts. Runs in the browser; no AI, no server.
 */
export function RunningCosts({ build, platform, features }: { build: { low: number; high: number }; platform: Platform; features: FeatureKey[] }) {
  const [users, setUsers] = useState("500");
  const [plan, setPlan] = useState("none");
  const cost = firstYearCost({ build, platform, features, users, plan });

  const row = (line: CostLine) => (
    <tr key={line.label}>
      <th scope="row">{line.label}</th>
      <td>{money(line.low, line.high)}</td>
      <td>{line.note}</td>
    </tr>
  );

  return (
    <div className="ie-costs">
      <div>
        <span className="label">Running costs</span>
        <h3>What it really costs in year one</h3>
        <p>Building is only part of it. Here is everything you would pay in the first twelve months — most of it straight to providers, in your name.</p>
      </div>

      <fieldset className="ie-choice">
        <legend className="label">Monthly active users</legend>
        <div className="seg ie-seg">
          {USER_TIERS.map((tier) => (
            <label className="opt" key={tier.value}>
              <input type="radio" name="ie-users" checked={users === tier.value} onChange={() => setUsers(tier.value)} />
              <span>
                {tier.label}
                <small>{tier.hint}</small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="ie-choice">
        <legend className="label">Maintenance after launch</legend>
        <div className="seg ie-seg">
          {PLANS.map((option) => (
            <label className="opt" key={option.value}>
              <input type="radio" name="ie-plan" checked={plan === option.value} onChange={() => setPlan(option.value)} />
              <span>
                {option.label}
                <small>{option.hint}</small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="tbl-wrap">
        <table className="tbl ie-cost-tbl">
          <caption className="sr-only">Estimated first-year cost of the app</caption>
          <thead>
            <tr>
              <th scope="col">Cost</th>
              <th scope="col">Estimate</th>
              <th scope="col">How often</th>
            </tr>
          </thead>
          <tbody>
            {cost.oneOff.map(row)}
            {cost.monthly.map(row)}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Running cost after launch</th>
              <td>{money(cost.perMonth.low, cost.perMonth.high)}</td>
              <td>per month</td>
            </tr>
            <tr className="is-total">
              <th scope="row">Total in year one</th>
              <td>{money(cost.yearOne.low, cost.yearOne.high)}</td>
              <td>build + 12 months</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p className="ie-note">
        Store fees are Apple&apos;s and Google&apos;s published prices. Hosting and services are typical ranges and depend on real usage; every account is
        opened in your name, so you only ever pay providers directly.
      </p>
    </div>
  );
}
