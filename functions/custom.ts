import axios from "axios";

export const handleAPIcall = async (
  data: unknown,
  param: string | null,
  rout: string,
  meth: string
) => {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/${rout}${
    param !== null && `/${param}`
  }`;

  try {
    const response = await axios({
      url: endpoint,
      method: meth,
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
