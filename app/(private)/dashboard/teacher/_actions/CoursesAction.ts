"use server";

import { handleAPIcall } from "@/functions/custom";

export type Course = {
  status: "created" | "published" | "unpublished";
  id: number;
  user_id: number;
  category_id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  duration: number;
  level: string;
  created_at: string;
  updated_at: string;
};

export async function fetchCourses() {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      null,
      "teacher/courses",
      "GET"
    );
    if (error) {
      console.error(error);
    }
    if (response) {
      return response.data.courses;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function fetchCategories() {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      null,
      "categories",
      "GET"
    );
    if (error) {
      console.error(error);
      return [];
    }
    return response?.data?.categories ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function addCourse(prevState: unknown, formData: FormData) {
  console.log(formData);
  try {
    const { data: response, error } = await handleAPIcall(
      formData,
      "",
      "teacher/create-course",
      "POST"
    );
    if (error) {
      console.error(error);
      return { error: "Failed to create course." };
    }
    if (response) {
      return { success: true, message: "create course successful" };
    }
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred." };
  }
}

export async function updateCourse(prevState: unknown, formData: FormData) {
  try {
    console.log("🛠 Submitting form data:", Object.fromEntries(formData));

    const { data: response, error } = await handleAPIcall(
      formData,
      "",
      "teacher/courses/update",
      "POST"
    );

    if (error) {
      console.error("🚨 API Error:", error);
      return { error: "Failed to update course." };
    }

    if (response) {
      return { success: true, message: "Update course successful" };
    }
  } catch (error) {
    console.error("🔥 Unexpected error in updateCourse:", error);
    return { error: "An unexpected error occurred." };
  }
}

export async function deleteCourse(courseId: string) {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      courseId,
      "teacher/course/delete",
      "DELETE"
    );
    if (error) {
      console.error(error);
      return { error: "Failed to delete course." };
    }
    if (response) {
      return { success: true, message: "Delete course successful" };
    }
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred." };
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
      "teacher/courses",
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
