// lib/api/admin-payments.js
import { serverGet } from "../core/server";

export async function getAdminPaymentsOverview() {
  return await serverGet("api/admin/payments/overview");
}
