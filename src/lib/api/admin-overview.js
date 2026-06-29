// lib/api/admin-dashboard.js
import { serverGet, serverProtectGet } from "../core/server";

export async function getAdminDashboardOverview() {
  return await serverProtectGet("api/admin/dashboard/overview");
}
