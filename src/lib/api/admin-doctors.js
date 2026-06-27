// lib/api/admin-doctors.js
import { serverGet } from "../core/server";

export async function getAdminDoctors() {
  return await serverGet("api/admin/doctors");
}
