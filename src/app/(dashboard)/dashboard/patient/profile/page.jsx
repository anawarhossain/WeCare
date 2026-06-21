import ProfileCard from '@/components/dashboard/doctor/ProfileCard';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const PatientProfilePage = async () => {

    const user = await getUserSession();
  const userId = user?.user?.id ?? user?.id;


    return (
        <div>
              <ProfileCard user={user} />
        </div>
    );
};

export default PatientProfilePage;