import { processSteps } from "../data";
import { SectionHead } from "./ui";

const pad = (n: number) => String(n).padStart(2, "0");

export function Process() {
  const first = processSteps[0];
  return (
    <section className="section" id="process" aria-labelledby="process-title">
      <div className="wrap">
        <SectionHead
          eyebrow="04 — Process"
          titleId="process-title"
          title={
            <>
              Eight stages. <em>No surprises.</em>
            </>
          }
          lede="Every stage ends with something you can hold — a document, a prototype, a build. You see progress every week in a live demo, and you always know what's being decided and why."
        />

        <div className="proc-grid">
          <aside className="proc-aside" aria-hidden="true">
            <div className="proc-num">
              <span className="cur" id="procCur">
                01
              </span>
              <small>/ 08</small>
            </div>
            <p className="proc-name" id="procName">
              {first.name}
            </p>
            <div className="proc-segs" id="procSegs">
              {processSteps.map((step, i) => (
                <i className={i === 0 ? "on" : undefined} key={step.name}></i>
              ))}
            </div>
            <div className="deliv">
              <div className="deliv-doc">
                <i></i>
              </div>
              <div>
                <span className="label">You receive</span>
                <b id="procDel">{first.deliverable}</b>
                <span id="procDelD">{first.deliverableNote}</span>
              </div>
            </div>
          </aside>

          <ol className="proc-list" id="procList">
            <li className="proc-rail" aria-hidden="true">
              <i id="procFill"></i>
            </li>
            {processSteps.map((step, i) => (
              <li
                className={`step${i === 0 ? " is-active" : ""}`}
                data-step={i}
                data-del={step.deliverable}
                data-deld={step.deliverableNote}
                key={step.name}
              >
                <div className="step-head">
                  <small>{pad(i + 1)}</small>
                  <h3>{step.name}</h3>
                  <span className="dur">{step.dur}</span>
                </div>
                <p>{step.body}</p>
                <div className="step-cols">
                  <div>
                    <h4>Decisions made</h4>
                    <ul>
                      {step.decisions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>Your involvement</h4>
                    <ul>
                      {step.involvement.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="m-deliv">
                  <span className="label">You receive</span>
                  {step.deliverable}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
