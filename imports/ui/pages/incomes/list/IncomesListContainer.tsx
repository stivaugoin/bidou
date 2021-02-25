import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { IncomesList } from "./IncomesList";
import { IncomeId, IncomesCollection } from "/imports/api/incomes";
import { deleteIncome } from "/imports/api/incomes/methods/delete";

export function IncomeListContainer(): JSX.Element {
  const { transactions } = useTracker(() => {
    return {
      transactions: IncomesCollection.find({}, { sort: { date: -1 } }).fetch(),
    };
  });

  const handleDelete = (incomeId: IncomeId) => {
    deleteIncome.call(incomeId, () => {
      console.log(`${incomeId} deleted!`);
    });
  };

  return <IncomesList onDelete={handleDelete} transactions={transactions} />;
}
