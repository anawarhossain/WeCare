import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await getUserSession();

  if (!user) {
    redirect("/sign-in");
  }

  switch (user.role) {
    case "doctor":
      redirect("/dashboard/doctor");

    case "patient":
      redirect("/dashboard/patient");

    case "admin":
      redirect("/dashboard/admin");

    default:
      redirect("/unauthorized");
  }
};

export default Page;
