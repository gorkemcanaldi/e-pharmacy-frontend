export type suppliers = {
  _id: string;
  name: string;
  address: string;
  suppliers: string;
  date: Date;
  amount: number;
  status: SupplierStatus;
};

export enum SupplierStatus {
  Active = "Active",
  Deactive = "Deactive",
}

export type createSuppliers = {
  name: string;
  address: string;
  suppliers: string;
  date: Date;
  amount: number;
  status: SupplierStatus;
};
