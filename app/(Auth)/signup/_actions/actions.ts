"use server";
import { getUserData, handleAPIcall } from "@/functions/custom";
import { cookies } from "next/headers";

export async function sendVerificationCode(prevState: unknown, email: string) {
  try {
    const { data: response, error } = await handleAPIcall(
      { email: email },
      "",
      "email/get-code",
      "POST"
    );

    if (error) {
      return {
        success: false,
        error: "Verification code not sent",
        message: "",
      };
    }
    if (response) {
      return { success: true, message: "Verification code sent", error: "" };
    }
  } catch (error) {
    console.error("Unexpected Error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
      message: "",
    };
  }
}

export async function verifyEmail(
  prevState: unknown,
  email: string,
  code: string
) {
  try {
    const { data: response, error } = await handleAPIcall(
      { email: email, code: code },
      "",
      "email/verify",
      "POST"
    );

    if (error) {
      return { success: false, error: "Error verifying code!", message: "" };
    }

    if (response?.status === 200) {
      return {
        success: true,
        message: "Email verified successfully",
        error: "",
      };
    } else {
      return {
        success: false,
        error: "Invalid verification code",
        message: "",
      };
    }
  } catch (error) {
    console.error("Unexpected Error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
      message: "",
    };
  }
}

export async function signupAction(prevState: unknown, data: FormData) {
  try {
    const { data: response, error } = await handleAPIcall(
      data,
      "",
      "register",
      "POST"
    );

    if (error) {
      return {
        title: "SignUp failed",
        description: error.message,
        variant: "destructive",
      };
    }

    if (response?.status === 201 && response?.data) {
      const cookieStore = cookies();

      (await cookieStore).set("token", response.data.token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 15,
        secure: true,
      });

      await getUserData();

      const prevPage =
        (await cookieStore).get("prevPage")?.value || "/dashboard";
      const lastVisitedPage = (await cookieStore).get("lastVisitedPage")?.value;

      (await cookieStore).delete("prevPage");
      (await cookieStore).delete("lastVisitedPage");
      return {
        title: "Registration success!!",
        description: "You have been successfully registered.",
        path: prevPage || lastVisitedPage || "/dashboard",
      };
    }
  } catch (err) {
    console.error("Unexpected Error:", err);
    return {
      title: "SignUp failed",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
    };
  }
}

export async function socialSignupAction(token: string) {
  const cookieStore = cookies();
  (await cookieStore).set("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 15,
    secure: true,
  });

  await getUserData();

  const prevPage = (await cookieStore).get("prevPage")?.value || "/dashboard";
  const lastVisitedPage = (await cookieStore).get("lastVisitedPage")?.value;

  (await cookieStore).delete("prevPage");
  (await cookieStore).delete("lastVisitedPage");
  return {
    title: "Sign in success!!",
    description: "You have been successfully Sign in.",
    path: prevPage || lastVisitedPage || "/dashboard",
  };
}
