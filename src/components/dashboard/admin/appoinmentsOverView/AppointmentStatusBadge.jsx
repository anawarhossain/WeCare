const STATUS_STYLES = {
  pending: { bg: "var(--primary-100)", text: "var(--primary-900)", label: "Upcoming" },
  accepted: { bg: "var(--primary-100)", text: "var(--primary-900)", label: "Upcoming" },
  completed: { bg: "var(--color-success-bg)", text: "var(--color-success-text)", label: "Completed" },
  rejected: { bg: "var(--color-danger-bg)", text: "var(--color-danger-text)", label: "Cancelled" },
};

export default function AppointmentStatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {style.label}
    </span>
  );
}
