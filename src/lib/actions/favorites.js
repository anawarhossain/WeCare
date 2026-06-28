"use server";

import { serverMutation } from "../core/server";

// ফেভারিট টগল করার অ্যাকশন
export async function toggleFavoriteDoctor(userId, doctorId, doctorData) {
  try {
    const res = await serverMutation(
      "api/favorites/toggle",
      { userId, doctorId, doctorData },
      "POST",
    );
    return res;
  } catch (error) {
    console.error("Error toggling favorite:", error);
    throw error;
  }
}
