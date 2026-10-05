/**
 * Tech stack display with simple logo-style text pills.
 * Mirrors the LogoCloud aesthetic from the homepage.
 */
export default function TechStack({
  heading,
  description,
  technologies,
}: {
  heading: string;
  description?: string;
  technologies: { name: string; description: string }[];
}) {
  return (
    <section className="bg-[#fafbfc] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="max-w-md text-[2rem] leading-[1.15] font-semibold tracking-tight text-[#0b1220] sm:text-[2.25rem]">
            {heading}
          </h2>
          {description && (
            <p className="max-w-md text-[15px] leading-7 text-black/55 lg:justify-self-end">
              {description}
            </p>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm"
            >
              <p className="text-[16px] font-semibold text-[#0b1220]">{tech.name}</p>
              <p className="mt-2 text-[13px] leading-5 text-black/55">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
