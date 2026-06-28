"use client";

import { useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import AdminPatientTabs from "./AdminPatientTabs";
import PatientsTable from "./PatientsTable";
import PatientDetailDrawer from "./PatientDetailDrawer";
import { isRedirectError } from "@/lib/core/server";
import { updatePatientStatus } from "@/lib/actions/admin-patients";
import ToastNotification from "@/components/common/ToastNotification";

export default function ManagePatientsClient({ initialPatients, initialCounts }) {
  const [patients, setPatients] = useState(initialPatients);
  const [counts, setCounts] = useState(initialCounts);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // ── tab + search filter ───────────────────────────────────────
  const filtered = useMemo(() => {
    let list = patients;

    if (activeTab !== "all") {
      list = list.filter((p) => (p.status || "active").toLowerCase() === activeTab);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) => p.name?.toLowerCase().includes(q) || p.email?.toLowerCase().includes(q),
      );
    }

    return list;
  }, [patients, activeTab, search]);

  // ── status update helper (local state + counts sync) ──────────
  const applyStatusUpdate = (patientId, prevStatus, newStatus) => {
    setPatients((prev) => prev.map((p) => (p._id === patientId ? { ...p, status: newStatus } : p)));
    setCounts((prev) => {
      const next = { ...prev };
      const prevKey = (prevStatus || "active").toLowerCase();
      const newKey = newStatus.toLowerCase();
      if (next[prevKey] !== undefined) next[prevKey] = Math.max(0, next[prevKey] - 1);
      if (next[newKey] !== undefined) next[newKey] = (next[newKey] || 0) + 1;
      return next;
    });
  };

  const handleStatusChange = async (patient, newStatus, successMessage) => {
    setIsSaving(true);
    try {
      await updatePatientStatus(patient._id, newStatus);
      applyStatusUpdate(patient._id, patient.status, newStatus);
      setSelectedPatient(null);
      setToast({ message: successMessage, subtext: patient.name, type: newStatus === "suspended" ? "error" : "success" });
    } catch (error) {
      if (isRedirectError(error)) throw error;
      console.error("Failed to update patient status:", error);
      setToast({
        message: "Something went wrong.",
        subtext: "Could not update account status. Try again.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleQuickToggle = (patient) => {
    const isActive = (patient.status || "active").toLowerCase() === "active";
    handleStatusChange(
      patient,
      isActive ? "suspended" : "active",
      isActive ? "Patient account suspended." : "Patient account reactivated.",
    );
  };

  return (
    <>
      {/* ── Page Header ──────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Manage Patients
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Oversee patient accounts, appointment activity, and account status.
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
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-3 py-2.5 rounded-md border text-sm focus:outline-none bg-transparent"
            style={{ borderColor: "var(--border-default)", color: "var(--text-primary)" }}
          />
        </div>
      </div>

      {/* ── Tabs ─────────────────────────────────────────────── */}
      <div className="mb-6">
        <AdminPatientTabs
          activeTab={activeTab}
          counts={counts}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setPage(1);
          }}
        />
      </div>

      {/* ── Table ────────────────────────────────────────────── */}
      <PatientsTable
        patients={filtered}
        page={page}
        onPageChange={setPage}
        onRowClick={setSelectedPatient}
        onQuickToggleStatus={handleQuickToggle}
        isSearching={Boolean(search.trim())}
      />

      {/* Detail Drawer */}
      {selectedPatient && (
        <PatientDetailDrawer
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
          isSaving={isSaving}
          onSuspend={() => handleStatusChange(selectedPatient, "suspended", "Patient account suspended.")}
          onActivate={() => handleStatusChange(selectedPatient, "active", "Patient account reactivated.")}
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
