"use client";

import { Divider } from "@/components/divider";
import SignupForm from "./_normalSignup/signupForm";
import SocialSignup from "./_socialSignup/socialsignup";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 dark:bg-black">
      <div className="w-full max-w-prose space-y-8">
        <SignupForm />

        <Divider>Or sign up with</Divider>

        <SocialSignup />

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-white">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
