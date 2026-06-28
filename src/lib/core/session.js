import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../auth";

export const getUserSession = async () => {
  try {
    const session = await auth.api.getSession({
    headers: await headers(), // some endpoints might require headers
    });
    return session?.user || null;
  }
  catch (error) {
    console.error(error);
    return null;
  }
  

  
};

export const requireRole = async (role) => {
  const user = await getUserSession();
  if (!user) {
    redirect("/signin");
  }
  if (user?.role !== role) {
    redirect("/unauthorized");
  }
  return user;
};

