"use server";
import { handleAPIcall } from "@/functions/custom";

export async function fetchCourses() {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      null,
      "student/courses",
      "GET"
    );
    if (error) {
      console.log(error);
    }
    if (response) {
      console.log(response.data)
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCoursesById(courseId: string) {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      courseId,
      "student/courses",
      "GET"
    );
    if (error) {
      console.log(error);
    }
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCourse(courseId: string) {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      `${courseId}/watch`,
      "student/courses",
      "GET"
    );
    if (error) {
      console.log(error);
    }
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
