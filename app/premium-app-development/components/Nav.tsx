import Link from "next/link";
import { drawerLinks, email, navLinks } from "../data";
import { Arr, LogoMark, inquiry } from "./ui";

/**
 * `current` is the active top-level page. On the homepage it is omitted and
 * the active link follows the section in view instead (see interactions.ts).
 */
export function Nav({ current }: { current?: string }) {
  return (
    <>
      <header className="nav" id="nav" data-page={current}>
        <div className="wrap nav-inner">
          <Link href="/" className="logo" aria-label="Kurchu — home">
            <LogoMark />
            Kurchu<small>Software Solutions</small>
          </Link>
          <nav aria-label="Primary">
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-section={link.section}
                    className={current === link.section ? "is-current" : undefined}
                    aria-current={current === link.section ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
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
                <Link className="d-link" href={link.href} aria-current={current === link.section ? "page" : undefined}>
                  {link.label} <small>{String(i + 1).padStart(2, "0")}</small>
                </Link>
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
