"use client";

import { MdDelete } from "react-icons/md";

// Single medication row — name, dosage, frequency, duration, delete

export default function MedicationRow({ med, index, onChange, onDelete }) {
  const handleChange = (field, value) => {
    onChange(med.id, field, value);
  };

  const inputStyle = {
    backgroundColor: "var(--bg-base)",
    borderColor: "var(--border-default)",
    color: "var(--text-primary)",
    borderRadius: "var(--radius-sm)",
  };

  const labelStyle = {
    color: "var(--text-muted)",
    fontSize: "10px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  };

  return (
    <div
      className="group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-xl border transition-all hover:shadow-sm"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: "var(--border-default)",
      }}
      onFocus={(e) =>
        e.currentTarget.style.setProperty("border-color", "var(--border-focus)")
      }
      onBlur={(e) =>
        e.currentTarget.style.setProperty(
          "border-color",
          "var(--border-default)",
        )
      }
    >
      {/* Row number */}
      <div className="sm:col-span-2 lg:col-span-4 flex items-center justify-between mb-1">
        <span
          className="text-[11px] font-bold uppercase tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          Medication #{index + 1}
        </span>
        <button
          onClick={() => onDelete(med.id)}
          className="flex items-center gap-1 text-[11px] font-semibold hover:opacity-80 transition-opacity"
          style={{ color: "var(--color-danger)" }}
          title="Remove medication"
        >
          <span className=" text-[18px]">
            <MdDelete />
          </span>
          Remove
        </button>
      </div>

      {/* Medicine Name */}
      <div className="space-y-1 lg:col-span-2">
        <p style={labelStyle}>Medicine Name</p>
        <input
          type="text"
          value={med.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="e.g. Amoxicillin"
          className="w-full border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--border-focus)"
          style={inputStyle}
        />
      </div>

      {/* Dosage */}
      <div className="space-y-1">
        <p style={labelStyle}>Dosage</p>
        <input
          type="text"
          value={med.dosage}
          onChange={(e) => handleChange("dosage", e.target.value)}
          placeholder="e.g. 500mg"
          className="w-full border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--border-focus)"
          style={inputStyle}
        />
      </div>

      {/* Frequency */}
      <div className="space-y-1">
        <p style={labelStyle}>Frequency</p>
        <select
          value={med.frequency}
          onChange={(e) => handleChange("frequency", e.target.value)}
          className="w-full border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--border-focus)"
          style={inputStyle}
        >
          <option value="">Select</option>
          <option value="Once daily">Once daily</option>
          <option value="Twice daily">Twice daily</option>
          <option value="Three times daily">Three times daily</option>
          <option value="Every 8 hours">Every 8 hours</option>
          <option value="As needed">As needed</option>
        </select>
      </div>

      {/* Duration */}
      <div className="space-y-1">
        <p style={labelStyle}>Duration</p>
        <input
          type="text"
          value={med.duration}
          onChange={(e) => handleChange("duration", e.target.value)}
          placeholder="e.g. 7 days"
          className="w-full border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--border-focus)"
          style={inputStyle}
        />
      </div>

      {/* Instructions */}
      <div className="space-y-1 sm:col-span-2 lg:col-span-4">
        <p style={labelStyle}>Instructions (optional)</p>
        <input
          type="text"
          value={med.instructions}
          onChange={(e) => handleChange("instructions", e.target.value)}
          placeholder="e.g. Take after meals, avoid alcohol"
          className="w-full border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--border-focus)"
          style={inputStyle}
        />
      </div>
    </div>
  );
}
