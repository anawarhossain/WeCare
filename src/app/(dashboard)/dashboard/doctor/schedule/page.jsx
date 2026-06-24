// app/doctor/manage-schedule/page.jsx
// Server Component — fetches data server-side, passes to Client

import ManageScheduleClient from "@/components/manage-schedule/ManageScheduleClient";
import { getDoctor } from "@/lib/api/doctors";
import { getScheduleDataById } from "@/lib/api/scheduls";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "Manage Schedule | WeCare",
  description: "Configure your weekly availability and consultation slot durations.",
};


export default async function ManageSchedulePage() {
  const userId = await getUserSession();
  const doctorId = await getDoctor(userId.id)
  const { slots, stats } = await getScheduleDataById(doctorId._id);
  console.log("schedule data form server", slots, stats);

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="max-w-350 mx-auto px-4 md:px-8 py-8">
        <ManageScheduleClient
          initialStats={stats}
          initialSlots={slots}
          doctorId={doctorId._id}
        />
      </div>
    </main>
  );
}
