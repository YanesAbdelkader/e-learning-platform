export const handleAPIcall = async (
  data: unknown,
  param: string | null,
  rout: string,
  method: string
) => {
  let response;
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/${rout}
    ${param !== null ? `/${param}` : ""}`;
    const res = await fetch(endpoint, {
      method,
      headers: {
        ...(localStorage.getItem("token") && {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const message = `Error! Status: ${res.status} ${res.statusText}`;
      const details = await res.json().catch(() => ({}));
      return {
        data: null,
        error: new Error(`${message} - Details: ${JSON.stringify(details)}`),
      };
    }

    response = await res.json();
    return {
      data: response,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error ? error : new Error("An unknown error occurred"),
    };
  }
};
