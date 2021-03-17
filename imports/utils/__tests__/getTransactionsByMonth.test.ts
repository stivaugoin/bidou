import { IIncome } from "../../api/incomes";
import { getTransactionsByMonth } from "../getTransactionsByMonth";

test("getTransactionsByMonth", () => {
  const transactions = [
    { amount: 12, date: new Date("2021-01-02") },
    { amount: 34, date: new Date("2021-01-15") },
    { amount: 56, date: new Date("2021-02-02") },
    { amount: 78, date: new Date("2021-02-15") },
  ] as Array<IIncome>;

  expect(getTransactionsByMonth(transactions)).toStrictEqual({
    "2021-01": [
      { amount: 12, date: new Date("2021-01-02") },
      { amount: 34, date: new Date("2021-01-15") },
    ],
    "2021-02": [
      { amount: 56, date: new Date("2021-02-02") },
      { amount: 78, date: new Date("2021-02-15") },
    ],
  });
});
