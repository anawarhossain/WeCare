// components/contact/ContactHero.jsx
// Presentational Server Component

import { MdHeadsetMic } from "react-icons/md";

export default function ContactHero() {
  return (
    <div className="text-center mb-12">
      {/* Icon pill */}
      <div
        className="inline-flex items-center justify-center w-14 h-14 rounded-[14px] mb-5"
        style={{ backgroundColor: "var(--color-primary-light)" }}
      >
        <MdHeadsetMic size={28} style={{ color: "var(--color-primary)" }} />
      </div>

      <span
        className="block text-xs font-bold uppercase tracking-widest mb-3"
        style={{ color: "var(--color-primary)" }}
      >
        We&apos;re Here to Help
      </span>

      <h1
        className="text-3xl md:text-4xl font-bold leading-tight mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        Contact Us
      </h1>

      <p
        className="text-base max-w-xl mx-auto leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        Have a question, feedback, or need assistance? Our dedicated support
        team is ready to help you — reach out anytime.
      </p>
    </div>
  );
}
