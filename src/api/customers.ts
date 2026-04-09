import { BASE_URL } from "./user";

export const customerFetch = async (
  accessToken: string,
  name: string,
  page: number,
) => {
  const res = await fetch(`${BASE_URL}/customers?name=${name}&page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error("customer failed");
  return res.json();
};
