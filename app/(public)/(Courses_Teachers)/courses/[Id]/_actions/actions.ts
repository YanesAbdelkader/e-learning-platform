"use server";

import { handleAPIcall } from "@/functions/custom";

export async function getCourseDetails(courseId: string) {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      courseId,
      "courses",
      "GET"
    );
    if (error) {
      console.log(error);
    }
    if (response) {
      return response.data.course;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getRelatedCourses(courseId: string) {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      `${courseId}/related`,
      "courses",
      "GET"
    );
    if (error) {
      console.log(error);
      return [];
    }
    if (response) {
      return response.data.related;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getReviews(courseId: string) {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      `${courseId}/reviews`,
      "courses",
      "GET"
    );
    if (error) {
      console.log(error);
    }
    if (response) {
      return response.data.reviews;
    }
  } catch (error) {
    console.log(error);
  }
}


export async function buyNow(courseId: string) {
  const Id = { courseId: courseId };
  try {
    const { data: response, error } = await handleAPIcall(
      Id,
      ``,
      "chargilypay/redirect",
      "POST"
    );
    if (error) {
      console.log(error);
    }
    if (response) {
      return response.data.url;
    }
  } catch (error) {
    console.log(error);
  }
}
