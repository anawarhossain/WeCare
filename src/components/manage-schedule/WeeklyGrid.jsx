"use client";

import { useState } from "react";
import DayColumn from "./DayColumn";
import AddScheduleModal from "./AddScheduleModal";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Helper: generate slot labels from time range + duration
function generateSlots(days, startTime, endTime, durationMin) {
  const slots = [];
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  const startMins = sh * 60 + sm;
  const endMins = eh * 60 + em;

  let cur = startMins;
  while (cur + durationMin <= endMins) {
    const fmt = (m) => {
      const h = Math.floor(m / 60);
      const min = m % 60;
      const suffix = h >= 12 ? "PM" : "AM";
      const h12 = h % 12 || 12;
      return `${String(h12).padStart(2, "0")}:${String(min).padStart(2, "0")} ${suffix}`;
    };
    slots.push({ id: `${cur}`, label: `${fmt(cur)} - ${fmt(cur + durationMin)}` });
    cur += durationMin;
  }
  return slots;
}

const INITIAL_SCHEDULE = {
  Monday: [
    { id: "m1", label: "09:00 AM - 09:30 AM" },
    { id: "m2", label: "09:30 AM - 10:00 AM" },
    { id: "m3", label: "10:00 AM - 10:30 AM" },
  ],
  Tuesday: [
    { id: "t1", label: "08:00 AM - 08:30 AM" },
    { id: "t2", label: "08:30 AM - 09:00 AM" },
  ],
  Wednesday: [{ id: "w1", label: "09:00 AM - 09:30 AM" }],
  Thursday: [{ id: "th1", label: "02:00 PM - 02:30 PM" }],
  Friday: [{ id: "f1", label: "10:00 AM - 10:30 AM" }],
  Saturday: [],
  Sunday: [],
};

export default function WeeklyGrid() {
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDefaultDay, setModalDefaultDay] = useState(null);

  const openModal = (day = null) => {
    setModalDefaultDay(day);
    setModalOpen(true);
  };

  const handleSave = ({ days, startTime, endTime, duration }) => {
    const newSlots = generateSlots(days, startTime, endTime, duration);
    setSchedule((prev) => {
      const next = { ...prev };
      days.forEach((abbr) => {
        const fullDay = DAYS.find((d) => d.startsWith(abbr));
        if (fullDay) {
          const existingIds = new Set((prev[fullDay] || []).map((s) => s.id));
          const toAdd = newSlots
            .filter((s) => !existingIds.has(s.id))
            .map((s) => ({ ...s, id: `${fullDay}-${s.id}-${Date.now()}` }));
          next[fullDay] = [...(prev[fullDay] || []), ...toAdd];
        }
      });
      return next;
    });
  };

  const handleDelete = (day, slotId) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day].filter((s) => s.id !== slotId),
    }));
  };

  return (
    <>
      {/* Weekly grid — 7-col on md+ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
        {DAYS.map((day) => (
          <DayColumn
            key={day}
            day={day}
            slots={schedule[day]}
            onAdd={() => openModal(day)}
            onDelete={(slotId) => handleDelete(day, slotId)}
          />
        ))}
      </div>

      {/* Add Schedule Modal */}
      {modalOpen && (
        <AddScheduleModal
          defaultDay={modalDefaultDay}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
}
