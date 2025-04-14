"use server";

import { handleAPIcall } from "@/functions/custom";

export async function getCategories() {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      null,
      "categories",
      "GET"
    );
    if (error) {
      console.log(error);
    }
    if (response) {
      return response.data.categories;
    }
  } catch (error) {
    console.log(error);
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
      console.log(error);
    }
    if (response) {
      return response.data.courses;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getTeachers() {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      null,
      "teachers",
      "GET"
    );
    if (error) {
      console.log(error);
    }
    if (response) {
      return response.data.teachers;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getSearchResult(keyWord: string) {
  const keyword = {
    search: keyWord,
  };
  try {
    const { data: response, error } = await handleAPIcall(
      keyword,
      null,
      "search",
      "POST"
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
