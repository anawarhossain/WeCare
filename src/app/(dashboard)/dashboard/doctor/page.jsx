// app/doctor/dashboard/page.jsx
// Server Component — fetches data, passes to client/presentational components

import StatCard from "@/components/dashboard/doctor/overview/StatCard";
import TodaysSchedule from "@/components/dashboard/doctor/overview/TodaysSchedule";
import WeeklyPerformanceChart from "@/components/dashboard/doctor/overview/WeeklyPerformanceChart";
import { getDashboardOverview } from "@/lib/api/dashboard";
import { getDoctor } from "@/lib/api/doctors";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import { MdGroups, MdEventAvailable, MdStarRate } from "react-icons/md";

export const metadata = {
  title: "Dashboard | WeCare",
  description: "Overview of your patients, appointments, and reviews.",
};

export default async function DoctorDashboardPage() {
    const user = await getUserSession();
    if (!user) {
      redirect("/sign-in");
    }
    const userId = user?.id;
    const doctor = await getDoctor(userId);

    const doctorId = doctor?._id;
    // console.log("doctorId", doctorId);
    

  if (!doctor?._id) {
    redirect("/unauthorized");
  }

    const overview = await getDashboardOverview(doctorId);
    // console.log("overview", overview);

  const todayLabel = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {/* ── Page Header ────────────────────────────────────── */}
        <div className="mb-6">
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Dashboard Overview
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            Welcome back, Dr. {doctor.name || user.name}. Here&apos;s
            what&apos;s happening today.
          </p>
        </div>

        {/* ── Stat Cards ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard
            icon={<MdGroups />}
            label="Total Patients"
            value={overview.totalPatients}
          />
          <StatCard
            icon={<MdEventAvailable />}
            label="Today's Appointments"
            value={overview.todaysAppointmentsCount}
            badge={
              overview.todaysAppointmentsCount > 0
                ? `${overview.todaysCompletedCount} Completed`
                : null
            }
          />
          <StatCard
            icon={<MdStarRate />}
            label="Avg. Rating"
            value={`${overview.avgRating}/5`}
            badge={`${overview.totalReviews} review${overview.totalReviews === 1 ? "" : "s"}`}
            rating={overview.avgRating}
          />
        </div>

        {/* ── Schedule + Chart ───────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-2">
            <TodaysSchedule
              schedule={overview.todaysSchedule}
              dateLabel={todayLabel}
            />
          </div>
          <div className="flex-1">
            <WeeklyPerformanceChart data={overview.weeklyVolume} />
          </div>
        </div>
      </div>
    </main>
  );
}
