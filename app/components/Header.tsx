"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const links = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Pricing", href: "/pricing" },
];

const serviceDropdown = [
  { label: "Web Development", href: "/web-development" },
  { label: "Mobile App Development", href: "/mobile-app-development" },
  { label: "SEO Services", href: "/seo-services" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) =>
            link.label === "Services" ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setShowServices(true)}
                onMouseLeave={() => setShowServices(false)}
              >
                <a
                  href={link.href}
                  className={`flex items-center gap-1 text-[14px] font-medium transition-colors hover:text-[#0b1220] ${
                    pathname.includes("development") || pathname.includes("seo") ? "text-[#0b1220]" : "text-black/65"
                  }`}
                >
                  {link.label}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="mt-px">
                    <path d="M2.5 4l2.5 2.5L7.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

                {showServices && (
                  <div className="absolute top-full left-0 z-50 mt-2 w-56 rounded-xl border border-black/[0.07] bg-white p-2 shadow-lg">
                    {serviceDropdown.map((s) => (
                      <a
                        key={s.href}
                        href={s.href}
                        className={`block rounded-lg px-3 py-2.5 text-[13.5px] font-medium transition-colors hover:bg-black/[0.03] hover:text-[#0b1220] ${
                          pathname === s.href ? "bg-black/[0.03] text-[#0b1220]" : "text-black/65"
                        }`}
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className={`text-[14px] font-medium transition-colors hover:text-[#0b1220] ${
                  pathname === link.href ? "text-[#0b1220]" : "text-black/65"
                }`}
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        <a
          href="/contact"
          className="hidden items-center rounded-full bg-[#0b1220] px-5 py-2.5 text-[13.5px] font-medium text-white transition-colors hover:bg-[#182236] lg:inline-flex"
        >
          Get a Quote
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[#0b1220] lg:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {open ? (
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M2.5 5h15M2.5 10h15M2.5 15h15"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-black/[0.06] bg-white px-5 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col">
            {/* Service sub-links on mobile */}
            <p className="border-b border-black/[0.04] py-3 text-[12px] font-semibold tracking-wide text-black/40 uppercase">
              Services
            </p>
            {serviceDropdown.map((s) => (
              <a
                key={s.href}
                href={s.href}
                onClick={() => setOpen(false)}
                className={`border-b border-black/[0.04] py-3 pl-3 text-[15px] font-medium ${
                  pathname === s.href ? "text-[#0b1220]" : "text-black/70"
                }`}
              >
                {s.label}
              </a>
            ))}

            {links
              .filter((l) => l.label !== "Services")
              .map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`border-b border-black/[0.04] py-3 text-[15px] font-medium ${
                    pathname === link.href ? "text-[#0b1220]" : "text-black/70"
                  }`}
                >
                  {link.label}
                </a>
              ))}
          </nav>
          <a
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 flex items-center justify-center rounded-full bg-[#0b1220] px-5 py-3 text-[14px] font-medium text-white"
          >
            Get a Quote
          </a>
        </div>
      )}
    </header>
  );
}
