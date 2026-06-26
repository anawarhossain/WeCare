"use client";

import StatusBadge from "@/components/common/StatusBadge";
import { Avatar } from "@heroui/react";
import { IoEyeOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import WaitTimeIndicator from "./WaitTimeIndicator";

export default function AppointmentsTable({ appointments, onCancel }) {
  if (appointments.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 text-center rounded-xl border"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border-default)",
        }}
      >
        <p
          className="text-lg font-semibold mb-1"
          style={{ color: "var(--text-primary)" }}
        >
          No appointments found
        </p>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Appointments in this category will show up here.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl border overflow-hidden shadow-sm"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-default)",
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              className="border-b"
              style={{
                borderColor: "var(--border-default)",
                backgroundColor: "var(--bg-surface)",
              }}
            >
              {["Doctor", "Date", "Time", "Status", "Wait Time", ""].map(
                (h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, idx) => {
              const isCancellable =
                appt.treadmendStatus === "pending" ||
                appt.treadmendStatus === "accepted";
              const isDimmed = appt.treadmendStatus === "rejected";

              return (
                <tr
                  key={appt._id}
                  className="border-b last:border-b-0 transition-colors hover:opacity-90"
                  style={{
                    borderColor: "var(--border-default)",
                    backgroundColor:
                      idx % 2 === 1 ? "var(--bg-surface)" : "transparent",
                    opacity: isDimmed ? 0.6 : 1,
                  }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={appt.doctorImage}
                        name={appt.doctorName}
                        size="sm"
                      />
                      <div>
                        <p
                          className="font-semibold text-sm"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {appt.doctorName}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {appt.specialization}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    className="px-6 py-4 text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {appt.appointmentDate}
                  </td>
                  <td
                    className="px-6 py-4 text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {appt.time}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={appt.treadmendStatus} />
                  </td>
                  <td className="px-6 py-4">
                    <WaitTimeIndicator
                      queueAheadCount={appt.queueAheadCount}
                      estimatedWaitMinutes={appt.estimatedWaitMinutes}
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        className="p-2 rounded-lg hover:opacity-70 transition-all"
                        style={{ color: "var(--color-primary)" }}
                        title="View Details"
                      >
                        <IoEyeOutline className="text-lg" />
                      </button>
                      {isCancellable && (
                        <button
                          onClick={() => onCancel(appt._id)}
                          className="p-2 rounded-lg hover:opacity-70 transition-all"
                          style={{ color: "var(--color-danger)" }}
                          title="Cancel Appointment"
                        >
                          <MdCancel className="text-lg" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
