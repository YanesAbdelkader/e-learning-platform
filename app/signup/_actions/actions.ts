import { handleAPIcall } from "@/functions/custom";
import { FormData } from "../_normalSignup/signupForm";

export async function signupAction(prevState: unknown, data: FormData) {
  try {
    const { data: response, error } = await handleAPIcall(
      data,
      "",
      "register",
      "POST"
    );

    if (error) {
      return { error: error.message || "SignUp failed" };
    }

    if (response?.status === 201 && response?.data) {
      return { success: true, token: response.data.token };
    }
  } catch (err) {
    console.error("Unexpected Error:", err);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function socialSignupAction(prevState: unknown, provider: string) {
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/redirect/${provider}/web`,
      "",
      "popup=true"
    );
  }