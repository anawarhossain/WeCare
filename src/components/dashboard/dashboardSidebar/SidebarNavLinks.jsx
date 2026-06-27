"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  doctorMenuItems,
  patientMenuItems,
  adminMenuItems,
} from "@/components/common/menuItems";

function getNavItems(role) {
  if (role === "doctor") return doctorMenuItems;
  if (role === "admin") return adminMenuItems;
  return patientMenuItems;
}

export function SidebarNavLinks({ role }) {
  const pathname = usePathname();
  const navItems = getNavItems(role);

  return (
    <nav aria-label="Dashboard navigation">
      <ul className="flex flex-col gap-1 px-3">
        {navItems.map((item) => {
          // Exact match for root dashboard routes, prefix match for nested routes
          const isDashboard =
            item.href === `/${pathname.split("/").slice(1, 3).join("/")}`;
          const isActive = isDashboard
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative group"
                style={{
                  backgroundColor: isActive
                    ? "var(--color-primary-light)"
                    : "transparent",
                  color: isActive ? "var(--color-primary)" : "#ffffff",
                  border: isActive
                    ? "1px solid var(--color-primary)"
                    : "1px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor =
                      "var(--sidebar-hover)";
                    e.currentTarget.style.color = "var(--text-primary)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--text-secondary)";
                  }
                }}
              >
                {/* Active Left Glow Indicator */}
                {isActive && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full"
                    style={{ backgroundColor: "var(--color-primary)" }}
                    aria-hidden="true"
                  />
                )}

                {/* Icon Wrapper */}
                <span
                  className="size-5 flex items-center justify-center shrink-0 transition-colors"
                  style={{
                    color: isActive
                      ? "var(--color-primary)"
                      : "var(--text-muted)",
                  }}
                >
                  {item.icon}
                </span>

                {/* Label */}
                <span className="truncate">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
