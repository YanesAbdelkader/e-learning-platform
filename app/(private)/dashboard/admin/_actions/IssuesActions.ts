"use server";
import { handleAPIcall } from "@/functions/custom";

export async function fetchIssues() {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      null,
      "admin/issues",
      "GET"
    );

    if (error) {
      console.error("API Error:", error);
    }

    if (response?.data?.issues) {
      return response.data.issues;
    }
  } catch (error) {
    console.error("Unexpected error in fetchIssues:", error);
  }
}
export async function updateIssues(id: number, status: string) {
  try {
    const { data: response, error } = await handleAPIcall(
      { status: status },
      `${id}`,
      "admin/issues",
      "POST"
    );

    if (error) {
      console.error("API Error:", error);
    }

    if (response?.data?.issues) {
      return { success: true };
    }
  } catch (error) {
    console.error("Unexpected error in fetchIssues:", error);
  }
}
