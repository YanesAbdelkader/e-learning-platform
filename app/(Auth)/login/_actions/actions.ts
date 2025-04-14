"use server";
import { getUserData, handleAPIcall } from "@/functions/custom";
import { LoginData } from "../_form/loginForm";
import { cookies } from "next/headers";

type ActionResult = {
  title: string;
  description: string;
  variant?: "destructive" | "default";
  path?: string;
};

// Cookie configuration constants
const AUTH_COOKIE_CONFIG = {
  httpOnly: true,
  sameSite: "strict" as const,
  maxAge: 60 * 60 * 24 * 15, // 15 days
  secure: process.env.NODE_ENV === "production",
};

const OTP_COOKIE_CONFIG = {
  httpOnly: false, 
  sameSite: "strict" as const,
  maxAge: 600, // 10 minutes
  secure: process.env.NODE_ENV === "production",
};

export async function loginAction(data: LoginData): Promise<ActionResult> {
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

    if (!response) {
      return {
        title: "Login failed",
        description: "No response from server",
        variant: "destructive",
      };
    }

    if (response.status === 200) {
      if (response.data.role === "admin") {
        return {
          title: "Login failed",
          description: "Something went wrong. Please try again",
          variant: "destructive",
        };
      }

      if (response.data.otp) {
        const cookieStore = cookies();
        (await cookieStore).set("otp_email", data.email, OTP_COOKIE_CONFIG);
        (await cookieStore).set(
          "otp_password",
          data.password,
          OTP_COOKIE_CONFIG
        );
        return {
          title: "OTP Required",
          description: "Please enter your OTP to continue",
          path: "/login/otp",
        };
      }

      // Handle successful login
      const cookieStore = cookies();
      (await cookieStore).set("token", response.data.token, AUTH_COOKIE_CONFIG);
      await getUserData();

      // Get redirect path
      const prevPage = (await cookieStore).get("prevPage")?.value;
      const lastVisitedPage = (await cookieStore).get("lastVisitedPage")?.value;

      // Clean up navigation cookies
      (await cookieStore).delete("prevPage");
      (await cookieStore).delete("lastVisitedPage");

      return {
        title: "Login success!",
        description: "You have been successfully logged in.",
        path: prevPage || lastVisitedPage || "/dashboard",
      };
    }

    return {
      title: "Login failed",
      description: response.data?.message || "Unexpected response from server",
      variant: "destructive",
    };
  } catch (err) {
    console.log("Login error:", err);
    return {
      title: "Login failed",
      description:
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      variant: "destructive",
    };
  }
}

export async function socialLoginAction(token: string): Promise<ActionResult> {
  try {
    if (!token) {
      return {
        title: "Login failed",
        description: "Authentication token is missing",
        variant: "destructive",
      };
    }

    const cookieStore = cookies();
    (await cookieStore).set("token", token, AUTH_COOKIE_CONFIG);
    await getUserData();

    const prevPage = (await cookieStore).get("prevPage")?.value;
    const lastVisitedPage = (await cookieStore).get("lastVisitedPage")?.value;

    // Clean up navigation cookies
    (await cookieStore).delete("prevPage");
    (await cookieStore).delete("lastVisitedPage");

    return {
      title: "Login success!",
      description: "You have been successfully logged in.",
      path: prevPage || lastVisitedPage || "/dashboard",
    };
  } catch (err) {
    console.log("Social login error:", err);
    return {
      title: "Login failed",
      description: err instanceof Error ? err.message : "Social login failed",
      variant: "destructive",
    };
  }
}
