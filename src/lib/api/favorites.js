

import { serverGet } from "../core/server";

export const checkFavoriteStatus = async (userId, doctorId) => {
    return await serverGet(`api/favorites/check?userId=${userId}&doctorId=${doctorId}`);
    
}

export const getFavoriteDoctors = async (userId) => {
  return await serverGet(`api/favorites/${userId}`);
};