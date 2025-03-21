"use server";

import { handleAPIcall } from "@/functions/custom";

export async function fetchCourses() {
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
    }
    if (response) {
      return response.data.categories;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function fetchTeachers() {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      null,
      "teachers",
      "GET"
    );
    if (error) {
      console.error(error);
      return [];
    }
    if (response) {
      return response.data.teachers;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}
