"use server";

import { handleAPIcall } from "@/functions/custom";

export async function fetchTeachers() {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      null,
      "admin/teachers",
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

export async function fetchTeacherInfo(id: string) {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      id,
      "admin/teacher/verifyinfo",
      "GET"
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

export async function verifyTeacher(id: string, verify: boolean) {
  try {
    const payload = { id, verify };
    const { data: response, error } = await handleAPIcall(
      payload,
      id,
      "admin/teacher/verify",
      "POST"
    );
    if (error) {
      console.log(error);
      return { error: "Failed to verify teacher." };
    }
    if (response) {
      return { success: true, message: "Teacher verification updated." };
    }
  } catch (error) {
    console.log(error);
    return { error: "An unexpected error occurred." };
  }
}
