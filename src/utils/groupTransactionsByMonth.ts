import dayjs from "dayjs";

type GroupedTransactions<Transaction> = {
  title: string;
  total: number;
  transactions: Transaction[];
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
        transactions: [transaction],
      });
    } else {
      acc[monthIndex].total += transaction.amount;
      acc[monthIndex].transactions.push(transaction);
    }

    return acc;
  }, [] as GroupedTransactions<Transaction>);
}
