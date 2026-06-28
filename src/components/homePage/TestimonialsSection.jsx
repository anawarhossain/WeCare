import Image from "next/image";
import { FaStar, FaQuoteRight } from "react-icons/fa";

function formatPatientSince(createdAt) {
  if (!createdAt) return "";
  const year = new Date(createdAt).getFullYear();
  return `Patient since ${year}`;
}

export default function TestimonialsSection({ testimonials }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-20" style={{ backgroundColor: "var(--color-primary)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text-on-primary)" }}>
            What Our Patients Say
          </h2>
          <div className="w-20 h-1 mx-auto" style={{ backgroundColor: "var(--text-on-primary)" }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="p-8 rounded-xl shadow-lg relative"
              style={{ backgroundColor: "var(--bg-card)" }}
            >
              <FaQuoteRight
                className="text-5xl absolute top-4 right-4 opacity-10"
                style={{ color: "var(--color-primary)" }}
              />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    style={{ color: i < t.rating ? "var(--accent-500)" : "var(--border-default)" }}
                  />
                ))}
              </div>
              <p className="mb-8 italic" style={{ color: "var(--text-primary)" }}>
                &quot;{t.reviewText}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden relative shrink-0">
                  <Image
                    src={t.patientImage || "/default-avatar.png"}
                    alt={t.patientName}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-bold" style={{ color: "var(--text-primary)" }}>
                    {t.patientName}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {formatPatientSince(t.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
