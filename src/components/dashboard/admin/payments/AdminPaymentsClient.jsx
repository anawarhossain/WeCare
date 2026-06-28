"use client";

import { useMemo, useState } from "react";
import { MdAccountBalanceWallet, MdReceiptLong, MdCalendarMonth, MdFileDownload } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import RevenueTrendsChart from "./RevenueTrendsChart";
import TransactionLedgerTable from "./TransactionLedgerTable";
import ReceiptModal from "../../patient/patient-payments/ReceiptModal";
import ToastNotification from "@/components/common/ToastNotification";
import StatCard from "../overView/StatCard";

const STATUS_FILTERS = [
  { key: "all", label: "Status: All" },
  { key: "paid", label: "Paid" },
  { key: "pending", label: "Pending" },
  { key: "failed", label: "Failed" },
  { key: "refunded", label: "Refunded" },
];

function exportToCsv(transactions) {
  const header = ["Transaction ID", "Patient", "Doctor", "Amount", "Date", "Status"];
  const rows = transactions.map((t) => [
    t.transactionId,
    t.patientName,
    t.doctorName,
    t.fee.toFixed(2),
    t.appointmentDate,
    t.paymentStatus,
  ]);
  const csv = [header, ...rows].map((row) => row.map((v) => `"${v ?? ""}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `payments-report-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function AdminPaymentsClient({ stats, revenueByDay, revenueByWeek, revenueByMonth, initialTransactions }) {
  const [transactions] = useState(initialTransactions);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [toast, setToast] = useState(null);

  const filtered = useMemo(() => {
    let list = transactions;
    if (statusFilter !== "all") {
      list = list.filter((t) => t.paymentStatus === statusFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (t) => t.patientName?.toLowerCase().includes(q) || t.doctorName?.toLowerCase().includes(q),
      );
    }
    return list;
  }, [transactions, statusFilter, search]);

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
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Payment Management
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Oversee clinic revenue, track billing, and manage financial records.
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all hover:bg-gray-50"
          style={{ borderColor: "var(--border-default)", color: "var(--text-secondary)" }}
        >
          <MdFileDownload className="text-lg" />
          Export CSV
        </button>
      </div>

      {/* ── Financial Summary Cards ──────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          icon={<MdAccountBalanceWallet />}
          label="Total Revenue"
          value={`$${stats.totalRevenue.toFixed(2)}`}
          trend={stats.totalRevenueTrend}
        />
        <StatCard
          icon={<MdReceiptLong />}
          label="Total Transactions"
          value={stats.totalTransactions.toLocaleString()}
          badge={`${stats.transactionsLast30Days} in last 30 days`}
        />
        <StatCard
          icon={<MdCalendarMonth />}
          label="This Month's Revenue"
          value={`$${stats.thisMonthRevenue.toFixed(2)}`}
          trend={stats.thisMonthRevenueTrend}
        />
      </div>

      {/* ── Revenue Chart ────────────────────────────────────── */}
      <div className="mb-6">
        <RevenueTrendsChart revenueByDay={revenueByDay} revenueByWeek={revenueByWeek} revenueByMonth={revenueByMonth} />
      </div>

      {/* ── Filter Bar ───────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          Recent Transactions
        </h3>
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
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
              placeholder="Search patient or doctor..."
              className="pl-9 pr-3 py-2 rounded-lg border text-sm focus:outline-none bg-transparent w-56"
              style={{ borderColor: "var(--border-default)", color: "var(--text-primary)" }}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 rounded-lg border text-sm font-medium bg-transparent focus:outline-none"
            style={{ borderColor: "var(--border-default)", color: "var(--text-primary)" }}
          >
            {STATUS_FILTERS.map((f) => (
              <option key={f.key} value={f.key}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Ledger Table ─────────────────────────────────────── */}
      <TransactionLedgerTable
        transactions={filtered}
        page={page}
        onPageChange={setPage}
        onViewReceipt={setSelectedTransaction}
        isSearching={Boolean(search.trim())}
      />

      {/* Receipt Modal — patient-payments থেকে reuse */}
      {selectedTransaction && (
        <ReceiptModal transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} />
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
