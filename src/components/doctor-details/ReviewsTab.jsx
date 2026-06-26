"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import ToastNotification from "@/components/appointment-requests/ToastNotification";
import { isRedirectError } from "@/lib/core/server";
import WriteReviewModal from "./WriteReviewModal";
import { createReview } from "@/lib/actions/reviews";

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

const formatDate = (value) => {
  if (!value) return "";
  // value MongoDB থেকে Date/ISO string হিসেবে আসতে পারে
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function ReviewsTab({
  reviews: initialReviews,
  doctorId,
  currentUser,
}) {
  const [reviews, setReviews] = useState(initialReviews || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // ── Average rating + total count ───────────────────────────────
  const { average, total } = useMemo(() => {
    if (!reviews.length) return { average: 0, total: 0 };
    const sum = reviews.reduce((acc, r) => acc + Number(r.rating || 0), 0);
    return { average: sum / reviews.length, total: reviews.length };
  }, [reviews]);

  // ❌ আগে এই বাটনে কোনো onClick ছিল না, কিছুই হতো না
  const handleWriteReviewClick = () => {
    if (!currentUser) {
      setToast({
        message: "Please sign in to write a review.",
        subtext: "You need a patient account to leave a review.",
        type: "error",
      });
      return;
    }
    setIsModalOpen(true);
  };

  const handleSaveReview = async ({ rating, reviewText }) => {
    try {
      const payload = {
        doctorId,
        patientId: currentUser.id,
        patientName: currentUser.name,
        patientImage: currentUser.image,
        rating,
        reviewText,
      };

      const res = await createReview(payload);

      // ❌ আগে এই কম্পোনেন্ট props দিয়ে স্ট্যাটিক reviews পেত, নতুন রিভিউ
      //    সেভ করার কোনো উপায়ই ছিল না। এখন সেভ হওয়ার পরপরই লিস্টের
      //    সবার উপরে নতুন review যুক্ত হচ্ছে — রিফ্রেশ করার প্রয়োজন নেই।
      setReviews((prev) => [
        {
          _id: res?.insertedId || `temp-${Date.now()}`,
          doctorId,
          patientId: currentUser.id,
          patientName: currentUser.name,
          patientImage: currentUser.image,
          rating,
          reviewText,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);

      setIsModalOpen(false);
      setToast({
        message: "Review submitted successfully!",
        subtext: "Thank you for sharing your feedback.",
        type: "success",
      });
    } catch (error) {
      if (isRedirectError(error)) throw error;
      console.error("Failed to submit review:", error);
      setToast({
        message: "Something went wrong.",
        subtext: "Could not submit your review. Try again.",
        type: "error",
      });
    }
  };

  return (
    <div
      className="p-6 md:p-8 rounded-2xl border shadow-sm"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-default)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <h2
          className="text-2xl font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Patient Reviews
        </h2>
        <button
          onClick={handleWriteReviewClick}
          className="text-sm font-semibold hover:underline"
          style={{ color: "var(--color-primary)" }}
        >
          Write a Review
        </button>
      </div>

      {/* Average rating summary */}
      {total > 0 && (
        <div className="flex items-center gap-2 mb-6">
          <StarRow rating={Math.round(average)} />
          <span
            className="text-sm font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {average.toFixed(1)}
          </span>
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>
            ({total} {total === 1 ? "review" : "reviews"})
          </span>
        </div>
      )}

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <p
          className="text-sm py-8 text-center"
          style={{ color: "var(--text-secondary)" }}
        >
          No reviews yet. Be the first to share your experience.
        </p>
      ) : (
        <div className="space-y-8">
          {reviews.map((review, idx) => (
            <div
              key={review._id}
              className={`pb-8 ${idx < reviews.length - 1 ? "border-b" : ""}`}
              style={{ borderColor: "var(--border-default)" }}
            >
              <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 relative bg-(--bg-muted)">
                    <Image
                      src={review.patientImage || "/default-avatar.png"}
                      alt={review.patientName || "Patient"}
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
                      {review.patientName}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
                <StarRow rating={review.rating} />
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                &quot;{review.reviewText}&quot;
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Write Review Modal */}
      {isModalOpen && (
        <WriteReviewModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveReview}
        />
      )}

      {/* Toast */}
      {toast && (
        <ToastNotification
          message={toast.message}
          subtext={toast.subtext}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}
