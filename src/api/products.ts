import { BASE_URL } from "./user";

export const getProducts = async (
  accessToken: string,
  name: string,
  page: number,
) => {
  const res = await fetch(`${BASE_URL}/products?name=${name}&page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error("Product failed");

  return res.json();
};
