"use server";
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
        }),
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

export async function getUserData() {
  const { data: response, error } = await handleAPIcall(
    "",
    "",
    "get-user-data",
    "GET"
  );
  if (response?.status === 200) {
    const cookieStore = cookies();
    const allowedKeys = ["email", "picture", "lastname", "name"];

    Object.entries(response.data.data)
      .filter(([key]) => allowedKeys.includes(key))
      .forEach(async ([key, value]) => {
        if (typeof value === "string" || typeof value === "number") {
          (await cookieStore).set(key, value.toString(), {
            httpOnly: false,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 15,
            secure: true,
          });
        }
      });
  }

  if (error) {
    return;
  }
}

export async function logout() {
  const { data: response, error } = await handleAPIcall(
    "",
    "",
    "logout",
    "POST"
  );
  if (response?.status === 200) {
    (await cookies()).getAll().forEach(async ({ name }) => {
      (await cookies()).set(name, "", {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 0,
        secure: true,
      });
    });
    return true;
  }
  if (error) {
    return false;
  }
}

export async function isAuthenticated() {
  try {
    const token = (await cookies()).get("token")?.value;
    const role = (await cookies()).get("role")?.value ?? null;
    if (!token) {
      return false;
    }
    const { data: response, error } = await handleAPIcall(
      "",
      role,
      "role",
      "POST"
    );
    if (response?.status === 200) {
      return true;
    } else if (response?.status === 401 || error !== null) {
      return false;
    }
    return false;
  } catch (error) {
    console.error("Error during authentication check:", error);
    return false;
  }
}
