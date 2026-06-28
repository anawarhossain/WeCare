import Link from "next/link";
import { Avatar } from "@heroui/react";
import { MdEventBusy } from "react-icons/md";
import WaitTimeIndicator from "../my-appointment/WaitTimeIndicator";
import StatusBadge from "@/components/common/StatusBadge";

export default function UpcomingAppointmentsTable({ appointments }) {
  return (
    <div
      className="rounded-xl border shadow-sm overflow-hidden"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-default)",
      }}
    >
      <div
        className="p-6 border-b flex justify-between items-center"
        style={{ borderColor: "var(--border-default)" }}
      >
        <h3
          className="text-lg font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Upcoming Appointments
        </h3>
        <Link
          href="patient/appointments"
          className="text-sm font-bold hover:underline"
          style={{ color: "var(--color-primary)" }}
        >
          View All
        </Link>
      </div>

      {appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-2">
          <span className="text-5xl" style={{ color: "var(--text-muted)" }}>
            <MdEventBusy />
          </span>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            No upcoming appointments. Book one to get started.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead style={{ backgroundColor: "var(--bg-surface)" }}>
              <tr
                className="border-b"
                style={{ borderColor: "var(--border-default)" }}
              >
                {["Doctor", "Date", "Time", "Status", "Wait Time"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-[11px] font-bold uppercase tracking-wider"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, idx) => (
                <tr
                  key={appt._id}
                  className="border-b last:border-b-0 hover:opacity-90 transition-colors"
                  style={{
                    borderColor: "var(--border-default)",
                    backgroundColor:
                      idx % 2 === 1 ? "var(--bg-surface)" : "transparent",
                  }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <Avatar.Image
                          alt={appt?.doctorName}
                          src={appt?.doctorImage}
                          name={appt?.doctorName}
                          size="md"
                        />
                        <Avatar.Fallback>
                          {appt?.doctorName
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </Avatar.Fallback>
                      </Avatar>
                      <div>
                        <p
                          className="font-semibold text-sm"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {appt.doctorName}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {appt.specialization}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    className="px-6 py-4 text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {appt.appointmentDate}
                  </td>
                  <td
                    className="px-6 py-4 text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {appt.time}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={appt.treadmendStatus} />
                  </td>
                  <td className="px-6 py-4">
                    <WaitTimeIndicator
                      queueAheadCount={appt.queueAheadCount}
                      estimatedWaitMinutes={appt.estimatedWaitMinutes}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
