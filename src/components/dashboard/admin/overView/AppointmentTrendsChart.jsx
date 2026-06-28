"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="px-3 py-2 rounded-lg border text-xs shadow-md"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-default)", color: "var(--text-primary)" }}
    >
      <p className="font-semibold mb-0.5">{label}</p>
      <p style={{ color: "var(--color-primary)" }}>{payload[0].value} appointments</p>
    </div>
  );
}

export default function AppointmentTrendsChart({ data }) {
  return (
    <div
      className="lg:col-span-2 p-6 md:p-8 rounded-xl border shadow-sm"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-default)" }}
    >
      <div className="flex justify-between items-start mb-6 flex-wrap gap-2">
        <div>
          <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
            Appointment Trends
          </h3>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Monthly volume overview (last 6 months)
          </p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="var(--border-default)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} width={32} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--bg-muted)" }} />
            <Bar dataKey="count" fill="var(--color-primary)" radius={[6, 6, 0, 0]} maxBarSize={48} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
