// lib/api/reviews.js
import { serverGet } from "../core/server";

export async function getReviews(doctorId) {
  if (!doctorId) return [];

  return await serverGet(`api/reviews/${doctorId}`);
}
