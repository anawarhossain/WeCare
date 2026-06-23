"use client";
import { CiCirclePlus } from "react-icons/ci";
import SlotItem from "./SlotItem";

export default function DayColumn({ day, slots, onAdd, onEdit, onDelete }) {
  const hasSlots = slots && slots.length > 0;
  const isOff = day === "Saturday" || day === "Sunday";

  return (
    <div className="flex flex-col gap-2 min-w-0">
      {/* Day header */}
      <div
        className="flex justify-between items-center px-2 py-1.5 border-b mb-1"
        style={{ borderColor: "var(--border-default)" }}
      >
        <span
          className="text-[11px] font-bold uppercase tracking-widest"
          style={{
            color: isOff ? "var(--text-muted)" : "var(--text-secondary)",
          }}
        >
          {day}
        </span>
        {/* Active dot */}
        <span
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: isOff
              ? "var(--neutral-300)"
              : "var(--color-success)",
          }}
        />
      </div>

      {/* Slots */}
      {hasSlots ? (
        <div className="space-y-2">
          {slots.map((slot) => (
            <SlotItem
              key={slot.id}
              slot={slot}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
          {/* Add more */}
          <button
            onClick={() => onAdd(day)}
            className="w-full flex items-center justify-center gap-1 py-1.5 text-[11px] font-semibold rounded-lg border border-dashed transition-colors hover:border-(--color-primary) hover:text-(--color-primary)"
            style={{
              borderColor: "var(--border-default)",
              color: "var(--text-muted)",
            }}
          >
            <span className=" text-[14px]">
              <CiCirclePlus />
            </span>
            Add slot
          </button>
        </div>
      ) : (
        /* Empty state */
        <div
          className="flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-4 text-center min-h-25"
          style={{ borderColor: "var(--border-default)" }}
        >
          <p
            className="text-[11px] font-medium mb-2"
            style={{ color: "var(--text-muted)" }}
          >
            No slots set
          </p>
          <button
            onClick={() => onAdd(day)}
            className="flex items-center gap-1 text-[11px] font-semibold hover:underline transition-colors"
            style={{ color: "var(--color-primary)" }}
          >
            <span className=" text-[14px]">
              <CiCirclePlus />
            </span>
            Add
          </button>
        </div>
      )}
    </div>
  );
}
