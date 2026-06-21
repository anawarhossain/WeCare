
import ProfileMadalTrigger from '@/components/dashboard/doctor/ProfileMadalTrigger';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const DoctorProfilePage = async () => {
  const user = await getUserSession();

  console.log("user", user.id);

  // You can safely fetch data from databases or APIs here
  // const res = await fetch('https://example.com');
  // const data = await res.json();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Your Profile are not yet created</h1>
      <p className="mb-6 text-gray-500">Please click on the button below to create your profile.</p>

      {/* Client-side interactive element */}
      <ProfileMadalTrigger user={user}/>
    </div>
  );
}

export default DoctorProfilePage;