
import { serverGet, serverProtectGet } from "../core/server";


// get doctor by id (using doctor profile page)
export const getDoctor = async (userId) => {
  return await serverGet(`api/doctors/user/${userId}`);
}

// get all complete doctors (using find doctors page)
export const getDoctors = async () => {
  return await serverGet(`api/complete-doctors`);
}

// get get complete doctors by id (using doctor details page)
export const getDoctorById = async (id) => {
  return await serverProtectGet(`api/complete-doctors/${id}`);
}



