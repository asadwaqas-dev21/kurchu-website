import Image from "next/image";

const projects = [
  {
    variant: "light" as const,
    tags: ["Website", "SEO"],
    client: "Northside Removals",
    description:
      "Website rebuild and local SEO for a UK removals company.",
    result: "Page 1 in 4 months",
    resultLabel: "Google organic — 'removals company near me'",
    image: "/projects/website-project.jpg",
  },
  {
    variant: "dark" as const,
    tags: ["Mobile app", "Dashboard"],
    client: "CleanBook UAE",
    description:
      "Booking app and admin dashboard for a UAE cleaning company.",
    result: "2,400+ bookings / month",
    resultLabel: "Within 6 months of launch",
    image: "/projects/app-project.jpg",
  },
];

export default function RecentWork() {
  return (
    <section id="work" className="bg-white pt-14 pb-10 sm:pt-16 sm:pb-12">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-[2rem] font-semibold tracking-tight text-[#0b1220] sm:text-[2.25rem]">
            Recent work
          </h2>
          <a
            href="/work"
            className="text-[13.5px] font-medium text-[#1e8fe0] hover:text-[#1470c4]"
          >
            View all case studies →
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <div
              key={p.client}
              className="overflow-hidden rounded-2xl border border-black/[0.07]"
            >
              <div
                className={`relative h-56 overflow-hidden ${
                  p.variant === "dark" ? "bg-[#0b1220]" : "bg-[#eff8ff]"
                }`}
              >
                <Image
                  src={p.image}
                  alt={`${p.client} — ${p.description}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="p-7">
                <p className="text-[15px] font-semibold text-[#0b1220]">{p.client}</p>
                <p className="mt-2 text-[14px] leading-6 text-black/55">
                  {p.description}
                </p>
                <div className="mt-4 flex gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-black/[0.04] px-3 py-1 text-[11.5px] font-medium text-black/55"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 border-t border-black/[0.06] pt-4">
                  <p className="text-[18px] font-semibold text-[#0b1220]">{p.result}</p>
                  <p className="text-[12px] text-black/40">{p.resultLabel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
