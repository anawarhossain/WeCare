// app/doctor/appointment-requests/page.jsx
// Server Component — fetches data, passes to client

import AppointmentRequestsClient from "@/components/appointment-requests/AppointmentRequestsClient";
import { getAppointments } from "@/lib/api/appointments";
import { getDoctor } from "@/lib/api/doctors";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "Appointment Requests | WeCare",
  description: "Manage and respond to patient booking requests from the clinical portal.",
};

export default async function AppointmentRequestsPage() {

  const user = await getUserSession();
  if (!user) {
    redirect("/sign-in");
  }
  const userId = user?.id;
  const doctor = await getDoctor(userId);
  
  const doctorId = doctor?._id
  
  const appointments = await getAppointments(doctorId);


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
