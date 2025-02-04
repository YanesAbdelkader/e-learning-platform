import { handleAPIcall } from "@/functions/custom";
import { LoginData } from "../_form/loginForm";

export async function loginAction(_: unknown, data: LoginData) {
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
        return { success: true, token: response.data.token };
      } else {
        return {
          success: true,
          email: data.email,
          password: data.password,
          redirectTo: "/login/otp",
        };
      }
    }

    return { error: "Unexpected response from the server" };
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
