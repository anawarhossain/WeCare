"use client";

import { useMemo, useState } from "react";
import {
  MdAccountBalanceWallet,
  MdReceiptLong,
  MdFileDownload,
} from "react-icons/md";
import PaymentSummaryCard from "./PaymentSummaryCard";
import TransactionsTable from "./TransactionsTable";
import ReceiptModal from "./ReceiptModal";
import ToastNotification from "@/components/common/ToastNotification";

const STATUS_FILTERS = [
  { key: "all", label: "All Statuses" },
  { key: "paid", label: "Paid" },
  { key: "pending", label: "Pending" },
  { key: "failed", label: "Failed" },
  { key: "refunded", label: "Refunded" },
];

// CSV export — সম্পূর্ণ client-side, কোনো backend কল লাগে না
function exportToCsv(transactions) {
  const header = [
    "Transaction ID",
    "Doctor",
    "Specialization",
    "Appointment Date",
    "Amount",
    "Status",
  ];
  const rows = transactions.map((t) => [
    t.transactionId,
    t.doctorName,
    t.specialization,
    t.appointmentDate,
    t.fee.toFixed(2),
    t.paymentStatus,
  ]);

  const csvContent = [header, ...rows]
    .map((row) => row.map((v) => `"${v ?? ""}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `payment-statement-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function PaymentHistoryClient({ summary, initialTransactions }) {
  const [transactions] = useState(initialTransactions);
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [toast, setToast] = useState(null);

  const filtered = useMemo(() => {
    if (statusFilter === "all") return transactions;
    return transactions.filter((t) => t.paymentStatus === statusFilter);
  }, [transactions, statusFilter]);

  const handleExport = () => {
    if (filtered.length === 0) return;
    exportToCsv(filtered);
    setToast({
      message: "Statement exported.",
      subtext: "Your CSV file has started downloading.",
      type: "success",
    });
  };

  return (
    <>
      {/* ── Page Header ──────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6">
        <div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Payment History
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            Keep track of your medical expenses and invoices.
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold shadow-sm hover:brightness-95 hover:-translate-y-0.5 active:scale-95 transition-all"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--text-on-primary)",
          }}
        >
          <MdFileDownload className="text-xl" />
          Export Statement
        </button>
      </div>

      {/* ── Summary Cards ───────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <PaymentSummaryCard
          icon={<MdAccountBalanceWallet />}
          label="Total Paid"
          value={`$${summary.totalPaid.toFixed(2)}`}
          accent="primary"
        />
        <PaymentSummaryCard
          icon={<MdReceiptLong />}
          label="Total Transactions"
          value={summary.totalTransactions}
          badge="Invoices generated"
          accent="secondary"
        />
      </div>

      {/* ── Filter Bar ───────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h3
          className="text-lg font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Recent Transactions
        </h3>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 rounded-md border text-sm font-medium bg-transparent focus:outline-none"
          style={{
            borderColor: "var(--border-default)",
            color: "var(--text-primary)",
          }}
        >
          {STATUS_FILTERS.map((f) => (
            <option key={f.key} value={f.key}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* ── Table ────────────────────────────────────────────── */}
      <TransactionsTable
        transactions={filtered}
        page={page}
        onPageChange={setPage}
        onViewReceipt={setSelectedTransaction}
      />

      {/* Receipt Modal */}
      {selectedTransaction && (
        <ReceiptModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
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
