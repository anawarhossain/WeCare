// lib/api/prescriptions.js
import { serverGet } from "../core/server";

export async function getPrescriptions(doctorId) {
  if (!doctorId) return [];

  return await serverGet(`api/prescriptions/${doctorId}`);
}



export const getPrescriptionByAppointmentId = async (appointmentId) => {
  return await serverGet(`api/prescriptions/${appointmentId}`);
};