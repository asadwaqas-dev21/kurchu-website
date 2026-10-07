"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { initPremiumPage } from "../interactions";

/**
 * Scoping wrapper for the whole page: every rule in premium.css is prefixed
 * with `.kp`, and this component attaches the page's interactions to it.
 * The server-rendered sections are passed in as children.
 */
export function PremiumRoot({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    return initPremiumPage(root);
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
