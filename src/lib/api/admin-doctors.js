// lib/api/admin-doctors.js
import { serverGet, serverProtectGet } from "../core/server";

export async function getAdminDoctors() {
  return await serverProtectGet("api/admin/doctors");
}
