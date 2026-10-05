const tools = [
  "Next.js",
  "React",
  "TypeScript",
  "Flutter",
  "Supabase",
  "Firebase",
  "WordPress",
  "Shopify",
];

export default function LogoCloud() {
  return (
    <section className="border-y border-black/[0.06] bg-white py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 sm:px-10 lg:flex-row lg:gap-12 lg:px-14">
        <p className="max-w-[13rem] shrink-0 text-center text-[13px] leading-5 text-black/55 lg:text-left">
          Built with the tools modern teams trust
        </p>
        <div className="flex flex-1 flex-wrap items-center justify-center gap-x-10 gap-y-4 lg:justify-between lg:gap-x-8">
          {tools.map((tool) => (
            <span
              key={tool}
              className="text-[17px] font-medium tracking-tight text-slate-500 sm:text-[19px]"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
