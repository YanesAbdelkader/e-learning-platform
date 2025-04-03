"use server";
import { getUserData, handleAPIcall } from "@/functions/custom";
import { OTPFormData } from "../_otpForm/otpForm";
import { cookies } from "next/headers";

type ActionResult = {
  title: string;
  description: string;
  variant?: "destructive" | "default";
  path?: string;
};

const AUTH_COOKIE_CONFIG = {
  httpOnly: true,
  sameSite: "strict" as const,
  maxAge: 60 * 60 * 24 * 15, // 15 days
  secure: process.env.NODE_ENV === "production",
};

export async function otpAction(formData: OTPFormData): Promise<ActionResult> {
  try {
    const cookieStore = cookies();
    const email = (await cookieStore).get("otp_email")?.value;
    const password = (await cookieStore).get("otp_password")?.value;

    if (!email || !password) {
      return {
        title: "Session Expired",
        description: "Please restart the login process",
        variant: "destructive",
      };
    }

    const { data: response, error } = await handleAPIcall(
      { email, password, otp: formData.otp },
      "",
      "verify-2fa",
      "POST"
    );

    if (error) {
      return {
        title: "Verification Failed",
        description: error.message || "Invalid OTP code",
        variant: "destructive",
      };
    }

    if (response?.status === 200) {
      (await cookieStore).delete("otp_email");
      (await cookieStore).delete("otp_password");

      (await cookieStore).set("token", response.data.token, AUTH_COOKIE_CONFIG);

      await getUserData();

      return {
        title: "Verification Successful",
        description: "Your account has been verified",
        path: "/dashboard",
      };
    }

    return {
      title: "Verification Failed",
      description: "Unexpected response from server",
      variant: "destructive",
    };
  } catch (error) {
    console.error("OTP Verification Error:", error);
    return {
      title: "Server Error",
      description: "An unexpected error occurred. Please try again.",
      variant: "destructive",
    };
  }
}
