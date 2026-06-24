"use client";

import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { VscError } from "react-icons/vsc";

export default function ToastNotification({ message, subtext, type = "success", onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 5000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  const isSuccess = type === "success";

  return (
    <div
      className="fixed bottom-8 right-8 z-200 flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border min-w-75 max-w-sm"
      style={{
        backgroundColor: isSuccess ? "var(--neutral-900)" : "var(--danger-50)",
        borderColor: isSuccess ? "var(--neutral-700)" : "var(--danger-100)",
        color: isSuccess ? "var(--neutral-100)" : "var(--color-danger-text)",
      }}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
        style={{
          backgroundColor: isSuccess
            ? "var(--color-success)"
            : "var(--color-danger)",
        }}
      >
        <span
          className=" text-white text-xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {isSuccess ? <FaCheckCircle /> : <VscError />}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{message}</p>
        {subtext && (
          <p
            className="text-xs mt-0.5"
            style={{
              color: isSuccess ? "var(--neutral-400)" : "var(--color-danger)",
            }}
          >
            {subtext}
          </p>
        )}
      </div>

      <button
        onClick={onDismiss}
        className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
      >
        <span className=" text-xl">
          <IoMdClose />
        </span>
      </button>
    </div>
  );
}
