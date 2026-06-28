// lib/api/admin-appointments.js
import { serverGet } from "../core/server";

export async function getAdminAppointmentsOverview() {
  return await serverGet("api/admin/appointments/overview");
}
