"use client";

import { Avatar } from "@heroui/react";
import { IoEyeOutline } from "react-icons/io5";
import AppointmentStatusBadge from "./AppointmentStatusBadge";
import EmptyState from "./admin-appointments-EmptyState";
import PaymentStatusBadge from "../../patient/patient-payments/PaymentStatusBadge";

const PAGE_SIZE = 10;

export default function AppointmentsOverviewTable({ appointments, page, onPageChange, onViewDetails, isSearching }) {
  if (appointments.length === 0) {
    return <EmptyState isSearching={isSearching} />;
  }

  const totalPages = Math.ceil(appointments.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = appointments.slice(start, start + PAGE_SIZE);

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
              {[
                "Patient",
                "Doctor",
                "Date & Time",
                "Payment",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageItems.map((appt, idx) => (
              <tr
                key={appt._id}
                className="border-b last:border-b-0 hover:opacity-90 transition-colors cursor-pointer"
                style={{
                  borderColor: "var(--border-default)",
                  backgroundColor:
                    idx % 2 === 1 ? "var(--bg-surface)" : "transparent",
                }}
                onClick={() => onViewDetails(appt)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <Avatar.Image
                        alt={appt?.patientName}
                        src={appt?.patientImage}
                        name={appt?.patientName}
                        size="sm"
                      />
                      <Avatar.Fallback>
                        {appt?.patientName
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar.Fallback>
                    </Avatar>
                    <span
                      className="font-semibold text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {appt.patientName}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <Avatar.Image
                        alt={appt?.doctorName}
                        src={appt?.doctorImage}
                        name={appt?.doctorName}
                        size="md"
                      />
                      <Avatar.Fallback>
                        {appt?.doctorName
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar.Fallback>
                    </Avatar>
                    <span
                      className="text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {appt.doctorName}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span
                      className="text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {appt.appointmentDate}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {appt.time?.split("-")[0]?.trim()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <PaymentStatusBadge status={appt.paymentStatus} />
                </td>
                <td className="px-6 py-4">
                  <AppointmentStatusBadge status={appt.treadmendStatus} />
                </td>
                <td
                  className="px-6 py-4 text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => onViewDetails(appt)}
                    className="p-2 rounded-lg hover:opacity-70 transition-all"
                    style={{ color: "var(--color-primary)" }}
                    title="View Details"
                  >
                    <IoEyeOutline className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      <div
        className="px-6 py-3 flex justify-between items-center border-t flex-wrap gap-2"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-default)",
        }}
      >
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Showing {start + 1}–{Math.min(start + PAGE_SIZE, appointments.length)}{" "}
          of {appointments.length} results
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="px-4 py-1.5 rounded-md border text-xs font-semibold disabled:opacity-50 transition-colors hover:bg-gray-50"
            style={{
              borderColor: "var(--border-default)",
              color: "var(--text-primary)",
            }}
          >
            Previous
          </button>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="px-4 py-1.5 rounded-md border text-xs font-semibold disabled:opacity-50 transition-colors hover:bg-gray-50"
            style={{
              borderColor: "var(--border-default)",
              color: "var(--text-primary)",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
