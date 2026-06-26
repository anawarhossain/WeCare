// lib/api/dashboard.js
import { serverGet } from "../core/server";

export async function getDashboardOverview(doctorId) {
  if (!doctorId) {
    return {
      totalPatients: 0,
      todaysAppointmentsCount: 0,
      todaysCompletedCount: 0,
      todaysSchedule: [],
      avgRating: 0,
      totalReviews: 0,
      weeklyVolume: [],
    };
  }

  return await serverGet(`api/dashboard/overview/${doctorId}`);
}
