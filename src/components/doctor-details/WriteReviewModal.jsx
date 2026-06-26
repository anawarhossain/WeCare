"use client";

import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { TbProgress } from "react-icons/tb";

export default function WriteReviewModal({ onClose, onSave }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Escape key দিয়ে মোডাল ক্লোজ করা
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }
    setError("");
    setSaving(true);

    try {
      await onSave({ rating, reviewText });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center p-4 animate-fade-in"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="max-w-md w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-default)",
        }}
      >
        {/* Header */}
        <div
          className="flex justify-between items-center p-5 border-b"
          style={{ borderColor: "var(--border-default)" }}
        >
          <h3
            className="text-lg font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Write a Review
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <IoMdClose
              className="text-xl"
              style={{ color: "var(--text-muted)" }}
            />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5 overflow-y-auto flex-1"
        >
          {/* Star Rating Picker */}
          <div className="space-y-1.5">
            <label
              className="text-xs font-bold uppercase tracking-wider block"
              style={{ color: "var(--text-muted)" }}
            >
              Your Rating
            </label>
            <div className="flex gap-1">
              {Array.from({ length: 5 }, (_, i) => {
                const value = i + 1;
                const filled = value <= (hoverRating || rating);
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="text-3xl transition-transform hover:scale-110"
                    style={{
                      color: filled
                        ? "var(--accent-500)"
                        : "var(--border-default)",
                      fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0",
                    }}
                    aria-label={`${value} star`}
                  >
                    <FaStar />
                  </button>
                );
              })}
            </div>
            {error && (
              <p
                className="text-xs font-medium"
                style={{ color: "var(--color-danger)" }}
              >
                {error}
              </p>
            )}
          </div>

          {/* Review Text */}
          <div className="space-y-1.5">
            <label
              className="text-xs font-bold uppercase tracking-wider block"
              style={{ color: "var(--text-muted)" }}
            >
              Your Review
            </label>
            <textarea
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience with this doctor..."
              className="w-full rounded-xl border p-3.5 text-sm focus:outline-none focus:border-(--color-primary) bg-transparent resize-none"
              style={{
                borderColor: "var(--border-default)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          {/* Action Buttons */}
          <div
            className="flex justify-end gap-3 pt-2 border-t"
            style={{ borderColor: "var(--border-default)" }}
          >
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-md border text-sm font-semibold transition-colors hover:bg-gray-50"
              style={{
                borderColor: "var(--border-default)",
                color: "var(--text-secondary)",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-md text-sm font-semibold shadow-sm hover:brightness-95 transition-all flex items-center gap-2 disabled:opacity-70"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--text-on-primary)",
              }}
            >
              {saving ? (
                <>
                  <TbProgress className="text-lg animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
