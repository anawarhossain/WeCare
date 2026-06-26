"use client";

import { useEffect, useState } from "react";
import DayColumn from "./DayColumn";
import AddScheduleModal from "./AddScheduleModal";
import { createSchedule } from "@/lib/actions/scheduls";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function WeeklyGrid({
  schedule: propSchedule,
  doctorId,
  onRefresh,
}) {
  const [schedule, setSchedule] = useState(propSchedule);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDefaultDay, setModalDefaultDay] = useState(null);


  useEffect(() => {
    if (propSchedule) {
      setSchedule(propSchedule);
    }
  }, [propSchedule]);

  const openModal = (day = null) => {
    setModalDefaultDay(day);
    setModalOpen(true);
  };

  // স্লট ডিলিট করার ফাংশন
  const handleDelete = async (day, slotId) => {
    const updatedDaySlots = schedule[day].filter((s) => s.id !== slotId);
    const updatedSchedule = { ...schedule, [day]: updatedDaySlots };

    // লোকাল স্টেট আপডেট করা (তাৎক্ষণিক ফিডব্যাকের জন্য)
    setSchedule(updatedSchedule);

    // ব্যাকএন্ড ডাটাবেজে সেভ করা
    try {
      // সরাসরি সেন্ট্রাল ফাংশন ব্যবহার করুন
      await createSchedule({ doctorId, slots: updatedSchedule });
      onRefresh(); // প্যারেন্ট কম্পোনেন্ট রিফ্রেশ করে স্ট্যাটাস আপডেট করা
    } catch (error) {
      console.error("Failed to delete slot:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
        {DAYS.map((day) => (
          <DayColumn
            key={day}
            day={day}
            slots={schedule[day] || []}
            onAdd={() => openModal(day)}
            onDelete={(slotId) => handleDelete(day, slotId)}
          />
        ))}
      </div>

      {modalOpen && (
        <AddScheduleModal
          defaultDay={modalDefaultDay}
          doctorId={doctorId}
          currentSchedule={schedule}
          onClose={() => setModalOpen(false)}
          onSave={onRefresh}
        />
      )}
    </>
  );
}
