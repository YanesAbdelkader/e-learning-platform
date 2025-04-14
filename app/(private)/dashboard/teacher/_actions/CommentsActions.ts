import { handleAPIcall } from "@/functions/custom";

export async function fetchComments() {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      null,
      "teacher/student/comments",
      "GET"
    );
    if (error) {
      console.log(error);
    }
    if (response) {
      return response.data.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function addCommentsReply(commentId: number,replyText:string) {
    try {
      const { data: response, error } = await handleAPIcall(
        {content:replyText},
        `${commentId}`,
        "teacher/student/comments",
        "POST"
      );
      if (error) {
        console.log(error);
        return {success : false};
      }
      if (response) {
        return {success : true};
      }
    } catch (error) {
      console.log(error);
      return {success : false};
    }
}

export async function deleteComments(commentId: number) {
    try {
      const { data: response, error } = await handleAPIcall(
        null,
        `${commentId}`,
        "teacher/student/comments",
        "DELETE"
      );
      if (error) {
        console.log(error);
        return {success : false};
      }
      if (response) {
        return {success : true};
      }
    } catch (error) {
      console.log(error);
      return {success : false};
    }
}

export async function deleteCommentsReply(replyId: number) {
    try {
      const { data: response, error } = await handleAPIcall(
        null,
        `${replyId}`,
        "teacher/student/comments/reply",
        "DELETE"
      );
      if (error) {
        console.log(error);
        return {success : false};
      }
      if (response) {
        return {success : true};
      }
    } catch (error) {
      console.log(error);
      return {success : false};
    }
}