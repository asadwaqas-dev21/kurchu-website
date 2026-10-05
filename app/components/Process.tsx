const steps = [
  {
    step: "Step 1",
    title: "Discovery call",
    description:
      "We learn your goals, customers and competitors, then send a written proposal with scope, timeline and price.",
  },
  {
    step: "Step 2",
    title: "Design",
    description:
      "Wireframes and full UI designs that you review and approve before development starts.",
  },
  {
    step: "Step 3",
    title: "Build and test",
    description:
      "Development in weekly sprints, with SEO, speed and accessibility checked as we go.",
  },
  {
    step: "Step 4",
    title: "Launch and grow",
    description:
      "We go live, hand over everything you own, and track rankings and leads in a monthly report.",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-[#f5f7fa] pt-14 pb-14 sm:pt-16 sm:pb-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
          <h2 className="text-[2.25rem] leading-[1.1] font-semibold tracking-[-0.03em] text-[#0b1220] sm:text-[2.75rem]">
            How a project runs
          </h2>
          <p className="max-w-[23rem] text-[15px] leading-[1.7] text-slate-500 lg:justify-self-end">
            Clear stages, a shared project board and a staging link you can
            open any time.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className={`border-t-2 pt-7 ${i === 0 ? "border-[#0b1220]" : "border-slate-300"}`}
            >
              <span className="text-[13px] font-medium text-[#0a7bb5]">{s.step}</span>
              <h3 className="mt-3 text-[19px] font-medium tracking-tight text-[#0b1220]">
                {s.title}
              </h3>
              <p className="mt-4 text-[14.5px] leading-[1.65] text-slate-500">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
