import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { ExpensesList } from "./ExpensesList";
import { ExpenseId, ExpensesCollection } from "/imports/api/expenses";
import { deleteExpense } from "/imports/api/expenses/methods/delete";

export function ExpenseListContainer(): JSX.Element {
  const { transactions } = useTracker(() => {
    return {
      transactions: ExpensesCollection.find({}, { sort: { date: -1 } }).fetch(),
    };
  });

  const handleDelete = (expenseId: ExpenseId) => {
    deleteExpense.call(expenseId, () => {
      console.log(`${expenseId} deleted!`);
    });
  };

  return <ExpensesList onDelete={handleDelete} transactions={transactions} />;
}
