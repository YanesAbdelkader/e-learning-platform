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

export async function toggleWishlist(courseId: string, isWishlisted: boolean) {
  console.log(
    `${isWishlisted ? "Removed from" : "Added to"} wishlist: ${courseId}`
  );
  return !isWishlisted;
}

export async function submitReview(
  courseId: string,
  reviewData: { rating: number; comment: string }
) {
  const newReview = {
    id: Date.now(),
    name: "You",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: reviewData.rating,
    comment: reviewData.comment,
    date: "Just now",
  };

  console.log(`Review submitted for course ${courseId}:`, newReview);
  return newReview;
}

export async function addToCart(courseId: string) {
  console.log(`Added to cart: ${courseId}`);
  return true;
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
