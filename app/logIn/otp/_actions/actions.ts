import { handleAPIcall } from "@/functions/custom";
import { OTPFormData } from "../_otpForm/otpForm";
import { getCookie } from "typescript-cookie";

export async function otpAction(prevState: unknown, formData: OTPFormData) {
  try {
    const data = {
      email: getCookie("email"),
      password: getCookie("password"),
      otp: formData.otp,
    };

    const { data: response, error } = await handleAPIcall(
      data,
      "",
      "verify-2fa",
      "POST"
    );

    if (response?.status === 200) {
      console.log("OTP submitted:", formData.otp);
      return {
        title: "OTP Submitted",
        description: `Your OTP ${formData.otp} has been submitted successfully.`,
      };
    } else if (error) {
      return {
        title: "Error",
        description: "Please enter a valid 6-digit OTP.",
        variant: "destructive",
      };
    }
  } catch (error) {
    console.error("Unexpected Error:", error);
    return {
      title: "Error",
      description: "An unexpected error occurred. Please try again.",
      variant: "destructive",
    };
  }
}
