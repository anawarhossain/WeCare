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
const handleStatusCode = async (res) => { // এখানে async করুন
  if (res.status === 401) {
    redirect("/sign-in");
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
