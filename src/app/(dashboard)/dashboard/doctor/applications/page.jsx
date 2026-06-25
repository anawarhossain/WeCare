// app/doctor/appointment-requests/page.jsx
// Server Component — fetches data, passes to client

import AppointmentRequestsClient from "@/components/appointment-requests/AppointmentRequestsClient";
import { getAppointments } from "@/lib/api/appointments";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "Appointment Requests | WeCare",
  description: "Manage and respond to patient booking requests from the clinical portal.",
};

export default async function AppointmentRequestsPage() {

  const user = await getUserSession();
  const userId = "6a3a7ca8ee0b0995383077c3";
  console.log("user", user, userId);
  
  const appointments = await getAppointments(userId);
  console.log("appointments", appointments);


  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <AppointmentRequestsClient
          initialAppointments={appointments}
        />
      </div>
    </main>
  );
}
