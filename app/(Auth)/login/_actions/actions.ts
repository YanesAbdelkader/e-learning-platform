import { handleAPIcall } from "@/functions/custom";
import { LoginData } from "../_form/loginForm";
import { setCookie } from "typescript-cookie";
import { redirect } from "next/navigation";

export async function loginAction(_: unknown, data: LoginData) {
  try {
    const { data: response, error } = await handleAPIcall(
      data,
      "",
      "login",
      "POST"
    );

    if (error) {
      return {
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      };
    }

    if (response?.status === 200 && response?.data) {
      if (response.data.otp !== true) {
        setCookie("token", response.data.token, { expires: 15 });
        return {
          title: "Login success!!",
          description: `You have been successfully Login.`,
        };
      } else {
        setCookie("email", data.email, { expires: 1 });
        setCookie("password", data.password, { expires: 1 });
        redirect("/login/otp");
      }
    }

    return {
      title: "Login failed",
      description: "Unexpected response from the server",
      variant: "destructive",
    };
  } catch (err) {
    console.error("Unexpected Error:", err);
    return {
      title: "Login failed",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
    };
  }
}

export async function socialLoginAction(prevState: unknown, provider: string) {
  window.open(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/redirect/${provider}/web`,
    "",
    "popup=true"
  );
}
