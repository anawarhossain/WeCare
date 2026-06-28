// app/admin/appointments/page.jsx
// Server Component — role-guards, fetches data, passes to client


import AdminAppointmentsClient from "@/components/dashboard/admin/appoinmentsOverView/AdminAppointmentsClient";
import { getAdminAppointmentsOverview } from "@/lib/api/admin-appointments";
import { requireRole } from "@/lib/core/session";

export const metadata = {
  title: "Appointment Registry | WeCare Admin",
  description: "Operational overview of all appointments across the platform.",
};

export default async function AdminAppointmentsPage() {
  await requireRole("admin");

  const { stats, appointments } = await getAdminAppointmentsOverview();

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <AdminAppointmentsClient
          initialStats={stats}
          initialAppointments={appointments}
        />
      </div>
    </main>
  );
}
