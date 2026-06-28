"use client";
import { submitContactForm } from "@/lib/actions/contact";
// components/contact/ContactForm.jsx
// Client Component — form state, validation, useFormStatus

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdSubject,
  MdMessage,
  MdSend,
  MdCheckCircle,
  MdErrorOutline,
  MdMedicalServices,
} from "react-icons/md";

// ── Sub-components ────────────────────────────────────────────────

function Label({ children, required }) {
  return (
    <label
      className="block text-xs font-bold uppercase tracking-wider mb-1.5"
      style={{ color: "var(--text-secondary)" }}
    >
      {children}
      {required && (
        <span className="ml-1" style={{ color: "var(--color-danger)" }}>
          *
        </span>
      )}
    </label>
  );
}

function InputField({ icon: Icon, id, name, type = "text", placeholder, required, autoComplete, defaultValue }) {
  return (
    <div className="relative group">
      <div
        className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200"
        style={{ color: "var(--text-muted)" }}
      >
        <Icon size={17} />
      </div>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        autoComplete={autoComplete}
        className="w-full pl-10 pr-4 py-2.5 rounded-[10px] border text-sm outline-none transition-all duration-200"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-default)",
          color: "var(--text-primary)",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--border-focus)";
          e.target.style.boxShadow = "0 0 0 3px rgba(6,182,212,0.12)";
          e.target.style.backgroundColor = "var(--bg-card)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--border-default)";
          e.target.style.boxShadow = "none";
          e.target.style.backgroundColor = "var(--bg-surface)";
        }}
      />
    </div>
  );
}

function SelectField({ icon: Icon, id, name, required, defaultValue, children }) {
  return (
    <div className="relative">
      <div
        className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: "var(--text-muted)" }}
      >
        <Icon size={17} />
      </div>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="w-full pl-10 pr-4 py-2.5 rounded-[10px] border text-sm outline-none appearance-none transition-all duration-200 cursor-pointer"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-default)",
          color: "var(--text-primary)",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--border-focus)";
          e.target.style.boxShadow = "0 0 0 3px rgba(6,182,212,0.12)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--border-default)";
          e.target.style.boxShadow = "none";
        }}
      >
        {children}
      </select>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-[10px] text-sm font-bold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 hover:shadow-lg active:scale-[0.98]"
      style={{
        backgroundColor: "var(--color-primary)",
        color: "var(--text-on-primary)",
      }}
    >
      {pending ? (
        <>
          <svg
            className="animate-spin"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          Sending…
        </>
      ) : (
        <>
          <MdSend size={16} />
          Send Message
        </>
      )}
    </button>
  );
}

// ── Main Component ────────────────────────────────────────────────

const INITIAL_STATE = { success: null, error: null, message: null };

export default function ContactForm() {





  const [state, formAction] = useActionState(submitContactForm, INITIAL_STATE);
  const formRef = useRef(null);

  // Reset form on success
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state?.success]);

  return (
    <div
      className="rounded-[20px] border p-7 md:p-9"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-default)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      {/* Form header */}
      <div className="mb-7">
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          Send a Message
        </span>
        <h2
          className="text-xl font-bold mt-1"
          style={{ color: "var(--text-primary)" }}
        >
          How can we help you?
        </h2>
      </div>

      {/* Success banner */}
      {state?.success && (
        <div
          className="flex items-start gap-3 p-4 rounded-3xl mb-6 border"
          style={{
            backgroundColor: "var(--color-success-bg)",
            borderColor: "var(--color-success)",
          }}
        >
          <MdCheckCircle
            size={20}
            className="shrink-0 mt-0.5"
            style={{ color: "var(--color-success)" }}
          />
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--color-success-text)" }}
          >
            {state.message}
          </p>
        </div>
      )}

      {/* Error banner */}
      {state?.error && (
        <div
          className="flex items-start gap-3 p-4 rounded-3xl mb-6 border"
          style={{
            backgroundColor: "var(--color-danger-bg)",
            borderColor: "var(--color-danger)",
          }}
        >
          <MdErrorOutline
            size={20}
            className="shrink-0 mt-0.5"
            style={{ color: "var(--color-danger)" }}
          />
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--color-danger-text)" }}
          >
            {state.error}
          </p>
        </div>
      )}

      {/* Form */}
      <form ref={formRef} action={formAction} className="space-y-5" noValidate>
        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Label required>Full Name</Label>
            <InputField
              icon={MdPerson}
              id="name"
              name="name"
              placeholder="Your full name"
              required
              autoComplete="name"
              defaultValue={state?.fields?.name || ""}
            />
          </div>
          <div>
            <Label required>Email Address</Label>
            <InputField
              icon={MdEmail}
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
              defaultValue={state?.fields?.email || ""}
            />
          </div>
        </div>

        {/* Phone + Department */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Label>Phone Number</Label>
            <InputField
              icon={MdPhone}
              id="phone"
              name="phone"
              type="tel"
              placeholder="+880 1XXXXXXXXX"
              autoComplete="tel"
              defaultValue={state?.fields?.phone || ""}
            />
          </div>
          <div>
            <Label required>Department</Label>
            <SelectField
              icon={MdMedicalServices}
              id="department"
              name="department"
              required
              defaultValue={state?.fields?.department || ""}
            >
              <option value="" disabled>
                Select department
              </option>
              <option value="general">General Inquiry</option>
              <option value="appointments">Appointments</option>
              <option value="billing">Billing & Payments</option>
              <option value="doctors">Doctor Verification</option>
              <option value="technical">Technical Support</option>
              <option value="emergency">Emergency Services</option>
            </SelectField>
          </div>
        </div>

        {/* Subject */}
        <div>
          <Label required>Subject</Label>
          <InputField
            icon={MdSubject}
            id="subject"
            name="subject"
            placeholder="Brief subject of your message"
            required
            defaultValue={state?.fields?.subject || ""}
          />
        </div>

        {/* Message */}
        <div>
          <Label required>Message</Label>
          <div className="relative">
            <div
              className="absolute left-3.5 top-3.5 pointer-events-none"
              style={{ color: "var(--text-muted)" }}
            >
              <MdMessage size={17} />
            </div>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Describe your concern in detail (minimum 20 characters)…"
              required
              defaultValue={state?.fields?.message || ""}
              className="w-full pl-10 pr-4 py-2.5 rounded-[10px] border text-sm outline-none transition-all duration-200 resize-none"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-default)",
                color: "var(--text-primary)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--border-focus)";
                e.target.style.boxShadow = "0 0 0 3px rgba(6,182,212,0.12)";
                e.target.style.backgroundColor = "var(--bg-card)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border-default)";
                e.target.style.boxShadow = "none";
                e.target.style.backgroundColor = "var(--bg-surface)";
              }}
            />
          </div>
        </div>

        {/* Privacy note */}
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          By submitting this form, you agree to our{" "}
          <a
            href="/privacy"
            className="underline underline-offset-2 hover:opacity-80"
            style={{ color: "var(--color-primary)" }}
          >
            Privacy Policy
          </a>
          . We typically respond within 24 hours.
        </p>

        {/* Submit */}
        <SubmitButton />
      </form>
    </div>
  );
}
