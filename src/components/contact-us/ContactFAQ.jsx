"use client";
// components/contact/ContactFAQ.jsx
// Client Component — accordion toggle

import { useState } from "react";
import { MdExpandMore, MdHelpOutline } from "react-icons/md";

const FAQS = [
  {
    q: "How do I book an appointment on WeCare?",
    a: "Go to our Doctors page, choose your specialist, select an available slot, and complete payment via Stripe. You'll receive a confirmation email instantly.",
  },
  {
    q: "Can I cancel or reschedule an appointment?",
    a: "Yes. Visit your dashboard under 'My Appointments' and use the reschedule or cancel option. Cancellations made 24 hours prior are fully refunded.",
  },
  {
    q: "How do I get my prescription after a consultation?",
    a: "After the appointment is marked as completed by the doctor, your e-prescription will be available for download from your patient dashboard.",
  },
  {
    q: "Is my medical data secure on WeCare?",
    a: "Absolutely. All data is encrypted at rest and in transit. We comply with HIPAA standards and never share your information without explicit consent.",
  },
];

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border rounded-3xl overflow-hidden transition-all duration-200"
      style={{
        borderColor: open ? "var(--border-focus)" : "var(--border-default)",
        backgroundColor: "var(--bg-card)",
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span
          className="text-sm font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          {faq.q}
        </span>
        <MdExpandMore
          size={20}
          className="shrink-0 transition-transform duration-300"
          style={{
            color: "var(--text-muted)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {open && (
        <div
          className="px-5 pb-4 text-sm leading-relaxed border-t"
          style={{
            color: "var(--text-secondary)",
            borderColor: "var(--border-default)",
          }}
        >
          <p className="pt-3">{faq.a}</p>
        </div>
      )}
    </div>
  );
}

export default function ContactFAQ() {
  return (
    <div
      className="rounded-[20px] border p-7 md:p-9"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: "var(--border-default)",
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0"
          style={{ backgroundColor: "var(--color-primary-light)" }}
        >
          <MdHelpOutline size={20} style={{ color: "var(--color-primary)" }} />
        </div>
        <div>
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            Quick Answers
          </span>
          <h2
            className="text-lg font-bold mt-0.5"
            style={{ color: "var(--text-primary)" }}
          >
            Frequently Asked Questions
          </h2>
        </div>
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <FAQItem key={i} faq={faq} index={i} />
        ))}
      </div>
    </div>
  );
}
