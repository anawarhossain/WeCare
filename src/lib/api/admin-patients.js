// lib/api/admin-patients.js
import { serverGet } from "../core/server";

export async function getAdminPatients() {
  return await serverGet("api/admin/patients");
}
