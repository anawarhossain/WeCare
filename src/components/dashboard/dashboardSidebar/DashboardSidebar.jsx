// ✅ Server Component
// Design: left sidebar — logo, user info, nav links, settings

import Image from "next/image";
import Link from "next/link";
import { getUserSession } from "@/lib/core/session";
import { SidebarNavLinks } from "./SidebarNavLinks";
import { UserAvatar } from "@/components/navbar/UserAvatar";

// ── Role badge ────────────────────────────────────────────────
function RoleBadge({ role }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
      {role ?? "Member"}
    </span>
  );
}

// ── Premium badge (design-এ আছে) ─────────────────────────────
function PremiumBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-linear-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/20">
      <svg
        className="w-2.5 h-2.5"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      Premium Account
    </span>
  );
}

export default async function DashboardSidebar() {
  const user = await getUserSession();

  return (
    <aside className="w-fit shrink-0 min-h-screen bg-[#0a0a0a] border-r border-white/6 flex flex-col">
      {/* ── Logo ── */}
      <div className="h-15 flex items-center px-5 border-b border-white/6 shrink-0">
        <Link
          href="/"
          className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
        >
          <div className="relative h-6 w-24">
            <Image
              src="/jobsift_logo.png"
              alt="HireLoop"
              fill
              sizes="96px"
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>
      </div>

      {/* ── User info block ── */}
      <div className="px-4 py-5 border-b border-white/6 shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <UserAvatar
            name={user?.name ?? ""}
            image={user?.image ?? null}
            size="lg"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-white truncate leading-tight">
              {user?.name ?? "User"}
            </span>
            <RoleBadge role={user?.role} />
          </div>
        </div>
        <PremiumBadge />
      </div>

      {/* ── Nav links — client for active state ── */}
      <div className="flex-1 py-4 overflow-y-auto">
        <SidebarNavLinks role={user?.role} />
      </div>
    </aside>
  );
}
