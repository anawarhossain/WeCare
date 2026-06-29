// lib/api/admin-payments.js
import { serverGet, serverProtectGet } from "../core/server";

export async function getAdminPaymentsOverview() {
  return await serverProtectGet("api/admin/payments/overview");
}
