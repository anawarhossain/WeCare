"use client";

// Tab navigation with count badges

const TAB_LABELS = {
  pending:   "Pending",
  accepted:  "Accepted",
  completed: "Completed",
  rejected:  "Rejected",
};

export default function TabNav({ activeTab, counts, onTabChange }) {
  const tabs = Object.keys(TAB_LABELS);

  return (
    <div
      className="flex items-center gap-1 border-b mb-6 overflow-x-auto"
      style={{ borderColor: "var(--border-default)" }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        const count    = counts?.[tab] ?? 0;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className="relative flex items-center gap-2 pb-3 px-4 text-sm font-medium whitespace-nowrap transition-colors"
            style={{
              color: isActive ? "var(--color-primary)" : "var(--text-muted)",
              fontWeight: isActive ? 700 : 500,
              borderBottom: isActive
                ? "2px solid var(--color-primary)"
                : "2px solid transparent",
            }}
          >
            {TAB_LABELS[tab]}
            {count > 0 && (
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none"
                style={{
                  backgroundColor: isActive
                    ? "var(--color-primary)"
                    : "var(--bg-muted)",
                  color: isActive ? "#ffffff" : "var(--text-secondary)",
                }}
              >
                {String(count).padStart(2, "0")}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
