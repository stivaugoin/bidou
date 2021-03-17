import { IIncome } from "../../api/incomes";
import { calculateTotalTransactionsAmount } from "../calculateTotalTransactionsAmount";

test("calculateTotalTransactionsAmount", () => {
  const transactions = [
    { amount: 1 },
    { amount: 1 },
    { amount: 1 },
    { amount: 1 },
  ] as Array<IIncome>;

  expect(calculateTotalTransactionsAmount(transactions)).toBe(4);
});
