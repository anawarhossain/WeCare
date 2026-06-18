"use client";

import { useState, useRef } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { Link } from "@heroui/react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function DropdownMenuItem({ label, items }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Check if any child link inside this dropdown is currently active
  const isChildActive = items.some((item) => pathname === item.href);

  // Handlers to prevent the menu from closing when moving mouse between trigger and menu
  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <Dropdown
        placement="bottom-start"
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        // This ensures the menu stays open when the mouse is over it
        classNames={{
          content: "min-w-[200px] mt-0",
        }}
      >
        <DropdownTrigger>
          {/* Use a div or span that accepts refs for the Trigger */}
          <div
            role="button"
            className={cn(
              "inline-flex items-center gap-1 cursor-pointer text-default-600 hover:text-primary transition-colors text-[15px] select-none outline-none py-2 px-1",
              isChildActive && "font-semibold text-primary",
            )}
          >
            {label}
            <svg
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-200",
                isOpen && "rotate-180",
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </DropdownTrigger>

        <DropdownMenu
          aria-label={`${label} sub-navigation`}
          variant="flat"
          // Keep menu open if mouse is hovering over the menu itself
          onMouseEnter={openMenu}
          onAction={() => setIsOpen(false)}
        >
          {items.map((subItem) => (
            <DropdownItem
              key={subItem.href}
              as={Link}
              href={subItem.href}
              description={subItem.description}
              className={cn(
                "py-2",
                pathname === subItem.href &&
                  "text-primary bg-primary/10 font-medium",
              )}
            >
              {subItem.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
