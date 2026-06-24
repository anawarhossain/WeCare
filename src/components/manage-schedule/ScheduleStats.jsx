import { FaCheckCircle } from "react-icons/fa";
import { MdGroup, MdOutlineEventAvailable, MdSchedule } from "react-icons/md";

// components/manage-schedule/ScheduleStats.jsx
export default function ScheduleStats({ stats }) {
  const cards = [
    {
      icon: <MdOutlineEventAvailable />,
      label: "Weekly Slots",
      value: stats.weeklySlots,
      iconBg: "var(--color-success-bg)",
      iconColor: "var(--color-success)",
    },
    {
      icon: <MdSchedule />,
      label: "Avg. Duration",
      value: stats.avgDuration,
      iconBg: "var(--primary-100)",
      iconColor: "var(--color-primary)",
    },
    {
      icon: <MdGroup />,
      label: "Booked Today",
      value: stats.bookedToday,
      iconBg: "var(--accent-100)",
      iconColor: "var(--accent-600)",
    },
    {
      icon: <FaCheckCircle />,
      label: "Status",
      value: stats.status,
      iconBg: "var(--color-success-bg)",
      iconColor: "var(--color-success)",
      fill: true,
      valueColor: "var(--color-success)",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map(
        ({ icon, label, value, iconBg, iconColor, fill, valueColor }) => (
          <div
            key={label}
            className="flex items-center gap-4 p-5 rounded-xl border shadow-sm"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-default)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: iconBg }}
            >
              <span
                className=" text-xl"
                style={{
                  color: iconColor,
                  fontVariationSettings: fill ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {icon}
              </span>
            </div>
            <div>
              <p
                className="text-[11px] font-semibold uppercase tracking-widest mb-0.5"
                style={{ color: "var(--text-muted)" }}
              >
                {label}
              </p>
              <p
                className="text-xl font-bold"
                style={{ color: valueColor ?? "var(--text-primary)" }}
              >
                {value}
              </p>
            </div>
          </div>
        ),
      )}
    </div>
  );
}
