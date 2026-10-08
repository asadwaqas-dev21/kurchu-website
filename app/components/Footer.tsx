import { ArrowRight, ArrowUp, Location, Sms, Whatsapp } from "iconsax-react";
import Logo from "./Logo";
import { siteConfig } from "../lib/site-config";
import { regionPath, regions } from "../lib/regions";

const serviceLinks = [
  { label: "App development", href: "/mobile-app-development" },
  { label: "All services", href: "/services" },
];
const marketLinks = [
  ...regions.map((region) => ({ label: region.name, href: regionPath(region) })),
  { label: "All locations", href: "/locations" },
];
const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`;

const socialLinks = [
  {
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
    icon: (
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-1.75 3.37-1.75 3.6 0 4.27 2.37 4.27 5.45v5.8h-4v-5.14c0-1.23-.02-2.8-1.7-2.8-1.71 0-1.97 1.33-1.97 2.7v5.24H9.5v-11Z" />
    ),
  },
  {
    label: "GitHub",
    href: siteConfig.social.github,
    icon: (
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    ),
  },
];

function FooterHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[11.5px] font-semibold tracking-[0.14em] text-white/40 uppercase ${className}`}>
      {children}
    </p>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-1.5 text-[14px] text-white/60 transition-colors hover:text-white"
    >
      {children}
      <ArrowRight
        size={13}
        color="currentColor"
        className="-translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
      />
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#070c16] text-white">
      {/* Decorative background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1e8fe0]/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-[#1e8fe0]/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* Main grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 pt-16 pb-16 sm:pt-20 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <Logo light />
            <p className="mt-5 max-w-xs text-[14px] leading-6 text-white/55">
              We design, engineer and launch iOS, Android and cross-platform apps for
              businesses in the UK, USA, Canada and UAE.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition-all hover:-translate-y-0.5 hover:border-[#1e8fe0]/60 hover:bg-[#1e8fe0]/15 hover:text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <FooterHeading>Services</FooterHeading>
            <ul className="mt-5 flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
            <FooterHeading className="mt-10">Markets</FooterHeading>
            <ul className="mt-5 flex flex-col gap-3">
              {marketLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Company</FooterHeading>
            <ul className="mt-5 flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <FooterHeading>Get in touch</FooterHeading>
            <ul className="mt-5 flex flex-col gap-4">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="group flex items-center gap-3 text-[14px] text-white/60 transition-colors hover:text-white"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-[#5fb4f0] transition-colors group-hover:bg-[#1e8fe0]/20">
                    <Sms size={17} color="currentColor" variant="Bulk" />
                  </span>
                  <span className="break-all">{siteConfig.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-[14px] text-white/60 transition-colors hover:text-white"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-[#5fb4f0] transition-colors group-hover:bg-[#1e8fe0]/20">
                    <Whatsapp size={17} color="currentColor" variant="Bulk" />
                  </span>
                  {siteConfig.contact.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-3 text-[14px] text-white/60">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-[#5fb4f0]">
                  <Location size={17} color="currentColor" variant="Bulk" />
                </span>
                {siteConfig.location} · Serving the UK, USA, Canada & UAE
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-5 border-t border-white/10 py-7 sm:flex-row sm:justify-between">
          <p className="text-[12.5px] text-white/40">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-[12.5px] text-white/40 transition-colors hover:text-white/80">
              Privacy policy
            </a>
            <a href="/terms" className="text-[12.5px] text-white/40 transition-colors hover:text-white/80">
              Terms of use
            </a>
            <a
              href="#"
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
            >
              <ArrowUp size={15} color="currentColor" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
