"use client";

import { useState, useCallback } from "react";
import TabNav from "./TabNav";
import AppointmentCard from "./AppointmentCard";
import EmptyState from "./EmptyState";
import ToastNotification from "./ToastNotification";
import { IoMdAdd } from "react-icons/io";

export default function AppointmentRequestsClient({ initialAppointments }) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [activeTab, setActiveTab]       = useState("pending");
  const [toast, setToast]               = useState(null); // { message, subtext, type }

  // ── Count badges ──────────────────────────────────────────────
  const counts = appointments.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] ?? 0) + 1;
    return acc;
  }, {});

  // ── Status mutation helper ────────────────────────────────────
  const updateStatus = useCallback((id, newStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  }, []);

  // ── Action handlers ───────────────────────────────────────────
  const handleAccept = (id) => {
    updateStatus(id, "accepted");
    setToast({
      message: "Appointment accepted successfully.",
      subtext: "Patient will be notified shortly.",
      type: "success",
    });
  };

  const handleReject = (id) => {
    updateStatus(id, "rejected");
    setToast({
      message: "Appointment rejected.",
      subtext: "Patient will receive a cancellation notice.",
      type: "error",
    });
  };

  const handleComplete = (id) => {
    updateStatus(id, "completed");
    setToast({
      message: "Appointment marked as completed.",
      subtext: "Redirecting to prescription management...",
      type: "success",
    });
  };

  // ── Filtered list ─────────────────────────────────────────────
  const filtered = appointments.filter((a) => a.status === activeTab);

  return (
    <>
      {/* ── Page Header ──────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6">
        <div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Appointment Requests
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            Manage and respond to patient booking requests from the clinical
            portal.
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold shadow-sm hover:brightness-95 hover:-translate-y-0.5 active:scale-95 transition-all"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--text-on-primary)",
          }}
        >
          <span className="text-xl">
            <IoMdAdd />
          </span>
          Create Booking
        </button>
      </div>

      {/* ── Tab Navigation ───────────────────────────────────── */}
      <TabNav
        activeTab={activeTab}
        counts={counts}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      {/* ── Cards List ───────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <EmptyState tab={activeTab} />
      ) : (
        <div className="space-y-4">
          {filtered.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onAccept={handleAccept}
              onReject={handleReject}
              onComplete={handleComplete}
            />
          ))}
        </div>
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
