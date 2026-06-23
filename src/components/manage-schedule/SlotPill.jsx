"use client";

import { IoMdClose } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";

export default function SlotPill({ slot, onEdit, onDelete }) {
  return (
    <div
      className="group flex justify-between items-center px-3 py-2 rounded-lg border transition-colors cursor-default"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-default)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "var(--color-primary)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "var(--border-default)")
      }
    >
      <span
        className="text-sm font-medium tabular-nums"
        style={{ color: "var(--text-primary)" }}
      >
        {slot.start} – {slot.end}
      </span>

      {/* Actions — visible on hover */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(slot)}
          className="p-0.5 rounded transition-colors"
          style={{ color: "var(--color-primary)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--primary-100)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
          aria-label="Edit slot"
          title="Edit"
        >
          <span className=" text-[18px]">
            <MdOutlineEdit />
          </span>
        </button>
        <button
          onClick={() => onDelete(slot.id)}
          className="p-0.5 rounded transition-colors"
          style={{ color: "var(--color-danger)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--danger-50)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
          aria-label="Delete slot"
          title="Remove"
        >
          <span className=" text-[18px]">
            <IoMdClose />
          </span>
        </button>
      </div>
    </div>
  );
}
