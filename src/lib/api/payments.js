// lib/payments.js — replace with real DB/API calls

import { serverGet } from "../core/server";



export const getTransactionss = async () => {
  return await serverGet("api/appointments");

}
