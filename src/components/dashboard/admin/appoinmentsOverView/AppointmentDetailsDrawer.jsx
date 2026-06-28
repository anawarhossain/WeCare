"use client";

import { useEffect } from "react";
import { Avatar } from "@heroui/react";
import { IoMdClose } from "react-icons/io";
import { MdMedicalInformation, MdPayments, MdCreditCard, MdInfoOutline } from "react-icons/md";
import { TbProgress } from "react-icons/tb";
import AppointmentStatusBadge from "./AppointmentStatusBadge";
import PaymentStatusBadge from "../../patient/patient-payments/PaymentStatusBadge";

export default function AppointmentDetailsDrawer({ appointment, onClose, onCancel, isSaving }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const isCancellable =
    appointment.treadmendStatus === "pending" || appointment.treadmendStatus === "accepted";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-60 animate-fade-in"
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed inset-y-0 right-0 w-full max-w-md z-70 shadow-2xl flex flex-col"
        style={{ backgroundColor: "var(--bg-card)" }}
      >
        {/* Header */}
        <div
          className="p-6 border-b flex items-start justify-between"
          style={{ borderColor: "var(--border-default)" }}
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-xs font-bold"
                style={{ color: "var(--text-muted)" }}
              >
                APPOINTMENT #
                {appointment._id.toString().slice(-6).toUpperCase()}
              </span>
              <AppointmentStatusBadge status={appointment.treadmendStatus} />
            </div>
            <h4
              className="text-lg font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Appointment Details
            </h4>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors shrink-0"
          >
            <IoMdClose
              className="text-xl"
              style={{ color: "var(--text-muted)" }}
            />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Patient + Doctor */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="p-4 rounded-xl border"
              style={{
                borderColor: "var(--border-default)",
                backgroundColor: "var(--bg-surface)",
              }}
            >
              <p
                className="text-[10px] font-bold uppercase tracking-wider mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Patient
              </p>
              <div className="flex items-center gap-2">
                <Avatar>
                  <Avatar.Image
                    alt={appointment?.patientName}
                    src={appointment?.patientImage}
                    name={appointment?.patientName}
                    size="sm"
                  />
                  <Avatar.Fallback>
                    {appointment?.patientName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Avatar.Fallback>
                </Avatar>
                <p
                  className="text-sm font-semibold truncate"
                  style={{ color: "var(--text-primary)" }}
                >
                  {appointment.patientName}
                </p>
              </div>
            </div>
            <div
              className="p-4 rounded-xl border"
              style={{
                borderColor: "var(--border-default)",
                backgroundColor: "var(--bg-surface)",
              }}
            >
              <p
                className="text-[10px] font-bold uppercase tracking-wider mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Doctor
              </p>
              <div className="flex items-center gap-2">
                <Avatar>
                  <Avatar.Image
                    alt={appointment?.doctorName}
                    src={appointment?.doctorImage}
                    name={appointment?.doctorName}
                    size="sm"
                  />
                  <Avatar.Fallback>
                    {appointment?.doctorName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Avatar.Fallback>
                </Avatar>
                <div className="truncate">
                  <p
                    className="text-sm font-semibold truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {appointment.doctorName}
                  </p>
                  <p
                    className="text-[10px] truncate"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {appointment.specialization}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div
            className="flex justify-between items-center p-4 rounded-xl border"
            style={{ borderColor: "var(--border-default)" }}
          >
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                Scheduled For
              </p>
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {appointment.appointmentDate}
              </p>
            </div>
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {appointment.time}
            </p>
          </div>

          {/* Clinical Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MdMedicalInformation style={{ color: "var(--color-primary)" }} />
              <h5
                className="text-[11px] font-bold uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                Clinical Information
              </h5>
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Reported Symptoms / Notes
              </p>
              <p
                className="text-sm italic"
                style={{ color: "var(--text-primary)" }}
              >
                {appointment.notes
                  ? `"${appointment.notes}"`
                  : "No notes provided."}
              </p>
            </div>
          </div>

          {/* Payment */}
          <div
            className="p-5 rounded-xl border shadow-sm space-y-3"
            style={{
              borderColor: "var(--border-default)",
              backgroundColor: "var(--bg-surface)",
            }}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MdPayments style={{ color: "var(--color-success)" }} />
                <h5
                  className="text-[11px] font-bold uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  Payment Details
                </h5>
              </div>
              <PaymentStatusBadge status={appointment.paymentStatus} />
            </div>
            <div
              className="flex justify-between border-b pb-2"
              style={{ borderColor: "var(--border-default)" }}
            >
              <span
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Amount
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                ${appointment.fee.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Paid By
              </span>
              <div className="flex items-center gap-1.5">
                <MdCreditCard style={{ color: "var(--text-muted)" }} />
                <span
                  className="text-sm"
                  style={{ color: "var(--text-primary)" }}
                >
                  {appointment.customerCardName || "—"}
                </span>
              </div>
            </div>
          </div>

          {/* limitation note — সঠিক audit trail data নেই, fabricate করা হলো না */}
          <div
            className="flex items-start gap-2 p-3 rounded-lg text-xs"
            style={{
              backgroundColor: "var(--bg-muted)",
              color: "var(--text-muted)",
            }}
          >
            <MdInfoOutline className="shrink-0 mt-0.5" />
            <span>
              Status-change audit trail isn&apos;t tracked yet — only the
              current status is shown above.
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          className="p-6 border-t flex gap-3"
          style={{ borderColor: "var(--border-default)" }}
        >
          <button
            disabled
            title="Rescheduling isn't available yet"
            className="flex-1 py-3 rounded-xl text-sm font-semibold opacity-50 cursor-not-allowed"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--text-on-primary)",
            }}
          >
            Reschedule
          </button>
          <button
            onClick={onCancel}
            disabled={!isCancellable || isSaving}
            className="flex-1 py-3 rounded-xl border text-sm font-semibold transition-colors hover:bg-red-50 disabled:opacity-50 flex items-center justify-center gap-2"
            style={{
              borderColor: "var(--color-danger)",
              color: "var(--color-danger)",
            }}
          >
            {isSaving ? (
              <TbProgress className="animate-spin text-lg" />
            ) : (
              "Cancel Appointment"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
