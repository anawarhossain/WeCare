"use client";

import { useEffect } from "react";
import { IoMdClose, IoMdPrint } from "react-icons/io";
import PaymentStatusBadge from "./PaymentStatusBadge";

// ❌ আগে @media print + visibility:hidden দিয়ে শুধু receipt অংশ দেখানোর
//    চেষ্টা করা হয়েছিল। কিন্তু visibility:hidden হওয়া element-গুলোর layout
//    height রিজার্ভই থেকে যায় (display:none-এর মতো collapse হয় না)। তাই
//    পেজের min-h-screen + টেবিলের লম্বা কন্টেন্টের কারণে browser মোট height
//    এক পেজের বেশি ভেবে নিয়ে একটা খালি ২য় পেজ তৈরি করছিল।
//
// ✅ এখন print করার সময় সম্পূর্ণ আলাদা একটা নতুন window খুলে, সেখানে শুধু
//    receipt-এর plain HTML বসিয়ে print করা হচ্ছে — মূল page-এর layout/height
//    এখানে কোনো প্রভাবই ফেলে না, তাই extra blank page আসার সুযোগই নেই।
function buildReceiptHtml(transaction) {
  const row = (label, value) =>
    value
      ? `<div style="display:flex;justify-content:space-between;padding:6px 0;font-size:14px;">
           <span style="color:#64748b;">${label}</span>
           <span style="font-weight:600;color:#0f172a;">${value}</span>
         </div>`
      : "";

  return `
    <html>
      <head>
        <title>Receipt #${transaction.transactionId}</title>
        <meta charset="utf-8" />
        <style>
          * { box-sizing: border-box; }
          body {
            font-family: -apple-system, Segoe UI, Roboto, Inter, sans-serif;
            color: #0f172a;
            padding: 32px;
            max-width: 480px;
            margin: 0 auto;
          }
          h1 { font-size: 20px; margin: 0 0 4px; }
          .txn { font-family: monospace; font-weight: 700; color: #0891b2; margin-bottom: 12px; }
          .badge {
            display: inline-block; padding: 4px 12px; border-radius: 999px;
            font-size: 12px; font-weight: 700; background: #ecfdf5; color: #065f46;
            text-transform: capitalize;
          }
          .box {
            border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px;
            margin: 20px 0;
          }
          .total {
            display: flex; justify-content: space-between; align-items: center;
            border-top: 1px solid #e2e8f0; padding-top: 14px; margin-top: 8px;
          }
          .total span:first-child { color: #475569; font-weight: 600; font-size: 14px; }
          .total span:last-child { font-size: 24px; font-weight: 700; }
        </style>
      </head>
      <body>
        <h1>WeCare — Payment Receipt</h1>
        <p class="txn">#${transaction.transactionId}</p>
        <span class="badge">${transaction.paymentStatus}</span>
        <div class="box">
          ${row("Doctor", transaction.doctorName)}
          ${row("Specialization", transaction.specialization)}
          ${row("Appointment Date", transaction.appointmentDate)}
          ${row("Time Slot", transaction.time)}
          ${row("Paid By", transaction.customerCardName)}
        </div>
        <div class="total">
          <span>Total Amount</span>
          <span>$${Number(transaction.fee).toFixed(2)}</span>
        </div>
      </body>
    </html>
  `;
}

function printReceipt(transaction) {
  const printWindow = window.open("", "_blank", "width=480,height=640");
  if (!printWindow) {
    // পপআপ ব্লক করা থাকলে
    alert("Please allow pop-ups to print the receipt.");
    return;
  }

  printWindow.document.write(buildReceiptHtml(transaction));
  printWindow.document.close();

  // ছবি/ফন্ট লোড হওয়ার জন্য একটু সময় দিয়ে তারপর print dialog খোলা,
  // আর print dialog বন্ধ হওয়ার পর window-টা নিজে থেকেই বন্ধ হয়ে যাবে
  printWindow.onload = () => {
    printWindow.focus();
    printWindow.print();
  };
  printWindow.onafterprint = () => printWindow.close();
}

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
      className="fixed inset-0 z-200 flex items-center justify-center p-4 animate-fade-in"
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
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
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
            onClick={() => printReceipt(transaction)}
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
