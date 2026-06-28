// lib/api/admin-dashboard.js
import { serverGet } from "../core/server";

export async function getAdminDashboardOverview() {
  return await serverGet("api/admin/dashboard/overview");
}
