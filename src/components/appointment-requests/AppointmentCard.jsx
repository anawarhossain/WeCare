"use client";

import Image from "next/image";
import StatusBadge from "./StatusBadge";
import { IoTodayOutline } from "react-icons/io5";
import { MdOutlineBlock, MdSchedule } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function AppointmentCard({ appointment, onAccept, onReject, onComplete }) {
  const { id, patientName, patientAvatar, date, time, notes, status } = appointment;

  const isPending   = status === "pending";
  const isAccepted  = status === "accepted";
  const isDimmed    = status === "completed" || status === "rejected";

  return (
    <div
      className="rounded-xl border p-6 flex gap-5 items-start transition-shadow duration-300 hover:shadow-md"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-default)",
        opacity: isDimmed ? 0.75 : 1,
      }}
    >
      {/* Avatar */}
      <div
        className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 relative"
        style={{ borderColor: "var(--border-default)" }}
      >
        <Image
          src={patientAvatar}
          alt={patientName}
          fill
          className="object-cover"
          sizes="56px"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Name + Badge */}
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
              <div
                className="flex items-center gap-1.5"
                style={{ color: "var(--text-secondary)" }}
              >
                <span className="text-[18px]">
                  <IoTodayOutline />
                </span>
                <span className="text-sm">{date}</span>
              </div>
              <div
                className="flex items-center gap-1.5"
                style={{ color: "var(--text-secondary)" }}
              >
                <span className="text-[18px]">
                  <MdSchedule />
                </span>
                <span className="text-sm">{time}</span>
              </div>
            </div>
          </div>
          <StatusBadge status={status} />
        </div>

        {/* Notes box */}
        <div
          className="mt-4 p-4 rounded-lg border"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-default)",
          }}
        >
          <h4
            className="text-[11px] font-bold uppercase tracking-widest mb-1"
            style={{ color: "var(--text-muted)" }}
          >
            Symptoms &amp; Notes
          </h4>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-primary)" }}
          >
            {notes}
          </p>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex gap-3 flex-wrap">
          {isPending && (
            <>
              <button
                onClick={() => onAccept(id)}
                className="flex items-center gap-2 px-5 py-2 rounded-md text-sm font-semibold shadow-sm hover:brightness-95 hover:-translate-y-0.5 active:scale-95 transition-all"
                style={{
                  backgroundColor: "var(--color-success)",
                  color: "#ffffff",
                }}
              >
                <span
                  className="text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  <FaRegCheckCircle />
                </span>
                Accept Request
              </button>
              <button
                onClick={() => onReject(id)}
                className="flex items-center gap-2 px-5 py-2 rounded-md text-sm font-semibold border hover:opacity-80 active:scale-95 transition-all"
                style={{
                  borderColor: "var(--color-danger)",
                  color: "var(--color-danger)",
                }}
              >
                <span className="text-xl">
                  <ImCancelCircle />
                </span>
                Reject
              </button>
            </>
          )}

          {isAccepted && (
            <button
              onClick={() => onComplete(appointment)}
              className="flex items-center gap-2 px-5 py-2 rounded-md text-sm font-semibold shadow-sm hover:brightness-95 hover:-translate-y-0.5 active:scale-95 transition-all"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--text-on-primary)",
              }}
            >
              <span
                className="text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                <IoMdCheckmarkCircleOutline />
              </span>
              Completed and make prescription
            </button>
          )}

          {status === "completed" && (
            <span
              className="flex items-center gap-1.5 text-sm font-medium"
              style={{ color: "var(--color-success)" }}
            >
              <span
                className="text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                <FaRegCheckCircle />
              </span>
              Consultation completed
            </span>
          )}

          {status === "rejected" && (
            <span
              className="flex items-center gap-1.5 text-sm font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              <span className="text-xl">
                <MdOutlineBlock />
              </span>
              Request rejected
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
