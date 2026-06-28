"use client";

import { Avatar } from "@heroui/react";
import { IoEyeOutline } from "react-icons/io5";
import PatientStatusBadge from "./PatientStatusBadge";
import EmptyState from "./admin-patients-EmptyState";

const PAGE_SIZE = 10;

export default function PatientsTable({ patients, page, onPageChange, onRowClick, onQuickToggleStatus, isSearching }) {
  if (patients.length === 0) {
    return <EmptyState isSearching={isSearching} />;
  }

  const totalPages = Math.ceil(patients.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = patients.slice(start, start + PAGE_SIZE);

  return (
    <div
      className="rounded-xl border overflow-hidden shadow-sm"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-default)" }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              className="border-b"
              style={{ borderColor: "var(--border-default)", backgroundColor: "var(--bg-surface)" }}
            >
              {["Patient", "Contact", "Appointments", "Total Spent", "Status", "Actions"].map((h) => (
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
            {pageItems.map((patient, idx) => {
              const status = (patient.status || "active").toLowerCase();
              return (
                <tr
                  key={patient._id}
                  className="border-b last:border-b-0 hover:opacity-90 transition-colors cursor-pointer"
                  style={{
                    borderColor: "var(--border-default)",
                    backgroundColor:
                      idx % 2 === 1 ? "var(--bg-surface)" : "transparent",
                  }}
                  onClick={() => onRowClick(patient)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <Avatar.Image
                          alt={patient?.name}
                          src={patient?.image}
                          name={patient?.name}
                          size="md"
                        />
                        <Avatar.Fallback>
                          {patient?.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </Avatar.Fallback>
                      </Avatar>
                      <p
                        className="font-semibold text-sm"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {patient.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {patient.email}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {patient.phone || "—"}
                    </p>
                  </td>
                  <td
                    className="px-6 py-4 text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {patient.totalAppointments}
                  </td>
                  <td
                    className="px-6 py-4 text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    ${patient.totalSpent.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <PatientStatusBadge status={patient.status} />
                  </td>
                  <td
                    className="px-6 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onQuickToggleStatus(patient)}
                        className="border px-4 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
                        style={
                          status === "active"
                            ? {
                                borderColor: "var(--color-danger)",
                                color: "var(--color-danger)",
                              }
                            : {
                                borderColor: "var(--color-primary)",
                                color: "var(--color-primary)",
                              }
                        }
                      >
                        {status === "active" ? "Suspend" : "Activate"}
                      </button>
                      <button
                        onClick={() => onRowClick(patient)}
                        className="p-2 rounded-full transition-all hover:opacity-70"
                        style={{ color: "var(--color-primary)" }}
                        title="View Profile"
                      >
                        <IoEyeOutline className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      <div
        className="px-6 py-3 flex justify-between items-center border-t flex-wrap gap-2"
        style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-default)" }}
      >
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Showing {start + 1}–{Math.min(start + PAGE_SIZE, patients.length)} of {patients.length} patients
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="px-4 py-1.5 rounded-md border text-xs font-semibold disabled:opacity-50 transition-colors hover:bg-gray-50"
            style={{ borderColor: "var(--border-default)", color: "var(--text-primary)" }}
          >
            Previous
          </button>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="px-4 py-1.5 rounded-md border text-xs font-semibold disabled:opacity-50 transition-colors hover:bg-gray-50"
            style={{ borderColor: "var(--border-default)", color: "var(--text-primary)" }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
