// ✅ Server Component
// Design: left sidebar — logo, user info, nav links, settings
// Mobile: HeroUI Drawer triggered by hamburger button

import Image from "next/image";
import Link from "next/link";
import { getUserSession } from "@/lib/core/session";
import { SidebarNavLinks } from "./SidebarNavLinks";
import { UserAvatar } from "@/components/navbar/UserAvatar";
import { MobileSidebarDrawer } from "./MobileSidebarDrawer";

// ── Role badge ────────────────────────────────────────────────
function RoleBadge({ role }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-linear-to-r from-(--color-primary)/10 to-(--color-primary)/20 text-(--color-primary) border border-(--color-primary)/20">
      {role ?? "Member"}
    </span>
  );
}

export default async function DashboardSidebar() {
  const user = await getUserSession();

  return (
    <>
      {/* ── Mobile: Hamburger + Drawer (visible on small screens) ── */}
      <div className="lg:hidden">
        <MobileSidebarDrawer user={user} />
      </div>

      {/* ── Desktop: Static Sidebar (hidden on small screens) ── */}
      <aside
        className="hidden lg:flex w-64 shrink-0 min-h-screen border-r flex-col transition-colors duration-200"
        style={{
          backgroundColor: "var(--sidebar-bg)",
          borderColor: "var(--border-default)",
        }}
      >
        {/* ── User info block ── */}
        <div
          className="px-5 py-5 border-b shrink-0"
          style={{ borderColor: "var(--border-default)" }}
        >
          <div className="flex items-center gap-3">
            <UserAvatar
              name={user?.name ?? ""}
              image={user?.image ?? null}
              size="lg"
              className="ring-2 ring-(--color-primary)/20"
            />
            <div className="flex flex-col min-w-0">
              <span
                className="text-sm font-semibold truncate leading-tight mb-1"
                style={{ color: "#ffffff" }}
              >
                {user?.name ?? "User"}
              </span>
              <RoleBadge role={user?.role} />
            </div>
          </div>
        </div>

        {/* ── Nav links — client for active state ── */}
        <div className="flex-1 py-4 overflow-y-auto custom-scrollbar">
          <SidebarNavLinks role={user?.role} />
        </div>
      </aside>
    </>
  );
}
