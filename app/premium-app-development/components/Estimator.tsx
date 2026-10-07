import { Arr, SectionHead, rv } from "./ui";

type Option = { value: string; label: string; hint?: string };

function Segment({ name, options, checked }: { name: string; options: Option[]; checked: string }) {
  return (
    <div className="seg">
      {options.map((option) => (
        <label className="opt" key={option.value}>
          <input type="radio" name={name} value={option.value} defaultChecked={option.value === checked} />
          <span>
            {option.label}
            {option.hint && <small>{option.hint}</small>}
          </span>
        </label>
      ))}
    </div>
  );
}

const features: Array<[string, string, boolean?]> = [
  ["auth", "Authentication", true],
  ["payments", "Payments"],
  ["maps", "Maps & location"],
  ["chat", "Chat"],
  ["push", "Notifications", true],
  ["admin", "Admin panel"],
  ["subs", "Subscriptions"],
];

/** Markup only — the scoring logic lives in interactions.ts. */
export function Estimator() {
  return (
    <section className="section" id="estimate" aria-labelledby="est-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead
          eyebrow="09 — Scope estimator"
          titleId="est-title"
          title={
            <>
              Size your project <em>in thirty seconds.</em>
            </>
          }
          lede="An honest first read, not a price. Accurate proposals need a conversation — but this tells you which conversation to have."
        />
        <div className="est">
          <form className="est-panel" id="estForm" {...rv()}>
            <fieldset>
              <legend>Platform</legend>
              <Segment
                name="platform"
                checked="both"
                options={[
                  { value: "ios", label: "iOS" },
                  { value: "android", label: "Android" },
                  { value: "both", label: "Both" },
                ]}
              />
            </fieldset>
            <fieldset>
              <legend>Where you are today</legend>
              <Segment
                name="stage"
                checked="idea"
                options={[
                  { value: "idea", label: "Idea", hint: "Needs discovery" },
                  { value: "design", label: "Design ready", hint: "Flows exist" },
                  { value: "existing", label: "Existing app", hint: "Live product" },
                ]}
              />
            </fieldset>
            <fieldset>
              <legend>Ambition</legend>
              <Segment
                name="complexity"
                checked="mvp"
                options={[
                  { value: "mvp", label: "MVP", hint: "Prove it" },
                  { value: "standard", label: "Standard", hint: "Grow it" },
                  { value: "advanced", label: "Advanced", hint: "Scale it" },
                ]}
              />
            </fieldset>
            <fieldset>
              <legend>
                <span>Features</span>
                <span id="featCount">2 selected</span>
              </legend>
              <div className="feats">
                {features.map(([value, label, on]) => (
                  <label className="opt feat-opt" key={value}>
                    <input type="checkbox" name="feat" value={value} defaultChecked={on} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </form>

          <div className="est-result" {...rv(".08s")} aria-live="polite">
            <span className="label">Likely project scope</span>
            <p className="est-scope" id="estScope">
              Lean
            </p>
            <div className="est-meter" id="estMeter" aria-hidden="true">
              <i className="on"></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
            <div className="est-meter-l" aria-hidden="true">
              <span>Lean</span>
              <span>Medium</span>
              <span>Substantial</span>
              <span>Complex</span>
            </div>
            <dl className="est-dl">
              <div>
                <dt>Indicative timeline</dt>
                <dd id="estTime">8–12 weeks</dd>
              </div>
              <div>
                <dt>Suggested team</dt>
                <dd id="estTeam">Product lead, designer, 2 engineers</dd>
              </div>
              <div>
                <dt>Recommended start</dt>
                <dd id="estStart">2-week discovery sprint</dd>
              </div>
            </dl>
            <ul className="est-notes" id="estNotes"></ul>
            <p className="est-msg">Let&apos;s discuss requirements for an accurate proposal.</p>
            <button className="btn btn-primary btn-full" id="estCta" type="button">
              Discuss this scope <Arr />
            </button>
            <p className="est-fine">Indicative only — not a quote. Every proposal follows a short call and a written scope.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
