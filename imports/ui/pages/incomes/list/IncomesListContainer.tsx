import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { IncomesList } from "./IncomesList";
import { IncomesCollection } from "/imports/api/incomes";

export function IncomeListContainer(): JSX.Element {
  const { transactions } = useTracker(() => {
    return {
      transactions: IncomesCollection.find({}, { sort: { date: -1 } }).fetch(),
    };
  });

  return <IncomesList transactions={transactions} />;
}
