export type DashboardData = {
  metrics: {
    totalProducts: number;
    totalSuppliers: number;
    totalCustomers: number;
  };
  recentCustomers: {
    name: string;
    image: string;
    email: string;
    spent: number;
  }[];
  transactions: {
    amount: number;
    name: string;
    type: "Income" | "Expense" | "Error";
  }[];
};
