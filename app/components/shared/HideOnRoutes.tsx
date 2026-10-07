"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Renders its children everywhere except on the given exact paths or path prefixes. */
export default function HideOnRoutes({
  exact = [],
  prefixes = [],
  children,
}: {
  exact?: string[];
  prefixes?: string[];
  children: ReactNode;
}) {
  const pathname = usePathname();
  if (exact.includes(pathname) || prefixes.some((prefix) => pathname.startsWith(prefix))) return null;
  return <>{children}</>;
}
