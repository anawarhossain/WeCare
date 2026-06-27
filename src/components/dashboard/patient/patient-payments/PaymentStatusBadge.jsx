const STATUS_STYLES = {
  paid: {
    bg: "var(--color-success-bg)",
    text: "var(--color-success-text)",
    dot: "var(--color-success)",
    label: "Paid",
  },
  pending: {
    bg: "var(--color-warning-bg)",
    text: "var(--color-warning-text)",
    dot: "var(--color-warning)",
    label: "Pending",
  },
  failed: {
    bg: "var(--color-danger-bg)",
    text: "var(--color-danger-text)",
    dot: "var(--color-danger)",
    label: "Failed",
  },
  refunded: {
    bg: "var(--bg-muted)",
    text: "var(--text-secondary)",
    dot: "var(--text-muted)",
    label: "Refunded",
  },
};

export default function PaymentStatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold w-fit"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: style.dot }}
      />
      {style.label}
    </span>
  );
}
