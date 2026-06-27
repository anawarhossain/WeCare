import ReviewCard from "@/components/dashboard/patient/reviews/ReviewCard";
import { getReviewById } from "@/lib/api/reviews";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import { BiPlus } from "react-icons/bi";

const MyReviewsPage = async () => {
  const user = await getUserSession();

  if (!user) {
    redirect("/sign-in");
  }

  const userId = user?.id;
  const reviews = (await getReviewById(userId)) || [];

  // Ensure reviews is treated as an array even if database query returns a single item or null
  const reviewList = Array.isArray(reviews)
    ? reviews
    : [reviews].filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              My Reviews
            </h1>
            <p className="text-slate-500 mt-1">
              Manage your feedback for healthcare providers.
            </p>
          </div>
          <div>
            <button className="inline-flex items-center gap-2 bg-cyan-700 hover:bg-cyan-800 text-white font-medium px-5 py-2.5 rounded-xl shadow-sm transition-colors duration-200">
              <BiPlus size={18} />
              <span>Add Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Listing Grid */}
        <div className="space-y-6">
          {reviewList.length > 0 ? (
            reviewList.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                // Wire up client action triggers as needed later
                // onEdit={() => console.log("Edit clicked", review._id)}
                // onDelete={() => console.log("Delete clicked", review._id)}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl">
              <p className="text-slate-500">
                You havent submitted any reviews yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReviewsPage;
