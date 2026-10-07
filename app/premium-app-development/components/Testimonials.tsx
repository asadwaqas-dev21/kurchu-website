import { testimonials } from "../data";
import { SectionHead, rv } from "./ui";

export function Testimonials() {
  const delays = [undefined, ".08s", ".16s"];
  return (
    <section className="section" aria-labelledby="quotes-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head" style={{ marginBottom: "clamp(40px,5vw,72px)" }}>
          <div>
            <span className="eyebrow" {...rv()}>
              10 — In their words
            </span>
            <h2 className="h2" id="quotes-title" {...rv(".05s")}>
              Quiet confidence, <em>earned.</em>
            </h2>
          </div>
        </div>
        <div className="quotes">
          {testimonials.map((item, i) => (
            <figure key={item.name} className="quote" {...rv(delays[i])}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 18v-5.5C4 8 6.4 5.4 10 5l.6 1.8C8.4 7.6 7.4 9 7.3 11H10v7H4Zm10 0v-5.5C14 8 16.4 5.4 20 5l.6 1.8c-2.2.8-3.2 2.2-3.3 4.2H20v7h-6Z" />
              </svg>
              <blockquote>
                <p>{item.quote}</p>
              </blockquote>
              <footer>
                <span className="q-av">{item.initials}</span>
                <div>
                  <b>{item.name}</b>
                  <span>{item.role}</span>
                </div>
              </footer>
            </figure>
          ))}
        </div>
        <p className="label quotes-note">Sample testimonials — placeholders for client-approved quotes</p>
      </div>
    </section>
  );
}

export { SectionHead };
