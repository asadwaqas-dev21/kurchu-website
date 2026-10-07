import { drawerLinks, email, navLinks } from "../data";
import { Arr, LogoMark, inquiry } from "./ui";

export function Nav() {
  return (
    <>
      <header className="nav" id="nav">
        <div className="wrap nav-inner">
          <a href="#top" className="logo" aria-label="Kurchu — home">
            <LogoMark />
            Kurchu<small>Software Solutions</small>
          </a>
          <nav aria-label="Primary">
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="nav-right">
            <button className="btn btn-primary btn-sm" data-magnetic="" {...inquiry()}>
              Start a Project <Arr />
            </button>
            <button className="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="drawer" aria-label="Open menu">
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div className="drawer" id="drawer" aria-hidden="true">
        <nav aria-label="Mobile">
          <ul>
            {drawerLinks.map((link, i) => (
              <li key={link.href}>
                <a className="d-link" href={link.href}>
                  {link.label} <small>{String(i + 1).padStart(2, "0")}</small>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="drawer-foot">
          <button className="btn btn-primary" {...inquiry()}>
            Start a Project <Arr />
          </button>
          <p>{email} · Replies within one working day</p>
        </div>
      </div>
    </>
  );
}
