import ProfileCard from "@/components/common/ProfileCard";
import ProfessionalDetailsPage from "@/components/dashboard/doctor/ProfessionalDetailsPage";
import { getDoctor } from "@/lib/actions/doctors";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "My Profile | WeCare",
  description: "Manage your doctor profile on WeCare.",
};

const DoctorProfilePage = async () => {
  const user = await getUserSession();
  const userId = user?.id;
  console.log("user", user, userId);

  const doctorData = await getDoctor(userId);
  console.log(doctorData);

  return (
    <div>
      <ProfileCard user={user} />
      <ProfessionalDetailsPage initialData={doctorData} userId={userId} />
    </div>
  );
};

export default DoctorProfilePage;
