"use client";
import { doctorMenuItems, patientMenuItems } from "@/components/common/menuItems";
// Active link highlight-এর জন্য usePathname দরকার — তাই client

import Link from "next/link";
import { usePathname } from "next/navigation";

// ── Icons ─────────────────────────────────────────────────────
function NavIcon({ d, d2 }) {
  return (
    <svg
      className="w-4 h-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
      {d2 && <path strokeLinecap="round" strokeLinejoin="round" d={d2} />}
    </svg>
  );
}


export function SidebarNavLinks({ role }) {
  const pathname = usePathname();
  const navItems = role === "doctor" ? doctorMenuItems : patientMenuItems;

  return (
    <nav aria-label="Dashboard navigation">
      <ul className="flex flex-col gap-0.5 px-3">
        {navItems.map((item) => {
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
                className={
                  isActive
                    ? "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-600/20 border border-indigo-500/20 relative"
                    : "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-500 hover:text-zinc-200 hover:bg-white/5 transition-all duration-150"
                }
              >
                {/* Active left indicator */}
                {isActive && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-400 rounded-full"
                    aria-hidden="true"
                  />
                )}
                {/* Icon */}
                <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0">
                  {item.icon}
                </span>
                {/* Label */}
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
