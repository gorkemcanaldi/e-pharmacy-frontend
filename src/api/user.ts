import type { LoginInput, RegisterInput } from "../types/user";

export const BASE_URL = "https://e-pharmacy-backend-1aik.onrender.com";

export const loginUser = async (data: LoginInput) => {
  const res = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

export const RegisterUser = async (data: RegisterInput) => {
  const res = await fetch(`${BASE_URL}/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Register failed");
  return res.json();
};

export const refreshToken = async () => {
  const res = await fetch(`${BASE_URL}/user/refresh`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Refresh failed");
  return res.json();
};
