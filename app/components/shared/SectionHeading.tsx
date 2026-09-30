/**
 * Section heading pair — large h2 + optional supporting copy on the right.
 * Replicates the pattern used in Services, Process, and Pricing on the homepage.
 */
export default function SectionHeading({
  heading,
  description,
  id,
  centered = false,
}: {
  heading: string;
  description?: string;
  id?: string;
  centered?: boolean;
}) {
  if (centered) {
    return (
      <div id={id} className="mx-auto max-w-2xl text-center">
        <h2 className="text-[2rem] leading-[1.15] font-semibold tracking-tight text-[#0b1220] sm:text-[2.25rem]">
          {heading}
        </h2>
        {description && (
          <p className="mt-4 text-[15px] leading-7 text-black/55">
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div id={id} className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
      <h2 className="max-w-md text-[2rem] leading-[1.15] font-semibold tracking-tight text-[#0b1220] sm:text-[2.25rem]">
        {heading}
      </h2>
      {description && (
        <p className="max-w-md text-[15px] leading-7 text-black/55 lg:justify-self-end">
          {description}
        </p>
      )}
    </div>
  );
}
