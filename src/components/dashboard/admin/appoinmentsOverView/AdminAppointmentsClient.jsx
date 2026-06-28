"use client";

import { useMemo, useState } from "react";
import {
  MdEventNote,
  MdEventAvailable,
  MdCheckCircle,
  MdCancel,
  MdAccountBalanceWallet,
  MdFileDownload,
} from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import AppointmentsOverviewTable from "./AppointmentsOverviewTable";
import AppointmentDetailsDrawer from "./AppointmentDetailsDrawer";
import { isRedirectError } from "@/lib/core/server";
import ToastNotification from "@/components/common/ToastNotification";
import { cancelAppointmentByAdmin } from "@/lib/actions/admin-appointments";
import StatCard from "../../doctor/overview/StatCard";

const STATUS_FILTERS = [
  { key: "all", label: "All Statuses" },
  { key: "upcoming", label: "Upcoming" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

const DATE_RANGES = [
  { key: "all", label: "All Time" },
  { key: "today", label: "Today" },
  { key: "7days", label: "Last 7 Days" },
  { key: "month", label: "This Month" },
];

const STATUS_TO_LABEL_KEY = {
  pending: "upcoming",
  accepted: "upcoming",
  completed: "completed",
  rejected: "cancelled",
};

function isInDateRange(dateStr, range) {
  if (range === "all") return true;
  const d = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (range === "today") {
    return d.toDateString() === today.toDateString();
  }
  if (range === "7days") {
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    return d >= sevenDaysAgo && d <= today;
  }
  if (range === "month") {
    return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  }
  return true;
}

function exportToCsv(appointments) {
  const header = ["Patient", "Doctor", "Date", "Time", "Amount", "Payment Status", "Status"];
  const rows = appointments.map((a) => [
    a.patientName,
    a.doctorName,
    a.appointmentDate,
    a.time,
    a.fee.toFixed(2),
    a.paymentStatus,
    a.treadmendStatus,
  ]);
  const csv = [header, ...rows].map((row) => row.map((v) => `"${v ?? ""}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `appointments-report-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function AdminAppointmentsClient({ initialStats, initialAppointments }) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [stats, setStats] = useState(initialStats);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const filtered = useMemo(() => {
    let list = appointments;

    if (statusFilter !== "all") {
      list = list.filter((a) => STATUS_TO_LABEL_KEY[a.treadmendStatus] === statusFilter);
    }

    if (dateRange !== "all") {
      list = list.filter((a) => isInDateRange(a.appointmentDate, dateRange));
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (a) => a.patientName?.toLowerCase().includes(q) || a.doctorName?.toLowerCase().includes(q),
      );
    }

    return list;
  }, [appointments, statusFilter, dateRange, search]);

  const handleCancel = async () => {
    if (!selectedAppointment) return;
    setIsSaving(true);
    try {
      await cancelAppointmentByAdmin(selectedAppointment._id);

      setAppointments((prev) =>
        prev.map((a) =>
          a._id === selectedAppointment._id ? { ...a, treadmendStatus: "rejected" } : a,
        ),
      );
      setStats((prev) => ({
        ...prev,
        upcoming: Math.max(0, prev.upcoming - 1),
        cancelled: prev.cancelled + 1,
      }));

      setSelectedAppointment(null);
      setToast({
        message: "Appointment cancelled.",
        subtext: "Both patient and doctor will be notified.",
        type: "error",
      });
    } catch (error) {
      if (isRedirectError(error)) throw error;
      console.error("Failed to cancel appointment:", error);
      setToast({
        message: "Something went wrong.",
        subtext: "Could not cancel the appointment. Try again.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = () => {
    if (filtered.length === 0) return;
    exportToCsv(filtered);
    setToast({ message: "Report exported.", subtext: "Your CSV file has started downloading.", type: "success" });
  };

  return (
    <>
      {/* ── Page Header ──────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
            Operational Control
          </p>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Appointment Registry
          </h1>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold border transition-all hover:bg-gray-50"
          style={{ borderColor: "var(--border-default)", color: "var(--text-secondary)" }}
        >
          <MdFileDownload className="text-xl" />
          Export Report
        </button>
      </div>

      {/* ── Stat Cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <StatCard icon={<MdEventNote />} label="Total" value={stats.total} />
        <StatCard icon={<MdEventAvailable />} label="Upcoming" value={stats.upcoming} />
        <StatCard icon={<MdCheckCircle />} label="Completed" value={stats.completed} />
        <StatCard icon={<MdCancel />} label="Cancelled" value={stats.cancelled} />
        <StatCard icon={<MdAccountBalanceWallet />} label="Revenue" value={`$${stats.totalRevenue.toFixed(2)}`} />
      </div>

      {/* ── Filter Bar ───────────────────────────────────────── */}
      <div
        className="rounded-xl p-4 border mb-6 shadow-sm flex flex-wrap gap-4 items-end"
        style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-default)" }}
      >
        <div className="flex flex-col gap-1.5 min-w-45">
          <label className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Date Range
          </label>
          <select
            value={dateRange}
            onChange={(e) => {
              setDateRange(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-md border text-sm bg-transparent focus:outline-none"
            style={{ borderColor: "var(--border-default)", color: "var(--text-primary)" }}
          >
            {DATE_RANGES.map((r) => (
              <option key={r.key} value={r.key}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5 min-w-45">
          <label className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-md border text-sm bg-transparent focus:outline-none"
            style={{ borderColor: "var(--border-default)", color: "var(--text-primary)" }}
          >
            {STATUS_FILTERS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative flex-1 min-w-55">
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            <IoSearchOutline />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by patient or doctor name..."
            className="w-full pl-9 pr-3 py-2 rounded-md border text-sm focus:outline-none bg-transparent"
            style={{ borderColor: "var(--border-default)", color: "var(--text-primary)" }}
          />
        </div>

        <p className="text-sm ml-auto" style={{ color: "var(--text-muted)" }}>
          Showing {filtered.length} of {appointments.length} results
        </p>
      </div>

      {/* ── Table ────────────────────────────────────────────── */}
      <AppointmentsOverviewTable
        appointments={filtered}
        page={page}
        onPageChange={setPage}
        onViewDetails={setSelectedAppointment}
        isSearching={Boolean(search.trim())}
      />

      {/* Details Drawer */}
      {selectedAppointment && (
        <AppointmentDetailsDrawer
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onCancel={handleCancel}
          isSaving={isSaving}
        />
      )}

      {/* Toast */}
      {toast && (
        <ToastNotification
          message={toast.message}
          subtext={toast.subtext}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </>
  );
}
