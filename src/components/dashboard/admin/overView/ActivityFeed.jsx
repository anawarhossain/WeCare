import { MdPersonAdd, MdCalendarToday, MdPayments, MdMedicalServices, MdCheckCircle } from "react-icons/md";

const TYPE_CONFIG = {
  patient_registered: { icon: <MdPersonAdd />, bg: "var(--color-success-bg)", color: "var(--color-success)" },
  doctor_joined: { icon: <MdMedicalServices />, bg: "var(--color-primary-light)", color: "var(--color-primary)" },
  appointment_completed: { icon: <MdCheckCircle />, bg: "var(--color-success-bg)", color: "var(--color-success)" },
  payment_received: { icon: <MdPayments />, bg: "var(--color-warning-bg)", color: "var(--accent-600)" },
  appointment_booked: { icon: <MdCalendarToday />, bg: "var(--color-primary-light)", color: "var(--color-primary)" },
};

export default function ActivityFeed({ items }) {
  return (
    <div
      className="rounded-xl border shadow-sm overflow-hidden"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-default)" }}
    >
      <div
        className="p-6 border-b flex justify-between items-center"
        style={{ borderColor: "var(--border-default)" }}
      >
        <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          Recent Activity Feed
        </h3>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-center py-12" style={{ color: "var(--text-secondary)" }}>
          No recent activity yet.
        </p>
      ) : (
        <div className="divide-y" style={{ borderColor: "var(--border-default)" }}>
          {items.map((item, idx) => {
            const config = TYPE_CONFIG[item.type] ?? TYPE_CONFIG.appointment_booked;
            return (
              <div
                key={idx}
                className="p-5 flex items-center gap-4 hover:opacity-90 transition-colors"
                style={{ backgroundColor: idx % 2 === 1 ? "var(--bg-surface)" : "transparent" }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: config.bg, color: config.color }}
                >
                  <span className="text-xl">{config.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
                    {item.title}
                  </p>
                  <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                    {item.subtitle}
                  </p>
                </div>
                <span className="text-xs font-medium shrink-0" style={{ color: "var(--text-muted)" }}>
                  {item.displayTime}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
