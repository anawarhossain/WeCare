"use client";

import { useEffect } from "react";
import { Avatar } from "@heroui/react";
import { IoMdClose } from "react-icons/io";
import { MdSchool, MdWorkspacePremium, MdEmail, MdPhone } from "react-icons/md";
import { TbProgress } from "react-icons/tb";
import VerificationStatusBadge from "./VerificationStatusBadge";

export default function DoctorVerificationDrawer({ doctor, onClose, onVerify, onReject, onRevoke, isSaving }) {
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

  const status = (doctor.verificationStatus || "Pending").toLowerCase();

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
            Doctor Verification
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
                alt={doctor?.name}
                src={doctor?.image}
                name={doctor?.name}
                className="object-cover "
              />
              <Avatar.Fallback>
                {doctor?.name
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
                {doctor.name}
              </h3>
              <p
                className="font-medium text-sm"
                style={{ color: "var(--color-primary)" }}
              >
                {doctor.specialization}
              </p>
            </div>
            <VerificationStatusBadge status={doctor.verificationStatus} />
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 gap-2">
            {doctor.email && (
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                <MdEmail style={{ color: "var(--text-muted)" }} />
                {doctor.email}
              </div>
            )}
            {doctor.phone && (
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                <MdPhone style={{ color: "var(--text-muted)" }} />
                {doctor.phone}
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <StatBlock label="Experience" value={`${doctor.experience} Yrs`} />
            <StatBlock label="Fee" value={`$${doctor.consultationFee}`} />
            <StatBlock label="Hospital" value={doctor.hospitalName} />
          </div>

          {/* Bio */}
          {doctor.bio && (
            <div className="space-y-2">
              <SectionLabel>About</SectionLabel>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {doctor.bio}
              </p>
            </div>
          )}

          {/* Qualifications */}
          {doctor.qualifications && (
            <div className="space-y-2">
              <SectionLabel>Qualifications</SectionLabel>
              <div
                className="flex items-start gap-3 p-3 rounded-lg"
                style={{ backgroundColor: "var(--bg-surface)" }}
              >
                <MdSchool
                  className="text-xl mt-0.5"
                  style={{ color: "var(--color-primary)" }}
                />
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  {doctor.qualifications}
                </p>
              </div>
            </div>
          )}

          {/* Specializations */}
          {doctor.specializations?.length > 0 && (
            <div className="space-y-2">
              <SectionLabel>Specializations</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {doctor.specializations.map((s) => (
                  <span
                    key={s}
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "var(--color-primary-light)",
                      color: "var(--color-primary)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Awards */}
          {doctor.awards?.length > 0 && (
            <div className="space-y-2">
              <SectionLabel>Awards &amp; Recognition</SectionLabel>
              <ul className="space-y-2">
                {doctor.awards.map((a) => (
                  <li
                    key={a}
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{ backgroundColor: "var(--bg-surface)" }}
                  >
                    <MdWorkspacePremium
                      style={{ color: "var(--accent-500)" }}
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {a}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div
          className="p-6 border-t flex gap-3"
          style={{ borderColor: "var(--border-default)" }}
        >
          {status === "pending" && (
            <>
              <button
                onClick={onReject}
                disabled={isSaving}
                className="flex-1 border py-3 rounded-xl text-sm font-semibold transition-all hover:bg-red-50 disabled:opacity-60"
                style={{
                  borderColor: "var(--color-danger)",
                  color: "var(--color-danger)",
                }}
              >
                Reject Application
              </button>
              <button
                onClick={onVerify}
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
                  "Verify Doctor"
                )}
              </button>
            </>
          )}

          {status === "verified" && (
            <button
              onClick={onRevoke}
              disabled={isSaving}
              className="flex-1 border py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-80 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{
                borderColor: "var(--accent-600)",
                color: "var(--accent-600)",
              }}
            >
              {isSaving ? (
                <TbProgress className="animate-spin text-lg" />
              ) : (
                "Revoke Verification"
              )}
            </button>
          )}

          {status === "rejected" && (
            <button
              onClick={onVerify}
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
                "Verify Doctor"
              )}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

function StatBlock({ label, value }) {
  return (
    <div className="p-3 rounded-xl border text-center" style={{ borderColor: "var(--border-default)" }}>
      <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
        {label}
      </p>
      <p className="text-sm font-bold truncate" style={{ color: "var(--text-primary)" }}>
        {value}
      </p>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <h4 className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
      {children}
    </h4>
  );
}
