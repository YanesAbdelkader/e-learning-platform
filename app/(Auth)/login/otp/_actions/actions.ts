import { getUserData, handleAPIcall } from "@/functions/custom";
import { OTPFormData } from "../_otpForm/otpForm";
import { getCookie } from "typescript-cookie";
import { cookies } from "next/headers";

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
      (await cookies()).getAll().forEach(async ({ name }) => {
        (await cookies()).set(name, "", {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 0,
          secure: true,
        });
      });
      (await cookies()).set("token", response.data.token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 15,
        secure: true,
      });
      await getUserData();
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
