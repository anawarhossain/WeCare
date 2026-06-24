"use client";

import { useState, useCallback } from "react";
import MedicationRow from "./MedicationRow";
import ToastNotification from "./ToastNotification";
import { CiStethoscope } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { LuPill } from "react-icons/lu";
import { MdEventNote, MdOutlineDescription } from "react-icons/md";
import { TbProgress } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineSave } from "react-icons/ai";

const createMed = () => ({
  id: `med-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  name: "",
  dosage: "",
  frequency: "",
  duration: "",
  instructions: "",
});

export default function PrescriptionForm({ patient }) {
  const [diagnosis, setDiagnosis] = useState("");
  const [medications, setMedications] = useState([createMed()]);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // Medication CRUD
  const addMedication = () => setMedications((prev) => [...prev, createMed()]);

  const updateMedication = useCallback((id, field, value) => {
    setMedications((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  }, []);

  const deleteMedication = useCallback((id) => {
    setMedications((prev) => {
      if (prev.length === 1) return prev; // keep at least one row
      return prev.filter((m) => m.id !== id);
    });
  }, []);

  // Save handler
  const handleSave = async () => {
    if (!diagnosis.trim()) {
      setToast({ message: "Please enter a diagnosis.", type: "error" });
      return;
    }
    setSaving(true);
    // Replace with your real API call:
    // await fetch("/api/prescriptions", { method: "POST", body: JSON.stringify({ patientId: patient.id, diagnosis, medications, notes }) });
    await new Promise((r) => setTimeout(r, 1400));
    setSaving(false);
    setToast({
      message: "Prescription Saved Successfully",
      subtext: "Synced with patient clinical records.",
      type: "success",
    });
  };

  const inputBase =
    "w-full border px-4 py-3 text-sm rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)] transition-colors";
  const inputStyle = {
    backgroundColor: "var(--bg-base)",
    borderColor: "var(--border-default)",
    color: "var(--text-primary)",
  };
  const labelStyle = "text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 mb-2";

  return (
    <>
      <div
        className="rounded-xl border p-6 md:p-8 shadow-sm space-y-8"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border-default)",
        }}
      >
        {/* ── Diagnosis ─────────────────────────────────── */}
        <div>
          <label className={labelStyle} style={{ color: "var(--text-muted)" }}>
            <span className=" text-base">
              <CiStethoscope />
            </span>
            Final Diagnosis
          </label>
          <textarea
            rows={3}
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Enter clinical diagnosis based on examination..."
            className={inputBase}
            style={inputStyle}
          />
        </div>

        {/* ── Medications ───────────────────────────────── */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label
              className={labelStyle}
              style={{ color: "var(--text-muted)" }}
            >
              <span className=" text-base">
                <LuPill />
              </span>
              Prescribed Medications
            </label>
            <button
              onClick={addMedication}
              className="flex items-center gap-1 text-sm font-semibold hover:underline transition-opacity"
              style={{ color: "var(--color-primary)" }}
            >
              <span className=" text-xl">
                <IoMdAdd />
              </span>
              Add Medication
            </button>
          </div>

          <div className="space-y-3">
            {medications.map((med, idx) => (
              <MedicationRow
                key={med.id}
                med={med}
                index={idx}
                onChange={updateMedication}
                onDelete={deleteMedication}
              />
            ))}
          </div>
        </div>

        {/* ── Follow-up Date ────────────────────────────── */}
        <div>
          <label className={labelStyle} style={{ color: "var(--text-muted)" }}>
            <span className=" text-base">
              <MdEventNote />
            </span>
            Follow-up Date (Optional)
          </label>
          <input type="date" className={inputBase} style={inputStyle} />
        </div>

        {/* ── Additional Notes ──────────────────────────── */}
        <div>
          <label className={labelStyle} style={{ color: "var(--text-muted)" }}>
            <span className=" text-base">
              <MdOutlineDescription />
            </span>
            Additional Notes
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Take after meals, avoid cold beverages, bed rest recommended..."
            className={inputBase}
            style={inputStyle}
          />
        </div>

        {/* ── Action buttons ────────────────────────────── */}
        <div
          className="flex flex-wrap gap-3 pt-2 border-t"
          style={{ borderColor: "var(--border-default)" }}
        >
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-semibold shadow-sm hover:brightness-95 hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-70"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--text-on-primary)",
            }}
          >
            {saving ? (
              <>
                <span className=" text-xl animate-spin">
                  <TbProgress />
                </span>
                Saving...
              </>
            ) : (
              <>
                <span
                  className=" text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  <AiOutlineSave />
                </span>
                Save Prescription
              </>
            )}
          </button>

          <button
            onClick={() => {
              setDiagnosis("");
              setMedications([createMed()]);
              setNotes("");
            }}
            className="px-6 py-2.5 rounded-md text-sm font-semibold border hover:bg-(--bg-surface) transition-colors"
            style={{
              borderColor: "var(--border-default)",
              color: "var(--text-secondary)",
            }}
          >
            Discard
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <ToastNotification
          message={toast.message}
          subtext={toast.subtext}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </>
  );
}
