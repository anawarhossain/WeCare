// app/patient/payments/page.jsx
// Server Component — fetches data, passes to client

import PaymentHistoryClient from "@/components/dashboard/patient/patient-payments/PaymentHistoryClient";
import { getPaymentHistory } from "@/lib/api/payments";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Payment History | WeCare",
  description: "Keep track of your medical expenses and invoices.",
};

export default async function PaymentHistoryPage() {
  const user = await getUserSession();

  if (!user) {
    redirect("/signin");
  }
  const userId = user?.id;

  const { summary, transactions } = await getPaymentHistory(userId);
  console.log("payment history", summary, transactions);

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <PaymentHistoryClient
          summary={summary}
          initialTransactions={transactions}
        />
      </div>
    </main>
  );
}
