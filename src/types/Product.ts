export type product = {
  _id: string;
  photo?: string;
  name: string;
  suppliers: string;
  stock: number;
  price: number;
  category: ProductCategory;
};

export enum ProductCategory {
  Medicine = "Medicine",
  Heart = "Heart",
  Head = "Head",
  Hand = "Hand",
  Leg = "Leg",
  DentalCare = "Dental Care",
  SkinCare = "Skin Care",
}

export type createProduct = {
  name: string;
  suppliers: string;
  stock: number;
  price: number;
  category: ProductCategory;
};
