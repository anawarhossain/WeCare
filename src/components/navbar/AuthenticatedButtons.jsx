import Link from "next/link";
import { UserDropdown } from "./UserDropdown";

// Logged-in UI — passes user data to client dropdown
function AuthenticatedButtons({ user }) {

  console.log("user", user.role);

  return (
    <>
      <span
        className="hidden h-5 w-px bg-zinc-700/80 md:inline-block"
        aria-hidden="true"
      />

      {/* Post a Job — only visible when logged in */}
      <Link
        href="/post-job"
        className="hidden md:inline-flex items-center justify-center rounded-xl border text-sm font-medium px-4 py-2 transition-all duration-150"
      >
        {user?.role === "doctor" ? "Post" : "apply Job"}
      </Link>

      {/* Client component — only the dropdown interaction is client-side */}
      <UserDropdown user={user} />
    </>
  );
}

export default AuthenticatedButtons;