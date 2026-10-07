import Image from "next/image";
import { useId, type CSSProperties, type ReactNode } from "react";
import { renderDevice, type ScreenName } from "../screens";

/** Typed helper for inline CSS custom properties. */
export const vars = (values: Record<string, string | number>) => values as CSSProperties;

/** Props for the scroll-reveal observer (see interactions.ts). */
export function rv(delay?: string, kind?: "fade" | "mask") {
  return {
    "data-reveal": kind ?? "",
    style: delay ? vars({ "--d": delay }) : undefined,
  };
}

/** Props that make an element open the project-inquiry dialog, optionally pre-filled. */
export function inquiry(preset?: Partial<Record<string, string | string[]>>) {
  return {
    "data-open-inquiry": "",
    "data-preset": preset ? JSON.stringify(preset) : undefined,
  };
}

const arrowPath = <path d="M3 8h10M9 4l4 4-4 4" />;

/** Button arrow with the two-glyph slide-through hover. */
export function Arr() {
  return (
    <span className="arr" aria-hidden="true">
      <i>
        <svg viewBox="0 0 16 16">{arrowPath}</svg>
      </i>
      <i>
        <svg viewBox="0 0 16 16">{arrowPath}</svg>
      </i>
    </span>
  );
}

export function ExternalArrow() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d="M3 9 9 3M4 3h5v5" />
    </svg>
  );
}

export function Check() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="m5 12 5 5 9-10" />
    </svg>
  );
}

export function LogoMark() {
  return <Image src="/logo.png" alt="" width={28} height={28} priority />;
}

/** A 3D phone showing one of the screen mockups. */
export function Device({ screen }: { screen: ScreenName }) {
  const gradientId = "g" + useId().replace(/\W/g, "");
  return <div className="device" dangerouslySetInnerHTML={{ __html: renderDevice(screen, gradientId) }} />;
}

/** Shared eyebrow / heading / lede block used by most sections. */
export function SectionHead({
  eyebrow,
  titleId,
  title,
  lede,
  tight,
}: {
  eyebrow: string;
  titleId: string;
  title: ReactNode;
  lede?: ReactNode;
  tight?: boolean;
}) {
  return (
    <div className="sec-head" style={tight ? { marginBottom: "clamp(40px,5vw,72px)" } : undefined}>
      <div>
        <span className="eyebrow" {...rv()}>
          {eyebrow}
        </span>
        <h2 className="h2" id={titleId} {...rv(".05s")}>
          {title}
        </h2>
      </div>
      {lede && (
        <p className="lede" {...rv(".1s")}>
          {lede}
        </p>
      )}
    </div>
  );
}
