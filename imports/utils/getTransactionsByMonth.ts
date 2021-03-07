import dayjs from "dayjs";
import { IExpense } from "../api/expenses";
import { IIncome } from "../api/incomes";

type Transactions = Array<IIncome | IExpense>;

export function getTransactionsByMonth(
  transactions: Transactions
): Record<string, Transactions> {
  return transactions.reduce(
    (acc: Record<string, Transactions>, transaction) => {
      const month = dayjs(transaction.date).format("YYYY-MM");

      return {
        ...acc,
        [month]: [...(acc[month] || []), transaction],
      };
    },
    {}
  );
}
