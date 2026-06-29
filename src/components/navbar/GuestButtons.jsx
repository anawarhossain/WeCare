import { Button } from "@heroui/react";
import Link from "next/link";

function GuestButtons() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
      <span
        className="hidden h-5 w-px md:inline-block bg-(--border-default)"
        aria-hidden="true"
      />

      <Link
        href="/signin"
        className="w-full sm:w-auto text-center text-sm font-medium transition-colors text-(--text-secondary) hover:text-(--color-primary) py-2"
      >
        Sign In
      </Link>

      <Link href="/signup" className="w-full sm:w-auto">
        <Button
          radius="md"
          className="btn-primary w-full sm:w-auto text-sm font-medium transition-all duration-150"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          Get Started
        </Button>
      </Link>
    </div>
  );
}

export default GuestButtons;
