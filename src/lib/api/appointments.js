// lib/appointments.js
// Replace with your real DB / API calls

import { serverGet } from "../core/server";


export async function getAppointments(doctorId) {
  return await serverGet(`api/appointments/${doctorId}`);
}



