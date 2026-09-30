/**
 * Reusable service/feature card.
 * Matches the homepage card style: rounded-2xl, border, shadow-sm.
 */
export function CheckIcon({ light = false }: { light?: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
      <path
        d="M3.5 8.5l3 3 6-7"
        stroke={light ? "#5fb3ef" : "#1e8fe0"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ServiceCard({
  icon,
  title,
  description,
  features,
  href,
  ctaLabel,
  dark = false,
}: {
  icon?: React.ReactNode;
  title: string;
  description: string;
  features?: string[];
  href?: string;
  ctaLabel?: string;
  dark?: boolean;
}) {
  const bg = dark
    ? "bg-[#0b1220] text-white"
    : "bg-white text-[#0b1220]";
  const descColor = dark ? "text-white/55" : "text-black/55";
  const featureColor = dark ? "text-white/60" : "text-black/60";
  const borderColor = dark ? "border-white/10" : "border-black/[0.07]";

  return (
    <div className={`flex flex-col rounded-2xl border ${borderColor} ${bg} p-7 shadow-sm sm:p-8`}>
      {icon && (
        <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${dark ? "bg-white/10" : "bg-[#eff8ff]"}`}>
          {icon}
        </span>
      )}
      <h3 className={`${icon ? "mt-5" : ""} text-[19px] font-semibold`}>{title}</h3>
      <p className={`mt-2 text-[14px] leading-6 ${descColor}`}>{description}</p>

      {features && features.length > 0 && (
        <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {features.map((f) => (
            <li key={f} className={`flex items-start gap-2 text-[13px] leading-5 ${featureColor}`}>
              <CheckIcon light={dark} />
              {f}
            </li>
          ))}
        </ul>
      )}

      {href && ctaLabel && (
        <a
          href={href}
          className={`mt-auto pt-6 text-[13.5px] font-medium ${dark ? "text-[#5fb3ef] hover:text-white" : "text-[#1e8fe0] hover:text-[#1470c4]"}`}
        >
          {ctaLabel} →
        </a>
      )}
    </div>
  );
}
