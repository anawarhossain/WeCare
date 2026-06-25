"use client";

import { useState, useCallback } from "react";
import TabNav from "./TabNav";
import AppointmentCard from "./AppointmentCard";
import EmptyState from "./EmptyState";
import ToastNotification from "./ToastNotification";
import PrescriptionModal from "./PrescriptionModal";
import { IoMdAdd } from "react-icons/io";

export default function AppointmentRequestsClient({ initialAppointments }) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [activeTab, setActiveTab] = useState("pending");
  const [toast, setToast] = useState(null); // { message, subtext, type }

  // মোডালের জন্য নতুন স্টেট
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ── Count badges ──────────────────────────────────────────────
  const counts = appointments.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] ?? 0) + 1;
    return acc;
  }, {});

  // ── Status mutation helper ────────────────────────────────────
  const updateStatus = useCallback((id, newStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)),
    );
  }, []);

  // ── Action handlers ───────────────────────────────────────────
  const handleAccept = async (id) => {
    try {
      // 👈 ডাইনামিক API কল করুন (আপনার ব্যাকএন্ড রুট অনুযায়ী পরিবর্তন করতে পারেন)
      // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments/${id}/status`, {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ status: "accepted" })
      // });

      updateStatus(id, "accepted");
      setToast({
        message: "Appointment accepted successfully.",
        subtext: "Patient will be notified shortly.",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to accept appointment:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments/${id}/status`, {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ status: "rejected" })
      // });

      updateStatus(id, "rejected");
      setToast({
        message: "Appointment rejected.",
        subtext: "Patient will receive a cancellation notice.",
        type: "error",
      });
    } catch (error) {
      console.error("Failed to reject appointment:", error);
    }
  };

  // বাটন ক্লিক হ্যান্ডলার (মোডাল ওপেন করবে)
  const handleCompleteClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  // প্রেসক্রিপশন সেভ করার মেইন হ্যান্ডলার (ডাইনামিক ব্যাকএন্ড কানেকশন)
  const handleSavePrescription = async (appointmentId, prescriptionData) => {
    try {
      // 👈 ডাটাবেজে প্রেসক্রিপশন সেভ করা এবং অ্যাপয়েন্টমেন্ট কমপ্লিট করার এপিআই কল
      // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments/${appointmentId}/complete`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(prescriptionData)
      // });

      // লোকাল স্টেট আপডেট
      updateStatus(appointmentId, "completed");
      setIsModalOpen(false);
      setSelectedAppointment(null);
      setActiveTab("completed"); // সরাসরি কমপ্লিটেড ট্যাবে নিয়ে যাবে

      setToast({
        message: "Prescription saved successfully!",
        subtext: "Appointment status updated to completed.",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to save prescription:", error);
      setToast({
        message: "Something went wrong.",
        subtext: "Could not save prescription. Try again.",
        type: "error",
      });
    }
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
              onComplete={handleCompleteClick}
            />
          ))}
        </div>
      )}

      {/* Prescription Modal */}
      {isModalOpen && selectedAppointment && (
        <PrescriptionModal
          appointment={selectedAppointment}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedAppointment(null);
          }}
          onSave={handleSavePrescription}
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
