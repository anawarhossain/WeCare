import { redirect } from "next/navigation";

const BASE_URL = process.env.SERVER_API_URL;
if (!BASE_URL) {
  throw new Error(" server api not valid");
}

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
const handleStatusCode = (res) => {
  if (res.status === 401) {
    redirect("/unauthorized");
  } else if (res.status === 403) {
    redirect("/forbidden");
  } else if (res.status === 404) {
    redirect("/not-found");
  } else if (res.status >= 500) {
    redirect("/server-error");
  }

  return res.json();


};
