import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { ExpensesList } from "./ExpensesList";
import { ExpensesCollection } from "/imports/api/expenses";

export function ExpenseListContainer(): JSX.Element {
  const { transactions } = useTracker(() => {
    return {
      transactions: ExpensesCollection.find({}, { sort: { date: -1 } }).fetch(),
    };
  });

  return <ExpensesList transactions={transactions} />;
}
