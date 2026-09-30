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
    <section id="process" className="bg-[#fafbfc] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="text-[2rem] font-semibold tracking-tight text-[#0b1220] sm:text-[2.25rem]">
            How a project runs
          </h2>
          <p className="max-w-md text-[15px] leading-7 text-black/55 lg:justify-self-end">
            Clear stages, a shared project board and a staging link you can
            open any time.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.title} className="border-t-2 border-[#0b1220] pt-5">
              <span className="text-[12px] font-medium text-black/40">{s.step}</span>
              <h3 className="mt-2 text-[17px] font-semibold text-[#0b1220]">{s.title}</h3>
              <p className="mt-2.5 text-[13.5px] leading-6 text-black/55">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
