"use client";

import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { TbProgress } from "react-icons/tb";

export default function PrescriptionModal({ appointment, onClose, onSave }) {
  const [medicines, setMedicines] = useState("");
  const [instructions, setInstructions] = useState("");
  const [saving, setSaving] = useState(false);

  // Escape key দিয়ে মোডাল ক্লোজ করা
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    // প্যারেন্ট কম্পোনেন্টে ডাটা পাঠানো
    try {
      await onSave(appointment._id, { medicines, instructions });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center p-4 animate-fade-in"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="max-w-lg w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-default)",
        }}
      >
        {/* Header */}
        <div
          className="flex justify-between items-center p-5 border-b"
          style={{ borderColor: "var(--border-default)" }}
        >
          <div>
            <h3
              className="text-lg font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Create Prescription
            </h3>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Patient: {appointment.patientName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <IoMdClose
              className="text-xl"
              style={{ color: "var(--text-muted)" }}
            />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 overflow-y-auto flex-1"
        >
          {/* Medicines Field */}
          <div className="space-y-1.5">
            <label
              className="text-xs font-bold uppercase tracking-wider block"
              style={{ color: "var(--text-muted)" }}
            >
              Medicines & Dosages
            </label>
            <textarea
              required
              rows={4}
              value={medicines}
              onChange={(e) => setMedicines(e.target.value)}
              placeholder="e.g. 1. Napa Extend (1+0+1) - 5 Days&#10;2. Azithromycin 500mg (0+0+1) - Before food"
              className="w-full rounded-xl border p-3.5 text-sm focus:outline-none focus:border-(--color-primary) bg-transparent resize-none"
              style={{
                borderColor: "var(--border-default)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          {/* Instructions Field */}
          <div className="space-y-1.5">
            <label
              className="text-xs font-bold uppercase tracking-wider block"
              style={{ color: "var(--text-muted)" }}
            >
              Special Instructions / Advice
            </label>
            <textarea
              rows={3}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Drink plenty of water. Avoid cold drinks. Come back for review after 7 days."
              className="w-full rounded-xl border p-3.5 text-sm focus:outline-none focus:border-(--color-primary) bg-transparent resize-none"
              style={{
                borderColor: "var(--border-default)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          {/* Action Buttons */}
          <div
            className="flex justify-end gap-3 pt-4 border-t"
            style={{ borderColor: "var(--border-default)" }}
          >
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-md border text-sm font-semibold transition-colors hover:bg-gray-50"
              style={{
                borderColor: "var(--border-default)",
                color: "var(--text-secondary)",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-md text-sm font-semibold shadow-sm hover:brightness-95 transition-all flex items-center gap-2 disabled:opacity-70"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--text-on-primary)",
              }}
            >
              {saving ? (
                <>
                  <TbProgress className="text-lg animate-spin" />
                  Saving...
                </>
              ) : (
                "Save & Submit Prescription"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
