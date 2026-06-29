"use client";
import Link from "next/link";
import { UserDropdown } from "./UserDropdown";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function AuthenticatedButtons({ user, doctor }) {
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();
  // console.log("user", user.id);
  const role = user?.user?.role ?? user?.role;
  const dashboardHref = `/dashboard/${
    role === "doctor" ? "doctor" : role === "admin" ? "admin" : "patient"
  }`;

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
    <>
      <span
        className="hidden h-5 w-px md:inline-block bg-(--border-default)"
        aria-hidden="true"
      />

      {/* Mobile only — simple Dashboard link, no dropdown */}
      <div className="flex justify-between w-full gap-2">
        {role === "doctor" &&
        (!doctor || doctor.message === "Doctor not found") ? (
          <Link
            href={`/doctor/create-profile?userId=${user?.id}`}
            className="w-full text-center text-sm font-medium py-2 px-4 rounded-xl md:hidden transition-colors bg-(--bg-surface) text-(--text-primary) border border-(--border-default) hover:bg-(--bg-muted)"
          >
            Create Doctor Profile
          </Link>
        ) : (
          <Link
            href={dashboardHref}
            className="w-full text-center text-sm font-medium py-2 px-4 rounded-xl md:hidden transition-colors bg-(--bg-surface) text-(--text-primary) border border-(--border-default) hover:bg-(--bg-muted)"
          >
            Go to Dashboard
          </Link>
        )}

        <button
          onClick={handleSignOut}
          className="w-full text-center text-sm font-medium py-2 px-4 rounded-xl md:hidden transition-colors bg-(--bg-surface) text-(--text-primary) border border-(--border-default) hover:bg-(--bg-muted)"
          style={{ color: "var(--danger-600)" }}
        >
          LogOut
        </button>
      </div>

      {/* Desktop only — full dropdown */}
      <div className="hidden md:block">
        <UserDropdown user={user} doctor={doctor} />
      </div>
    </>
  );
}

export default AuthenticatedButtons;
