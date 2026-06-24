"use client";

import { useEffect } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdCancel } from "react-icons/md";

export default function ToastNotification({ message, subtext, type = "success", onDismiss }) {
  // Auto-dismiss after 5s
  useEffect(() => {
    const t = setTimeout(onDismiss, 5000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  const isSuccess = type === "success";
  const iconBg    = isSuccess ? "var(--color-success)" : "var(--color-danger)";
  const icon = isSuccess ? <FaRegCheckCircle /> : <MdCancel />;

  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-200 flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-bottom-4 duration-300"
      style={{
        backgroundColor: "var(--neutral-900)",
        borderColor: "var(--neutral-700)",
        color: "var(--neutral-100)",
        minWidth: "320px",
      }}
    >
      {/* Icon circle */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        <span
          className="text-white text-xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{message}</p>
        {subtext && (
          <p className="text-xs mt-0.5" style={{ color: "var(--neutral-400)" }}>
            {subtext}
          </p>
        )}
      </div>

      {/* Dismiss */}
      <button
        onClick={onDismiss}
        className="shrink-0 hover:opacity-70 transition-opacity"
        style={{ color: "var(--neutral-400)" }}
      >
        <span className="text-xl">
          <IoMdClose />
        </span>
      </button>
    </div>
  );
}
