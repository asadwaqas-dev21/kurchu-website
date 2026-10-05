import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";

/* The single icon wrapper for the whole site.

   Every icon renders through here, and every icon comes from Hugeicons —
   no other icon source exists in this codebase. Defaults are set once:
   20px, 1.5 stroke, currentColor, and hidden from assistive tech (icons
   here are always decorative; the accessible name lives on the control
   that contains them).

   Size is restricted to three values so icons stay on one optical grid. */

export type IconSize = 16 | 20 | 24;

export type IconProps = {
  icon: IconSvgElement;
  size?: IconSize;
  className?: string;
  strokeWidth?: number;
};

export function Icon({ icon, size = 20, className, strokeWidth = 1.5 }: IconProps) {
  return (
    <HugeiconsIcon
      icon={icon}
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      color="currentColor"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable={false}
    />
  );
}
