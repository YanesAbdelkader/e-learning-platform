"use server";

import { handleAPIcall } from "@/functions/custom";

export async function fetchCategory() {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      null,
      "categories",
      "GET"
    );
    if (error) {
      console.log(error);
    }
    if (response) {
      return response.data.categories;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function addCategory(prevState: unknown, formData: FormData) {
  console.log(formData);
  try {
    const { data: response, error } = await handleAPIcall(
      formData,
      "",
      "admin/create-category",
      "POST"
    );
    if (error) {
      console.log(error);
      return { error: "Failed to create category." };
    }
    if (response) {
      return { success: true, message: "create category successful" };
    }
  } catch (error) {
    console.log(error);
    return { error: "An unexpected error occurred." };
  }
}

export async function updateCategory(prevState: unknown, formData: FormData) {
  const id = formData.get("id") as string | null;

  try {
    console.log("🛠 Submitting form data:", Object.fromEntries(formData));

    const { data: response, error } = await handleAPIcall(
      formData,
      id,
      "admin/category/update",
      "POST"
    );

    if (error) {
      console.log("🚨 API Error:", error);
      return { error: "Failed to update category." };
    }

    if (response) {
      return { success: true, message: "Update category successful" };
    }
  } catch (error) {
    console.log("🔥 Unexpected error in updateCategory:", error);
    return { error: "An unexpected error occurred." };
  }
}

export async function deleteCategory(categoryId: string) {
  try {
    const { data: response, error } = await handleAPIcall(
      null,
      categoryId,
      "admin/category/delete",
      "DELETE"
    );
    if (error) {
      console.log(error);
      return { error: "Failed to delete category." };
    }
    if (response) {
      return { success: true, message: "Delete category successful" };
    }
  } catch (error) {
    console.log(error);
    return { error: "An unexpected error occurred." };
  }
}
