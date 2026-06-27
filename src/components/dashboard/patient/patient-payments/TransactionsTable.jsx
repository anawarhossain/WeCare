"use client";

import { Avatar } from "@heroui/react";
import { MdOutlineDescription } from "react-icons/md";
import PaymentStatusBadge from "./PaymentStatusBadge";
import EmptyState from "./EmptyState";

const PAGE_SIZE = 8;

export default function TransactionsTable({
  transactions,
  page,
  onPageChange,
  onViewReceipt,
}) {
  if (transactions.length === 0) {
    return <EmptyState />;
  }

  const totalPages = Math.ceil(transactions.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = transactions.slice(start, start + PAGE_SIZE);

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
          <thead style={{ backgroundColor: "var(--bg-surface)" }}>
            <tr
              className="border-b"
              style={{ borderColor: "var(--border-default)" }}
            >
              {[
                "Transaction ID",
                "Doctor",
                "Appointment Date",
                "Amount",
                "Status",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-[11px] font-bold uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageItems.map((t, idx) => (
              <tr
                key={t._id}
                className="border-b last:border-b-0 hover:opacity-90 transition-colors"
                style={{
                  borderColor: "var(--border-default)",
                  backgroundColor:
                    idx % 2 === 1 ? "var(--bg-surface)" : "transparent",
                }}
              >
                <td className="px-6 py-4">
                  <span
                    className="font-mono font-bold text-sm"
                    style={{ color: "var(--color-primary)" }}
                  >
                    #{t.transactionId}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    
                    <Avatar>
                      <Avatar.Image
                        alt={t?.doctorName}
                        src={t?.doctorImage}
                        name={t.doctorName}
                      />
                      <Avatar.Fallback>
                        {t?.doctorName
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
                        {t.doctorName}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {t.specialization}
                      </p>
                    </div>
                  </div>
                </td>
                <td
                  className="px-6 py-4 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {t.appointmentDate}
                </td>
                <td
                  className="px-6 py-4 text-sm font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  ${t.fee.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <PaymentStatusBadge status={t.paymentStatus} />
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onViewReceipt(t)}
                    className="p-2 rounded-lg hover:opacity-70 transition-all"
                    style={{ color: "var(--color-primary)" }}
                    title="View Receipt"
                  >
                    <MdOutlineDescription className="text-lg" />
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
          Showing {start + 1}–{Math.min(start + PAGE_SIZE, transactions.length)}{" "}
          of {transactions.length} transactions
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
