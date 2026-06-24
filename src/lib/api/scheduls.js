import { serverGet } from "../core/server";

// get schedule data by doctor id
export const getScheduleDataById = async (doctorId) => { 
    return await serverGet(`api/schedules/${doctorId}`);
};
 
