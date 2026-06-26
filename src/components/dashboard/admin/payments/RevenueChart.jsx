"use client";

import { useState, useRef, useEffect } from "react";

const RANGE_OPTIONS = ["Last 30 Days", "Last 3 Months", "Last Year"];

export default function RevenueChart({ data }) {
  const [range, setRange] = useState("Last 30 Days");
  const [tooltip, setTooltip] = useState(null); // { x, y, label, value }
  const svgRef = useRef(null);

  const W = 1000;
  const H = 280;
  const PAD = { top: 20, right: 20, bottom: 10, left: 20 };

  const maxVal = Math.max(...data.map((d) => d.value));
  const minVal = Math.min(...data.map((d) => d.value));

  const xStep = (W - PAD.left - PAD.right) / (data.length - 1);
  const yScale = (v) =>
    PAD.top + ((maxVal - v) / (maxVal - minVal)) * (H - PAD.top - PAD.bottom);

  // Build smooth SVG path
  const points = data.map((d, i) => ({
    x: PAD.left + i * xStep,
    y: yScale(d.value),
    ...d,
  }));

  const linePath = points
    .map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `S${p.x - xStep / 2},${p.y} ${p.x},${p.y}`))
    .join(" ");

  const areaPath = `${linePath} L${points[points.length - 1].x},${H} L${points[0].x},${H} Z`;

  // Y-axis ticks
  const yTicks = [minVal, (minVal + maxVal) / 2, maxVal].map((v) => ({
    y: yScale(v),
    label: `$${(v / 1000).toFixed(1)}k`,
  }));

  return (
    <div
      className="rounded-xl border shadow-sm p-6"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-default)" }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6">
        <div>
          <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
            Revenue Trends
          </h3>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Daily revenue performance — {range.toLowerCase()}
          </p>
        </div>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="border rounded-md) px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-(--border-focus) cursor-pointer"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-default)",
            color: "var(--text-primary)",
          }}
        >
          {RANGE_OPTIONS.map((r, index) => (
            <option key={index}>{r}</option>
          ))}
        </select>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full select-none" style={{ height: "320px" }}>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-4 bottom-8 flex flex-col justify-between pointer-events-none">
          {[...yTicks].reverse().map((t, index) => (
            <span key={index} className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>
              {t.label}
            </span>
          ))}
        </div>

        <svg
          ref={svgRef}
          className="w-full ml-8"
          viewBox={`0 0 ${W} ${H + 40}`}
          preserveAspectRatio="none"
          style={{ height: "280px" }}
          onMouseLeave={() => setTooltip(null)}
        >
          <defs>
            <linearGradient id="payGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
            {/* Horizontal grid lines */}
            {yTicks.map((t, index) => (
              <line
                key={index}
                x1={PAD.left}
                x2={W - PAD.right}
                y1={t.y}
                y2={t.y}
              />
            ))}
          </defs>

          {/* Grid lines */}
          {yTicks.map((t, index) => (
            <line
              key={index}
              x1={PAD.left}
              x2={W - PAD.right}
              y1={t.y}
              y2={t.y}
              stroke="var(--border-default)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}

          {/* Area fill */}
          <path d={areaPath} fill="url(#payGrad)" />

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points + hover zones */}
          {points.map((p, i) => (
            <g key={i}>
              {/* Invisible hover area */}
              <rect
                x={p.x - xStep / 2}
                y={0}
                width={xStep}
                height={H}
                fill="transparent"
                onMouseEnter={() => setTooltip({ x: p.x, y: p.y, label: p.label, value: p.value })}
              />
              {/* Dot */}
              <circle
                cx={p.x}
                cy={p.y}
                r={tooltip?.label === p.label ? 6 : 4}
                fill="var(--color-primary)"
                stroke="var(--bg-card)"
                strokeWidth="2"
                style={{ transition: "r 0.15s" }}
              />
            </g>
          ))}

          {/* Tooltip vertical line */}
          {tooltip && (
            <line
              x1={tooltip.x}
              x2={tooltip.x}
              y1={PAD.top}
              y2={H - PAD.bottom}
              stroke="var(--color-primary)"
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.5"
            />
          )}
        </svg>

        {/* X-axis labels */}
        <div
          className="ml-8 flex justify-between text-[10px] font-medium uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          {data
            .filter((_, i) => i % Math.ceil(data.length / 6) === 0 || i === data.length - 1)
            .map((d, index) => (
              <span key={index}>{d.label}</span>
            ))}
        </div>

        {/* Floating tooltip box */}
        {tooltip && (
          <div
            className="absolute pointer-events-none px-3 py-2 rounded-lg shadow-lg border text-xs font-semibold z-10"
            style={{
              left: `calc(${(tooltip.x / W) * 100}% + 2rem - 48px)`,
              top: `${(tooltip.y / H) * 100 - 20}%`,
              backgroundColor: "var(--neutral-900)",
              color: "var(--neutral-100)",
              borderColor: "var(--neutral-700)",
              minWidth: "96px",
            }}
          >
            <p style={{ color: "var(--neutral-400)" }}>{tooltip.label}</p>
            <p className="text-base font-bold" style={{ color: "#fff" }}>
              ${tooltip.value.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
