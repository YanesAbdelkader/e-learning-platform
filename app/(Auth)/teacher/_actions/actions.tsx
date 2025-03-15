"use server";

import { handleAPIcall } from "@/functions/custom";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email(),
});

const verifySchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  lastname: z.string().min(2),
  password: z.string().min(8),
  contactInfo: z.string(),
  picture: z.string(),
  subjects: z.array(z.string()),
  certifications: z.array(z.string()),
  education: z.string(), // Change to string
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
    return { success: false, error: "Invalid email address", message: "" };
  }

  try {
    const { data: response, error } = await handleAPIcall(
      formData,
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

export async function verifyEmail(prevState: unknown, formData: FormData) {
  const validatedFields = verifySchema.safeParse({
    email: formData.get("email"),
    code: formData.get("code"),
  });
  console.log(formData);
  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid email or verification code",
      message: "",
    };
  }

  try {
    const { data: response, error } = await handleAPIcall(
      formData,
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

export async function registerTeacher(prevState: unknown, formData: FormData) {
  console.log(formData);

  // Extract array data from FormData
  const subjects = formData.getAll("subjects[]");
  const certifications = formData.getAll("certifications[]");
  const links = formData.getAll("links[]");

  // Extract education data from FormData and convert it to a string
  const educationArray = JSON.parse(formData.get("education") as string) as Array<{
    year: string;
    place: string;
    certificate: string;
  }>;

  // Convert education array to a string
  const educationString = educationArray
    .map((edu) => `${edu.year}: ${edu.certificate} at ${edu.place}`)
    .join("; ");

  // Parse and validate the form data
  const validatedFields = registerSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
    lastname: formData.get("lastname"),
    password: formData.get("password"),
    contactInfo: formData.get("contactInfo"),
    picture: formData.get("picture"),
    subjects: subjects, // Use the extracted subjects array
    certifications: certifications, // Use the extracted certifications array
    education: educationString,
    links: links, // Use the extracted links array
    bio: formData.get("bio"),
  });

  if (!validatedFields.success) {
    console.error("Validation Error:", validatedFields.error);
    return { success: false, error: "Invalid form data", message: "" };
  }

  // Prepare the data for the API call
  const payload = {
    name: validatedFields.data.name,
    lastname: validatedFields.data.lastname,
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    picture: validatedFields.data.picture,
    subjects: validatedFields.data.subjects, // Include subjects array
    contactinfo: validatedFields.data.contactInfo,
    education: validatedFields.data.education,
    bio: validatedFields.data.bio,
    certifications: validatedFields.data.certifications, // Include certifications array
    links: validatedFields.data.links, // Include links array
  };

  console.log("Payload:", payload); // Log the payload for debugging

  try {
    const { data: response, error } = await handleAPIcall(
      payload,
      "",
      "teacher-register",
      "POST"
    );

    if (error) {
      return {
        success: false,
        error: "Error registering teacher!",
        message: "",
      };
    }

    if (response?.status === 201) {
      return {
        success: true,
        message: "Teacher registered successfully",
        error: "",
      };
    } else {
      return { success: false, error: "Registration failed!", message: "" };
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
