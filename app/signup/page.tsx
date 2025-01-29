"use client";

import { Divider } from "@/components/divider";
import SignupForm from "./_normalSignup/signupForm";
import SocialSignup from "./_socialSignup/socialsignup";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 dark:bg-black">
      <div className="w-full max-w-prose space-y-8">
        <SignupForm />

        <Divider>Or sign up with</Divider>

        <SocialSignup />
      </div>
    </div>
  );
}
