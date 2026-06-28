// components/about/AboutHero.jsx
// Presentational Server Component

import { MdVerified, MdHealthAndSafety } from "react-icons/md";
import { FaUserMd, FaHospital } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function AboutHero() {
  return (
    <section
      className="relative overflow-hidden pt-24 pb-20"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* Background decorative blobs */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-125 h-125 rounded-full blur-3xl opacity-30"
        style={{ backgroundColor: "var(--primary-100)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-20 w-100 h-100 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: "var(--secondary-100)" }}
      />

      <div className="relative z-10 max-w-300 mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        {/* Left — Text */}
        <div>
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5"
            style={{
              backgroundColor: "var(--color-primary-light)",
              color: "var(--color-primary)",
            }}
          >
            About WeCare
          </span>

          <h1
            className="text-4xl md:text-5xl font-bold leading-tight mb-5"
            style={{ color: "var(--text-primary)" }}
          >
            Connecting Patients with{" "}
            <span style={{ color: "var(--color-primary)" }}>
              Trusted Care
            </span>
          </h1>

          <p
            className="text-base leading-relaxed mb-8 max-w-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            WeCare bridges the gap between world-class medical expertise and
            everyday patient convenience — making quality healthcare accessible,
            transparent, and human.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/find-doctors"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-lg"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--text-on-primary)",
              }}
            >
              <FaUserMd size={15} />
              Find a Doctor
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-sm font-semibold border transition-all duration-200 hover:bg-(--bg-muted)"
              style={{
                borderColor: "var(--border-default)",
                color: "var(--text-secondary)",
              }}
            >
              Contact Us
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 mt-8">
            {[
              { Icon: MdVerified, text: "Verified Specialists" },
              { Icon: MdHealthAndSafety, text: "HIPAA Compliant" },
              { Icon: FaHospital, text: "50+ Partner Hospitals" },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon size={15} style={{ color: "var(--color-success)" }} />
                <span
                  className="text-xs font-semibold"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Image with floating card */}
        <div className="relative">
          <div className="relative rounded-[28px] overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1666214280429-51e4bfce59ac?w=700&q=80"
              alt="Doctor consulting with patient"
              className="w-full h-105 object-cover"
              fill
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, var(--primary-900) 0%, transparent 60%)",
                opacity: 0.35,
              }}
            />
          </div>

          {/* Floating stat card */}
          <div
            className="absolute -bottom-5 -left-5 rounded-4xl px-5 py-4 shadow-xl flex items-center gap-4"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-default)",
            }}
          >
            <div
              className="w-11 h-11 rounded-[10px] flex items-center justify-center shrink-0"
              style={{ backgroundColor: "var(--color-primary-light)" }}
            >
              <FaUserMd size={20} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <p
                className="text-xl font-bold leading-none"
                style={{ color: "var(--text-primary)" }}
              >
                500+
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "var(--text-muted)" }}
              >
                Verified Specialists
              </p>
            </div>
          </div>

          {/* Floating rating card */}
          <div
            className="absolute -top-4 -right-4 rounded-4xl px-4 py-3 shadow-xl"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-default)",
            }}
          >
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4"
                  fill={i < 5 ? "var(--accent-500)" : "none"}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p
              className="text-xs font-bold mt-1"
              style={{ color: "var(--text-primary)" }}
            >
              4.9/5 Patient Rating
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
