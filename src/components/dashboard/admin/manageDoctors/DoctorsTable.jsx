"use client";

import { Avatar } from "@heroui/react";
import { IoEyeOutline } from "react-icons/io5";
import VerificationStatusBadge from "./VerificationStatusBadge";
import EmptyState from "./admin-doctors-EmptyState";

const PAGE_SIZE = 10;

export default function DoctorsTable({
  doctors,
  page,
  onPageChange,
  onRowClick,
  onQuickVerify,
  onQuickReject,
  isSearching,
}) {
  if (doctors.length === 0) {
    return <EmptyState isSearching={isSearching} />;
  }

  const totalPages = Math.ceil(doctors.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = doctors.slice(start, start + PAGE_SIZE);

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
              {["Identity", "Hospital / Clinic", "Status", "Actions"].map((h) => (
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
            {pageItems.map((doctor, idx) => {
              const status = (doctor.verificationStatus || "Pending").toLowerCase();
              return (
                <tr
                  key={doctor._id}
                  className="border-b last:border-b-0 hover:opacity-90 transition-colors cursor-pointer"
                  style={{
                    borderColor: "var(--border-default)",
                    backgroundColor:
                      idx % 2 === 1 ? "var(--bg-surface)" : "transparent",
                  }}
                  onClick={() => onRowClick(doctor)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <Avatar.Image
                          alt={doctor?.name}
                          src={doctor?.image}
                          name={doctor?.name}
                          size="md"
                        />
                        <Avatar.Fallback>
                          {doctor?.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </Avatar.Fallback>
                      </Avatar>
                      <div>
                        <p
                          className="font-semibold text-sm"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {doctor.name}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {doctor.specialization}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {doctor.hospitalName || "—"}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <VerificationStatusBadge
                      status={doctor.verificationStatus}
                    />
                  </td>
                  <td
                    className="px-6 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-2">
                      {status === "pending" && (
                        <>
                          <button
                            onClick={() => onQuickVerify(doctor)}
                            className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
                            style={{
                              backgroundColor: "var(--color-success)",
                              color: "#ffffff",
                            }}
                          >
                            Verify
                          </button>
                          <button
                            onClick={() => onQuickReject(doctor)}
                            className="border px-4 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
                            style={{
                              borderColor: "var(--color-danger)",
                              color: "var(--color-danger)",
                            }}
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {status !== "pending" && (
                        <button
                          onClick={() => onRowClick(doctor)}
                          className="p-2 rounded-full transition-all hover:opacity-70"
                          style={{ color: "var(--color-primary)" }}
                          title="View Profile"
                        >
                          <IoEyeOutline className="text-lg" />
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

      {/* Pagination footer */}
      <div
        className="px-6 py-3 flex justify-between items-center border-t flex-wrap gap-2"
        style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-default)" }}
      >
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Showing {start + 1}–{Math.min(start + PAGE_SIZE, doctors.length)} of {doctors.length} doctors
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
