import type { createSuppliers } from "../types/Suppliers";
import type { SupplierSchemaType } from "../validation/suppliersValidation";
import { BASE_URL } from "./user";

export const getSuppliers = async (
  accessToken: string,
  name: string,
  page: number,
) => {
  const res = await fetch(`${BASE_URL}/suppliers?name=${name}&page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error("suppliers failed");
  return res.json();
};

export const supplierCreate = async (
  accessToken: string,
  data: createSuppliers,
) => {
  const res = await fetch(`${BASE_URL}/suppliers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Create supplier failed");

  return res.json();
};

export const updateSupplier = async (
  accessToken: string,
  supplierId: string,
  data: SupplierSchemaType,
) => {
  const res = await fetch(`${BASE_URL}/suppliers/${supplierId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("failed to update supplier");
  return res.json();
};
