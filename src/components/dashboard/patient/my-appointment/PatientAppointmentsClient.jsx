"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import { cancelAppointmentByPatient } from "@/lib/actions/appointments";
import { isRedirectError } from "@/lib/core/server";
import SegmentedTabs from "./SegmentedTabs";
import AppointmentsTable from "./AppointmentsTable";
import ToastNotification from "@/components/common/ToastNotification";

// "Jun 29, 2026" স্ট্রিং-কে আজকের তারিখের সাথে তুলনা করার হেল্পার
const isFutureOrToday = (dateStr) => {
  const d = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d >= today;
};

export default function PatientAppointmentsClient({ initialAppointments }) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [activeTab, setActiveTab] = useState("all");
  const [toast, setToast] = useState(null);

  const filtered = useMemo(() => {
    switch (activeTab) {
      case "upcoming":
        return appointments.filter(
          (a) =>
            (a.treadmendStatus === "pending" ||
              a.treadmendStatus === "accepted") &&
            isFutureOrToday(a.appointmentDate),
        );
      case "completed":
        return appointments.filter((a) => a.treadmendStatus === "completed");
      case "cancelled":
        return appointments.filter((a) => a.treadmendStatus === "rejected");
      default:
        return appointments;
    }
  }, [appointments, activeTab]);

  const handleCancel = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment? Cancellations within 24 hours may incur a fee.",
    );
    if (!confirmed) return;

    try {
      await cancelAppointmentByPatient(id);

      setAppointments((prev) =>
        prev.map((a) =>
          a._id === id
            ? {
                ...a,
                treadmendStatus: "rejected",
                queueAheadCount: null,
                estimatedWaitMinutes: null,
              }
            : a,
        ),
      );

      setToast({
        message: "Appointment cancelled.",
        subtext: "The doctor has been notified.",
        type: "error",
      });
    } catch (error) {
      if (isRedirectError(error)) throw error;
      console.error("Failed to cancel appointment:", error);
      setToast({
        message: "Something went wrong.",
        subtext: "Could not cancel the appointment. Try again.",
        type: "error",
      });
    }
  };

  return (
    <>
      {/* ── Header + Filter Bar ─────────────────────────────── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <SegmentedTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <Link
          href="/find-doctors"
          className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold shadow-sm hover:brightness-95 hover:-translate-y-0.5 active:scale-95 transition-all"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--text-on-primary)",
          }}
        >
          <IoMdAdd className="text-xl" />
          Book Appointment
        </Link>
      </div>

      {/* ── Table ────────────────────────────────────────────── */}
      <AppointmentsTable appointments={filtered} onCancel={handleCancel} />

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
