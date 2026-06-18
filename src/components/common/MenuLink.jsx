"use client";

import { Link } from "@heroui/react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MenuLink({ href, children, className }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "text-default-600 transition-colors hover:text-primary",
        isActive && "font-semibold text-primary",
        className,
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
