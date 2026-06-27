import ProfileCard from '@/components/common/ProfileCard';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const adminProfilePage = async () => {
    
      const user = await getUserSession();
    return (
      <div>
        <ProfileCard user={user} />
      </div>
    );
};

export default adminProfilePage;