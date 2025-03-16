"use server";

import { handleAPIcall } from "@/functions/custom";

// Server action to get categories
export async function getCategories() {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      null,
      "categories",
      "GET"
    );
    if (error) {
      console.error(error);
    }
    if (response) {
      return response.data.categories;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getCourses() {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      null,
      "courses",
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

// Server action to get teachers with filtering
export async function getTeachers() {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      null,
      "teachers",
      "GET"
    );
    if (error) {
      console.error(error);
    }
    if (response) {
      return response.data.teachers;
    }
  } catch (error) {
    console.error(error);
  }
}
