
import { SignUpForm } from "@/components/auth/SignUpForm";

export const metadata = {
  title: "Create Account",
  description: "Sign up for JobSift and start finding your dream job today.",
};

export default function SignUpPage() {
  return (
    <>
      <SignUpForm />
    </>
  );
}
