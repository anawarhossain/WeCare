"use server";
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const updateDoctorVerification = async (id, verificationStatus) => {
  const res = await serverMutation(
    `api/admin/doctors/${id}/status`,
    { verificationStatus },
    "PUT",
  );
  revalidatePath("/dashboard/admin/doctors");
  return res;
};
