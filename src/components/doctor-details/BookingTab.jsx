"use client";

import { useState, useMemo } from "react";

export default function BookingTab({ docSlots, onSlotSelect }) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // ১. আজ থেকে পরবর্তী ৬ দিনের নাম ও তারিখ তৈরি করা
  const days = useMemo(() => {
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const shortDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return {
        shortLabel: shortDayNames[d.getDay()], // Sun, Mon
        fullLabel: dayNames[d.getDay()], // Sunday, Monday
        date: d.getDate(),
        fullDateString: d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
    });
  }, []);

  // ২. সিলেক্ট করা দিনের উপর ভিত্তি করে slots ডাটাকে Morning এবং Afternoon-এ রূপান্তর করা
  const formattedSlots = useMemo(() => {
    const activeDayName = days[selectedDayIndex].fullLabel; // e.g., "Monday"
    const daySlots = docSlots?.[activeDayName] || [];

    const morning = [];
    const afternoon = [];

    daySlots.forEach((slot) => {
      // label চেক করা (e.g., "09:00 AM - 09:30 AM")
      // যদি শুরুর সময় AM হয় তবে Morning, PM হলে Afternoon
      if (slot.label.includes("AM")) {
        morning.push(slot);
      } else {
        afternoon.push(slot);
      }
    });

    return { morning, afternoon };
  }, [selectedDayIndex, docSlots, days]);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot.id); // ইউনিক আইডি ট্র্যাক করার জন্য
    onSlotSelect?.({
      slotId: slot.id,
      time: slot.label,
      date: days[selectedDayIndex].fullDateString,
    });
  };

  const SlotButton = ({ slot }) => {
    const isSelected = selectedSlot === slot.id;
    return (
      <button
        onClick={() => handleSlotClick(slot)}
        className="px-5 py-2.5 rounded-full text-sm font-medium border transition-all hover:scale-105 active:scale-95"
        style={{
          backgroundColor: isSelected ? "var(--color-primary)" : "transparent",
          borderColor: isSelected
            ? "var(--color-primary)"
            : "var(--border-default)",
          color: isSelected ? "#ffffff" : "var(--text-primary)",
        }}
      >
        {slot.label}
      </button>
    );
  };

  return (
    <div className="w-full">
      {/* Days Horizontal Scroll */}
      <div className="flex gap-3 overflow-x-auto pb-3 hide-scrollbar">
        {days.map((day, index) => {
          const isActive = selectedDayIndex === index;
          return (
            <button
              key={index}
              onClick={() => {
                setSelectedDayIndex(index);
                setSelectedSlot(null); // দিন পরিবর্তন করলে স্লট সিলেকশন রিসেট হবে
                onSlotSelect?.(null);
              }}
              className="flex flex-col items-center p-3 min-w-16 rounded-xl border transition-all shrink-0"
              style={{
                borderColor: isActive
                  ? "var(--color-primary)"
                  : "var(--border-default)",
                backgroundColor: isActive
                  ? "var(--primary-100)"
                  : "transparent",
                color: isActive
                  ? "var(--color-primary)"
                  : "var(--text-secondary)",
              }}
            >
              <span className="text-[11px] font-semibold uppercase tracking-widest opacity-70">
                {day.shortLabel}
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
          {formattedSlots.morning.length > 0 ? (
            formattedSlots.morning.map((slot) => (
              <SlotButton key={slot.id} slot={slot} />
            ))
          ) : (
            <p className="text-sm text-gray-400">No morning slots available</p>
          )}
        </div>
      </div>

      {/* Afternoon/Evening Slots */}
      <div className="mt-6">
        <h3
          className="text-lg font-semibold mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Afternoon & Evening Sessions
        </h3>
        <div className="flex flex-wrap gap-3">
          {formattedSlots.afternoon.length > 0 ? (
            formattedSlots.afternoon.map((slot) => (
              <SlotButton key={slot.id} slot={slot} />
            ))
          ) : (
            <p className="text-sm text-gray-400">
              No afternoon slots available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
