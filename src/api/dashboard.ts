import { BASE_URL } from "./user";

export const dashboardFetch = async (accessToken: string) => {
  const res = await fetch(`${BASE_URL}/dashboard`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error("dashboard failed");

  return res.json();
};
