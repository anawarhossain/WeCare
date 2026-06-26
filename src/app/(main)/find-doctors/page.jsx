// app/find-doctors/page.jsx
// Server Component — data fetched on the server, no "use client"


import FindDoctorsClient from "@/components/find-doctors/FindDoctorsClient";
import { getDoctors } from "@/lib/api/doctors";

export const metadata = {
  title: "Find Doctors | WeCare",
  description:
    "Search and book appointments with top-rated doctors across all specializations on the WeCare platform.",
};

export default async function FindDoctorsPage() {
  const doctors = await getDoctors();

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <FindDoctorsClient doctors={doctors} />
    </main>
  );
}
