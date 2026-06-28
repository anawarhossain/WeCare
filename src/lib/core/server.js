import { redirect } from "next/navigation";


// ক্লায়েন্ট এবং সার্ভার উভয় সাইডের সাপোর্ট নিশ্চিত করা
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_API_URL || process.env.SERVER_API_URL;

export const serverGet = async (path) => {
  const res = await fetch(`${BASE_URL}/${path}`, { cache: "no-store" });
  return handleStatusCode(res);
};

export const serverMutation = async (path, data, method = "POST") => {
  const res = await fetch(`${BASE_URL}/${path}`, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleStatusCode(res);
};

// handle 401, 404, 403
const handleStatusCode = async (res) => {
  if (res.status === 401) {
    redirect("/signin");
  } else if (res.status === 403) {
    redirect("/unauthorized");
  } else if (res.status >= 500) {
    redirect("/server-error");
  }

  // রেসপন্সটি JSON নাকি HTML তা চেক করার নিরাপদ উপায়
  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const textError = await res.text();
    console.error("Backend sent non-JSON response:", textError);
    throw new Error("Server did not return JSON. Check backend logs.");
  }

  return res.json();
};


/**
 * IMPORTANT: redirect() থ্রো করে একটা special error (digest: "NEXT_REDIRECT")
 * যেটা Next.js framework নিজে ধরে navigation করে। কিন্তু client component-এ
 * (handleAccept, handleReject ইত্যাদি) যদি আপনি serverMutation/serverGet-কে
 * try/catch-এর ভিতরে কল করেন, তাহলে আপনার catch ব্লক ভুলবশত এই redirect
 * error-টাকে স্বাভাবিক error মনে করে catch করে ফেলবে — এবং redirect কখনো হবে না।
 *
 * সমাধান: প্রতিটা catch ব্লকে এই হেল্পার দিয়ে চেক করুন এবং true হলে rethrow করুন।
 *
 * try {
 *   await updateAppointmentStatus(...)
 * } catch (error) {
 *   if (isRedirectError(error)) throw error; // redirect-কে যেতে দিন
 *   console.error(error);
 * }
 */
export const isRedirectError = (error) => {
  return typeof error?.digest === "string" && error.digest?.startsWith("NEXT_REDIRECT");
};