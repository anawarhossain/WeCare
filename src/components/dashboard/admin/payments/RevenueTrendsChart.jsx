"use client";

import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const RANGES = [
  { key: "day", label: "Last 30 Days" },
  { key: "week", label: "Last 3 Months" },
  { key: "month", label: "Last Year" },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="px-3 py-2 rounded-lg border text-xs shadow-md"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-default)", color: "var(--text-primary)" }}
    >
      <p className="font-semibold mb-0.5">{label}</p>
      <p style={{ color: "var(--color-primary)" }}>${payload[0].value.toFixed(2)}</p>
    </div>
  );
}

export default function RevenueTrendsChart({ revenueByDay, revenueByWeek, revenueByMonth }) {
  const [range, setRange] = useState("day");

  const dataMap = { day: revenueByDay, week: revenueByWeek, month: revenueByMonth };
  const subtitleMap = {
    day: "Daily revenue performance over the last 30 days",
    week: "Weekly revenue performance over the last 3 months",
    month: "Monthly revenue performance over the last year",
  };
  const data = dataMap[range];

  return (
    <div
      className="p-6 rounded-xl border shadow-sm"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-default)" }}
    >
      <div className="flex justify-between items-start mb-6 flex-wrap gap-3">
        <div>
          <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
            Revenue Trends
          </h3>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {subtitleMap[range]}
          </p>
        </div>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="px-4 py-2 rounded-lg border text-sm bg-transparent focus:outline-none"
          style={{ borderColor: "var(--border-default)", color: "var(--text-primary)" }}
        >
          {RANGES.map((r) => (
            <option key={r.key} value={r.key}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid stroke="var(--border-default)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: "var(--text-muted)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              interval={Math.ceil(data.length / 8)}
            />
            <YAxis
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-primary)"
              strokeWidth={2.5}
              fill="var(--color-primary)"
              fillOpacity={0.12}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
