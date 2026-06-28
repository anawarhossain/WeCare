"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// globals.css-এর token থেকে নেওয়া রঙের সিরিজ — distinct রাখার জন্য কয়েকটা ভিন্ন hue
const COLORS = [
  "var(--color-primary)",
  "var(--secondary-600)",
  "var(--accent-600)",
  "var(--danger-600)",
  "var(--primary-300)",
  "var(--secondary-200)",
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div
      className="px-3 py-2 rounded-lg border text-xs shadow-md"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-default)", color: "var(--text-primary)" }}
    >
      <p className="font-semibold">{item.specialization}</p>
      <p style={{ color: "var(--text-secondary)" }}>{item.count} doctors</p>
    </div>
  );
}

export default function DoctorDistributionChart({ data, total }) {
  return (
    <div
      className="p-6 md:p-8 rounded-xl border shadow-sm"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-default)" }}
    >
      <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
        Doctor Distribution
      </h3>
      <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
        Specialization breakdown
      </p>

      <div className="relative h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="specialization"
              innerRadius="65%"
              outerRadius="95%"
              paddingAngle={2}
              strokeWidth={0}
            >
              {data.map((entry, i) => (
                <Cell key={entry.specialization} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            {total}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest" style={{ color: "var(--text-muted)" }}>
            Total
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {data.map((entry, i) => (
          <div key={entry.specialization} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            />
            <span className="text-xs truncate" style={{ color: "var(--text-secondary)" }}>
              {entry.specialization}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
