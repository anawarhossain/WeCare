"use client";

import { useState, useMemo } from "react";
import { IoSearchOutline } from "react-icons/io5";
import PrescriptionCard from "./PrescriptionCard";
import EditPrescriptionModal from "./EditPrescriptionModal";
import EmptyState from "./EmptyState";
import ToastNotification from "@/components/common/ToastNotification";
import { updatePrescription } from "@/lib/actions/prescriptions";
import { isRedirectError } from "@/lib/core/server";

export default function PrescriptionsClient({ initialPrescriptions }) {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions || []);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null); // { message, subtext, type }

  // মোডালের জন্য স্টেট
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ── Search filter (patient name দিয়ে) ─────────────────────────
  const filtered = useMemo(() => {
    if (!search.trim()) return prescriptions;
    const q = search.trim().toLowerCase();
    return prescriptions.filter((p) =>
      p.patientName?.toLowerCase().includes(q),
    );
  }, [prescriptions, search]);

  // ── Edit flow ──────────────────────────────────────────────────
  const handleEditClick = (prescription) => {
    setSelectedPrescription(prescription);
    setIsModalOpen(true);
  };

  const handleUpdate = async (id, data) => {
    try {
      await updatePrescription(id, data);

      // লোকাল স্টেট আপডেট — _id ম্যাচ করে নতুন medicines/instructions বসানো
      setPrescriptions((prev) =>
        prev.map((p) => (p._id === id ? { ...p, ...data } : p)),
      );

      setIsModalOpen(false);
      setSelectedPrescription(null);

      setToast({
        message: "Prescription updated successfully!",
        subtext: "Changes have been saved.",
        type: "success",
      });
    } catch (error) {
      if (isRedirectError(error)) throw error;
      console.error("Failed to update prescription:", error);
      setToast({
        message: "Something went wrong.",
        subtext: "Could not update the prescription. Try again.",
        type: "error",
      });
    }
  };

  return (
    <>
      {/* ── Page Header ──────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6">
        <div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Prescriptions
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            View and manage prescriptions issued to your patients.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            <IoSearchOutline />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by patient name..."
            className="w-full pl-9 pr-3 py-2.5 rounded-md border text-sm focus:outline-none bg-transparent"
            style={{
              borderColor: "var(--border-default)",
              color: "var(--text-primary)",
            }}
          />
        </div>
      </div>

      {/* ── List ─────────────────────────────────────────────── */}
      {filtered?.length === 0 ? (
        <EmptyState isSearching={Boolean(search.trim())} />
      ) : (
        <div className="space-y-4">
          
          {filtered.map((prescription) => (
            <PrescriptionCard
              key={prescription._id}
              prescription={prescription}
              onEdit={handleEditClick}
            />
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && selectedPrescription && (
        <EditPrescriptionModal
          prescription={selectedPrescription}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPrescription(null);
          }}
          onSave={handleUpdate}
        />
      )}

      {/* ── Toast ────────────────────────────────────────────── */}
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
