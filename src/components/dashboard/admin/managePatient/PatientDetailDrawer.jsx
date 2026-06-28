"use client";

import { useEffect } from "react";
import { Avatar } from "@heroui/react";
import { IoMdClose } from "react-icons/io";
import { MdEmail, MdPhone, MdEventAvailable, MdAccountBalanceWallet, MdWc } from "react-icons/md";
import { TbProgress } from "react-icons/tb";
import PatientStatusBadge from "./PatientStatusBadge";

export default function PatientDetailDrawer({ patient, onClose, onSuspend, onActivate, isSaving }) {
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

  const status = (patient.status || "active").toLowerCase();
  const joined = patient.createdAt
    ? new Date(patient.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

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
        className="fixed right-0 top-0 h-screen w-full max-w-lg z-70 shadow-2xl flex flex-col"
        style={{ backgroundColor: "var(--bg-card)" }}
      >
        {/* Header */}
        <div
          className="p-6 border-b flex items-center justify-between"
          style={{
            borderColor: "var(--border-default)",
            backgroundColor: "var(--bg-surface)",
          }}
        >
          <h2
            className="text-xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Patient Profile
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <IoMdClose
              className="text-xl"
              style={{ color: "var(--text-muted)" }}
            />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center gap-3">
            <Avatar className="h-52 w-52">
              <Avatar.Image
                alt={patient?.name}
                src={patient?.image}
                name={patient?.name}
                className="object-cover "
              />
              <Avatar.Fallback>
                {patient?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar.Fallback>
            </Avatar>
            <div>
              <h3
                className="text-xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {patient.name}
              </h3>
              {joined && (
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Joined {joined}
                </p>
              )}
            </div>
            <PatientStatusBadge status={patient.status} />
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 gap-2">
            {patient.email && (
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                <MdEmail style={{ color: "var(--text-muted)" }} />
                {patient.email}
              </div>
            )}
            {patient.phone && (
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                <MdPhone style={{ color: "var(--text-muted)" }} />
                {patient.phone}
              </div>
            )}
            {patient.gender && (
              <div
                className="flex items-center gap-2 text-sm capitalize"
                style={{ color: "var(--text-secondary)" }}
              >
                <MdWc style={{ color: "var(--text-muted)" }} />
                {patient.gender}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="p-4 rounded-xl border text-center"
              style={{ borderColor: "var(--border-default)" }}
            >
              <MdEventAvailable
                className="text-2xl mx-auto mb-1"
                style={{ color: "var(--color-primary)" }}
              />
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {patient.totalAppointments}
              </p>
              <p
                className="text-[11px] uppercase tracking-wide font-bold"
                style={{ color: "var(--text-muted)" }}
              >
                Appointments
              </p>
            </div>
            <div
              className="p-4 rounded-xl border text-center"
              style={{ borderColor: "var(--border-default)" }}
            >
              <MdAccountBalanceWallet
                className="text-2xl mx-auto mb-1"
                style={{ color: "var(--secondary-600)" }}
              />
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                ${patient.totalSpent.toFixed(2)}
              </p>
              <p
                className="text-[11px] uppercase tracking-wide font-bold"
                style={{ color: "var(--text-muted)" }}
              >
                Total Spent
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          className="p-6 border-t flex gap-3"
          style={{ borderColor: "var(--border-default)" }}
        >
          {status === "active" ? (
            <button
              onClick={onSuspend}
              disabled={isSaving}
              className="flex-1 border py-3 rounded-xl text-sm font-semibold transition-all hover:bg-red-50 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{
                borderColor: "var(--color-danger)",
                color: "var(--color-danger)",
              }}
            >
              {isSaving ? (
                <TbProgress className="animate-spin text-lg" />
              ) : (
                "Suspend Account"
              )}
            </button>
          ) : (
            <button
              onClick={onActivate}
              disabled={isSaving}
              className="flex-1 py-3 rounded-xl text-sm font-semibold shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--text-on-primary)",
              }}
            >
              {isSaving ? (
                <TbProgress className="animate-spin text-lg" />
              ) : (
                "Reactivate Account"
              )}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
