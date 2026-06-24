// lib/prescriptions.js
// Replace with your real DB / API calls

export const MOCK_PATIENT = {
  id: "p1",
  name: "Elena Rodriguez",
  age: 28,
  gender: "Female",
  appointmentDate: "Oct 24, 2023",
  symptoms: "Routine checkup, slight sensitivity in lower left molar when drinking cold liquids.",
};

export const MOCK_HISTORY = [
  { id: "rx1", patient: "Marcus Sterling", date: "Oct 20, 2023", diagnosis: "Gingivitis" },
  { id: "rx2", patient: "Sarah Chen",      date: "Oct 18, 2023", diagnosis: "Cavity Prep" },
  { id: "rx3", patient: "Robert King",     date: "Oct 15, 2023", diagnosis: "Root Canal" },
  { id: "rx4", patient: "Aisha Patel",     date: "Oct 10, 2023", diagnosis: "Periodontitis" },
  { id: "rx5", patient: "David Osei",      date: "Oct 07, 2023", diagnosis: "Hypersensitivity" },
];

export async function getPatientForPrescription(patientId) {
  // const res = await fetch(`${process.env.API_BASE_URL}/patients/${patientId}`, { cache: "no-store" });
  // return res.json();
  return MOCK_PATIENT;
}

export async function getPrescriptionHistory(doctorId) {
  // const res = await fetch(`${process.env.API_BASE_URL}/doctor/prescriptions/history`, { cache: "no-store" });
  // return res.json();
  return MOCK_HISTORY;
}
