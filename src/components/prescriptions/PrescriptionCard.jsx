"use client";

import Image from "next/image";
import { IoTodayOutline } from "react-icons/io5";
import { MdSchedule, MdOutlineMedicalServices } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";

export default function PrescriptionCard({ prescription, onEdit }) {
  const {
    _id,
    patientName,
    patientImage: patientAvatar,
    appointmentDate: date,
    time,
    medicines,
    instructions,
  } = prescription;

  return (
    <div
      className="rounded-xl border p-6 flex gap-5 items-start transition-shadow duration-300 hover:shadow-md"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-default)",
      }}
    >
      {/* Avatar */}
      <div
        className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 relative"
        style={{ borderColor: "var(--border-default)" }}
      >
        <Image
          src={patientAvatar || "/default-avatar.png"}
          alt={patientName || "Patient"}
          fill
          className="object-cover"
          sizes="56px"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Name + Edit button */}
        <div className="flex justify-between items-start gap-3 flex-wrap">
          <div>
            <h3
              className="text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {patientName}
            </h3>
            {/* Date & Time meta */}
            <div className="flex items-center gap-4 mt-1 flex-wrap">
              {date && (
                <div
                  className="flex items-center gap-1.5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span className="text-[18px]">
                    <IoTodayOutline />
                  </span>
                  <span className="text-sm">{date}</span>
                </div>
              )}
              {time && (
                <div
                  className="flex items-center gap-1.5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span className="text-[18px]">
                    <MdSchedule />
                  </span>
                  <span className="text-sm">{time}</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => onEdit(prescription)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-semibold border hover:opacity-80 active:scale-95 transition-all shrink-0"
            style={{
              borderColor: "var(--color-primary)",
              color: "var(--color-primary)",
            }}
          >
            <FiEdit2 className="text-sm" />
            Edit
          </button>
        </div>

        {/* Medicines box */}
        <div
          className="mt-4 p-4 rounded-lg border"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-default)",
          }}
        >
          <h4
            className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest mb-1.5"
            style={{ color: "var(--text-muted)" }}
          >
            <MdOutlineMedicalServices className="text-sm" />
            Medicines &amp; Dosages
          </h4>
          <p
            className="text-sm leading-relaxed whitespace-pre-line"
            style={{ color: "var(--text-primary)" }}
          >
            {medicines}
          </p>
        </div>

        {/* Instructions box */}
        {instructions && (
          <div
            className="mt-3 p-4 rounded-lg border"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-default)",
            }}
          >
            <h4
              className="text-[11px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: "var(--text-muted)" }}
            >
              Special Instructions
            </h4>
            <p
              className="text-sm leading-relaxed whitespace-pre-line"
              style={{ color: "var(--text-primary)" }}
            >
              {instructions}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
