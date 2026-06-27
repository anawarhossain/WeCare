// app/admin/doctors/page.jsx
// Server Component — role-guards, fetches data, passes to client

import ManageDoctorsClient from "@/components/dashboard/admin/manageDoctors/ManageDoctorsClient";
import { getAdminDoctors } from "@/lib/api/admin-doctors";
import { requireRole } from "@/lib/core/session";

export const metadata = {
  title: "Manage Doctors | WeCare Admin",
  description:
    "Oversee clinical staff credentials, verification status, and practice assignments.",
};

export default async function ManageDoctorsPage() {
  // requireRole নিজেই redirect করে দেয় যদি user logged-in না থাকে বা role "admin" না হয়
  await requireRole("admin");

  const { doctors, counts } = await getAdminDoctors();

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <ManageDoctorsClient initialDoctors={doctors} initialCounts={counts} />
      </div>
    </main>
  );
}
