import { handleAPIcall } from "@/functions/custom";

export async function getTeacherProfile(teacherId: string) {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      `${teacherId}`,
      "teacher",
      "GET"
    );
    
    if (error) {
      console.error("API Error:", error);
      throw new Error(error.message);
    }

    // Safely handle response
    const teacherData = response?.data;
    console.log("Raw API response:", teacherData);

    // Break any potential circular references
    const safeData = JSON.parse(JSON.stringify(teacherData));
    return safeData;
    
  } catch (error) {
    console.error("Failed to fetch teacher profile:", error);
    throw error; // Re-throw to let the component handle it
  }
}
