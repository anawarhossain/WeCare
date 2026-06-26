import { Chip } from "@heroui/react";
import { FaStar } from "react-icons/fa";

export default function StatCard({ icon, label, value, badge, rating }) {
  return (
    <div
      className="p-6 rounded-xl border shadow-sm flex flex-col gap-3"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-default)",
      }}
    >
      <div className="flex justify-between items-start">
        <div
          className="p-2.5 rounded-lg"
          style={{ backgroundColor: "var(--color-primary-light)" }}
        >
          <span className="text-2xl" style={{ color: "var(--color-primary)" }}>
            {icon}
          </span>
        </div>

        {badge && (
          <Chip
            size="sm"
            variant="flat"
            style={{
              backgroundColor: "var(--bg-muted)",
              color: "var(--text-secondary)",
            }}
          >
            {badge}
          </Chip>
        )}
      </div>

      <div>
        <p
          className="text-[11px] font-bold uppercase tracking-widest mb-1"
          style={{ color: "var(--text-muted)" }}
        >
          {label}
        </p>
        <div className="flex items-center gap-2">
          <h2
            className="text-3xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            {value}
          </h2>
          {/* Avg Rating কার্ডের জন্য ছোট star indicator */}
          {typeof rating === "number" && (
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className="text-sm"
                  style={{
                    color:
                      i < Math.round(rating)
                        ? "var(--accent-500)"
                        : "var(--border-default)",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
