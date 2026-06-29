import { SignUpForm } from "@/components/auth/SignUpForm";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Create Account | JobSift",
  description: "Sign up for JobSift and start finding your dream job today.",
};

export default async function SignUpPage() {
  const user = await getUserSession();
  if (user) {
    redirect("/");
  }

  return (
    <>
      <SignUpForm />
    </>
  );
}
