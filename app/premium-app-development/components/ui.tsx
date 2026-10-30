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

/**
 * Props that make an element open the project-inquiry dialog, optionally pre-filled.
 * Put them on `<a href="/contact">`: until the page's script has loaded (or without
 * JavaScript, or opened in a new tab) the link still takes the visitor to the contact
 * form — and a preset's project type and stage travel in the URL, so the form opens pre-filled.
 */
export function inquiry(preset?: Partial<Record<string, string | string[]>>) {
  const params = new URLSearchParams();
  for (const key of ["type", "stage"]) {
    const value = preset?.[key];
    if (typeof value === "string") params.set(key, value);
  }
  return {
    ...(params.size > 0 && { href: `/contact?${params}` }),
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
  return <Image src="/logo.png" alt="Kurchu logo" width={28} height={28} priority />;
}

/**
 * A 3D phone showing one of the screen mockups. `data-nosnippet` keeps the mock-up's sample text
 * ("Bloom Coffee", balances, names) out of Google's search snippets.
 */
export function Device({ screen }: { screen: ScreenName }) {
  const gradientId = "g" + useId().replace(/\W/g, "");
  return <div className="device" data-nosnippet="" dangerouslySetInnerHTML={{ __html: renderDevice(screen, gradientId) }} />;
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
