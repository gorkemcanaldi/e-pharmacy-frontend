import { z } from "zod";
import { SupplierStatus } from "../types/Suppliers";
export const suppliersSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(2, "Address must be at least 2 characters"),
  suppliers: z.string().min(2, "Company must be at least 2 characters"),
  date: z.date(),
  amount: z.number().min(1, "Amount must be 1 or greater"),
  status: z.nativeEnum(SupplierStatus),
});

export type SupplierSchemaType = z.infer<typeof suppliersSchema>;
