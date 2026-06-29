// app/signin/page.jsx
// Left side: static hero panel (Server) | Right side: form (Client)

import SignInForm from "@/components/auth/signInForm";
import { BiSupport } from "react-icons/bi";
import { FaLock } from "react-icons/fa";
import { MdHealthAndSafety, MdVerified, MdVerifiedUser } from "react-icons/md";


export const metadata = {
  title: "Sign In | WeCare",
  description:
    "Sign in to your WeCare account to manage appointments and healthcare records.",
};

// ── Static trust signals (server-rendered, no JS) ────────────
const TRUST_ITEMS = [
  { icon: <MdVerifiedUser />, text: "HIPAA Compliant & Secure" },
  { icon: <FaLock />, text: "End-to-End Encrypted Data" },
  { icon: <BiSupport />, text: "24/7 Clinical Support" },
];

export default function SignInPage() {
  return (
    <main
      className="flex h-screen w-full overflow-hidden"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* ── LEFT: Hero Panel ───────────────────────────────── */}
      <section className="hidden lg:flex lg:w-1/2 h-full relative overflow-hidden flex-col justify-end">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAaI-6aGpUPHHKAwgsr7-0OG_Lgpt63HXjxK_XjfBtbGLI6wDYyj_vjnEkRDZ1XzBDyrJSHhdaSA0jeVOVBDxBQOxEYuN3ITeTQoSApU2bbdUgkjggdQ6l4YlksX4agzy-4mfvBhnM79QeAv4CRRm_aMO9NgJVKefuvVG1xMs7L4D0rS4eGRG857TUM3vNd7HeBM6wigbNk-xFcmC8r61i--cv6q-sYL47-KUcPbg8ObeA6zjtVn0JU3XFi9gUY9ZE54m6euoE62ZM')`,
          }}
        />

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(12,74,110,0.85) 0%, rgba(12,74,110,0.3) 50%, transparent 100%)",
          }}
        />

        {/* Bottom content */}
        <div className="relative z-10 p-10 space-y-6">
          {/* Brand */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className=" text-3xl text-white"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              <MdHealthAndSafety />
            </span>
            <span className="text-2xl font-bold text-white tracking-tight">
              WeCare
            </span>
          </div>

          {/* Quote card */}
          <div
            className="p-6 rounded-2xl border"
            style={{
              backgroundColor: "rgba(255,255,255,0.10)",
              borderColor: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
            }}
          >
            <p className="text-lg font-medium text-white leading-relaxed mb-4">
              &quot;Empowering clinical excellence through intuitive management.&nbsp;
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: "var(--primary-600)" }}
              >
                <span
                  className=" text-[18px] text-white"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  <MdVerified />
                </span>
              </div>
              <span
                className="text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                Trusted by 5,000+ Practitioners
              </span>
            </div>
          </div>

          {/* Trust signals */}
          <div className="flex flex-col gap-3">
            {TRUST_ITEMS.map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                >
                  <span
                    className=" text-[17px]"
                    style={{ color: "var(--primary-200)" }}
                  >
                    {icon}
                  </span>
                </div>
                <span
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RIGHT: Form Panel ──────────────────────────────── */}
      <section
        className="w-full lg:w-1/2 h-full flex items-center justify-center p-6 overflow-y-auto"
        style={{ backgroundColor: "var(--bg-base)" }}
      >
        <SignInForm />
      </section>
    </main>
  );
}
