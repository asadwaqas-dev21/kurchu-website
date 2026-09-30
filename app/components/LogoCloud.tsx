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
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-center text-[12.5px] font-medium text-black/40">
          Built with the tools modern teams trust
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {tools.map((tool) => (
            <span
              key={tool}
              className="text-[15px] font-semibold tracking-tight text-black/35"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
