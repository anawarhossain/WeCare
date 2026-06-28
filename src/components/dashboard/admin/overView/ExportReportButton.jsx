"use client";

import { IoMdAdd } from "react-icons/io";

function exportSummaryCsv(stats, monthlyVolume) {
  const rows = [
    ["Metric", "Value"],
    ["Total Users", stats.totalUsers],
    ["Total Doctors", stats.totalDoctors],
    ["Total Appointments", stats.totalAppointments],
    ["Total Revenue", `$${stats.totalRevenue}`],
    [],
    ["Month", "Appointments"],
    ...monthlyVolume.map((m) => [m.month, m.count]),
  ];

  const csv = rows.map((row) => row.map((v) => `"${v ?? ""}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `admin-overview-report-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function ExportReportButton({ stats, monthlyVolume }) {
  return (
    <button
      onClick={() => exportSummaryCsv(stats, monthlyVolume)}
      className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:opacity-90 active:scale-95 transition-all"
      style={{ backgroundColor: "var(--color-primary)", color: "var(--text-on-primary)" }}
    >
      <IoMdAdd className="text-xl" />
      Create Report
    </button>
  );
}
