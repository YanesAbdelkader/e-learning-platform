import { handleAPIcall } from "@/functions/custom";
import { LoginData } from "../_form/loginForm";
import { setCookie } from "typescript-cookie";

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
        setCookie("token", response.data.token, { expires: 15 });
        return { token: response.data.token };
      } else {
        setCookie("email", data.email, { expires: 1 });
        setCookie("password", data.password, { expires: 1 });
        return {
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
