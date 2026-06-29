"use client";

import { useState } from "react";
import { cn } from "@/lib/utils"; // Adjusted for your project's utility path

const maxWidthClasses = {
  sm: "max-w-[640px]",
  md: "max-w-[768px]",
  lg: "max-w-[1024px]",
  xl: "max-w-[1280px]",
  "2xl": "max-w-[1536px]",
  full: "max-w-full",
};

export function NavbarSkeleton({
  brand,
  links,
  mobileLinks,
  rightContent,
  className,
  maxWidth = "lg",
  position = "sticky",
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className={cn(
        "z-40 w-full border-b backdrop-blur-lg transition-colors duration-200",
        "bg-(--bg-base)/80 border-(--border-default)",
        position === "sticky" && "sticky top-0",
        position === "fixed" && "fixed top-0",
        className,
      )}
    >
      <header
        className={cn(
          "flex h-16 items-center justify-between px-4 sm:px-6",
          maxWidth !== "full" && maxWidthClasses[maxWidth],
          "mx-auto",
        )}
      >
        <div className="flex items-center gap-4">
          {/* মোবাইল হামবার্গার বাটন */}
          <button
            className="block p-2 rounded-lg transition-colors md:hidden text-(--text-secondary) hover:bg-(--bg-muted) hover:text-(--text-primary)"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* ব্র্যান্ড লোগো */}
          {brand}
        </div>

        {/* Desktop Navigation Links Slot */}
        <ul className="hidden items-center gap-6 md:flex">{links}</ul>

        {/* Desktop Right Content Slot */}
        {rightContent && (
          <div className="hidden items-center gap-4 md:flex">
            {rightContent}
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="border-t md:hidden bg-(--bg-base) border-(--border-default) animate-subtle-pulse duration-150">
          <ul className="flex flex-col gap-2 p-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {mobileLinks}
            {rightContent && (
              <li className="mt-4 flex flex-col gap-3 border-t pt-4 border-(--border-default)">
                {rightContent}
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
