// Server-safe pure display component

const STATUS = {
  accepted:  { bg: "var(--color-success-bg)",  text: "var(--color-success-text)", label: "accepted"  },
  rejected:   { bg: "var(--danger-50)",          text: "var(--color-danger)",       label: "Rejected"   },
  pending:  { bg: "var(--accent-100)",         text: "var(--accent-800)",         label: "Pending"  },
  completed: { bg: "var(--primary-100)",        text: "var(--primary-800)",        label: "Completed" },
};

export default function TransactionStatusBadge({ status }) {
  const s = STATUS[status] ?? STATUS.pending;
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      {s.label}
    </span>
  );
}
