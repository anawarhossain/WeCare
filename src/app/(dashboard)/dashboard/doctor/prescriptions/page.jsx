// app/doctor/prescriptions/page.jsx
// Server Component — fetches all data server-side

import Link from "next/link";
import PatientSummaryCard from "@/components/prescriptions/PatientSummaryCard";
import PrescriptionForm from "@/components/prescriptions/PrescriptionForm";
import PrescriptionHistoryPanel from "@/components/prescriptions/PrescriptionHistoryPanel";
import QuickReferenceCard from "@/components/prescriptions/QuickReferenceCard";
import { getPatientForPrescription, getPrescriptionHistory } from "@/lib/api/prescriptions";
import { MdEditNote } from "react-icons/md";

export const metadata = {
  title: "Create Prescription | WeCare",
  description: "Create and manage patient prescriptions from the WeCare clinical portal.",
};

export default async function PrescriptionsPage({ searchParams }) {
  // In production: get patientId from searchParams or session
  const patientId = searchParams?.patientId ?? "p1";

  // Parallel SSR data fetching
  const [patient, history] = await Promise.all([
    getPatientForPrescription(patientId),
    getPrescriptionHistory("doctor-1"),
  ]);

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-6">
        {/* ── Page Header ────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-semibold mb-2">
              <Link
                href="/doctor/dashboard"
                className="hover:underline transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                Dashboard
              </Link>
              <span style={{ color: "var(--text-muted)" }}>/</span>
              <span style={{ color: "var(--color-primary)" }}>
                Prescriptions
              </span>
            </nav>
            <h1
              className="text-3xl font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Create Prescription
            </h1>
          </div>

          {/* Draft banner */}
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl border text-sm w-full sm:w-auto"
            style={{
              backgroundColor: "var(--color-success-bg)",
              borderColor: "var(--secondary-200)",
              color: "var(--color-success-text)",
            }}
          >
            <span className=" text-xl">
              <MdEditNote />
            </span>
            <p className="font-medium">
              Editing draft prescription for <strong>{patient.name}</strong>
            </p>
          </div>
        </div>

        {/* ── Two-column layout ──────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left (2/3) — Patient summary + form */}
          <div className="lg:col-span-2 space-y-5">
            <PatientSummaryCard patient={patient} />
            <PrescriptionForm patient={patient} />
          </div>

          {/* Right (1/3) — History + Quick Reference */}
          <div className="space-y-5">
            <PrescriptionHistoryPanel history={history} />
            <QuickReferenceCard />
          </div>
        </div>
      </div>
    </main>
  );
}
