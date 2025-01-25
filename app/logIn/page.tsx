import { Divider } from "@/components/divider";

import Link from "next/link";

import LoginForm from "./_form/loginForm";
import SocialLogin from "./_socialLog/socialLogin";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-prose space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Log in to your account
          </h2>
        </div>

        <LoginForm />

        <Divider>Or continue with</Divider>

        <SocialLogin />

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-white">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
