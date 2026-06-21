"use server";

const baseUrl = process.env.API_URL; // NEXT_PUBLIC_ prefix server action-এ দরকার নেই

/**
 * Create a new doctor profile
 * @param {Object} doctorData - form থেকে আসা doctor data
 */
export const createDoctor = async (doctorData) => {
  try {
    const res = await fetch(`${baseUrl}/api/doctors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctorData), // parameter পাঠাচ্ছি, function নাম না
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to create doctor profile");
    }

    return { success: true, doctor: data.doctor };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

/**
 * Update an existing doctor profile
 * @param {string} doctorId - MongoDB _id
 * @param {Object} updates - editable fields only
 */
export const updateDoctor = async (doctorId, updates) => {
  try {
    const res = await fetch(`${baseUrl}/api/doctors/${doctorId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to update doctor profile");
    }

    return { success: true, doctor: data.doctor };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

/**
 * Get doctor profile by userId
 * @param {string} userId - Better Auth user id
 */
export const getDoctorByUserId = async (userId) => {
  try {
    const res = await fetch(`${baseUrl}/api/doctors/by-user/${userId}`, {
      cache: "no-store",
    });

    if (res.status === 404) return { success: true, doctor: null };

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch doctor profile");
    }

    return { success: true, doctor: data.doctor };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
