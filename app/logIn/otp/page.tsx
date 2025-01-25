"use client";

import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { handleAPIcall } from "@/functions/custom";

export default function OTPInput() {
  const [otp, setOtp] = useState<string>("");

  const data = {
    email: localStorage.getItem("email"),
    password: localStorage.getItem("password"),
    otp: otp,
  };
  const { toast } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (otp.length === 6) {
        console.log(data)
        const { data: response, error } = await handleAPIcall(
          data,
          "",
          "verify-2fa",
          "POST"
        );
        if (response?.status === 200) {
          console.log("OTP submitted:", otp);
          toast({
            title: "OTP Submitted",
            description: `Your OTP ${otp} has been submitted successfully.`,
          });
        }
        if (error) {
          toast({
            title: "Error",
            description: "Please enter a valid 6-digit OTP.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error",
          description: "Please enter a valid 6-digit OTP.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Unexpected Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Enter OTP
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex justify-center">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button
            type="submit"
            className="w-full bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Verify OTP
          </Button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Please enter the 6-digit code sent to your device.
        </p>
      </div>
    </div>
  );
}
