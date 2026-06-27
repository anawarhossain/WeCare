import { MdPayments } from "react-icons/md";

export default function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center py-24 text-center gap-3 rounded-xl border-2 border-dashed"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-default)",
      }}
    >
      <div
        className="w-28 h-28 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-muted)" }}
      >
        <MdPayments
          className="text-5xl"
          style={{ color: "var(--text-muted)" }}
        />
      </div>
      <h3
        className="text-lg font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        No payment history yet
      </h3>
      <p
        className="text-sm max-w-xs"
        style={{ color: "var(--text-secondary)" }}
      >
        When you complete an appointment and make a payment, your transaction
        details will appear here.
      </p>
    </div>
  );
}
