import OtpForm from "./_otpForm/otpForm";

export default function OTPInput() {
  return (
    <div className="flex items-center justify-center min-h-svh bg-gray-100 dark:bg-gray-900">
      <div className="p-20 bg-white dark:bg-gray-950 rounded-lg shadow-md min-w-80 ">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-gray-50">
          Enter OTP
        </h1>
        <OtpForm />
        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          Please enter the 6-digit code sent to your device.
        </p>
      </div>
    </div>
  );
}
