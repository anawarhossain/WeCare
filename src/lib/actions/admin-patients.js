"use server";
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const updatePatientStatus = async (id, status) => {
  const res = await serverMutation(
    `api/admin/patients/${id}/status`,
    { status },
    "PUT",
  );
  revalidatePath("/dashboard/admin/patients");
  return res;
};
