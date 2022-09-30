import dayjs from "dayjs";
import { formatTransactionDateToJson } from "./formatTransactionDateToJson";

type GroupedTransactions<Transaction> = {
  title: string;
  total: number;
  transactions: Override<Transaction, { date: string }>[];
}[];

export function groupTransactionsByMonth<
  Transaction extends { amount: number; date: Date }
>(transactions: Transaction[]): GroupedTransactions<Transaction> {
  return transactions.reduce((acc, transaction) => {
    const month = dayjs(transaction.date).format("MMMM YYYY");
    const monthIndex = acc.findIndex((item) => item.title === month);

    if (monthIndex === -1) {
      acc.push({
        title: month,
        total: transaction.amount,
        transactions: [formatTransactionDateToJson(transaction)],
      });
    } else {
      acc[monthIndex].total += transaction.amount;
      acc[monthIndex].transactions.push(
        formatTransactionDateToJson(transaction)
      );
    }

    return acc;
  }, [] as GroupedTransactions<Transaction>);
}
