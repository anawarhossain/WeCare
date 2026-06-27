"use client";

import { useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import AdminDoctorTabs from "./AdminDoctorTabs";
import DoctorsTable from "./DoctorsTable";
import { updateDoctorVerification } from "@/lib/actions/admin-doctors";
import { isRedirectError } from "@/lib/core/server";
import ToastNotification from "@/components/common/ToastNotification";
import DoctorVerificationDrawer from "./DoctorVerificationDrawer";

export default function ManageDoctorsClient({ initialDoctors, initialCounts }) {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [counts, setCounts] = useState(initialCounts);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // ── tab + search filter ───────────────────────────────────────
  const filtered = useMemo(() => {
    let list = doctors;

    if (activeTab !== "all") {
      list = list.filter((d) => (d.verificationStatus || "Pending").toLowerCase() === activeTab);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (d) =>
          d.name?.toLowerCase().includes(q) ||
          d.specialization?.toLowerCase().includes(q) ||
          d.hospitalName?.toLowerCase().includes(q),
      );
    }

    return list;
  }, [doctors, activeTab, search]);

  // ── status update helper (local state + counts sync) ──────────
  const applyStatusUpdate = (doctorId, prevStatus, newStatus) => {
    setDoctors((prev) =>
      prev.map((d) => (d._id === doctorId ? { ...d, verificationStatus: newStatus } : d)),
    );
    setCounts((prev) => {
      const next = { ...prev };
      const prevKey = (prevStatus || "Pending").toLowerCase();
      const newKey = newStatus.toLowerCase();
      if (next[prevKey] !== undefined) next[prevKey] = Math.max(0, next[prevKey] - 1);
      if (next[newKey] !== undefined) next[newKey] = (next[newKey] || 0) + 1;
      return next;
    });
  };

  const handleStatusChange = async (doctor, newStatus, successMessage) => {
    setIsSaving(true);
    try {
      await updateDoctorVerification(doctor._id, newStatus);
      applyStatusUpdate(doctor._id, doctor.verificationStatus, newStatus);
      setSelectedDoctor(null);
      setToast({ message: successMessage, subtext: doctor.name, type: "success" });
    } catch (error) {
      if (isRedirectError(error)) throw error;
      console.error("Failed to update doctor verification status:", error);
      setToast({
        message: "Something went wrong.",
        subtext: "Could not update verification status. Try again.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* ── Page Header ──────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Manage Doctors
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Oversee clinical staff credentials, verification status, and practice assignments.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            <IoSearchOutline />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name, specialization, hospital..."
            className="w-full pl-9 pr-3 py-2.5 rounded-md border text-sm focus:outline-none bg-transparent"
            style={{ borderColor: "var(--border-default)", color: "var(--text-primary)" }}
          />
        </div>
      </div>

      {/* ── Tabs ─────────────────────────────────────────────── */}
      <div className="mb-6">
        <AdminDoctorTabs
          activeTab={activeTab}
          counts={counts}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setPage(1);
          }}
        />
      </div>

      {/* ── Table ────────────────────────────────────────────── */}
      <DoctorsTable
        doctors={filtered}
        page={page}
        onPageChange={setPage}
        onRowClick={setSelectedDoctor}
        onQuickVerify={(doctor) => handleStatusChange(doctor, "Verified", "Doctor verified successfully.")}
        onQuickReject={(doctor) => handleStatusChange(doctor, "Rejected", "Application rejected.")}
        isSearching={Boolean(search.trim())}
      />

      {/* Verification Drawer */}
      {selectedDoctor && (
        <DoctorVerificationDrawer
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          isSaving={isSaving}
          onVerify={() => handleStatusChange(selectedDoctor, "Verified", "Doctor verified successfully.")}
          onReject={() => handleStatusChange(selectedDoctor, "Rejected", "Application rejected.")}
          onRevoke={() => handleStatusChange(selectedDoctor, "Pending", "Verification revoked.")}
        />
      )}

      {/* Toast */}
      {toast && (
        <ToastNotification
          message={toast.message}
          subtext={toast.subtext}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </>
  );
}
