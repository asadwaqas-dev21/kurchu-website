export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="/" className="flex items-center gap-2.5">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="13" stroke="#1e8fe0" strokeWidth="2" />
        <circle cx="14" cy="14" r="4.5" fill="#1e8fe0" />
      </svg>
      <span className="leading-tight">
        <span
          className={`block text-[15px] font-semibold tracking-tight ${
            light ? "text-white" : "text-[#0b1220]"
          }`}
        >
          Kurchu
        </span>
        <span
          className={`block text-[10px] font-medium tracking-wide ${
            light ? "text-white/50" : "text-black/40"
          }`}
        >
          Software Solutions
        </span>
      </span>
    </a>
  );
}
