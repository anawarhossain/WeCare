import { serverMutation } from "../core/server";

// Create a new schedule
export const createSchedule = async ( data) => {
  return await serverMutation(`api/schedules/save/`, data);
};
