import { CategoryType } from "@prisma/client";
import dayjs from "dayjs";

type GroupedTransactions<Transaction> = {
  title: string;
  total: number;
  transactions: Transaction[];
}[];

export function groupTransactionsByMonth<
  Transaction extends {
    amount: number;
    date: Date;
    Category: { type: CategoryType };
  }
>(transactions: Transaction[]): GroupedTransactions<Transaction> {
  return transactions.reduce((acc, transaction) => {
    const month = dayjs(transaction.date).format("MMMM YYYY");
    const monthIndex = acc.findIndex((item) => item.title === month);

    const amountMultiplier =
      transaction.Category.type === CategoryType.Expense ? -1 : 1;

    if (monthIndex === -1) {
      acc.push({
        title: month,
        total: transaction.amount * amountMultiplier,
        transactions: [transaction],
      });
    } else {
      acc[monthIndex].total += transaction.amount * amountMultiplier;
      acc[monthIndex].transactions.push(transaction);
    }

    return acc;
  }, [] as GroupedTransactions<Transaction>);
}
