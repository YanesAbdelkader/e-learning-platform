"use server";

import { handleAPIcall } from "@/functions/custom";

export type Course = {
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
    if(error){
      console.error(error)
    }
    if (response) {
      return response.data.courses;
    }
  } catch (error) {
    console.error(error)
  }
}

export async function addCourse(prevState: unknown, formData: FormData) {
  try {
    const { data: response, error } = await handleAPIcall(
      formData,
      "",
      "Add",
      "PUT"
    );
    if(error){
      console.error(error)
    }
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error(error)
  }
}

export async function updateCourse(courseId: number, formData: FormData) {
  try {
    const { data: response, error } = await handleAPIcall(
      { courseId, formData },
      "",
      "login",
      "POST"
    );
    if(error){
      console.error(error)
    }
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error(error)
  }
}

export async function deleteCourse(courseId: number) {
  try {
    const { data: response, error } = await handleAPIcall(
      courseId,
      "",
      "delete",
      "DELET"
    );
    if(error){
      console.error(error)
    }
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error(error)
  }
}
