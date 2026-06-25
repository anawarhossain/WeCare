"use server";
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const savePrescription = async (prescriptionData) => {
  const res = await serverMutation(
    "api/prescriptions/save",
    prescriptionData,
    "POST",
  );
  return res;
};

export const updatePrescription = async (id, data) => {
  const res = await serverMutation(`api/prescriptions/${id}`, data, "PUT");
  revalidatePath("/doctor/prescriptions");
  return res;
};

