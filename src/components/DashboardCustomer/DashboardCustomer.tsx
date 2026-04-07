import { SyncLoader } from "react-spinners";
import style from "./DashboardCustomer.module.css";
type Customer = {
  name: string;
  email: string;
  spent: number;
  photo: string;
  image: string;
};
type DashboardCustomerProps = {
  customer: Customer[];
};
export default function DashboardCustomer({
  customer,
}: DashboardCustomerProps) {
  if (!customer || customer.length === 0) {
    return (
      <div>
        <SyncLoader color="#59B17A" />
      </div>
    );
  }

  const title = ["Name", "Email", "Spent"];

  return (
    <table className={style.tablos}>
      <caption className={style.head}>Recent Customers</caption>
      <thead>
        <tr className={style.table_head_div}>
          {title.map((t, i) => (
            <th key={i} className={style.table_head}>
              {t}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {customer.map((c, i) => (
          <tr className={style.dess} key={i}>
            <td className={style.des}>
              <img
                src={c.image ? c.image : c.photo}
                alt="image"
                width={36}
                height={36}
              />{" "}
              {c.name}
            </td>
            <td className={style.des}>{c.email}</td>
            <td className={style.des}>
              {c.spent.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
