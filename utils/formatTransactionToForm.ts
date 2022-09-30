import dayjs from "dayjs";

export function formatTransactionToForm<
  Transaction extends { amount: number; date: string; id?: string }
>(data: Transaction): Override<Omit<Transaction, "id">, { date: Date }> {
  const { id, ...transaction } = data;

  return {
    ...transaction,
    amount: data.amount / 100,
    date: dayjs(data.date).toDate(),
  };
}
