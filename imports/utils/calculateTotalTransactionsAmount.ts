import { IExpense } from "../api/expenses";
import { IIncome } from "../api/incomes";

type Transactions = Array<IIncome | IExpense>;

export function calculateTotalTransactionsAmount(
  transactions: Transactions
): number {
  return transactions.reduce((acc, { amount }) => acc + amount, 0);
}
