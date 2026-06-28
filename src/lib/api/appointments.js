// lib/appointments.js
// Replace with your real DB / API calls

import { serverGet, serverProtectGet } from "../core/server";


export async function getAppointments(doctorId) {
  if (!doctorId) return []; // doctorId না থাকলে server.js-কে অর্থহীন কল না করা

  return await serverGet(`api/appointments/${doctorId}`);
}


export async function getPatientAppointments(patientId) {
  if (!patientId) return [];
  return await serverProtectGet(`api/appointments/patient/${patientId}`);
}

