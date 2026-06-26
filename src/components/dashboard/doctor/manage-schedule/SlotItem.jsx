"use client";

import { IoMdClose } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";

// Slot pill with edit/delete actions — hover reveals controls

export default function SlotItem({ slot, onEdit, onDelete }) {
  return (
    <div
      className="group flex justify-between items-center p-2.5 rounded-lg border text-sm transition-colors hover:border-(--color-primary) cursor-default"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-default)",
      }}
    >
      <span style={{ color: "var(--text-primary)" }}>{slot.label}</span>

      {/* Actions — visible on hover */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit?.(slot)}
          className="p-0.5 rounded hover:bg-(--primary-100) transition-colors"
          title="Edit slot"
        >
          <span
            className=" text-[18px]"
            style={{ color: "var(--color-primary)" }}
          >
            <MdOutlineEdit />
          </span>
        </button>
        <button
          onClick={() => onDelete?.(slot.id)}
          className="p-0.5 rounded hover:bg-(--danger-100) transition-colors"
          title="Delete slot"
        >
          <span
            className=" text-[18px]"
            style={{ color: "var(--color-danger)" }}
          >
            <IoMdClose />
          </span>
        </button>
      </div>
    </div>
  );
}
