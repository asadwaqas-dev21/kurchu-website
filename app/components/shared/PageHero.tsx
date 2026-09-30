/**
 * Reusable page hero section.
 * Matches the homepage typography scale and spacing.
 */
export default function PageHero({
  badge,
  heading,
  description,
  primaryCta,
  primaryHref = "/contact",
  secondaryCta,
  secondaryHref,
  children,
}: {
  badge?: string;
  heading: string;
  description: string;
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-20 sm:pt-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {badge && (
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-black/60 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1e8fe0]" />
            {badge}
          </span>
        )}

        <h1 className="mt-6 max-w-2xl text-[2.5rem] leading-[1.08] font-semibold tracking-tight text-[#0b1220] sm:text-[3.25rem]">
          {heading}
        </h1>

        <p className="mt-6 max-w-xl text-[16.5px] leading-7 text-black/55">
          {description}
        </p>

        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            {primaryCta && (
              <a
                href={primaryHref}
                className="inline-flex items-center justify-center rounded-full bg-[#0b1220] px-6 py-3.5 text-[14.5px] font-medium text-white transition-colors hover:bg-[#182236]"
              >
                {primaryCta}
              </a>
            )}
            {secondaryCta && secondaryHref && (
              <a
                href={secondaryHref}
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-6 py-3.5 text-[14.5px] font-medium text-[#0b1220] transition-colors hover:bg-black/[0.03]"
              >
                {secondaryCta}
              </a>
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
