"use client";
import React, { useState, useTransition } from "react";
import ReviewCard from "./ReviewCard";
import { deleteReviewById, updateReviewById } from "@/lib/actions/reviews";

const ReviewHandle = ({ reviewList }) => {
  const [isPending, startTransition] = useTransition();
  const [editingReview, setEditingReview] = useState(null); // Holds the review currently being edited
  const [editForm, setEditForm] = useState({ reviewText: "", rating: 5 });

  // 1. Delete Handler
  const handleReviewDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?",
    );
    if (!confirmed) return;

    startTransition(async () => {
      try {
        // API কল করা হলো শুধু ID দিয়ে
        await deleteReviewById(id);
        alert("Review deleted successfully!");
      } catch (error) {
        console.error("Failed to delete review:", error);
        alert("Something went wrong while deleting.");
      }
    });
  };

  // 2. Open Edit State Handler
  const handleReviewEditClick = (review) => {
    setEditingReview(review);
    setEditForm({
      reviewText: review.reviewText,
      rating: review.rating,
    });
  };

  // 3. Submit Edit Handler
  const handleReviewEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingReview) return;

    startTransition(async () => {
      try {
        // Triggering your server mutation API
        const response = await updateReviewById(editingReview._id, editForm);

        console.log("Update Success:", response);
        alert("Review updated successfully!");
        setEditingReview(null); // Close edit view/modal
      } catch (error) {
        console.error("Failed to update review:", error);
        alert("Something went wrong while updating.");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Review List Rendering */}
      <div className="flex flex-col gap-4">
        {reviewList.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            onEdit={() => handleReviewEditClick(review)} // Pass full review object here to prefill fields
            onDelete={() => handleReviewDelete(review._id)}
          />
        ))}
      </div>

      {/* Simple Edit Modal Overlay (Rendered only when editing) */}
      {editingReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Edit Review for {editingReview.doctorName}
            </h3>

            <form onSubmit={handleReviewEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  className="w-full border border-slate-300 rounded-lg p-2"
                  value={editForm.rating}
                  onChange={(e) =>
                    setEditForm({ ...editForm, rating: Number(e.target.value) })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Your Review
                </label>
                <textarea
                  rows="4"
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm"
                  value={editForm.reviewText}
                  onChange={(e) =>
                    setEditForm({ ...editForm, reviewText: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => setEditingReview(null)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 text-sm font-medium text-white bg-cyan-700 hover:bg-cyan-800 rounded-xl transition disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewHandle;
