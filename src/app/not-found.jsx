import Link from "next/link";
import { TbHelp } from "react-icons/tb";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdMedicalServices, MdOutlineSupportAgent } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import InteractiveIllustration from "@/components/common/InteractiveIllustration";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: "var(--bg-base)",
        color: "var(--text-primary)",
      }}
    >
      {/* Top Nav */}
      <header className="flex justify-center items-center w-full py-8 fixed top-0 left-0 right-0 z-50 bg-transparent">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="text-3xl flex items-center"
            style={{
              color: "var(--color-primary)",
            }}
          >
            <MdMedicalServices />
          </span>
          <span
            className="text-xl font-bold tracking-tight"
            style={{ color: "var(--color-primary)" }}
          >
            WeCare
          </span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="grow flex items-center justify-center px-4 md:px-8 py-20">
        <div className="max-w-7xl w-full flex flex-col items-center text-center">
          {/* Interactive Illustration (Client Side Island) */}
          <InteractiveIllustration />

          {/* Text */}
          <div className="space-y-4 max-w-lg">
            <h1
              className="text-7xl md:text-8xl font-extrabold leading-none"
              style={{ color: "var(--color-primary)" }}
            >
              404
            </h1>
            <h2
              className="text-2xl font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Oops! This page took a wrong turn.
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              We couldn&apos;t find the page you were looking for. Let&apos;s get you back
              on track with our clinical care team.
            </p>

            {/* CTA */}
            <div className="pt-8">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md font-semibold text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 group"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "var(--text-on-primary)",
                }}
              >
                <span className="text-xl group-hover:-translate-x-1 transition-transform flex items-center">
                  <BiArrowBack />
                </span>
                Back to Home
              </Link>
            </div>
          </div>

          {/* Secondary Links - Using Tailwind for Hover instead of JS states */}
          <nav className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4">
            {[
              { icon: <TbHelp />, label: "Help Center", href: "/help" },
              {
                icon: <FaRegCalendarAlt />,
                label: "Book Appointment",
                href: "/find-doctors",
              },
              {
                icon: <MdOutlineSupportAgent />,
                label: "Contact Support",
                href: "/contact",
              },
            ].map(({ icon, label, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors text-(--text-muted) hover:text-(--color-primary)"
              >
                <span className="text-base flex items-center">{icon}</span>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </main>

      {/* Footer Decoration */}
      <footer className="w-full py-6 flex justify-center opacity-30 pointer-events-none">
        <div className="flex space-x-12">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1 w-24 rounded-full"
              style={{ backgroundColor: "var(--color-primary)" }}
            />
          ))}
        </div>
      </footer>
    </div>
  );
}
