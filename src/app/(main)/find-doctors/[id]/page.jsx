// app/doctors/[id]/page.jsx
// Server Component — data fetched server-side

import { notFound } from "next/navigation";
import DoctorDetailsClient from "@/components/doctor-details/DoctorDetailsClient";
import { getDoctorById } from "@/lib/api/doctors";



// Dynamic metadata per doctor
export async function generateMetadata({ params }) {
  const { id } = await params;
  const doctor = await getDoctorById(id);
  if (!doctor) return { title: "Doctor Not Found | WeCare" };
  return {
    title: `${doctor.name} - ${doctor.specialization} | WeCare`,
    description: `Book an appointment with ${doctor.name}, ${doctor.specialization} at ${doctor.hospital}. ${doctor.experience}+ years of experience.`,
  };
}

export default async function DoctorDetailsPage({ params }) {
  const { id } = await params;
  const doctor = await getDoctorById(id);
  console.log("doctor data form server", doctor.slots);

  if (!doctor) notFound();

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="max-w-300 mx-auto px-4 md:px-8 py-8">
        <DoctorDetailsClient doctor={doctor} />
      </div>
    </main>
  );
}
