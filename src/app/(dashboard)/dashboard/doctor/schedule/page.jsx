// app/doctor/manage-schedule/page.jsx
// Server Component — fetches data server-side, passes to Client

import ManageScheduleClient from "@/components/manage-schedule/ManageScheduleClient";
import { FaCheckCircle } from "react-icons/fa";
import { MdGroup, MdOutlineEventAvailable, MdSchedule } from "react-icons/md";

export const metadata = {
  title: "Manage Schedule | WeCare",
  description: "Configure your weekly availability and consultation slot durations.",
};

// Fetch schedule stats — replace with your real DB/API call
async function getScheduleStats() {
  // const res = await fetch(`${process.env.API_BASE_URL}/doctors/me/stats`, { cache: "no-store" });
  // return res.json();
  return [
    {
      icon: <MdOutlineEventAvailable />,
      label: "Weekly Slots",
      value: "142",
      iconBg: "var(--color-success-bg)",
      iconColor: "var(--color-success)",
    },
    {
      icon: <MdSchedule />,
      label: "Avg. Duration",
      value: "30 min",
      iconBg: "var(--primary-100)",
      iconColor: "var(--color-primary)",
    },
    {
      icon: <MdGroup />,
      label: "Booked Today",
      value: "18 / 24",
      iconBg: "var(--accent-100)",
      iconColor: "var(--accent-600)",
    },
    {
      icon: <FaCheckCircle />,
      label: "Status",
      value: "Active",
      iconBg: "var(--color-success-bg)",
      iconColor: "var(--color-success)",
      fill: true,
      valueColor: "var(--color-success)",
    },
  ];
}

export default async function ManageSchedulePage() {
  const stats = await getScheduleStats();

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="max-w-350 mx-auto px-4 md:px-8 py-8">
        <ManageScheduleClient stats={stats} />
      </div>
    </main>
  );
}
