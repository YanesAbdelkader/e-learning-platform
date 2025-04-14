import { handleAPIcall } from "@/functions/custom";

export async function fetchProgress() {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      null,
      "teacher/student/progress",
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