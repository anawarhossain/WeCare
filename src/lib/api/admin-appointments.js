// lib/api/admin-appointments.js
import { serverGet, serverProtectGet } from "../core/server";

export async function getAdminAppointmentsOverview() {
  return await serverProtectGet("api/admin/appointments/overview");
}
