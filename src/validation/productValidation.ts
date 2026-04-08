import { z } from "zod";
import { ProductCategory } from "../types/Product";
export const productSchema = z.object({
  photo: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  suppliers: z.string().min(2, "Suppliers must be at least 2 characters"),
  stock: z.number().int().min(1, "Stock must be 1 or greater"),
  price: z.number().min(1, "Price must be 1 or greater"),
  category: z.nativeEnum(ProductCategory),
});

export type ProductSchemaType = z.infer<typeof productSchema>;
