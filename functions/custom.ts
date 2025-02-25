"use server"
import axios from "axios";
import { cookies } from "next/headers";

export const handleAPIcall = async (
  data: unknown | null,
  param: string | null,
  rout: string,
  meth: string
) => {
  const token = (await cookies()).get("token")?.value;
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/${rout}${
    param !== null ? `/${param}` : ""
  }`;
  try {
    const response = await axios({
      url: endpoint,
      method: meth,
      headers: {
        ...(token && {
          Authorization: `Bearer ${token}`,
        })
      },
      data,
    });
    return {
      data: response,
      error: null,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const details = error.response?.data || {};
      const message = `Error! Status: ${error.response?.status} ${error.response?.statusText}`;
      return {
        data: null,
        error: new Error(`${message} - Details: ${JSON.stringify(details)}`),
      };
    } else {
      return {
        data: null,
        error: new Error("An unknown error occurred"),
      };
    }
  }
};

export async function isAuthenticated() {
  const token = (await cookies()).get("token")?.value;
  if (token) {
    const { data: response, error } = await handleAPIcall("", "", "", "POST");
    if (response !== null) {
      return true;
    }
    if (error !== null) {
      return false;
    }
  } else {
    return false;
  }
}
