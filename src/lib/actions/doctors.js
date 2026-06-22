"use server";

const BASE_URL = process.env.SERVER_API_URL;
if (!BASE_URL) {
  throw new Error("SERVER_API_URL is not defined in .env.local");
}

export const getDoctor = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/doctors/user/${userId}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("getDoctor failed:", error.message);
    return null; // Page still renders, just with no data
  }
};

export const createDoctor = async (doctorData) => {
  const res = await fetch(`${BASE_URL}/api/doctors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(doctorData),
  });

  return res.json();
};

export const updateDoctor = async (id, updatedData) => {
  const res = await fetch(`${BASE_URL}/api/doctors/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });

  return res.json();
};
