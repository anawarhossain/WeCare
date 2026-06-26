"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="px-3 py-2 rounded-lg border text-xs shadow-md"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-default)",
        color: "var(--text-primary)",
      }}
    >
      <p className="font-semibold mb-0.5">{label}</p>
      <p style={{ color: "var(--color-primary)" }}>
        {payload[0].value} appointments
      </p>
    </div>
  );
}

export default function WeeklyPerformanceChart({ data }) {
  const { average, peakDay } = useMemo(() => {
    if (!data?.length) return { average: 0, peakDay: "-" };
    const total = data.reduce((sum, d) => sum + d.count, 0);
    const peak = data.reduce(
      (max, d) => (d.count > max.count ? d : max),
      data[0],
    );
    return {
      average: (total / data.length).toFixed(1),
      peakDay: peak.count > 0 ? peak.day : "-",
    };
  }, [data]);

  return (
    <div
      className="rounded-xl border shadow-sm p-5 h-full flex flex-col"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-default)",
      }}
    >
      <h3
        className="text-lg font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        Weekly Performance
      </h3>
      <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>
        Appointment Volume
      </p>

      <div className="flex-1 min-h-45">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 8, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              stroke="var(--border-default)"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              width={28}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="count"
              stroke="var(--color-primary)"
              strokeWidth={2.5}
              fill="var(--color-primary)"
              fillOpacity={0.08}
              dot={{ r: 3, fill: "var(--color-primary)", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div
        className="mt-4 pt-4 border-t space-y-2"
        style={{ borderColor: "var(--border-default)" }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Average per day
          </span>
          <span
            className="font-bold text-sm"
            style={{ color: "var(--text-primary)" }}
          >
            {average}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Peak Day
          </span>
          <span
            className="font-bold text-sm"
            style={{ color: "var(--color-success)" }}
          >
            {peakDay}
          </span>
        </div>
      </div>
    </div>
  );
}
