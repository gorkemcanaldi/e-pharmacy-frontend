export type product = {
  id: string;
  photo?: string;
  name: string;
  suppliers: string;
  stock: number;
  price: number;
  category: [
    "Medicine",
    "Heart",
    "Head",
    "Hand",
    "Leg",
    "Dental Care",
    "Skin Care",
  ];
};
