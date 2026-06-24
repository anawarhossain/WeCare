// components/appointment-requests/StatusBadge.jsx
// Pure display — no client state needed

const STATUS_STYLES = {
  pending: {
    bg: "var(--accent-100)",
    text: "var(--accent-800)",
    label: "Pending",
  },
  accepted: {
    bg: "var(--color-success-bg)",
    text: "var(--color-success-text)",
    label: "Accepted",
  },
  completed: {
    bg: "var(--primary-100)",
    text: "var(--primary-900)",
    label: "Completed",
  },
  rejected: {
    bg: "var(--danger-100)",
    text: "var(--danger-800)",
    label: "Rejected",
  },
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
  return (
    <span
      className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {style.label}
    </span>
  );
}
