const projects = [
  {
    variant: "light" as const,
    tags: ["Website", "SEO"],
    client: "[Client name]",
    description:
      "Website rebuild and local SEO for a UK removals company.",
    result: "[Result]",
    resultLabel: "[Result label]",
  },
  {
    variant: "dark" as const,
    tags: ["Mobile app", "Dashboard"],
    client: "[Client name]",
    description:
      "Booking app and admin dashboard for a UAE cleaning company.",
    result: "[Result]",
    resultLabel: "[Result label]",
  },
];

export default function RecentWork() {
  return (
    <section id="work" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-[2rem] font-semibold tracking-tight text-[#0b1220] sm:text-[2.25rem]">
            Recent work
          </h2>
          <a
            href="#"
            className="text-[13.5px] font-medium text-[#1e8fe0] hover:text-[#1470c4]"
          >
            View all case studies →
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <div
              key={p.client + p.description}
              className="overflow-hidden rounded-2xl border border-black/[0.07]"
            >
              <div
                className={`flex h-56 items-center justify-center ${
                  p.variant === "dark" ? "bg-[#0b1220]" : "bg-[#eff8ff]"
                }`}
              >
                {p.variant === "light" ? (
                  <span className="rounded-lg border-2 border-dashed border-[#1e8fe0]/30 px-8 py-10 text-[12px] font-medium text-[#1e8fe0]/60">
                    [Project screenshot]
                  </span>
                ) : (
                  <div className="flex items-end gap-3">
                    <span className="flex h-32 w-20 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-center text-[9px] font-medium text-white/40">
                      [App screen]
                    </span>
                    <span className="flex h-40 w-20 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-center text-[9px] font-medium text-white/40">
                      [App screen]
                    </span>
                  </div>
                )}
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
