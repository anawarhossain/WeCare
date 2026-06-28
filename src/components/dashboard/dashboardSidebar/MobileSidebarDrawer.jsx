"use client";

import { useOverlayState } from "@heroui/react";
import { Button, Drawer } from "@heroui/react";
import { useRouter } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { UserAvatar } from "@/components/navbar/UserAvatar";
import {
  doctorMenuItems,
  patientMenuItems,
  adminMenuItems,
} from "@/components/common/menuItems";
import { usePathname } from "next/navigation";
import Link from "next/link";

function getNavItems(role) {
  if (role === "doctor") return doctorMenuItems;
  if (role === "admin") return adminMenuItems;
  return patientMenuItems;
}

function RoleBadge({ role }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-linear-to-r from-(--color-primary)/10 to-(--color-primary)/20 text-(--color-primary) border border-(--color-primary)/20">
      {role ?? "Member"}
    </span>
  );
}

export function MobileSidebarDrawer({ user }) {
  const state = useOverlayState({ defaultOpen: false });
  const pathname = usePathname();
  const router = useRouter();
  const navItems = getNavItems(user?.role);

  function handleNavClick(href) {
    state.close(); // আগে drawer বন্ধ করো
    router.push(href); // তারপর navigate করো
  }

  return (
    <Drawer>
      {/* Trigger */}
      <Button
        isIconOnly
        variant="light"
        aria-label="Open navigation menu"
        onPress={() => state.open()}
        className="text-(--text-primary)"
      >
        <RxHamburgerMenu className="size-5" />
      </Button>

      <Drawer.Backdrop>
        <Drawer.Content
          placement="left"
          className="w-64 max-w-[80vw]"
          style={{ backgroundColor: "" }}
          isOpen={state.isOpen}
          onOpenChange={state.setOpen}
        >
          <Drawer.Dialog className="flex flex-col h-full rounded-none shadow-xl">
            <Drawer.CloseTrigger />

            {/* User Info */}
            <Drawer.Header
              className="px-5 py-5 border-b shrink-0"
              style={{ borderColor: "var(--border-default)" }}
            >
              <Link href="/" className="flex items-center gap-3 w-full">
                <UserAvatar
                  name={user?.name ?? ""}
                  image={user?.image ?? null}
                  size="lg"
                  className="ring-2 ring-(--color-primary)/20"
                />
                <div className="flex flex-col min-w-0">
                  <span
                    className="text-sm font-semibold truncate leading-tight mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {user?.name ?? "User"}
                  </span>
                  <RoleBadge role={user?.role} />
                </div>
              </Link>
            </Drawer.Header>

            {/* Nav Items */}
            <Drawer.Body className="flex-1  py-4 overflow-y-auto custom-scrollbar px-0">
              <nav aria-label="Dashboard navigation">
                <ul className="flex flex-col gap-1 px-3">
                  {navItems.map((item) => {
                    const isDashboard =
                      item.href ===
                      `/${pathname.split("/").slice(1, 3).join("/")}`;
                    const isActive = isDashboard
                      ? pathname === item.href
                      : pathname?.startsWith(item.href);

                    return (
                      <li key={item.href}>
                        <button
                          onClick={() => handleNavClick(item.href)}
                          aria-current={isActive ? "page" : undefined}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative"
                          style={{
                            backgroundColor: isActive
                              ? "var(--color-primary-light)"
                              : "transparent",
                            color: isActive
                              ? "var(--color-primary)"
                              : "var(--text-secondary)",
                            border: isActive
                              ? "1px solid var(--color-primary)"
                              : "1px solid transparent",
                          }}
                        >
                          {isActive && (
                            <span
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full"
                              style={{
                                backgroundColor: "var(--color-primary)",
                              }}
                              aria-hidden="true"
                            />
                          )}
                          <span
                            className="size-5 flex items-center justify-center shrink-0"
                            style={{
                              color: isActive
                                ? "var(--color-primary)"
                                : "var(--text-muted)",
                            }}
                          >
                            {item.icon}
                          </span>
                          <span className="truncate">{item.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
