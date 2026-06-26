"use client";

const TABS = [
  { key: "all", label: "All" },
  { key: "upcoming", label: "Upcoming" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

export default function SegmentedTabs({ activeTab, onTabChange }) {
  return (
    <div
      className="flex items-center gap-1 p-1 rounded-xl w-fit"
      style={{ backgroundColor: "var(--bg-muted)" }}
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{
              backgroundColor: isActive ? "var(--bg-card)" : "transparent",
              color: isActive
                ? "var(--color-primary)"
                : "var(--text-secondary)",
              boxShadow: isActive ? "var(--shadow-sm)" : "none",
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
