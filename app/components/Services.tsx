function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
      <path
        d="M3.5 8.5l3 3 6-7"
        stroke="#1e8fe0"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WebsiteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2.5" y="4" width="15" height="12" rx="2" stroke="#1e8fe0" strokeWidth="1.5" />
      <path d="M2.5 7.5h15" stroke="#1e8fe0" strokeWidth="1.5" />
    </svg>
  );
}

function AppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="5.5" y="2.5" width="9" height="15" rx="2" stroke="#1e8fe0" strokeWidth="1.5" />
      <path d="M9 15h2" stroke="#1e8fe0" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const services = [
  {
    icon: <WebsiteIcon />,
    title: "Website development",
    description:
      "Fast, accessible websites designed around what your customers need to do next: call, book, buy or enquire.",
    features: [
      "Business and corporate sites",
      "E-commerce stores",
      "Custom web applications",
      "Landing pages for campaigns",
      "Headless CMS and WordPress",
      "Redesigns and speed fixes",
    ],
    stack: "Next.js · React · WordPress · Shopify",
    cta: "Explore website development",
    href: "/web-development",
  },
  {
    icon: <AppIcon />,
    title: "App development",
    description:
      "iOS and Android apps from a single codebase, with the admin tools your team needs behind them.",
    features: [
      "Cross-platform apps in Flutter",
      "Booking, ordering and delivery apps",
      "Admin dashboards and backends",
      "App Store and Play Store launch",
    ],
    stack: "Flutter · Supabase · Firebase",
    cta: "Explore app development",
    href: "/mobile-app-development",
  },
];

const seoFeatures = [
  "Technical SEO audits",
  "Local SEO and Google Business Profile",
  "Content and landing pages",
  "AI search optimisation",
  "Link building and citations",
  "Monthly ranking reports",
];

const chartPoints = "0,58 40,52 80,44 120,46 160,30 200,20 240,6";

export default function Services() {
  return (
    <section id="services" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="max-w-md text-[2rem] leading-[1.15] font-semibold tracking-tight text-[#0b1220] sm:text-[2.25rem]">
            Three services, one team that connects them.
          </h2>
          <p className="max-w-md text-[15px] leading-7 text-black/55 lg:justify-self-end">
            Your website, your app and your search rankings affect each
            other. We plan them together, so every build is fast, findable
            and easy to grow.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col rounded-2xl border border-black/[0.07] bg-white p-7 shadow-sm sm:p-8"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eff8ff]">
                {service.icon}
              </span>
              <h3 className="mt-5 text-[19px] font-semibold text-[#0b1220]">
                {service.title}
              </h3>
              <p className="mt-2 text-[14px] leading-6 text-black/55">
                {service.description}
              </p>

              <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {service.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-[13px] leading-5 text-black/60"
                  >
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col gap-3 border-t border-black/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-[11.5px] font-medium text-black/35">
                  {service.stack}
                </span>
                <a
                  href={service.href}
                  className="text-[13.5px] font-medium text-[#1e8fe0] hover:text-[#1470c4]"
                >
                  {service.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl bg-[#0b1220] p-7 sm:p-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 15V9M9.5 15V5M16 15v-7" stroke="#5fb3ef" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
              <h3 className="mt-5 text-[19px] font-semibold text-white">
                SEO services
              </h3>
              <p className="mt-2 max-w-sm text-[14px] leading-6 text-white/55">
                Get found on Google, in maps and in AI answers. We fix the
                technical foundations, then publish the pages and content
                that win the searches your customers make.
              </p>

              <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {seoFeatures.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-[13px] leading-5 text-white/60"
                  >
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                      <path
                        d="M3.5 8.5l3 3 6-7"
                        stroke="#5fb3ef"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="/seo-services"
                className="mt-7 inline-block text-[13.5px] font-medium text-[#5fb3ef] hover:text-white"
              >
                Explore SEO services →
              </a>
            </div>

            <div className="rounded-xl bg-white/[0.04] p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold text-white">Monthly report</p>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/50">
                  Sample client view
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {["Organic visits", "Keywords in top 10", "Leads from search"].map(
                  (label) => (
                    <div key={label}>
                      <p className="text-[17px] font-semibold text-white">[Value]</p>
                      <p className="mt-1 text-[10.5px] leading-tight text-white/45">
                        {label}
                      </p>
                    </div>
                  )
                )}
              </div>

              <div className="mt-6">
                <svg viewBox="0 0 240 64" className="w-full" preserveAspectRatio="none">
                  <polyline
                    points={chartPoints}
                    fill="none"
                    stroke="#5fb3ef"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="mt-2 flex justify-between text-[9px] font-medium text-white/35">
                  {["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"].map(
                    (m) => (
                      <span key={m}>{m}</span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
