// lib/payments.js — replace with real DB/API calls

import { serverGet } from "../core/server";

export const MOCK_SUMMARY = {
  totalRevenue:      { value: "$482,900.00", trend: "+12.5%",  up: true  },
  totalTransactions: { value: "1,248",       period: "Last 30 days"       },
  monthlyRevenue:    { value: "$52,430.20",  trend: "-2.1%",   up: false },
  pendingPayouts:    { value: "$8,340.00",   count: "14 pending"           },
};





export async function getPaymentSummary() {
  // const res = await fetch(`${process.env.API_BASE_URL}/admin/payments/summary`, { cache: "no-store" });
  // return res.json();
  return MOCK_SUMMARY;
}





export const getTransactionss = async () => {
  return await serverGet("api/appointments");

}
