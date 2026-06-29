import SignInForm from '@/components/auth/signInForm';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata = {
  title: "Login Account | JobSift",
  description: "Sign up for JobSift and start finding your dream job today.",
};

const SignInPage = async () => {
    const user = await getUserSession();
    if (user) {
        redirect("/");
    }

    return (
        <div>
            <SignInForm/>
        </div>
    );
};

export default SignInPage;