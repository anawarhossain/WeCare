// app/patient/appointments/page.jsx
// Server Component — fetches data, passes to client

import PatientAppointmentsClient from "@/components/dashboard/patient/my-appointment/PatientAppointmentsClient";
import { getPatientAppointments } from "@/lib/api/appointments";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Appointments | WeCare",
  description: "View and manage your upcoming and past appointments.",
};

export default async function MyAppointmentsPage() {
  const user = await getUserSession();

  if (!user) {
    redirect("/sign-in");
  }
  const userId = user?.id;
  //   console.log("user", user, userId);

  const appointments = await getPatientAppointments(userId);
  //   console.log("appointments", appointments);

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <PatientAppointmentsClient initialAppointments={appointments} />
      </div>
    </main>
  );
}
