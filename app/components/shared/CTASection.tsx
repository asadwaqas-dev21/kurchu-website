/**
 * Reusable full-width CTA block.
 * Dark variant matches the SEO card on the homepage.
 */
export default function CTASection({
  heading,
  description,
  ctaLabel,
  ctaHref = "/contact",
  dark = false,
}: {
  heading: string;
  description?: string;
  ctaLabel: string;
  ctaHref?: string;
  dark?: boolean;
}) {
  const bg = dark ? "bg-[#0b1220]" : "bg-[#fafbfc]";
  const headingColor = dark ? "text-white" : "text-[#0b1220]";
  const descColor = dark ? "text-white/55" : "text-black/55";

  return (
    <section className={`${bg} py-24 sm:py-28`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center">
        <h2 className={`mx-auto max-w-xl text-[2rem] leading-[1.15] font-semibold tracking-tight ${headingColor} sm:text-[2.25rem]`}>
          {heading}
        </h2>
        {description && (
          <p className={`mx-auto mt-4 max-w-md text-[15px] leading-7 ${descColor}`}>
            {description}
          </p>
        )}
        <a
          href={ctaHref}
          className={`mt-8 inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[14.5px] font-medium transition-colors ${
            dark
              ? "bg-white text-[#0b1220] hover:bg-white/90"
              : "bg-[#0b1220] text-white hover:bg-[#182236]"
          }`}
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}
