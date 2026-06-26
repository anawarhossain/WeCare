"use server";
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const updateAppointmentStatus = async (id, data) => {
  const res = await serverMutation(`api/appointments/${id}`, data, "PUT");

  revalidatePath("/doctor/appointment-requests");

  return res;
};

export const cancelAppointmentByPatient = async (id) => {
  const res = await serverMutation(
    `api/appointments/${id}`,
    { treadmendStatus: "rejected" },
    "PUT",
  );
  revalidatePath("/patient/appointments");
  return res;
};