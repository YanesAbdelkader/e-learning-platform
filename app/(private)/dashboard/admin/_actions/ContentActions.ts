"use server"
import { handleAPIcall } from "@/functions/custom";

export async function fetchCourses() {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      null,
      "admin/teachers/courses",
      "GET"
    );
    if (error) {
      console.error(error);
    }
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function updateCourseStatus(courseId: string, status: boolean) {
  const data = {
    status: status,
  };
  try {
    const { data: response, error } = await handleAPIcall(
      data,
      `${courseId}/status`,
      "admin/courses",
      "POST"
    );
    if (error) {
      console.error(error);
      return { error: "Failed to Update course." };
    }
    if (response) {
      return { success: true, message: "Update course status successful" };
    }
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred." };
  }
}