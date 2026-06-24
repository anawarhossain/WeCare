// Server Component — pure display, no interactivity

import { Person } from "@gravity-ui/icons";

export default function PatientSummaryCard({ patient }) {
  const { name, age, gender, appointmentDate, symptoms } = patient;

  return (
    <section
      className="rounded-xl border p-6 shadow-sm flex flex-wrap gap-6 items-start"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-default)",
      }}
    >
      {/* Avatar + Name */}
      <div
        className="flex items-center gap-4 pr-6 border-r"
        style={{ borderColor: "var(--border-default)" }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
          style={{
            backgroundColor: "var(--primary-100)",
            color: "var(--primary-700)",
          }}
        >
          <span
            className=" text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            <Person />
          </span>
        </div>
        <div>
          <p
            className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
            style={{ color: "var(--text-muted)" }}
          >
            Patient
          </p>
          <p
            className="text-lg font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {name}
          </p>
        </div>
      </div>

      {/* Age / Gender */}
      <div className="min-w-30">
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
          style={{ color: "var(--text-muted)" }}
        >
          Age / Gender
        </p>
        <p
          className="text-sm font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          {age}, {gender}
        </p>
      </div>

      {/* Appointment Date */}
      <div className="min-w-35">
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
          style={{ color: "var(--text-muted)" }}
        >
          Appt Date
        </p>
        <p
          className="text-sm font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          {appointmentDate}
        </p>
      </div>

      {/* Symptoms */}
      <div
        className="w-full mt-2 p-4 rounded-lg border-l-4"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderLeftColor: "var(--color-primary)",
        }}
      >
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-1"
          style={{ color: "var(--text-muted)" }}
        >
          Symptoms &amp; Observation
        </p>
        <p
          className="text-sm italic leading-relaxed"
          style={{ color: "var(--text-primary)" }}
        >
          &quot;{symptoms}&quot;
        </p>
      </div>
    </section>
  );
}
