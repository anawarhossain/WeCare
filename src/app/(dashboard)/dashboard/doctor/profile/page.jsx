import ProfileCard from "@/components/common/ProfileCard";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "My Profile | WeCare",
  description: "Manage your doctor profile on WeCare.",
};

const DoctorProfilePage = async () => {
  const user = await getUserSession();
  const userId = user?.user?.id ?? user?.id;
  console.log("userId is", userId);

  return (
    <div>
      <ProfileCard user={user} />
    </div>
  );
};

export default DoctorProfilePage;
