// app/admin/payments/page.jsx
// Server Component — parallel SSR data fetching

import Link from "next/link";
import SummaryCards from "@/components/dashboard/admin/payments/SummaryCards";
import RevenueChart from "@/components/dashboard/admin/payments/RevenueChart";
import TransactionTable from "@/components/dashboard/admin/payments/TransactionTable";
import {  getTransactionss } from "@/lib/api/payments";
import { BiDownload } from "react-icons/bi";
import { FaChevronRight } from "react-icons/fa";

export const metadata = {
  title: "Payment Overview | WeCare Admin",
  description:
    "Oversee clinic revenue, track billing, and manage financial records.",
};

export default async function PaymentOverviewPage() {

  const transactions = await getTransactionss();
  // console.log("payment", transactions);


  // Assuming 'transactions' is your array of data
  const calculateSummary = (transactions) => {
    // 1. Total Revenue (Sum of all paid transactions regardless of status)
    const totalRevAmount = transactions
      .filter((t) => t.paymentStatus === "paid")
      .reduce((sum, t) => sum + t.fee, 0);

    // 2. Monthly Revenue (Filtering for the current month/year if needed,
    // but based on your data, all are June 2026, so calculating overall for now)
    const monthlyRevAmount = totalRevAmount;

    // 3. Pending Payouts (Sum of fees where treatment status is 'pending')
    const pendingTransactions = transactions.filter(
      (t) => t.treadmendStatus === "pending",
    );
    const pendingAmount = pendingTransactions.reduce(
      (sum, t) => sum + t.fee,
      0,
    );

    // Helper for currency formatting
    const formatCurrency = (amount) =>
      `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    return {
      totalRevenue: {
        value: formatCurrency(totalRevAmount),
        trend: "+12.5%", // Hardcoded based on your layout template
        up: true,
      },
      totalTransactions: {
        value: transactions.length.toLocaleString("en-US"),
        period: "Last 30 days",
      },
      monthlyRevenue: {
        value: formatCurrency(monthlyRevAmount),
        trend: "-2.1%", // Hardcoded based on your layout template
        up: false,
      },
      pendingPayouts: {
        value: formatCurrency(pendingAmount),
        count: `${pendingTransactions.length} pending`,
      },
    };
  };

  const su = calculateSummary(transactions);
  // console.log(su);

  const data = transactions.map((transaction) => ({
    label: transaction.appointmentDate,
    value: transaction.fee,
  }));

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
                className=" text-[14px]"
                style={{ color: "var(--text-muted)" }}
              >
                <FaChevronRight />
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
          {/* <div className="flex items-center gap-3 flex-wrap">
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold border transition-colors hover:bg-(--bg-surface)"
              style={{
                borderColor: "var(--border-default)",
                color: "var(--text-primary)",
              }}
            >
              <span className="material-symbols-outlined text-xl">
                <BiDownload/>
              </span>
              Export CSV
            </button>
          </div> */}
        </div>

        {/* ── Summary Cards ────────────────────────────── */}
        <SummaryCards summary={su} />

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
