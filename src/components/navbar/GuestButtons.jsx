import { Button } from "@heroui/react";
import Link from "next/link";

function GuestButtons() {
  return (
    <>
      <span
        className="hidden h-5 w-px md:inline-block"
        style={{ backgroundColor: "var(--border-default)" }}
        aria-hidden="true"
      />

      <Link
        href="/signin"
        className="text-sm font-medium transition-colors hover:text-(--color-primary)"
        style={{ color: "var(--text-secondary)" }}
      >
        Sign In
      </Link>

      <Link href={"/signup"}>
        <Button
          radius="md"
          className="btn-primary text-sm font-medium transition-all duration-150"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          Get Started
        </Button>
      </Link>
    </>
  );
}

export default GuestButtons;
