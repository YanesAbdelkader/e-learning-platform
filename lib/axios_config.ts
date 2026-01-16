import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
    Accept: "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  try {
    const token = (await cookies()).get("token")?.value;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.log("Failed to access cookies:", error);
  }

  return config;
});

interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

export function handleError(error: unknown): Error {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const message = axiosError.response?.data?.message || axiosError.message;
    const errors = axiosError.response?.data?.errors;

    if (errors) {
      const errorMessages = Object.values(errors).flat().join(", ");
      return new Error(errorMessages);
    }

    return new Error(message);
  }
  return error instanceof Error
    ? error
    : new Error("An unknown error occurred");
}
