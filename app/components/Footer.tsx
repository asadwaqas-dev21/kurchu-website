import Logo from "./Logo";

const serviceLinks = [
  { label: "Website development", href: "/web-development" },
  { label: "App development", href: "/mobile-app-development" },
  { label: "SEO services", href: "/seo-services" },
];
const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0b1220] pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-[13.5px] leading-6 text-white/45">
              Website development, app development and SEO for businesses
              worldwide.
            </p>
          </div>

          <div>
            <p className="text-[12.5px] font-semibold text-white/70">Services</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[13.5px] text-white/45 hover:text-white/80">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[12.5px] font-semibold text-white/70">Company</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[13.5px] text-white/45 hover:text-white/80">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[12.5px] font-semibold text-white/70">Contact</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-[13.5px] text-white/45">
              <li>[Email address]</li>
              <li>[WhatsApp number]</li>
              <li>Lahore, Pakistan</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center gap-4 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
          <p className="text-[12px] text-white/35">
            © 2026 Kurchu Software Solutions
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[12px] text-white/35 hover:text-white/70">
              Privacy policy
            </a>
            <a href="#" className="text-[12px] text-white/35 hover:text-white/70">
              Terms of service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
