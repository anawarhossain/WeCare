// export async function checkFavoriteStatus(userId, doctorId) {
//   try {
//     // এখানে serverGet ব্যবহার করা যেতে পারে, অথবা সরাসরি fetch
//     const BASE_URL =
//       process.env.SERVER_API_URL || process.env.NEXT_PUBLIC_SERVER_API_URL;
//     const res = await fetch(
//       `${BASE_URL}/api/favorites/check?userId=${userId}&doctorId=${doctorId}`,
//       { cache: "no-store" },
//     );
//     if (!res.ok) return { isFavorite: false };
//     return await res.json();
//   } catch (error) {
//     console.error("Error checking favorite status:", error);
//     return { isFavorite: false };
//   }
// }

import { serverGet } from "../core/server";

export const checkFavoriteStatus = async (userId, doctorId) => {
    return await serverGet(`api/favorites/check?userId=${userId}&doctorId=${doctorId}`);
    
}