import Image from "next/image";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="/" className="flex items-center gap-2.5">
      <Image
        src="/logo.png"
        alt="Kurchu Software Solutions"
        width={32}
        height={32}
        className="rounded-lg"
        priority
      />
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
