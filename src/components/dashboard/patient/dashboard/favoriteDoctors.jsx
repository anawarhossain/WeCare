"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";



export default function FavoriteDoctorsList({ favoriteDoctors }) {
  return (
    <div
      className="max-w-md w-full rounded-[24px] border p-6 md:p-8 transition-all"
      style={{
        backgroundColor: "var(--bg-card, #ffffff)",
        borderColor: "var(--border-default, #e2e8f0)",
        boxShadow: "var(--shadow-md, 0 4px 6px -1px rgba(0,0,0,0.05))",
      }}
    >
      {/* Title Header */}
      <h2
        className="text-xl md:text-2xl font-bold mb-6"
        style={{ color: "var(--text-primary, #1e293b)" }}
      >
        Favorite Doctors
      </h2>

      {/* Divider */}
      <div
        className="w-full h-1 mb-6"
        style={{ backgroundColor: "var(--border-default, #e2e8f0)" }}
      />

      {/* Doctors List Container */}
      <div className="space-y-6">
        {favoriteDoctors.map((doctor) => (
          <div
            key={doctor?.doctorId}
            className="flex items-center justify-between gap-4 group"
          >
            {/* Left: Avatar & Info */}
            <div className="flex items-center gap-4">
              {/* Doctor Avatar Wrapper */}
              <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-sm border border-slate-100 shrink-0">
                <Image
                  src={doctor?.doctorImage}
                  alt={`Portrait of ${doctor?.doctorName}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="64px"
                />
              </div>

              {/* Text Info */}
              <div>
                <h3
                  className="font-bold text-base md:text-lg leading-snug"
                  style={{ color: "var(--text-primary, #1e293b)" }}
                >
                  {doctor?.doctorName}
                </h3>
                <p
                  className="text-xs md:text-sm font-medium mt-0.5"
                  style={{ color: "var(--text-muted, #64748b)" }}
                >
                  {doctor?.specialization}
                </p>
              </div>
            </div>

            {/* Right: Action Button */}
            <Link
              href={`/find-doctors/${doctor?.doctorId}`}
              className="px-5 py-2.5 rounded-full text-sm font-bold border transition-all duration-200 active:scale-95 whitespace-nowrap"
              style={{
                borderColor: "var(--color-primary, #0e7490)",
                color: "var(--color-primary, #0e7490)",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--color-primary-light, rgba(14,116,144,0.05))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Book Again
            </Link>
          </div>
        ))}

        
      </div>
    </div>
  );
}
