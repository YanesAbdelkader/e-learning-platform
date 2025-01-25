import { handleAPIcall } from "@/functions/custom";
import { revalidatePath } from "next/cache";
import { setCookie } from "typescript-cookie";
import { LoginData } from "../_form/loginForm";

export async function loginAction(prevState: unknown, data: LoginData) {
  try {
    const { data: response, error } = await handleAPIcall(
      data,
      "",
      "login",
      "POST"
    );

    if (error) {
      return { error: error.message || "Login failed" };
    }

    if (response?.status === 200 && response?.data) {
      if (response.data.otp !== true) {
        setCookie("token", response.data.token, { expires: 15 });
        revalidatePath("/");
      } else {
        revalidatePath("/login/otp");
      }
    }

    return { error: "Invalid server response" };
  } catch (err) {
    console.error("Unexpected Error:", err);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function socialLoginAction(prevState: unknown, provider: string) {
  window.open(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/redirect/${provider}/web`,
    "",
    "popup=true"
  );
}
