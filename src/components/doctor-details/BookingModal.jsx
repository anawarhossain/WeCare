"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function BookingModal({ doctor, selectedSlot, onClose, onConfirm }) {
  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="max-w-md w-full rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: "var(--bg-card)" }}
      >
        {/* Modal header */}
        <div
          className="p-6 md:p-8"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--text-on-primary)",
          }}
        >
          <h2 className="text-2xl font-semibold mb-1">Confirm Appointment</h2>
          <p className="text-sm opacity-90">
            Almost done! Review your session details.
          </p>
        </div>

        {/* Modal body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Doctor mini row */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden relative shrink-0 border-2"
              style={{ borderColor: "var(--primary-200)" }}
            >
              <Image
                src={doctor.image}
                alt={doctor.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div>
              <p
                className="text-lg font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {doctor.name}
              </p>
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                {doctor.specialization} Consultation
              </p>
            </div>
          </div>

          {/* Details box */}
          <div
            className="p-4 rounded-xl space-y-4"
            style={{ backgroundColor: "var(--bg-surface)" }}
          >
            <div className="flex items-center gap-3">
              <span
                className="material-symbols-outlined text-xl"
                style={{ color: "var(--color-primary)" }}
              >
                event
              </span>
              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  Date & Time
                </p>
                <p
                  className="text-base font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selectedSlot?.date} at {selectedSlot?.time}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="material-symbols-outlined text-xl"
                style={{ color: "var(--color-primary)" }}
              >
                payments
              </span>
              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  Consultation Fee
                </p>
                <p
                  className="text-base font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  ${doctor.fee.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={onConfirm}
              className="w-full py-3 rounded-xl font-semibold text-base hover:brightness-95 active:scale-95 transition-all"
              style={{
                backgroundColor: "var(--color-success)",
                color: "#ffffff",
              }}
            >
              Confirm & Secure Pay
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 text-sm font-semibold hover:opacity-80 transition-opacity"
              style={{ color: "var(--text-muted)" }}
            >
              Cancel and Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
