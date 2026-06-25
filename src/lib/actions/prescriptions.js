import { serverMutation } from "../core/server";

export const savePrescription = async (prescriptionData) => {
  const res = await serverMutation(
    "api/prescriptions/save",
    prescriptionData,
    "POST",
  );
  return res;
};