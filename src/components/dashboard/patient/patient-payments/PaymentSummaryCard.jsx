export default function PaymentSummaryCard({
  icon,
  label,
  value,
  badge,
  accent = "primary",
}) {
  const accentBg =
    accent === "primary"
      ? "var(--color-primary-light)"
      : "var(--secondary-100)";
  const accentColor =
    accent === "primary" ? "var(--color-primary)" : "var(--secondary-600)";

  return (
    <div
      className="p-6 rounded-xl border shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-default)",
      }}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: accentBg }}
      >
        <span className="text-3xl" style={{ color: accentColor }}>
          {icon}
        </span>
      </div>
      <div>
        <p
          className="text-[11px] font-bold uppercase tracking-widest mb-1"
          style={{ color: "var(--text-muted)" }}
        >
          {label}
        </p>
        <p
          className="text-3xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          {value}
        </p>
        {badge && (
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full inline-block mt-1.5"
            style={{
              backgroundColor: "var(--bg-muted)",
              color: "var(--text-secondary)",
            }}
          >
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
