// lib/api/admin-patients.js
import { serverGet, serverProtectGet } from "../core/server";

export async function getAdminPatients() {
  return await serverProtectGet("api/admin/patients");
}
