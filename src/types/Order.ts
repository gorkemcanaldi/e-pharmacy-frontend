export interface Order {
  _id: string;
  photo: string;
  name: string;
  address: string;
  products: number;
  price: number;
  status:
    | "Completed"
    | "Confirmed"
    | "Pending"
    | "Cancelled"
    | "Processing"
    | "Shipped"
    | "Delivered";
  order_date: string;
}
