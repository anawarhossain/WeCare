"use client";
import React, { useState } from 'react';
import { DoctorProfileCreateOrEditModal } from './DoctorProfileCreateOrEditModal';

const ProfileMadalTrigger = ({user}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        {/* ── Modal ── */}
        <DoctorProfileCreateOrEditModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          user={user}
        />
      </>
    );
};

export default ProfileMadalTrigger;