// app/patient/dashboard/page.jsx
// Server Component — fetches data, composes child sections



import StatCard from "@/components/dashboard/admin/overView/StatCard";
import UpcomingAppointmentsTable from "@/components/dashboard/patient/dashboard/UpcomingAppointmentsTable";
import VisitHistoryChart from "@/components/dashboard/patient/dashboard/VisitHistoryChart";
import { getPatientDashboardOverview } from "@/lib/api/patient-dashboard";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import {
  MdEvent,
  MdMedicalServices,
  MdPayments,
  MdPersonSearch,
} from "react-icons/md";

export const metadata = {
  title: "Dashboard | WeCare",
  description: "Your appointments, visit history, and payments at a glance.",
};

export default async function PatientDashboardPage() {
  const user = await getUserSession();

  if (!user) {
    redirect("/sign-in");
  }

  const { stats, upcomingAppointments, visitHistory } =
    await getPatientDashboardOverview(user.id);

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-6">
        {/* ── Header ───────────────────────────────────────────── */}
        <div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Welcome back, {user.name?.split(" ")[0] || "there"}
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            Here&apos;s an overview of your appointments and health records.
          </p>
        </div>

        {/* ── Stat Cards ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<MdEvent />}
            label="Upcoming Appointments"
            value={stats.upcomingCount}
            badge={
              stats.upcomingThisWeek > 0
                ? `${stats.upcomingThisWeek} this week`
                : null
            }
          />
          <StatCard
            icon={<MdMedicalServices />}
            label="Total Visits"
            value={stats.totalVisits}
            badge={
              stats.lastVisitDate
                ? `Last visit ${stats.lastVisitDate}`
                : "No visits yet"
            }
          />
          <StatCard
            icon={<MdPayments />}
            label="Total Payments"
            value={`$${stats.totalPaid.toFixed(2)}`}
            badge={
              stats.outstandingAmount > 0
                ? `$${stats.outstandingAmount.toFixed(2)} outstanding`
                : "All settled"
            }
          />
          {/* ডিজাইনে "Saved Doctors" ছিল, কিন্তু favorite/saved doctor track করার
              কোনো collection আপনার schema-তে নেই — fake সংখ্যা না দিয়ে বদলে
              "Doctors Visited" (real distinct doctor count) দেখানো হলো */}
          <StatCard
            icon={<MdPersonSearch />}
            label="Doctors Visited"
            value={stats.doctorsVisited}
          />
        </div>

        {/* ── Table + Chart ───────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <UpcomingAppointmentsTable appointments={upcomingAppointments} />
          </div>
          <div className="lg:col-span-1">
            <VisitHistoryChart data={visitHistory} />
          </div>
        </div>
      </div>
    </main>
  );
}
