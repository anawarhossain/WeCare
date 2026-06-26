// app/doctor/prescriptions/page.jsx
// Server Component — fetches data, passes to client

import PrescriptionsClient from "@/components/dashboard/doctor/prescriptions/PrescriptionsClient";
import { getPrescriptions } from "@/lib/api/prescriptions";
import { getDoctor } from "@/lib/api/doctors";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Prescriptions | WeCare",
  description: "View and manage prescriptions issued to your patients.",
};

export default async function PrescriptionsPage() {
  const user = await getUserSession();

  if (!user) {
    redirect("/sign-in");
  }

  const doctor = await getDoctor(user.id);

  if (!doctor?._id) {
    redirect("/unauthorized");
  }

  const prescriptions = await getPrescriptions(doctor._id);

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <PrescriptionsClient initialPrescriptions={prescriptions} />
      </div>
    </main>
  );
}
