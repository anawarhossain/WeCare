// Server Component — receives history as props

import { MdHistory, MdOpenInNew } from "react-icons/md";

export default function PrescriptionHistoryPanel({ history }) {
  return (
    <section
      className="rounded-xl border overflow-hidden shadow-sm"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-default)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-default)",
        }}
      >
        <h3
          className="text-base font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Previous Prescriptions
        </h3>
        <span
          className=" text-xl"
          style={{ color: "var(--color-primary)" }}
        >
          <MdHistory />
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr style={{ backgroundColor: "var(--bg-surface)" }}>
              {["Patient", "Diagnosis", ""].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {history.map((rx) => (
              <tr
                key={rx.id}
                className="group border-t hover:bg-(--bg-surface) transition-colors"
                style={{ borderColor: "var(--border-default)" }}
              >
                {/* Patient */}
                <td className="px-4 py-3.5">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {rx.patient}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {rx.date}
                  </p>
                </td>

                {/* Diagnosis badge */}
                <td className="px-4 py-3.5">
                  <span
                    className="text-[11px] font-bold px-2.5 py-1 rounded"
                    style={{
                      backgroundColor: "var(--color-success-bg)",
                      color: "var(--color-success-text)",
                    }}
                  >
                    {rx.diagnosis}
                  </span>
                </td>

                {/* View link — visible on row hover */}
                <td className="px-4 py-3.5 text-right">
                  <button
                    className="opacity-0 group-hover:opacity-100 flex items-center gap-1 ml-auto text-xs font-semibold transition-opacity"
                    style={{ color: "var(--color-primary)" }}
                  >
                    View
                    <span className=" text-[15px]">
                      <MdOpenInNew />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div
        className="p-4 text-center border-t"
        style={{ borderColor: "var(--border-default)" }}
      >
        <button
          className="text-sm font-semibold hover:underline transition-colors"
          style={{ color: "var(--text-secondary)" }}
        >
          See Full History
        </button>
      </div>
    </section>
  );
}
