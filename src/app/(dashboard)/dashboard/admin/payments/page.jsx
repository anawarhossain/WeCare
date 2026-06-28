// app/admin/payments/page.jsx
// Server Component — role-guards, fetches data, passes to client


import AdminPaymentsClient from "@/components/dashboard/admin/payments/AdminPaymentsClient";
import { getAdminPaymentsOverview } from "@/lib/api/admin-payments";
import { requireRole } from "@/lib/core/session";

export const metadata = {
  title: "Payment Management | WeCare Admin",
  description:
    "Oversee clinic revenue, track billing, and manage financial records.",
};

export default async function AdminPaymentsPage() {
  await requireRole("admin");

  const { stats, revenueByDay, revenueByWeek, revenueByMonth, transactions } =
    await getAdminPaymentsOverview();

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <AdminPaymentsClient
          stats={stats}
          revenueByDay={revenueByDay}
          revenueByWeek={revenueByWeek}
          revenueByMonth={revenueByMonth}
          initialTransactions={transactions}
        />
      </div>
    </main>
  );
}
