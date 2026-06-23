import Image from "next/image";
import { FaStar } from "react-icons/fa";

function StarRow({ rating }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className=" text-amber-500 text-xl"
          style={{
            fontVariationSettings: i < rating ? "'FILL' 1" : "'FILL' 0",
          }}
        >
          <FaStar />
        </span>
      ))}
    </div>
  );
}

export default function ReviewsTab({ reviews }) {
  return (
    <div
      className="p-6 md:p-8 rounded-2xl border shadow-sm"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-default)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2
          className="text-2xl font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Patient Reviews
        </h2>
        <button
          className="text-sm font-semibold hover:underline"
          style={{ color: "var(--color-primary)" }}
        >
          Write a Review
        </button>
      </div>

      {/* Reviews list */}
      <div className="space-y-8">
        {reviews.map((review, idx) => (
          <div
            key={review.id}
            className={`pb-8 ${idx < reviews.length - 1 ? "border-b" : ""}`}
            style={{ borderColor: "var(--border-default)" }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 relative bg-(--bg-muted)">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p
                    className="font-semibold text-base"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {review.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {review.date}
                  </p>
                </div>
              </div>
              <StarRow rating={review.rating} />
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              &quot;{review.comment}&quot;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
