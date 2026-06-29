"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import DoctorCreateModal from "./DoctorCreateModal";
import { UserAvatar } from "./UserAvatar";
import {
  adminMenuItems,
  doctorMenuItems,
  patientMenuItems,
} from "../common/menuItems";

function ChevronIcon({ open }) {
  return (
    <svg
      className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      style={{ color: "var(--text-muted)" }}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      className="w-3.5 h-3.5 animate-spin"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export function UserDropdown({ user, doctor }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const dropdownRef = useRef(null);
  const role = user?.role;
  
  console.log("doctor data form userDropdown", doctor);

  function getNavItems(role) {
    if (role === "doctor") return doctorMenuItems;
    if (role === "admin") return adminMenuItems;
    return patientMenuItems;
  }

  const menuItems = getNavItems(role);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  const handleSignOut = async () => {
    setLoggingOut(true);
    try {
      await authClient.signOut();
      router.push("/");
      router.refresh();
    } catch {
      setLoggingOut(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="User menu"
        className="flex items-center gap-2 rounded-xl border px-2.5 py-1.5 transition-all duration-150"
        style={{
          borderColor: "var(--border-default)",
          backgroundColor: "var(--bg-surface)",
        }}
      >
        <UserAvatar name={user?.name} image={user?.image} size="sm" />
        <span
          className="hidden sm:block text-sm font-medium max-w-30 truncate"
          style={{ color: "var(--text-primary)" }}
        >
          {user?.name?.split(" ")[0] ?? "Account"}
        </span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="User menu"
          className="absolute right-0 top-[calc(100%+10px)] w-64 rounded-2xl border backdrop-blur-xl shadow-xl overflow-hidden z-50 transition-all duration-200"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-default)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <div
            className="flex items-center gap-3 px-4 py-4 border-b"
            style={{ borderColor: "var(--border-default)" }}
          >
            <UserAvatar name={user?.name} image={user?.image} size="md" />
            <div className="flex flex-col min-w-0">
              <span
                className="text-sm font-semibold truncate"
                style={{ color: "var(--text-primary)" }}
              >
                {user?.name}
              </span>
              <span
                className="text-xs truncate"
                style={{ color: "var(--text-muted)" }}
              >
                {user?.email}
              </span>
            </div>
          </div>

          <div className="py-2 px-2 flex flex-col gap-0.5">
            {role === "doctor" &&
            (!doctor || doctor.message === "Doctor not found") ? (
              <button
                onClick={() => {
                  setOpen(false);
                  setShowDoctorModal(true);
                }}
                className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-xl text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Create Professional Profile
              </button>
            ) : (
              <div>
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-150 group hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0">
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div
            className="h-px mx-2"
            style={{ backgroundColor: "var(--border-default)" }}
          />

          <div className="py-2 px-2">
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
          </div>
        </div>
      )}

      <DoctorCreateModal
        open={showDoctorModal}
        setOpen={setShowDoctorModal}
        userId={user?.id}
      />
    </div>
  );
}
