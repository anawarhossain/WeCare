"use server";

import { serverMutation } from "../core/server";


// Create a new doctor
export const createDoctor = async (data) => {
  const res = await serverMutation("api/doctors", data);

  return res;
}


// Update a doctor
export const updateDoctor = async (id, data) => {
  const res = await serverMutation(`api/doctors/${id}`, data, "PUT");

  return res;
};
