"use client";

import { useState } from "react";
import DoctorModal from "./DoctorModal";
import DoctorDetailsView from "./DoctorDetailsView";

export default function ProfessionalDetailsPage({ initialData, userId }) {
  const [doctorData, setDoctorData] = useState(initialData ?? null);

  const handleSaveProfile = (updatedData, isEditMode) => {
    setDoctorData({
      ...updatedData,
      createdAt: isEditMode ? updatedData.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen bg-(--bg-base) text-(--text-primary) p-6 md:p-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-(--border-default) pb-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Professional Details
            </h1>
            <p className="text-sm text-(--text-secondary) mt-1">
              Manage your professional profile and availability.
            </p>
          </div>

          <DoctorModal doctorData={doctorData} userId={userId} onSave={handleSaveProfile} />
        </div>

        <DoctorDetailsView doctorData={doctorData} />
      </div>
    </div>
  );
}
