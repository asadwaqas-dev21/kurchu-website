const checklist = [
  "Fixed-scope quotes before any work starts",
  "You own the code, design files and content",
  "Support and reporting after launch",
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
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

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-6 pb-20 sm:pt-8 sm:pb-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-black/60 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1e8fe0]" />
            Now booking projects for Q4 2026
          </span>

          <h1 className="mt-6 max-w-xl text-[2.5rem] leading-[1.08] font-semibold tracking-tight text-[#0b1220] sm:text-[3.25rem]">
            Websites, apps and SEO that turn visitors into customers.
          </h1>

          <p className="mt-6 max-w-md text-[16.5px] leading-7 text-black/55">
            Kurchu Software Solutions designs, builds and grows digital
            products for businesses worldwide. One team from the first
            sketch to the first page of search results.
          </p>

          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#0b1220] px-6 py-3.5 text-[14.5px] font-medium text-white transition-colors hover:bg-[#182236]"
            >
              Get a project quote
            </a>
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-full border border-black/15 px-6 py-3.5 text-[14.5px] font-medium text-[#0b1220] transition-colors hover:bg-black/[0.03]"
            >
              See our work
            </a>
          </div>

          <ul className="mt-9 flex flex-col gap-3">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[14px] text-black/60">
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto h-[420px] w-full max-w-md lg:h-[480px] lg:max-w-none">
          <svg
            viewBox="0 0 500 500"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <path
              d="M104 55C170 5 300 -10 380 55C460 120 480 220 440 300C400 380 320 400 240 430C160 460 60 450 30 380C0 310 30 260 20 190C10 120 38 105 104 55Z"
              fill="#dcf0ff"
            />
          </svg>

          <div className="absolute left-1/2 top-[6%] w-[78%] -translate-x-1/2 rounded-2xl border border-black/[0.06] bg-white p-3.5 shadow-xl sm:w-[70%]">
            <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
              <span className="text-[13px] font-semibold text-[#0b1220]">Northside Removals</span>
              <span className="hidden text-[10px] font-medium text-black/35 sm:inline">
                Services · Areas · Reviews
              </span>
              <span className="rounded-full bg-[#0b1220] px-2.5 py-1 text-[10px] font-medium text-white">
                Call now
              </span>
            </div>
            <p className="mt-3 text-[15px] font-semibold leading-snug text-[#0b1220]">
              Same-day removals across the city
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-black/45">
              Fully insured crews, fixed prices and free packing
              materials.
            </p>
            <div className="mt-3 flex gap-2">
              <span className="rounded-full bg-[#1e8fe0] px-3 py-1.5 text-[10.5px] font-medium text-white">
                Get a free quote
              </span>
              <span className="rounded-full border border-black/10 px-3 py-1.5 text-[10.5px] font-medium text-black/60">
                Our prices
              </span>
            </div>
          </div>

          <div className="absolute bottom-[16%] left-[2%] w-[58%] rounded-2xl border border-black/[0.06] bg-white p-3.5 shadow-xl sm:left-[-2%]">
            <p className="text-[12px] font-semibold text-[#0b1220]">Book a clean</p>
            <p className="text-[10.5px] text-black/45">Deep cleaning · 3 bedrooms</p>
            <div className="mt-2.5 grid grid-cols-3 gap-1.5">
              {["Mon 12", "Tue 13", "Wed 14"].map((d, i) => (
                <span
                  key={d}
                  className={`rounded-md py-1.5 text-center text-[9.5px] font-medium ${
                    i === 1
                      ? "bg-[#0b1220] text-white"
                      : "bg-black/[0.04] text-black/55"
                  }`}
                >
                  {d}
                </span>
              ))}
            </div>
            <span className="mt-2.5 block rounded-full bg-[#1e8fe0] py-1.5 text-center text-[10px] font-medium text-white">
              Confirm booking
            </span>
          </div>

          <div className="absolute right-[2%] top-[46%] flex items-center gap-1.5 rounded-full bg-[#0b1220] px-3 py-2 text-[10.5px] font-medium text-white shadow-lg">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1e8fe0] text-[9px]">
              1
            </span>
            removals company near me
          </div>

          <div className="absolute bottom-[0%] right-[4%] w-[62%] rounded-xl border border-black/[0.06] bg-white p-3 shadow-lg sm:w-[54%]">
            <p className="text-[9.5px] font-medium text-black/35">yourbusiness.com</p>
            <p className="mt-0.5 text-[11px] font-semibold leading-tight text-[#0b1220]">
              Northside Removals — SameDay Moves
            </p>
            <p className="mt-1 text-[9.5px] font-medium text-[#1e8fe0]">
              ▲ up from position 14
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
