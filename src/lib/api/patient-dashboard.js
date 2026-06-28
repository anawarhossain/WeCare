// lib/api/patient-dashboard.js
import { serverGet } from "../core/server";

export async function getPatientDashboardOverview(patientId) {
  if (!patientId) {
    return {
      stats: {
        upcomingCount: 0,
        upcomingThisWeek: 0,
        totalVisits: 0,
        lastVisitDate: null,
        totalPaid: 0,
        outstandingAmount: 0,
        doctorsVisited: 0,
      },
      upcomingAppointments: [],
      visitHistory: [],
    };
  }

  return await serverGet(`api/patient-dashboard/overview/${patientId}`);
}
