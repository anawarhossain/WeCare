// app/signup/page.jsx
// Left: static hero panel (Server) | Right: form (Client)

import SignUpForm from "@/components/auth/SignUpForm";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdHealthAndSafety, MdPayments, MdVerifiedUser } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { TbFileDescription } from "react-icons/tb";

export const metadata = {
  title: "Create Account | WeCare",
  description:
    "Join WeCare to connect with doctors and manage your health profile.",
};

const FEATURES = [
  { icon: <SlCalender />, text: "Effortless appointment scheduling" },
  { icon: <TbFileDescription />, text: "Secure digital health records" },
  { icon: <MdPayments />, text: "Seamless consultation payments" },
  {
    icon: <IoMdNotificationsOutline />,
    text: "Real-time appointment reminders",
  },
];

export default function SignUpPage() {
  return (
    <main
      className="flex min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* ── LEFT hero ──────────────────────────────────────── */}
      <section className="hidden lg:flex lg:w-1/2 min-h-screen relative overflow-hidden flex-col justify-end">
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAaI-6aGpUPHHKAwgsr7-0OG_Lgpt63HXjxK_XjfBtbGLI6wDYyj_vjnEkRDZ1XzBDyrJSHhdaSA0jeVOVBDxBQOxEYuN3ITeTQoSApU2bbdUgkjggdQ6l4YlksX4agzy-4mfvBhnM79QeAv4CRRm_aMO9NgJVKefuvVG1xMs7L4D0rS4eGRG857TUM3vNd7HeBM6wigbNk-xFcmC8r61i--cv6q-sYL47-KUcPbg8ObeA6zjtVn0JU3XFi9gUY9ZE54m6euoE62ZM')`,
          }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(12,74,110,0.90) 0%, rgba(12,74,110,0.35) 55%, transparent 100%)",
          }}
        />

        {/* Bottom content */}
        <div className="relative z-10 p-10 space-y-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
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

          {/* Headline */}
          <div>
            <h2 className="text-3xl font-bold text-white leading-tight mb-2">
              Your health journey <br /> starts here.
            </h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.70)" }}>
              Join thousands of patients and doctors already on the platform.
            </p>
          </div>

          {/* Feature list */}
          <ul className="space-y-3">
            {FEATURES.map(({ icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                >
                  <span
                    className=" text-[18px]"
                    style={{
                      color: "var(--primary-200)",
                      fontVariationSettings: "'FILL' 1",
                    }}
                  >
                    {icon}
                  </span>
                </div>
                <span
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.80)" }}
                >
                  {text}
                </span>
              </li>
            ))}
          </ul>

          {/* Trust badge */}
          <div
            className="flex items-center gap-3 p-4 rounded-xl border"
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              borderColor: "rgba(255,255,255,0.15)",
            }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "var(--primary-600)" }}
            >
              <span
                className=" text-[18px] text-white"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                <MdVerifiedUser />
              </span>
            </div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.80)" }}>
              Trusted by{" "}
              <strong className="text-white">5,000+ practitioners</strong>{" "}
              across the network
            </p>
          </div>
        </div>
      </section>

      {/* ── RIGHT form ─────────────────────────────────────── */}
      <section
        className="w-full lg:w-1/2 flex items-start justify-center p-6 py-10 overflow-y-auto"
        style={{ backgroundColor: "var(--bg-base)" }}
      >
        <SignUpForm />
      </section>
    </main>
  );
}
