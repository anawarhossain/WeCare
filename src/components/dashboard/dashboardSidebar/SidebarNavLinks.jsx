"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  doctorMenuItems,
  patientMenuItems,
  adminMenuItems,
} from "@/components/common/menuItems";
import { useState } from "react";
import { Spinner } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

function getNavItems(role) {
  if (role === "doctor") return doctorMenuItems;
  if (role === "admin") return adminMenuItems;
  return patientMenuItems;
}

export function SidebarNavLinks({ role }) {

  
    const router = useRouter();
  // const [loggingOut, setLoggingOut] = useState(false);


  const pathname = usePathname();
  const navItems = getNavItems(role);



  // const handleSignOut = async () => {
  //   setLoggingOut(true);
  //   try {
  //     await authClient.signOut();
  //     router.push("/");
  //     router.refresh();
  //   } catch {
  //     setLoggingOut(false);
  //   }
  // };

  return (
    <>
      <nav aria-label="Dashboard navigation">
        <ul className="flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            // Exact match for root dashboard routes, prefix match for nested routes
            const isDashboard =
              item.href === `/${pathname.split("/").slice(1, 3).join("/")}`;
            const isActive = isDashboard
              ? pathname === item.href
              : pathname?.startsWith(item.href);

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
                      e.currentTarget.style.color = "#ffffff";
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

      {/* <div className="py-2 px-2">
          <button
            role="menuitem"
            onClick={handleSignOut}
            disabled={loggingOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed group hover:bg-red-500/10"
            style={{ color: "var(--danger-600)" }}
          >
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: "var(--danger-50)" }}
            >
              {loggingOut ? (
                <Spinner />
              ) : (
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              )}
            </span>
            {loggingOut ? "Signing out…" : "Sign Out"}
          </button>
        </div> */}
    </>
  );
}
