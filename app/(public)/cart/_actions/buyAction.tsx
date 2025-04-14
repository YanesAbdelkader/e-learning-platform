import { handleAPIcall } from "@/functions/custom";

export async function buyNow(cart: string[]) {
  const Id = { product_ids: cart };
  try {
    const { data: response, error } = await handleAPIcall(
      Id,
      ``,
      "chargilypay/redirect",
      "POST"
    );
    if (error) {
      console.log(error);
    }
    if (response) {
      return response.data.url;
    }
  } catch (error) {
    console.log(error);
  }
}