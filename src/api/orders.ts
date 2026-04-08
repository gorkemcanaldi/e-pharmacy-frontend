import { BASE_URL } from "./user";

export const orderFetch = async (
  accessToken: string,
  name: string,
  page: number,
) => {
  const res = await fetch(`${BASE_URL}/orders?name=${name}&page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error("Orders failed");

  return res.json();
};
