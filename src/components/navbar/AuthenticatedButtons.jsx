import Link from "next/link";
import { UserDropdown } from "./UserDropdown";

function AuthenticatedButtons({ user }) {
  const role = user?.user?.role ?? user?.role;
  const dashboardHref = `/dashboard/${
    role === "doctor" ? "doctor" : role === "admin" ? "admin" : "patient"}`;

  return (
    <>
      <span
        className="hidden h-5 w-px bg-zinc-700/80 md:inline-block"
        aria-hidden="true"
      />

      {/* Mobile only — simple Dashboard link, no dropdown */}
      <Link
        href={dashboardHref}
        className="text-sm font-medium md:hidden"
        style={{ color: "var(--text-secondary)" }}
      >
        Dashboard
      </Link>

      {/* Desktop only — full dropdown */}
      <div className="hidden md:block">
        <UserDropdown user={user} />
      </div>
    </>
  );
}

export default AuthenticatedButtons;
