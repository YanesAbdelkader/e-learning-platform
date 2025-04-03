"use server";

import { getUserData, handleAPIcall } from "@/functions/custom";

export async function updateUserProfile(formData: FormData) {
  try {
    const { data: response, error } = await handleAPIcall(
      formData,
      "",
      "student/settings",
      "POST"
    );
    if (error) {
      return {
        success: false,
        error: "Failed to update profile",
        message: "",
      };
    }
    if (response) {
      await getUserData();
      return {
        success: true,
        message: "Profile info updated successfully",
        error: "",
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

export async function sendVerificationEmail(email: string) {
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

export async function verifyEmailAndUpdate(code: string, email: string) {
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

export async function updateUserPassword(formData: FormData) {
  try {
    const { data: response, error } = await handleAPIcall(
      formData,
      "",
      "student/settings",
      "POST"
    );

    if (error) {
      return {
        success: false,
        error: error.message || "Failed to update password",
        message: "",
      };
    }

    if (response) {
      return {
        success: true,
        message: "Password updated successfully",
        error: "",
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

export async function enable2FA() {
  try {
    const { data: response, error } = await handleAPIcall(
      "",
      "",
      "enable-2fa",
      "POST"
    );
    if (error) {
      throw new Error("Failed to setup 2FA");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to enable two-factor authentication");
  }
}

export async function verify2FA(secret: string, otpCode: string) {
  try {
    const { data: response, error } = await handleAPIcall(
      { secret, otp: otpCode },
      "",
      "activate-2fa",
      "POST"
    );
    if (error) {
      throw new Error("Failed to verify OTP");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Invalid verification code");
  }
}
