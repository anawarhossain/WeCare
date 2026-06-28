// components/about/AboutCTA.jsx
// Presentational Server Component

import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";

export default function AboutCTA({ session }) {
  return (
    <section
      className="py-20 px-6 md:px-8"
      style={{ backgroundColor: "var(--bg-surface)" }}
    >
      <div className="max-w-300 mx-auto">
        <div
          className="relative overflow-hidden rounded-[28px] px-10 py-16 md:px-20 md:py-20 text-center shadow-2xl"
          style={{ backgroundColor: "var(--primary-700)" }}
        >
          {/* Decorative background blobs */}
          <div
            className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: "var(--primary-300)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-16 w-56 h-56 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: "var(--secondary-200)" }}
          />

          <div className="relative z-10">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5"
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              Get Started Today
            </span>

            <h2
              className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
              style={{ color: "#ffffff" }}
            >
              Ready to Experience Better Care?
            </h2>

            <p
              className="text-base mb-10 max-w-xl mx-auto leading-relaxed"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              Join WeCare today and connect with the best medical professionals
              in minutes. Your health journey starts here — and we walk every
              step with you.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {session ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[10px] text-sm font-bold transition-all duration-200 hover:shadow-2xl hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "var(--primary-700)",
                  }}
                >
                  <FaUserPlus size={15} />
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[10px] text-sm font-bold transition-all duration-200 hover:shadow-2xl hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "var(--primary-700)",
                  }}
                >
                  <FaUserPlus size={15} />
                  Register Now
                </Link>
              )}

              <Link
                href="/find-doctors"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[10px] text-sm font-bold border transition-all duration-200 hover:bg-white/10"
                style={{
                  borderColor: "rgba(255,255,255,0.4)",
                  color: "#ffffff",
                }}
              >
                Browse Doctors
                <MdArrowForward size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
