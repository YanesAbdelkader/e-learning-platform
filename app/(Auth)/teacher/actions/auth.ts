"use server";

import { handleAPIcall } from "@/functions/custom";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email(),
});

const verifySchema = z.object({
  email: z.string().email(),
  code: z.string().length(4),
});

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  lastname: z.string().min(2),
  password: z.string().min(8),
  contactInfo: z.string(),
  subjects: z.array(z.string()),
  certifications: z.array(z.string()),
  education: z.array(
    z.object({
      year: z.string(),
      place: z.string(),
      certificate: z.string(),
    })
  ),
  links: z.array(z.string().url()),
  bio: z.string(),
});

export async function sendVerificationCode(
  prevState: unknown,
  formData: FormData
) {
  const validatedFields = emailSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return { success: false, error: "Invalid email address" };
  }

  try {
    const { data: response, error } = await handleAPIcall(
      formData,
      "",
      "email/get-code",
      "POST"
    );

    if (error) {
      return { success: false, error: "Verification code not sent" };
    }
    if (response) {
      return { success: true, message: "Verification code sent" };
    }
  } catch (error) {
    console.error("Unexpected Error:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function verifyEmail(prevState: unknown, formData: FormData) {
  const validatedFields = verifySchema.safeParse({
    email: formData.get("email"),
    code: formData.get("code"),
  });

  if (!validatedFields.success) {
    return { success: false, error: "Invalid email or verification code" };
  }

  try {
    const { data: response, error } = await handleAPIcall(
      formData,
      "",
      "email/verify",
      "POST"
    );

    if (error) {
      return { success: false, error: "Error verifying code!" };
    }

    if (response?.data.verify === true) {
      return { success: true, message: "Email verified successfully" };
    } else {
      return { success: false, error: "Invalid verification code" };
    }
  } catch (error) {
    console.error("Unexpected Error:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
export async function registerTeacher(prevState: unknown, formData: FormData) {
  const validatedFields = registerSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
    lastname: formData.get("lastname"),
    password: formData.get("password"),
    contactInfo: formData.get("contactInfo"),
    subjects: JSON.parse(formData.get("subjects") as string),
    certifications: JSON.parse(formData.get("certifications") as string),
    education: JSON.parse(formData.get("education") as string),
    links: JSON.parse(formData.get("links") as string),
    bio: formData.get("bio"),
  });

  if (!validatedFields.success) {
    return { success: false, error: "Invalid form data" };
  }

  try {
    const { data: response, error } = await handleAPIcall(
      formData,
      "",
      "teacher-register",
      "POST"
    );

    if (error) {
      return { success: false, error: "Error registering teacher!" };
    }

    if (response?.status === 200) {
      return { success: true, message: "Teacher registered successfully" };
    } else {
      return { success: false, error: "Registration failed!" };
    }
  } catch (error) {
    console.error("Unexpected Error:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
