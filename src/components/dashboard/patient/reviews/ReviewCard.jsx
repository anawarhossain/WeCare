import { Calendar, Star } from "@gravity-ui/icons";
import { Avatar } from "@heroui/react";
import React from "react";
import { BsTrash2 } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";

const ReviewCard = ({ review, onEdit, onDelete }) => {
  const { rating, reviewText, createdAt, doctorName, doctorImage } = review;
    
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Doctor Info */}
        <div className="flex items-center gap-4">
          <Avatar>
            <Avatar.Image alt={doctorName} src={doctorImage} />
            <Avatar.Fallback>
              {doctorName
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar.Fallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg text-slate-800">
              {doctorName}
            </h3>
            <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-0.5">
              <Calendar size={14} className="text-slate-400" />
              <span>{formatDate(createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              size={20}
              className={`${
                index < rating
                  ? "fill-amber-500 text-amber-500"
                  : "text-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Review Body */}
      <p className="mt-5 text-slate-600 leading-relaxed text-base">
        {reviewText}
      </p>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-6 mt-6 border-t border-slate-50 pt-4">
        <button
          onClick={onEdit}
          className="flex items-center gap-2 text-sm font-medium text-cyan-700 hover:text-cyan-800 transition"
        >
          <FiEdit2 size={16} />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-2 text-sm font-medium text-rose-600 hover:text-rose-700 transition"
        >
          <BsTrash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
