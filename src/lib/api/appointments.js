// lib/appointments.js
// Replace with your real DB / API calls

import { serverGet } from "../core/server";

export const APPOINTMENT_STATUSES = ["pending", "accepted", "completed", "rejected"];

const MOCK_APPOINTMENTS = [
  {
    id: "a1",
    patientName: "Elena Rodriguez",
    patientAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDsiyfSt-52KEAgpS5YWXlvKVk306ccVL9yiNaRJwl5C32mk8L-dtYCQbOUQDTiaZm8_yJ8-sCzdA97EtRB-wd6iMY3u1aWg0LLpeVEhbwTs-CahF1JofJh4rUUOPq3yD3nzwEa2xnAVtw-2vQRpBMUnvTaimhS9sH_GXsvWWHIThT8EUirNxc1jcSmPYX6Ji9xyVzs9Un5gpi9BsPF2-kZ_58q6RJxNS-FD-0-7GMndHUwFjVPGUzk3aq6dYeIa256xl9GyGgD8G0",
    date: "Oct 24, 2023",
    time: "10:30 AM",
    notes:
      "Routine checkup and cleaning. Mentioned slight sensitivity in the lower left molar when drinking cold liquids.",
    status: "pending",
  },
  {
    id: "a2",
    patientName: "Marcus Sterling",
    patientAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAEghtRP-_J7-yOLCa8FAmIbOvMFhafQr2OLZvWN-_aRkY1wkWHJK2ixj9Mo1kskyPNgrAf-nBQTGbjjOMlNkq1C3AF7g_vQdwbG4DtegNhvEpk5TmlBhoZSGgcVRZNRpOl8rtQIUvqA9D5BhJjzOFpeT2VWu9RLW_WWHvPcfYtfCt_-9whsegYeCy80Ljn_Of-oF6vejM01h6HVe87_luD1PtqoS9TL0Mki_vJVvL11FdVLL-goT6FH8IZyweawauRl8qvZ2mlSYA",
    date: "Oct 25, 2023",
    time: "02:15 PM",
    notes:
      "Emergency consultation. Persistent pain in the upper right gum area. Needs immediate evaluation for possible abscess.",
    status: "pending",
  },
  {
    id: "a3",
    patientName: "David Chen",
    patientAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYEyns0k-ZAKVbw6Z78BZBAlWH0ilG87NSYkoQ6K4BGxBdIKKqFYzcjOM5frLH7gVFW8DSucBGyCfDLDxrc6Def_WGOJ_fGr5B88bIHTwSbxP_WF2lp2ruZbptH7NuRDFqtCwD9cEoaxXlp1fYuOwYrOpS8QZYnmc6I7LE9GyoXO6V1JEPOqkft6dfqEd9u_TA3fMEOZOwVTTVGZxqnoWJ6Atfo841ca7KyMYRfujHM1qvbIcJkPRSU-fhM2RmFtRddgoNuJ_5ryo",
    date: "Oct 26, 2023",
    time: "09:00 AM",
    notes:
      "Follow-up for orthodontic adjustments. Checking progress of Invisalign trays and fitting for next phase.",
    status: "accepted",
  },
  {
    id: "a4",
    patientName: "Sophia Nguyen",
    patientAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDsiyfSt-52KEAgpS5YWXlvKVk306ccVL9yiNaRJwl5C32mk8L-dtYCQbOUQDTiaZm8_yJ8-sCzdA97EtRB-wd6iMY3u1aWg0LLpeVEhbwTs-CahF1JofJh4rUUOPq3yD3nzwEa2xnAVtw-2vQRpBMUnvTaimhS9sH_GXsvWWHIThT8EUirNxc1jcSmPYX6Ji9xyVzs9Un5gpi9BsPF2-kZ_58q6RJxNS-FD-0-7GMndHUwFjVPGUzk3aq6dYeIa256xl9GyGgD8G0",
    date: "Oct 27, 2023",
    time: "11:00 AM",
    notes: "Annual health checkup. No specific complaints. Wants routine blood panel and vitals check.",
    status: "completed",
  },
  {
    id: "a5",
    patientName: "James Okafor",
    patientAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAEghtRP-_J7-yOLCa8FAmIbOvMFhafQr2OLZvWN-_aRkY1wkWHJK2ixj9Mo1kskyPNgrAf-nBQTGbjjOMlNkq1C3AF7g_vQdwbG4DtegNhvEpk5TmlBhoZSGgcVRZNRpOl8rtQIUvqA9D5BhJjzOFpeT2VWu9RLW_WWHvPcfYtfCt_-9whsegYeCy80Ljn_Of-oF6vejM01h6HVe87_luD1PtqoS9TL0Mki_vJVvL11FdVLL-goT6FH8IZyweawauRl8qvZ2mlSYA",
    date: "Oct 22, 2023",
    time: "03:30 PM",
    notes: "Patient was non-responsive to rescheduling attempts. Slot reassigned.",
    status: "rejected",
  },
  {
    id: "a6",
    patientName: "Aisha Patel",
    patientAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYEyns0k-ZAKVbw6Z78BZBAlWH0ilG87NSYkoQ6K4BGxBdIKKqFYzcjOM5frLH7gVFW8DSucBGyCfDLDxrc6Def_WGOJ_fGr5B88bIHTwSbxP_WF2lp2ruZbptH7NuRDFqtCwD9cEoaxXlp1fYuOwYrOpS8QZYnmc6I7LE9GyoXO6V1JEPOqkft6dfqEd9u_TA3fMEOZOwVTTVGZxqnoWJ6Atfo841ca7KyMYRfujHM1qvbIcJkPRSU-fhM2RmFtRddgoNuJ_5ryo",
    date: "Oct 28, 2023",
    time: "08:45 AM",
    notes: "Migraine consultation. Recurring severe headaches for the past two weeks. Requesting neurological assessment.",
    status: "pending",
  },
];

/**
 * Fetch all appointments (server-side)
 * In production: replace with DB query
 */
export async function getAppointments(doctorId) {
  return await serverGet(`api/appointments/${doctorId}`);
}

// export async function getAppointments() {
//   return MOCK_APPOINTMENTS;
// }

/**
 * Count appointments per status (used for tab badges)
 */
// export function countByStatus(appointments) {
//   return appointments.reduce((acc, apt) => {
//     acc[apt.status] = (acc[apt.status] ?? 0) + 1;
//     return acc;
//   }, {});
// }
