import { handleAPIcall } from "@/functions/custom";

export async function followTeacher(
  teacherId: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      `${teacherId}`,
      "follow",
      "POST"
    );

    if (error) {
      console.log("Follow teacher error:", error);
      return {
        success: false,
        message: error.message || "Failed to follow teacher",
      };
    }

    if (!response) {
      return {
        success: false,
        message: "No response received from server",
      };
    }

    return {
      success: true,
      message: "Successfully followed teacher",
    };
  } catch (error) {
    console.log("Unexpected error in followTeacher:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function unfollowTeacher(
  teacherId: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      `${teacherId}`,
      "unfollow",
      "POST"
    );

    if (error) {
      console.log("Unfollow teacher error:", error);
      return {
        success: false,
        message: error.message || "Failed to unfollow teacher",
      };
    }

    if (!response) {
      return {
        success: false,
        message: "No response received from server",
      };
    }

    return {
      success: true,
      message: "Successfully unfollowed teacher",
    };
  } catch (error) {
    console.log("Unexpected error in unfollowTeacher:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
