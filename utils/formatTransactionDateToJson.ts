import dayjs from "dayjs";

export function formatTransactionDateToJson<Transaction extends { date: Date }>(
  transaction: Transaction
): Override<Transaction, { date: string }> {
  return {
    ...transaction,
    date: dayjs(transaction.date).format(),
  };
}
