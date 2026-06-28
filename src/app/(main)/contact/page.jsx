// app/contact/page.jsx
// ✅ Server Component — public page, no auth required

import ContactFAQ from "@/components/contact-us/ContactFAQ";
import ContactForm from "@/components/contact-us/ContactForm";
import ContactHero from "@/components/contact-us/ContactHero";
import ContactInfoPanel from "@/components/contact-us/ContactInfoPanel";
import ContactMap from "@/components/contact-us/ContactMap";



export const metadata = {
  title: "Contact Us | WeCare",
  description:
    "Get in touch with WeCare's support team. We're available 24/7 for emergencies and respond to general inquiries within 24 hours.",
};

export default function ContactPage() {
  return (
    <main
      className="min-h-screen py-16 px-6 md:px-8"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="max-w-300 mx-auto">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <ContactHero />

        {/* ── Main grid: Info panel (left) + Form (right) ──────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
          {/* Left — contact info (2/5 width) */}
          <div className="lg:col-span-2">
            <ContactInfoPanel />
          </div>

          {/* Right — contact form (3/5 width) */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>

        {/* ── FAQ + Map row ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ContactFAQ />
          <ContactMap />
        </div>
      </div>
    </main>
  );
}
