"use server";
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createReview = async (reviewData) => {
  const res = await serverMutation("api/reviews", reviewData, "POST");

  // ⚠️ doctor profile পেজের আসল path দিয়ে এটা বদলে নিন
  revalidatePath("/doctors/[id]", "page");

  return res;
};

export const updateReviewById = async (id, data) => {
  const res = await serverMutation(`api/reviews/${id}`, data, "PUT");
  revalidatePath("/dashboard/patient/reviews", "page");
  return res;
};

export const deleteReviewById = async (id) => {
  const res = await serverMutation(`api/reviews/${id}`, {}, "DELETE");
  revalidatePath("/dashboard/patient/reviews", "page");
  return res;
};