const plans = [
  {
    title: "Fixed-scope project",
    description: "For a new website, app or redesign with a clear brief.",
    price: "From [Price]",
    features: [
      "Proposal with scope and timeline",
      "Milestone-based payments",
      "Launch support included",
    ],
  },
  {
    title: "Monthly SEO",
    description: "For steady growth in Google, maps and AI answers.",
    price: "From [Price] / month",
    features: [
      "Technical fixes and new content",
      "Local SEO and Business Profile",
      "Monthly ranking and lead report",
    ],
  },
  {
    title: "Dedicated team",
    description: "For ongoing work on an existing product or platform.",
    price: "From [Price] / month",
    features: [
      "Developers and designer on set hours",
      "Weekly check-ins and demos",
      "Scale up or down monthly",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-[#fafbfc] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="text-[2rem] font-semibold tracking-tight text-[#0b1220] sm:text-[2.25rem]">
            Ways to work with us
          </h2>
          <p className="max-w-md text-[15px] leading-7 text-black/55 lg:justify-self-end">
            Every engagement starts with a free consultation and a written
            quote. No hourly billing surprises.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className="flex flex-col rounded-2xl border border-black/[0.07] bg-white p-7"
            >
              <h3 className="text-[17px] font-semibold text-[#0b1220]">{plan.title}</h3>
              <p className="mt-2 text-[13.5px] leading-6 text-black/55">
                {plan.description}
              </p>
              <p className="mt-5 text-[19px] font-semibold text-[#0b1220]">{plan.price}</p>

              <ul className="mt-5 flex flex-col gap-2.5 border-t border-black/[0.06] pt-5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13.5px] text-black/60">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                      <path
                        d="M3.5 8.5l3 3 6-7"
                        stroke="#1e8fe0"
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
                href="/contact"
                className="mt-7 inline-flex items-center justify-center rounded-full border border-black/15 px-5 py-3 text-[13.5px] font-medium text-[#0b1220] transition-colors hover:bg-black/[0.03]"
              >
                Request a quote
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
