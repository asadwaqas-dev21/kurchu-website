import Link from "next/link";
import { email, footerColumns } from "../data";
import { Arr, ExternalArrow, LogoMark, inquiry } from "./ui";

/** `stickyCta` is off on /contact, where the page itself is the call to action. */
export function Footer({ stickyCta = true }: { stickyCta?: boolean }) {
  return (
    <>
      <footer className="footer">
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <Link href="/" className="logo" aria-label="Kurchu — home">
                <LogoMark />
                Kurchu
              </Link>
              <p>An independent software company designing and engineering iOS, Android and cross-platform apps for founders and operating teams.</p>
              <a className="tlink" href={`mailto:${email}`}>
                {email} <ExternalArrow />
              </a>
            </div>
            {footerColumns.map((column) => (
              <div className="foot-col" key={column.title}>
                <h4>{column.title}</h4>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith("/") ? (
                        <Link href={link.href}>{link.label}</Link>
                      ) : (
                        <a href={link.href} {...(link.external ? { target: "_blank", rel: "noopener" } : {})}>
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="wordmark" aria-hidden="true">
            kurchu
          </div>
          <div className="foot-bar">
            <span>© {new Date().getFullYear()} Kurchu Software Solutions. Concept work shown is illustrative.</span>
            <nav aria-label="Legal">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </nav>
          </div>
        </div>
      </footer>

      {stickyCta && (
        <div className="mcta" id="mcta">
          <span>Have an app in mind?</span>
          <button className="btn btn-primary btn-sm" {...inquiry()}>
            Start a Project <Arr />
          </button>
        </div>
      )}
    </>
  );
}
