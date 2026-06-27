// lib/payments.js — replace with real DB/API calls

import { serverGet } from "../core/server";



export const getTransactionss = async () => {
  return await serverGet("api/appointments");

}

export async function getPaymentHistory(patientId) {
  if (!patientId) {
    return {
      summary: { totalPaid: 0, totalTransactions: 0 },
      transactions: [],
    };
  }

  return await serverGet(`api/payments/patient/${patientId}`);
}
 
