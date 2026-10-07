import { galleryItems } from "../data";
import { Device, rv } from "./ui";

export function Gallery() {
  return (
    <section className="gallery" id="gallery" aria-labelledby="gallery-title">
      <div className="wrap gallery-head">
        <div>
          <span className="eyebrow" {...rv()}>
            Craft
          </span>
          <h2 className="h2" id="gallery-title" {...rv(".05s")}>
            Every screen, <em>considered.</em>
          </h2>
        </div>
        <p className="lede" {...rv(".1s")} style={{ ...rv(".1s").style, maxWidth: "40ch" }}>
          Empty states, error states, loading states. The unglamorous screens are where products earn trust — so we design them with the same care as the hero shot.
        </p>
      </div>
      <div className="g-track" id="gTrack" aria-hidden="true">
        {galleryItems.map((item) => (
          <figure className="g-item" key={`${item.name}-${item.label}`}>
            <Device screen={item.screen} />
            <figcaption className="g-cap">
              <b>{item.name}</b>
              <span>{item.label}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
