"use client";

import { useState, useCallback } from "react";
import TabNav from "./TabNav";
import AppointmentCard from "./AppointmentCard";
import EmptyState from "./EmptyState";
import ToastNotification from "./ToastNotification";
import PrescriptionModal from "./PrescriptionModal";
import { IoMdAdd } from "react-icons/io";
import { updateAppointmentStatus } from "@/lib/actions/appointments";
import { isRedirectError } from "@/lib/core/server";
import { savePrescription } from "@/lib/actions/prescriptions";

export default function AppointmentRequestsClient({ initialAppointments }) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [activeTab, setActiveTab] = useState("pending");
  const [toast, setToast] = useState(null); // { message, subtext, type }

  // মোডালের জন্য নতুন স্টেট
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ── Count badges ──────────────────────────────────────────────
  const counts = appointments.reduce((acc, a) => {
    acc[a.treadmendStatus] = (acc[a.treadmendStatus] ?? 0) + 1;
    return acc;
  }, {});

  // ── Status mutation helper ────────────────────────────────────
  const updateStatus = useCallback((id, newStatus) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a._id === id ? { ...a, treadmendStatus: newStatus } : a,
      ),
    );
  }, []);

  // ── Action handlers ───────────────────────────────────────────
  const handleAccept = async (_id) => {
    try {
      await updateAppointmentStatus(_id, { treadmendStatus: "accepted" });
      updateStatus(_id, "accepted");

      setToast({
        message: "Appointment accepted successfully.",
        subtext: "Patient will be notified shortly.",
        type: "success",
      });
    } catch (error) {
      if (isRedirectError(error)) throw error; // session-expired redirect কে যেতে দিন
      console.error("Failed to accept appointment:", error);
      setToast({
        message: "Something went wrong.",
        subtext: "Could not accept the appointment. Try again.",
        type: "error",
      });
    }
  };

  const handleReject = async (_id) => {
    try {
      await updateAppointmentStatus(_id, { treadmendStatus: "rejected" });

      updateStatus(_id, "rejected");

      setToast({
        message: "Appointment rejected.",
        subtext: "Patient will receive a cancellation notice.",
        type: "error",
      });
    } catch (error) {
      if (isRedirectError(error)) throw error;
      console.error("Failed to reject appointment:", error);
      setToast({
        message: "Something went wrong.",
        subtext: "Could not reject the appointment. Try again.",
        type: "error",
      });
    }
  };

  // বাটন ক্লিক হ্যান্ডলার (মোডাল ওপেন করবে)
  const handleCompleteClick = (_id, appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  // প্রেসক্রিপশন সেভ করার মেইন হ্যান্ডলার (ডাইনামিক ব্যাকএন্ড কানেকশন)
  const handleSavePrescription = async (appointmentId, prescriptionData) => {
    try {
      // ১. প্রেসক্রিপশন সেভ করা (আগে এই API কলটাই কমেন্ট করা ছিল, কোথাও সেভ হতো না)
      await savePrescription({
        appointmentId,
        doctorId: selectedAppointment?.doctorId,
        patientId: selectedAppointment?.patientId,
        patientName: selectedAppointment?.patientName,
        patientImage: selectedAppointment?.patientImage,
        appointmentDate: selectedAppointment?.appointmentDate,
        time: selectedAppointment?.time,
        medicines: prescriptionData.medicines,
        instructions: prescriptionData.instructions,
      });

      // ২. প্রেসক্রিপশন সেভ সফল হলেই appointment-কে completed করা
      await updateAppointmentStatus(appointmentId, {
        treadmendStatus: "completed",
      });

      // ৩. লোকাল স্টেট আপডেট
      updateStatus(appointmentId, "completed");

      setIsModalOpen(false);
      setSelectedAppointment(null);
      setActiveTab("completed");

      setToast({
        message: "Prescription saved successfully!",
        subtext: "Appointment status updated to completed.",
        type: "success",
      });
    } catch (error) {
      if (isRedirectError(error)) throw error;
      console.error("Failed to save prescription:", error);
      setToast({
        message: "Something went wrong.",
        subtext: "Could not save prescription. Try again.",
        type: "error",
      });
    }
  };

  // ── Filtered list ─────────────────────────────────────────────
  const filtered = appointments.filter((a) => a.treadmendStatus === activeTab);

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
              key={appointment._id}
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
