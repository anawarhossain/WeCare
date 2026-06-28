// app/admin/patients/page.jsx
// Server Component — role-guards, fetches data, passes to client


import ManagePatientsClient from "@/components/dashboard/admin/managePatient/ManagePatientsClient";
import { getAdminPatients } from "@/lib/api/admin-patients";
import { requireRole } from "@/lib/core/session";

export const metadata = {
  title: "Manage Patients | WeCare Admin",
  description: "Oversee patient accounts, activity, and account status.",
};

export default async function ManagePatientsPage() {
  await requireRole("admin");

  const { patients, counts } = await getAdminPatients();

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <ManagePatientsClient
          initialPatients={patients}
          initialCounts={counts}
        />
      </div>
    </main>
  );
}
