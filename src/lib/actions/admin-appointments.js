"use server";
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

// Admin override — যেকোনো appointment directly cancel করতে পারে।
// আগের তৈরি করা PUT /api/appointments/:id endpoint-ই reuse করা হচ্ছে।
export const cancelAppointmentByAdmin = async (id) => {
  const res = await serverMutation(
    `api/appointments/${id}`,
    { treadmendStatus: "rejected" },
    "PUT",
  );
  revalidatePath("/dashboard/admin/appointments");
  return res;
};
