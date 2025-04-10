"use server";
import { handleAPIcall } from "@/functions/custom";

export async function fetchMockComments(courseId: string) {
  try {
    const { data: response, error } = await handleAPIcall(
      "",
      `${courseId}/comments`,
      "student/courses",
      "GET"
    );

    if (error) {
      return;
    }

    if (response) {
      return response.data.comments; 
    }

    return;
  } catch (error) {
    console.log("Fetch Error:", error);
    return;
  }
}

export async function fetchMockReviews(courseId: string) {
  try {
    const { data: response, error } = await handleAPIcall(
      "",
      `${courseId}/reviews`,
      "courses",
      "GET"
    );
    if (error) {
      console.log(error);
      return [];
    }
    if (response) {
      return response.data.reviews;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchReplies(commentId: string) {
  try {
    const { data: response, error } = await handleAPIcall(
      "",
      `comments/${commentId}/replies`,
      "student/courses",
      "GET"
    );
    if (error) {
      console.log(error);
      return [];
    }
    if (response) {
      return response.data.replies;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function commentSubmit(courseId: string, comment: string) {
  try {
    const { data: response, error } = await handleAPIcall(
      { content: comment },
      `${courseId}/comments/post`,
      "student/courses",
      "POST"
    );
    if (error) {
      console.log(error);
      return;
    }
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function replySubmit(
  commentId: string,
  comment: string,
  courseId: string
) {
  try {
    const { data: response, error } = await handleAPIcall(
      { parent_id: commentId, content: comment },
      `${courseId}/comments/post`,
      "student/courses",
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

export async function reviewSubmit(courseId: string, formData: FormData) {
  console.log(formData);
  try {
    const { data: response, error } = await handleAPIcall(
      formData,
      `${courseId}/review/post`,
      "course",
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

export async function DeleteReview(courseId: string, commentId: string) {
  try {
    const { data: response, error } = await handleAPIcall(
      { review_id: commentId },
      `${courseId}/comments/post`,
      "student/courses",
      "DELETE"
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
