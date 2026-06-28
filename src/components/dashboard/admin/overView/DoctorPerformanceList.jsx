import { FaStar } from "react-icons/fa";

export default function DoctorPerformanceList({ doctors }) {
  return (
    <div
      className="lg:col-span-3 p-6 md:p-8 rounded-xl border shadow-sm"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-default)" }}
    >
      <div className="flex justify-between items-start mb-6 flex-wrap gap-2">
        <div>
          <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
            Doctor Performance
          </h3>
          <p className="text-xs uppercase tracking-wider font-bold" style={{ color: "var(--text-muted)" }}>
            Top rated by average patient score
          </p>
        </div>
        <span
          className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ backgroundColor: "var(--color-success-bg)", color: "var(--color-success-text)" }}
        >
          <FaStar className="text-[10px]" />
          {doctors.length} Rated Doctors
        </span>
      </div>

      {doctors.length === 0 ? (
        <p className="text-sm text-center py-10" style={{ color: "var(--text-secondary)" }}>
          No reviews submitted yet — performance data will appear once patients start rating doctors.
        </p>
      ) : (
        <div className="space-y-5">
          {doctors.map((doc) => (
            <div key={doc.doctorName} className="space-y-1.5">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium" style={{ color: "var(--text-primary)" }}>
                  {doc.doctorName}
                </span>
                <span className="font-bold" style={{ color: "var(--color-primary)" }}>
                  {doc.avgRating.toFixed(1)}/5.0
                </span>
              </div>
              <div className="h-3 w-full rounded-full overflow-hidden" style={{ backgroundColor: "var(--bg-muted)" }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(doc.avgRating / 5) * 100}%`,
                    backgroundColor: "var(--color-primary)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
