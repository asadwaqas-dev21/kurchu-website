import { email, inquiryStarters } from "../data";
import { Arr, ExternalArrow, inquiry, rv } from "./ui";

export function FinalCta() {
  return (
    <section className="final" id="contact" aria-labelledby="final-title">
      <div className="final-bg" aria-hidden="true"></div>
      <div className="wrap final-grid">
        <div className="final-copy">
          <span className="eyebrow" {...rv()}>
            Start a project
          </span>
          <h2 className="final-h" id="final-title" {...rv(".05s")}>
            Let&apos;s build the one they <em>keep.</em>
          </h2>
          <p className="lede" {...rv(".15s")}>
            Tell us where you are today — idea, prototype, or existing product — and we&apos;ll help define the smartest next step.
          </p>
          <a className="tlink mail" href={`mailto:${email}`} {...rv(".2s")}>
            {email} <ExternalArrow />
          </a>
        </div>
        <div className="inq-card" {...rv(".1s")}>
          <span className="label">Two-minute brief</span>
          <h3>Where are you today?</h3>
          <div className="inq-opts">
            {inquiryStarters.map((option) => (
              <button key={option.title} className="inq-opt" {...inquiry(option.preset)}>
                <b>{option.title}</b>
                <span>{option.sub}</span>
              </button>
            ))}
          </div>
          <button className="btn btn-primary btn-full" data-magnetic="" {...inquiry()}>
            Start Your Project <Arr />
          </button>
          <p className="fine">Currently scheduling discovery sprints · Reply within one working day</p>
        </div>
      </div>
    </section>
  );
}
