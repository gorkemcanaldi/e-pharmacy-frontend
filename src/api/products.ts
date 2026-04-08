import type { createProduct } from "../types/Product";
import type { ProductSchemaType } from "../validation/productValidation";
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

export const productCreate = async (
  accessToken: string,
  data: createProduct,
) => {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Create product failed");

  return res.json();
};

export async function updateProduct(
  accessToken: string,
  productId: string,
  data: ProductSchemaType,
) {
  const res = await fetch(`${BASE_URL}/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update product");
  }

  return res.json();
}

export async function deleteProduct(accessToken: string, productId: string) {
  const res = await fetch(`${BASE_URL}/products/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete product");
  }

  return res.json();
}
