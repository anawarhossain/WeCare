"use server";
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createReview = async (reviewData) => {
  const res = await serverMutation("api/reviews", reviewData, "POST");

  // ⚠️ doctor profile পেজের আসল path দিয়ে এটা বদলে নিন
  revalidatePath("/doctors/[id]", "page");

  return res;
};
