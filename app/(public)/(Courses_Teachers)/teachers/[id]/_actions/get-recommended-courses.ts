import { handleAPIcall } from "@/functions/custom";

export async function getRecommendedCourses(teacherId: string) {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      `${teacherId}/related`,
      "teacher",
      "GET"
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
