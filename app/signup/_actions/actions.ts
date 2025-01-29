import { handleAPIcall } from "@/functions/custom";
import { revalidatePath } from "next/cache";
import { setCookie } from "typescript-cookie";
import { FormData } from "../_normalSignup/signupForm";

export async function signupAction(prevState: unknown, data: FormData) {
  try {
    const { data: response, error } = await handleAPIcall(
      data,
      "",
      "signup",
      "POST"
    );

    if (error) {
      return { error: error.message || "Login failed" };
    }

    if (response?.status === 200 && response?.data) {
      setCookie("token", response.data.token, { expires: 15 });
      revalidatePath("/");
    }

    return { error: "Invalid server response" };
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