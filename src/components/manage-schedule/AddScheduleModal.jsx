"use client";

import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export default function AddScheduleModal({ defaultDay, onClose, onSave }) {
  const [selectedDays, setSelectedDays] = useState(
    defaultDay
      ? [defaultDay.slice(0, 3)]
      : WEEKDAYS
  );
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [duration, setDuration] = useState("30");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Escape key close
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200)); // simulate API call
    setSaving(false);
    setSaved(true);
    setTimeout(() => {
      onSave?.({ days: selectedDays, startTime, endTime, duration: Number(duration) });
      onClose();
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(15,23,42,0.45)",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-lg rounded-xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: "var(--bg-card)" }}
      >
        {/* Modal Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-default)",
          }}
        >
          <h3
            className="text-xl font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Add New Schedule
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-(--bg-muted) transition-colors"
          >
            <span
              className=" text-xl"
              style={{ color: "var(--text-muted)" }}
            >
              <IoMdClose />
            </span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Days selection */}
          <div>
            <label
              className="block text-[11px] font-bold uppercase tracking-widest mb-3"
              style={{ color: "var(--text-muted)" }}
            >
              Select Days
            </label>
            <div className="flex flex-wrap gap-2">
              {ALL_DAYS.map((day) => {
                const isOff = day === "Sat" || day === "Sun";
                const isSelected = selectedDays.includes(day);
                return (
                  <label
                    key={day}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded border cursor-pointer transition-colors select-none"
                    style={{
                      backgroundColor: isSelected
                        ? "var(--primary-50)"
                        : "var(--bg-surface)",
                      borderColor: isSelected
                        ? "var(--color-primary)"
                        : "var(--border-default)",
                      opacity: isOff && !isSelected ? 0.5 : 1,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleDay(day)}
                      className="rounded border-(--border-default) accent-(--color-primary) h-3.5 w-3.5"
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {day}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Time range */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Start Time", value: startTime, onChange: setStartTime },
              { label: "End Time", value: endTime, onChange: setEndTime },
            ].map(({ label, value, onChange }) => (
              <div key={label}>
                <label
                  className="block text-[11px] font-bold uppercase tracking-widest mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  {label}
                </label>
                <input
                  type="time"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full rounded-md) border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-(--border-focus)"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--border-default)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Slot duration */}
          <div>
            <label
              className="block text-[11px] font-bold uppercase tracking-widest mb-2"
              style={{ color: "var(--text-muted)" }}
            >
              Slot Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full rounded-md)] border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-(--border-focus)"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-default)",
                color: "var(--text-primary)",
              }}
            >
              <option value="15">15 Minutes</option>
              <option value="30">30 Minutes</option>
              <option value="45">45 Minutes</option>
              <option value="60">60 Minutes</option>
            </select>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className="flex justify-end gap-3 px-6 py-4 border-t"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-default)",
          }}
        >
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md) border text-sm font-semibold transition-colors hover:bg-(--bg-muted)"
            style={{
              borderColor: "var(--border-default)",
              color: "var(--text-secondary)",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || saved || selectedDays.length === 0}
            className="px-5 py-2 rounded-md) text-sm font-semibold shadow-sm transition-all flex items-center gap-2 disabled:opacity-70"
            style={{
              backgroundColor: saved
                ? "var(--color-success)"
                : "var(--color-primary)",
              color: "var(--text-on-primary)",
            }}
          >
            {saving ? (
              <>
                <span className=" text-[18px] animate-spin">
                  progress_activity
                </span>
                Saving...
              </>
            ) : saved ? (
              <>
                <span
                  className=" text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                Saved!
              </>
            ) : (
              "Save Schedule"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
