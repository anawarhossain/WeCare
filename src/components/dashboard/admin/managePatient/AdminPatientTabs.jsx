"use client";

const TABS = [
  { key: "all", label: "All Patients" },
  { key: "active", label: "Active" },
  { key: "suspended", label: "Suspended" },
];

export default function AdminPatientTabs({ activeTab, counts, onTabChange }) {
  return (
    <div className="flex items-center border-b overflow-x-auto" style={{ borderColor: "var(--border-default)" }}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        const count = counts?.[tab.key] ?? 0;
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className="px-6 py-3 border-b-2 font-bold text-sm whitespace-nowrap transition-colors flex items-center gap-2"
            style={{
              borderColor: isActive ? "var(--color-primary)" : "transparent",
              color: isActive ? "var(--color-primary)" : "var(--text-secondary)",
            }}
          >
            {tab.label}
            {tab.key === "suspended" && count > 0 && (
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                style={{ backgroundColor: "var(--color-danger-bg)", color: "var(--color-danger-text)" }}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
