// app/admin/payments/page.jsx
// Server Component — parallel SSR data fetching

import Link from "next/link";
import SummaryCards from "@/components/dashboard/admin/payments/SummaryCards";
import RevenueChart from "@/components/dashboard/admin/payments/RevenueChart";
import TransactionTable from "@/components/dashboard/admin/payments/TransactionTable";
import { getPaymentSummary, getTransactionss } from "@/lib/api/payments";

export const metadata = {
  title: "Payment Overview | WeCare Admin",
  description:
    "Oversee clinic revenue, track billing, and manage financial records.",
};

export default async function PaymentOverviewPage() {
  // Parallel SSR — all three fetched simultaneously
  const [summary] = await Promise.all([getPaymentSummary()]);

  const transactions = await getTransactionss();
  console.log("payment", transactions);

  // export const MOCK_SUMMARY = {
  //   totalRevenue:      { value: "$482,900.00", trend: "+12.5%",  up: true  },
  //   totalTransactions: { value: "1,248",       period: "Last 30 days"       },
  //   monthlyRevenue:    { value: "$52,430.20",  trend: "-2.1%",   up: false },
  //   pendingPayouts:    { value: "$8,340.00",   count: "14 pending"           },
  // };

  const su = {
    totalRevenue: {
      value: transactions
        .reduce((total, transaction) => total + transaction.fee, 0)
        .toFixed(2),
      trend: transactions.reduce(
        (total, transaction) => total + transaction.fee,
        0,
      ),
      up: true,
    },
    totalTransactions: { value: transactions.length, period: "Last 30 days" },
    monthlyRevenue: {
      value: transactions
        .reduce((total, transaction) => total + transaction.fee, 0)
        .toFixed(2),
      trend: transactions.reduce(
        (total, transaction) => total + transaction.fee,
        0,
      ),
      up: false,
    },
    pendingPayouts: {
      value: transactions
        .reduce((total, transaction) => total + transaction.fee, 0)
        .toFixed(2),
      count: transactions.reduce(
        (total, transaction) => total + transaction.fee,
        0,
      ),
    },
  };


  const data = transactions.map((transaction) => ({
    label: transaction.appointmentDate,
    value: transaction.fee,
  }));
  console.log("data", su);

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="max-w-350 mx-auto px-4 md:px-8 py-8 space-y-6">
        {/* ── Page Header ──────────────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs font-semibold mb-2">
              <Link
                href="/admin/dashboard"
                className="hover:underline"
                style={{ color: "var(--text-muted)" }}
              >
                Dashboard
              </Link>
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ color: "var(--text-muted)" }}
              >
                chevron_right
              </span>
              <span style={{ color: "var(--color-primary)" }}>Payments</span>
            </nav>
            <h1
              className="text-3xl font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Payment Overview
            </h1>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--text-secondary)" }}
            >
              Oversee clinic revenue, track billing, and manage financial
              records.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold border transition-colors hover:bg-(--bg-surface)"
              style={{
                borderColor: "var(--border-default)",
                color: "var(--text-primary)",
              }}
            >
              <span className="material-symbols-outlined text-xl">
                download
              </span>
              Export CSV
            </button>
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold shadow-sm hover:brightness-95 hover:-translate-y-0.5 active:scale-95 transition-all"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--text-on-primary)",
              }}
            >
              <span className="material-symbols-outlined text-xl">add</span>
              New Transaction
            </button>
          </div>
        </div>

        {/* ── Summary Cards ────────────────────────────── */}
        <SummaryCards summary={summary} />

        {/* ── Revenue Chart ────────────────────────────── */}
        <RevenueChart data={data} />

        {/* ── Transaction Table ────────────────────────── */}
        <TransactionTable transactions={transactions} />

        {/* ── Footer meta ──────────────────────────────── */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-3 py-6 border-t text-xs"
          style={{
            borderColor: "var(--border-default)",
            color: "var(--text-muted)",
          }}
        >
          <p>© 2024 WeCare Healthcare Systems. All rights reserved.</p>
          <div className="flex gap-6">
            {["Financial Policy", "HIPAA Compliance", "Contact Support"].map(
              (l) => (
                <a
                  key={l}
                  href="#"
                  className="hover:underline transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  {l}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
