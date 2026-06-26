import { Avatar, Chip } from "@heroui/react";
import Link from "next/link";
import { MdEventBusy } from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";

const STATUS_CHIP = {
  pending: {
    color: "var(--bg-muted)",
    text: "var(--text-secondary)",
    label: "Pending",
  },
  accepted: {
    color: "var(--color-success-bg)",
    text: "var(--color-success-text)",
    label: "Confirmed",
  },
  completed: {
    color: "var(--primary-100)",
    text: "var(--primary-900)",
    label: "Completed",
  },
  rejected: {
    color: "var(--danger-100)",
    text: "var(--danger-800)",
    label: "Rejected",
  },
};

export default function TodaysSchedule({ schedule, dateLabel }) {

  return (
    <div
      className="rounded-xl border shadow-sm overflow-hidden flex flex-col h-full"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-default)",
      }}
    >
      {/* Header */}
      <div
        className="p-5 border-b flex justify-between items-center"
        style={{ borderColor: "var(--border-default)" }}
      >
        <div>
          <h3
            className="text-lg font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Today&apos;s Schedule
          </h3>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {dateLabel}
          </p>
        </div>
        <Link
          href="/dashboard/doctor/applications"
          className="flex items-center gap-1 text-sm font-semibold hover:underline"
          style={{ color: "var(--color-primary)" }}
        >
          Full Calendar
          <FiChevronRight />
        </Link>
      </div>

      {/* List */}
      <div className="p-5 flex-1">
        {schedule?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <span
              className="text-5xl mb-3"
              style={{ color: "var(--text-muted)" }}
            >
              <MdEventBusy />
            </span>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              No appointments scheduled for today.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {schedule.map((appointment) => {
              const chip =
                STATUS_CHIP[appointment.treadmendStatus] ?? STATUS_CHIP.pending;
              return (
                <div
                  key={appointment._id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:opacity-90 transition-colors"
                  style={{ backgroundColor: "var(--bg-surface)" }}
                >
                  <div
                    className="w-20 text-right text-sm font-medium shrink-0"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {appointment.time?.split("-")[0]?.trim()}
                  </div>
                  <div
                    className="w-1 self-stretch rounded-full shrink-0"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  />
                  <div className="flex-1 flex items-center justify-between gap-3 flex-wrap min-w-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar>
                        <Avatar.Image
                          alt={appointment?.patientName}
                          src={appointment?.patientImage}
                        />
                        <Avatar.Fallback>
                          {appointment?.patientName
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </Avatar.Fallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p
                          className="font-semibold text-sm leading-tight truncate"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {appointment.patientName}
                        </p>
                        <p
                          className="text-xs uppercase tracking-wide truncate"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {appointment.notes}
                        </p>
                      </div>
                    </div>
                    <Chip
                      size="sm"
                      variant="flat"
                      style={{ backgroundColor: chip.color, color: chip.text }}
                    >
                      {chip.label}
                    </Chip>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
