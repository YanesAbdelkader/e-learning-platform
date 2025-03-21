"use server";
import { Episode } from "../_components/types";
import { handleAPIcall } from "@/functions/custom";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function fetchEpisodes(courseId: string) {
  try {
    const { data: response, error } = await handleAPIcall(
      "",
      `${courseId}/episodes`,
      "course",
      "GET"
    );

    if (error) {
      console.error("Error fetching episodes:", error);
      return [];
    }
    return response?.data?.data ?? [];
  } catch (err) {
    console.error("Fetch Episodes Error:", err);
    return [];
  }
}

export async function addEpisode(formData: FormData) {
  try {
    const response = await fetch(`/api/episodes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer `,
      },
      body: JSON.stringify({
        title: formData.get("title"),
        description: formData.get("description"),
        video: formData.get("video"),
        duration: formData.get("duration"),
        course_id: formData.get("courseId"),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data?.message);
      throw new Error(data?.message || "Failed to add episode");
    }

    revalidatePath("/dashboard/episodes");
    return data;
  } catch (error) {
    console.error("Error adding episode:", error);
    throw error;
  }
}

export const updateEpisode = async (
  updatedEpisode: Episode,
  courseId: string
) => {
  try {
    const { data: response, error } = await handleAPIcall(
      updatedEpisode,
      `${courseId}/episodes`,
      "course",
      "POST"
    );

    if (error) throw new Error("Failed to update episode");

    return response?.data;
  } catch (err) {
    console.error("Update Episode Error:", err);
    throw err;
  }
};

export const deleteEpisode = async ({
  id,
  courseId,
}: {
  id: string;
  courseId: string;
}) => {
  try {
    const { data: response, error } = await handleAPIcall(
      "",
      `${courseId}/episodes/${id}`,
      "course",
      "DELETE"
    );

    if (error) throw new Error("Failed to delete episode");
    return response.data;
  } catch (err) {
    console.error("Delete Episode Error:", err);
    throw err;
  }
};

export async function handleSaveEpisode(episodeData: {
  title: string;
  description: string;
  video: string;
  courseId: string;
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courses/${episodeData.courseId}/episodes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("token=")[1]}`,
        },
        body: JSON.stringify({
          title: episodeData.title,
          description: episodeData.description,
          video: episodeData.video,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save episode");
    }

    const newEpisode = await response.json();

    return newEpisode;
  } catch (error) {
    console.error("Error saving episode:", error);
    throw error;
  }
}

export const reorderEpisodes = async (
  reorderedEpisodes: Episode[],
  courseId: string
) => {
  try {
    const { data: response, error } = await handleAPIcall(
      reorderedEpisodes,
      `${courseId}/episodes/reorder`,
      "course",
      "PUT"
    );

    if (error) throw new Error("Failed to reorder episodes");

    return response?.data;
  } catch (err) {
    console.error("Reorder Episodes Error:", err);
    throw err;
  }
};

export async function uploadFileChunks(formData: FormData) {
  try {
    const token = (await cookies()).get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/upload-chunks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    console.log(response);
    const data = await response.json();

    if (!response.ok) {
      console.log(data?.message);
      throw new Error(data?.message || "Failed to upload file chunks");
    }

    return data;
  } catch (error) {
    console.error("Error uploading file chunks:", error);
    throw error;
  }
}

export const saveEpisode = async (
  episodeData: Omit<Episode, "id" | "order">
) => {
  console.log("Saving episode:", episodeData);
  return { success: true };
};
