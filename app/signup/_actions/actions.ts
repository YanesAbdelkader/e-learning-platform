import { handleAPIcall } from "@/functions/custom";
import { FormData } from "../_normalSignup/signupForm";
import { setCookie } from "typescript-cookie";

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
      setCookie("token", response.data.token, { expires: 15 });
      return {
        title: "Registration success!!",
        description: `You have been successfully registered.`,
        variant: "default",
      };
    }
  } catch (err) {
    console.error("Unexpected Error:", err);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function socialSignupAction(prevState: unknown, provider: string) {
  return new Promise((resolve) => {
    const popup = window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/redirect/${provider}/web`,
      "socialLogin",
      "width=500,height=600,left=100,top=100"
    );

    if (!popup) {
      resolve({ error: "Popup blocked. Please allow popups and try again." });
      return;
    }

    const listener = (event: MessageEvent) => {
      if (event.origin !== process.env.NEXT_PUBLIC_API_URL) return;

      const { token, error } = event.data;

      if (error) {
        resolve({ error: error.message || "SignUp failed" });
      } else if (token) {
        resolve({ success: true, token });
      } else {
        resolve({ error: "Authentication failed" });
      }

      window.removeEventListener("message", listener);
      popup.close();
    };

    window.addEventListener("message", listener);

    const checkPopupClosed = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(checkPopupClosed);
        window.removeEventListener("message", listener);
        resolve({ error: "Popup closed before authentication" });
      }
    }, 500);
  });
}
