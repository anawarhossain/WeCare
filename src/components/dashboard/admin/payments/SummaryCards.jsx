// Server Component — pure display, no client state

export default function SummaryCards({ summary }) {
  const cards = [
    {
      icon: "account_balance_wallet",
      iconBg: "var(--primary-100)",
      iconColor: "var(--color-primary)",
      label: "Total Revenue",
      value: summary.totalRevenue.value,
      badge: summary.totalRevenue.trend,
      badgeBg: "var(--color-success-bg)",
      badgeText: "var(--color-success)",
      badgeIcon: "trending_up",
    },
    {
      icon: "receipt_long",
      iconBg: "var(--secondary-100)",
      iconColor: "var(--secondary-600)",
      label: "Total Transactions",
      value: summary.totalTransactions.value,
      badge: summary.totalTransactions.period,
      badgeBg: "var(--bg-muted)",
      badgeText: "var(--text-secondary)",
    },
    {
      icon: "calendar_month",
      iconBg: "var(--accent-100)",
      iconColor: "var(--accent-600)",
      label: "This Month's Revenue",
      value: summary.monthlyRevenue.value,
      badge: summary.monthlyRevenue.trend,
      badgeBg: "var(--danger-50)",
      badgeText: "var(--color-danger)",
      badgeIcon: "trending_down",
    },
    {
      icon: "pending_actions",
      iconBg: "var(--accent-50)",
      iconColor: "var(--accent-600)",
      label: "Pending Payouts",
      value: summary.pendingPayouts.value,
      badge: summary.pendingPayouts.count,
      badgeBg: "var(--accent-100)",
      badgeText: "var(--accent-800)",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map(({ icon, iconBg, iconColor, label, value, badge, badgeBg, badgeText, badgeIcon }) => (
        <div
          key={label}
          className="flex flex-col justify-between p-6 rounded-xl border shadow-sm"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-default)" }}
        >
          {/* Top row */}
          <div className="flex justify-between items-start mb-5">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: iconBg }}
            >
              <span
                className="material-symbols-outlined text-xl"
                style={{ color: iconColor }}
              >
                {icon}
              </span>
            </div>
            <span
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold"
              style={{ backgroundColor: badgeBg, color: badgeText }}
            >
              {badgeIcon && (
                <span className="material-symbols-outlined text-[13px]">{badgeIcon}</span>
              )}
              {badge}
            </span>
          </div>

          {/* Value */}
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-1"
              style={{ color: "var(--text-muted)" }}
            >
              {label}
            </p>
            <p className="text-3xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
              {value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
