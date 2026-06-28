import { MdPayments } from "react-icons/md";

export default function EmptyState({ isSearching }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 text-center rounded-xl border"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-default)" }}
    >
      <span className="text-6xl mb-4" style={{ color: "var(--text-muted)" }}>
        <MdPayments />
      </span>
      <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
        {isSearching ? "No matching transactions" : "No transactions yet"}
      </h3>
      <p className="text-sm max-w-xs" style={{ color: "var(--text-secondary)" }}>
        {isSearching
          ? "Try a different patient/doctor name, or clear your filters."
          : "Transactions will appear here once patients start booking and paying for appointments."}
      </p>
    </div>
  );
}
