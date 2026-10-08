"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, Call, Category, Home2 } from "iconsax-react";

const items = [
  { label: "Home", href: "/", icon: Home2, match: (p: string) => p === "/" },
  {
    label: "Services",
    href: "/services",
    icon: Category,
    match: (p: string) => p.includes("development") || p.includes("seo"),
  },
  { label: "Projects", href: "/work", icon: Briefcase, match: (p: string) => p.startsWith("/work") },
  { label: "Contact Us", href: "/contact", icon: Call, match: (p: string) => p.startsWith("/contact") },
];

/** Fixed bottom tab bar, shown below the lg breakpoint only. */
export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-black/[0.07] bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_-12px_rgba(11,18,32,0.18)] backdrop-blur lg:hidden"
    >
      <ul className="mx-auto grid h-[68px] max-w-md grid-cols-4">
        {items.map(({ label, href, icon: Icon, match }) => {
          const active = match(pathname);
          return (
            <li key={label}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative flex h-full flex-col items-center justify-center gap-1 text-[11.5px] font-medium transition-colors ${
                  active ? "text-[#1e8fe0]" : "text-black/50 hover:text-[#0b1220]"
                }`}
              >
                {active && (
                  <span className="absolute top-0 h-[3px] w-8 rounded-b-full bg-[#1e8fe0]" />
                )}
                <Icon size={22} color="currentColor" variant={active ? "Bold" : "Linear"} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
