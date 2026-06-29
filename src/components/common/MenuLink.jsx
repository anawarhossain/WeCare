"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function MenuLink({ href, children, className }) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors duration-200",
        isActive
          ? "text-(--color-primary) font-semibold"
          : "text-(--text-secondary) hover:text-(--color-primary)",
        className,
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
