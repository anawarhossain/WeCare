"use client";

import { useState, useMemo } from "react";

export default function BookingTab({ slots, onSlotSelect }) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Build next 6 days from today
  const days = useMemo(() => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return {
        label: dayNames[d.getDay()],
        date: d.getDate(),
        full: d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
    });
  }, []);

  const handleSlotClick = (time) => {
    setSelectedSlot(time);
    onSlotSelect?.({ time, date: days[selectedDayIndex].full });
  };

  const SlotButton = ({ time }) => {
    const isSelected = selectedSlot === time;
    return (
      <button
        onClick={() => handleSlotClick(time)}
        className="px-5 py-2.5 rounded-full text-sm font-medium border transition-all hover:scale-105 active:scale-95"
        style={{
          backgroundColor: isSelected ? "var(--color-primary)" : "transparent",
          borderColor: isSelected ? "var(--color-primary)" : "var(--border-default)",
          color: isSelected ? "var(--text-on-primary)" : "var(--text-secondary)",
        }}
      >
        {time}
      </button>
    );
  };

  return (
    <div
      className="p-6 md:p-8 rounded-2xl border shadow-sm"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-default)",
      }}
    >
      <h2
        className="text-2xl font-semibold mb-6"
        style={{ color: "var(--text-primary)" }}
      >
        Select a Time Slot
      </h2>

      {/* Week Picker */}
      <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
        {days.map((day, i) => {
          const isActive = selectedDayIndex === i;
          return (
            <button
              key={i}
              onClick={() => {
                setSelectedDayIndex(i);
                setSelectedSlot(null);
                onSlotSelect?.(null);
              }}
              className="flex flex-col items-center justify-center min-w-[76px] p-3 border-2 rounded-xl transition-all"
              style={{
                borderColor: isActive ? "var(--color-primary)" : "transparent",
                backgroundColor: isActive
                  ? "var(--color-primary-light)"
                  : "var(--bg-surface)",
                color: isActive ? "var(--color-primary)" : "var(--text-secondary)",
              }}
            >
              <span className="text-[11px] font-semibold uppercase tracking-widest opacity-70">
                {day.label}
              </span>
              <span className="text-2xl font-bold mt-0.5">{day.date}</span>
            </button>
          );
        })}
      </div>

      {/* Morning Slots */}
      <div className="mt-6">
        <h3
          className="text-lg font-semibold mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Morning Sessions
        </h3>
        <div className="flex flex-wrap gap-3">
          {slots.morning.map((t) => (
            <SlotButton key={t} time={t} />
          ))}
        </div>
      </div>

      {/* Afternoon Slots */}
      <div className="mt-6">
        <h3
          className="text-lg font-semibold mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Afternoon Sessions
        </h3>
        <div className="flex flex-wrap gap-3">
          {slots.afternoon.map((t) => (
            <SlotButton key={t} time={t} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
