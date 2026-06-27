"use client";

import { useEffect } from "react";
import { IoMdClose, IoMdPrint } from "react-icons/io";
import PaymentStatusBadge from "./PaymentStatusBadge";

export default function ReceiptModal({ transaction, onClose }) {
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

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center p-4 animate-fade-in print:hidden"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="max-w-md w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-default)",
        }}
      >
        {/* Header */}
        <div
          className="flex justify-between items-center p-5 border-b"
          style={{ borderColor: "var(--border-default)" }}
        >
          <h3
            className="text-lg font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Payment Receipt
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <IoMdClose
              className="text-xl"
              style={{ color: "var(--text-muted)" }}
            />
          </button>
        </div>

        {/* Body */}
        <div
          id="receipt-print-area"
          className="p-6 space-y-5 overflow-y-auto flex-1"
        >
          <div className="flex justify-between items-start">
            <div>
              <p
                className="text-xs uppercase tracking-wider font-bold"
                style={{ color: "var(--text-muted)" }}
              >
                Transaction ID
              </p>
              <p
                className="font-mono font-bold text-sm"
                style={{ color: "var(--color-primary)" }}
              >
                #{transaction.transactionId}
              </p>
            </div>
            <PaymentStatusBadge status={transaction.paymentStatus} />
          </div>

          <div
            className="rounded-lg border p-4 space-y-3"
            style={{
              borderColor: "var(--border-default)",
              backgroundColor: "var(--bg-surface)",
            }}
          >
            <Row label="Doctor" value={transaction.doctorName} />
            <Row label="Specialization" value={transaction.specialization} />
            <Row label="Appointment Date" value={transaction.appointmentDate} />
            <Row label="Time Slot" value={transaction.time} />
            <Row label="Paid By" value={transaction.customerCardName} />
          </div>

          <div
            className="flex justify-between items-center pt-3 border-t"
            style={{ borderColor: "var(--border-default)" }}
          >
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--text-secondary)" }}
            >
              Total Amount
            </span>
            <span
              className="text-2xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              ${Number(transaction.fee).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex justify-end gap-3 p-5 border-t"
          style={{ borderColor: "var(--border-default)" }}
        >
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md border text-sm font-semibold transition-colors hover:bg-gray-50"
            style={{
              borderColor: "var(--border-default)",
              color: "var(--text-secondary)",
            }}
          >
            Close
          </button>
          <button
            onClick={() => window.print()}
            className="px-5 py-2 rounded-md text-sm font-semibold shadow-sm hover:brightness-95 transition-all flex items-center gap-2"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--text-on-primary)",
            }}
          >
            <IoMdPrint className="text-lg" />
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-3">
      <span className="text-sm" style={{ color: "var(--text-muted)" }}>
        {label}
      </span>
      <span
        className="text-sm font-medium text-right"
        style={{ color: "var(--text-primary)" }}
      >
        {value}
      </span>
    </div>
  );
}
