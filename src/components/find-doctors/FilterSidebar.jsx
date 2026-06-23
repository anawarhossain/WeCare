"use client";

import { useState } from "react";
import { MdTune } from "react-icons/md";

const SPECIALIZATIONS = [
  "Cardiology",
  "Pediatrics",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Gynecology",
  "Psychiatry",
];

const EXPERIENCE_OPTIONS = [
  { label: "Any Experience", value: "" },
  { label: "5+ Years", value: "5" },
  { label: "10+ Years", value: "10" },
  { label: "15+ Years", value: "15" },
];

const SORT_OPTIONS = [
  { label: "Consultation Fee", value: "fee" },
  { label: "Highest Rating", value: "rating" },
  { label: "Most Experience", value: "experience" },
];

export default function FilterSidebar({ onFilterChange }) {
  const [selectedSpecs, setSelectedSpecs] = useState(["Cardiology"]);
  const [experience, setExperience] = useState("");
  const [sortBy, setSortBy] = useState("fee");

  const toggleSpec = (spec) => {
    const next = selectedSpecs.includes(spec)
      ? selectedSpecs.filter((s) => s !== spec)
      : [...selectedSpecs, spec];
    setSelectedSpecs(next);
    onFilterChange?.({ specializations: next, experience, sortBy });
  };

  const handleExpChange = (val) => {
    setExperience(val);
    onFilterChange?.({ specializations: selectedSpecs, experience: val, sortBy });
  };

  const handleSortChange = (val) => {
    setSortBy(val);
    onFilterChange?.({ specializations: selectedSpecs, experience, sortBy: val });
  };

  const handleReset = () => {
    setSelectedSpecs([]);
    setExperience("");
    setSortBy("fee");
    onFilterChange?.({ specializations: [], experience: "", sortBy: "fee" });
  };

  return (
    <div
      className="card p-5 space-y-6"
      style={{ borderRadius: "var(--radius-lg)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-(--text-primary) font-semibold text-lg flex items-center gap-2">
          <span className=" text-(--color-primary)">
            <MdTune />
          </span>
          Filters
        </h2>
        <button
          onClick={handleReset}
          className="text-xs text-(--color-primary) font-medium hover:underline"
        >
          Reset all
        </button>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-(--text-muted) mb-2">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full bg-(--bg-surface) border border-(--border-default) rounded-md) text-sm text-(--text-primary) px-3 py-2 focus:outline-none focus:ring-2 focus:ring-(--border-focus)"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Specializations */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-(--text-muted) mb-3">
          Specialization
        </label>
        <div className="space-y-2.5">
          {SPECIALIZATIONS.map((spec) => (
            <label
              key={spec}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedSpecs.includes(spec)}
                onChange={() => toggleSpec(spec)}
                className="h-4 w-4 rounded border-(--border-default) text-(--color-primary) focus:ring-(--border-focus) accent-(--color-primary)"
              />
              <span className="text-sm text-(--text-secondary) group-hover:text-(--color-primary) transition-colors">
                {spec}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-(--text-muted) mb-3">
          Experience (Years)
        </label>
        <div className="space-y-2.5">
          {EXPERIENCE_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="experience"
                value={opt.value}
                checked={experience === opt.value}
                onChange={() => handleExpChange(opt.value)}
                className="h-4 w-4 border-(--border-default) text-(--color-primary) focus:ring-(--border-focus) accent-(--color-primary)"
              />
              <span className="text-sm text-(--text-secondary) group-hover:text-(--color-primary) transition-colors">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
