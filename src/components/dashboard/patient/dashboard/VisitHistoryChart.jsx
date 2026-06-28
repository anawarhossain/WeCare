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
      <p style={{ color: "var(--color-primary)" }}>{payload[0].value} visits</p>
    </div>
  );
}

export default function VisitHistoryChart({ data }) {
  const hasVisits = data.some((d) => d.count > 0);

  return (
    <div
      className="p-6 rounded-xl border shadow-sm"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-default)" }}
    >
      <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
        Visit History
      </h3>
      <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
        Completed visits over the last 6 months
      </p>

      {!hasVisits ? (
        <p className="text-sm text-center py-12" style={{ color: "var(--text-secondary)" }}>
          No completed visits yet in this period.
        </p>
      ) : (
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="var(--border-default)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} width={28} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--bg-muted)" }} />
              <Bar dataKey="count" fill="var(--color-primary)" radius={[6, 6, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
