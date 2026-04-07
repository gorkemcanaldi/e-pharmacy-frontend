import style from "./IncomeExpenses.module.css";

type IEItem = {
  type: "Income" | "Expense" | "Error";
  name: string;
  amount?: number;
};

type IncomeExpensesProps = {
  ie: IEItem[];
};

export default function IncomeExpenses({ ie }: IncomeExpensesProps) {
  if (!ie || ie.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <table className={style.wrapper}>
        <caption className={style.title}>Income/Expenses</caption>

        <thead>
          <tr>
            <th className={style.th_t}>Today</th>
          </tr>
        </thead>

        <tbody>
          {ie.map((item, i) => {
            const amt = Number(item.amount ?? 0);

            const formatted = Math.abs(amt).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });

            return (
              <tr key={i}>
                <td>
                  <div
                    className={
                      item.type === "Income"
                        ? style.typeIncome
                        : item.type === "Expense"
                          ? style.typeExpense
                          : style.typeError
                    }
                  >
                    {item.type}
                  </div>
                </td>

                <td className={style.td}>{item.name}</td>

                <td
                  className={
                    item.type === "Income"
                      ? style.amountIncome
                      : item.type === "Expense"
                        ? style.amountExpense
                        : style.amountError
                  }
                >
                  {amt < 0 ? "-" : "+"}
                  {formatted}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
