// app/admin/dashboard/page.jsx
// Server Component — role-guards, fetches data, composes child sections


import { requireRole } from "@/lib/core/session";
import {
  MdGroups,
  MdMedicalServices,
  MdEvent,
  MdPayments,
} from "react-icons/md";
import { getAdminDashboardOverview } from "@/lib/api/admin-overview";
import ExportReportButton from "@/components/dashboard/admin/overView/ExportReportButton";
import StatCard from "@/components/dashboard/admin/overView/StatCard";
import AppointmentTrendsChart from "@/components/dashboard/admin/overView/AppointmentTrendsChart";
import DoctorDistributionChart from "@/components/dashboard/admin/overView/DoctorDistributionChart";
import DoctorPerformanceList from "@/components/dashboard/admin/overView/DoctorPerformanceList";
import ActivityFeed from "@/components/dashboard/admin/overView/ActivityFeed";

export const metadata = {
  title: "Dashboard Overview | WeCare Admin",
  description: "Platform-wide healthcare operations overview.",
};

export default async function AdminDashboardPage() {
  await requireRole("admin");

  const {
    stats,
    monthlyVolume,
    specializationBreakdown,
    doctorPerformance,
    activityFeed,
  } = await getAdminDashboardOverview();

  const todayLabel = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* ── Welcome Header ─────────────────────────────────── */}
        <div className="flex justify-between items-end flex-wrap gap-4">
          <div>
            <h1
              className="text-2xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Healthcare Overview
            </h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {todayLabel}
            </p>
          </div>
          <ExportReportButton stats={stats} monthlyVolume={monthlyVolume} />
        </div>

        {/* ── Stat Cards ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<MdGroups />}
            label="Total Users"
            value={stats.totalUsers.toLocaleString()}
            trend={stats.totalUsersTrend}
          />
          <StatCard
            icon={<MdMedicalServices />}
            label="Total Doctors"
            value={stats.totalDoctors.toLocaleString()}
            trend={stats.totalDoctorsTrend}
          />
          <StatCard
            icon={<MdEvent />}
            label="Total Appointments"
            value={stats.totalAppointments.toLocaleString()}
            trend={stats.totalAppointmentsTrend}
          />
          <StatCard
            icon={<MdPayments />}
            label="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            trend={stats.totalRevenueTrend}
          />
        </div>

        {/* ── Analytics Grid ───────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AppointmentTrendsChart data={monthlyVolume} />
          <DoctorDistributionChart
            data={specializationBreakdown}
            total={stats.totalDoctors}
          />
          <DoctorPerformanceList doctors={doctorPerformance} />
        </div>

        {/* ── Activity Feed ────────────────────────────────────── */}
        <ActivityFeed items={activityFeed} />
      </div>
    </main>
  );
}
