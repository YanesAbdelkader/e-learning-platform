import { SignUpForm } from "./sign-up-form";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 dark:bg-black">
      <div className="w-full max-w-prose space-y-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Would you like to join us{" "}?</h1>
        <SignUpForm />
      </div>
    </div>
  );
}
