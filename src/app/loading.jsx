"use client";

import { useEffect, useState } from "react";
import { MdMedicalServices, MdVerifiedUser } from "react-icons/md";

const MESSAGES = [
  "Securing your health portal...",
  "Connecting to clinical databases...",
  "Encrypting patient records...",
  "Synchronizing your care plan...",
];

export default function Loading() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* Decorative background blobs */}
      <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]"
          style={{ backgroundColor: "var(--primary-300)" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full blur-[100px]"
          style={{ backgroundColor: "var(--secondary-200)" }}
        />
      </div>

      <main className="relative z-10 flex flex-col items-center text-center px-6">
        <div className="flex flex-col items-center gap-8 animate-subtle-pulse">
          {/* Logo */}
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-16 h-16 flex items-center justify-center rounded-xl shadow-lg"
              style={{ backgroundColor: "var(--color-primary-light)" }}
            >
              <MdMedicalServices
                className="text-4xl"
                style={{ color: "var(--color-primary)" }}
              />
            </div>
            <h1
              className="text-3xl font-bold tracking-tight"
              style={{ color: "var(--color-primary)" }}
            >
              WeCare
            </h1>
          </div>

          {/* Loading ring */}
          <div className="relative w-20 h-20">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="var(--border-default)"
                strokeWidth="3"
              />
            </svg>
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
            >
              <circle
                className="loading-ring"
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="70 210"
              />
            </svg>
          </div>

          {/* Reassuring message */}
          <div className="space-y-2">
            <p
              key={messageIndex}
              className="text-lg font-medium transition-opacity duration-500"
              style={{ color: "var(--text-secondary)" }}
            >
              {MESSAGES[messageIndex]}
            </p>
            <p
              className="text-xs uppercase tracking-widest font-semibold"
              style={{ color: "var(--text-muted)" }}
            >
              Clinical excellence in progress
            </p>
          </div>
        </div>
      </main>

      {/* HIPAA badge */}
      <div className="fixed bottom-10 w-full text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-sm border"
          style={{
            backgroundColor: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(8px)",
            borderColor: "var(--border-default)",
          }}
        >
          <MdVerifiedUser
            className="text-sm"
            style={{ color: "var(--color-primary)" }}
          />
          <span
            className="text-[11px] font-semibold uppercase tracking-widest"
            style={{ color: "var(--text-secondary)" }}
          >
            HIPAA Compliant &amp; Encrypted
          </span>
        </div>
      </div>
    </div>
  );
}
