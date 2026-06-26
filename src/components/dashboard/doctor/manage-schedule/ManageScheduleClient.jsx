"use client";

import { useState } from "react";
import WeeklyGrid from "./WeeklyGrid";
import AddScheduleModal from "./AddScheduleModal";
import { FaPlus } from "react-icons/fa";
import { getScheduleDataById } from "@/lib/api/scheduls";

export default function ManageScheduleClient({
  initialStats,
  initialSlots,
  doctorId,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [stats, setStats] = useState(initialStats);
  const [schedule, setSchedule] = useState(initialSlots);

  // চাইল্ড কম্পোনেন্ট (WeeklyGrid) থেকে কল করার জন্য একটি গ্লোবাল রিলোড বা আপডেট স্টেট ফাংশন
  const refreshData = async () => {
    const data = await getScheduleDataById(doctorId);
    setStats(data.stats);
    setSchedule(data.slots);
  };

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Manage Schedule
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            Configure your weekly availability and consultation slot durations.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-md) text-sm font-semibold shadow-sm hover:brightness-95 hover:-translate-y-0.5 active:scale-95 transition-all"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--text-on-primary)",
          }}
        >
          <span className="text-xl">
            <FaPlus />
          </span>
          Add Schedule
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(
          ({ icon, label, value, iconBg, iconColor, fill, valueColor }) => (
            <div
              key={label}
              className="flex items-center gap-4 p-5 rounded-xl border shadow-sm"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-default)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: iconBg }}
              >
                <span
                  className="text-xl"
                  style={{
                    color: iconColor,
                    fontVariationSettings: fill ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  {icon}
                </span>
              </div>
              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-widest mb-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  {label}
                </p>
                <p
                  className="text-xl font-bold"
                  style={{ color: valueColor ?? "var(--text-primary)" }}
                >
                  {value}
                </p>
              </div>
            </div>
          ),
        )}
      </div>

      {/* Weekly Grid */}
      <WeeklyGrid
        schedule={schedule}
        doctorId={doctorId}
        onRefresh={refreshData}
      />

      {/* Modal */}
      {modalOpen && (
        <AddScheduleModal
          defaultDay={null}
          doctorId={doctorId}
          onClose={() => setModalOpen(false)}
          onSave={refreshData}
          currentSchedule={schedule}
        />
      )}
    </>
  );
}
