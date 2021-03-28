import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/Button";
import { Page } from "../../components/Page";
import { Transactions } from "../../components/Transactions";
import { ExpensesCollection } from "/imports/api/expenses";

export function ExpensesList(): JSX.Element {
  const history = useHistory();
  const { transactions } = useTracker(() => {
    return {
      transactions: ExpensesCollection.find({}, { sort: { date: -1 } }).fetch(),
    };
  });

  return (
    <Page
      header={{
        title: "Expenses",
        actions: [
          <Button
            key="create"
            onClick={() => history.push("/expenses/create")}
            variant="primary"
          >
            NEW EXPENSE
          </Button>,
        ],
      }}
    >
      <>
        {transactions.length === 0 && (
          <div className="text-center mt-8">
            <h1 className="text-gray-800 text-xl md:text-3xl">
              There is no expense yet!
            </h1>
          </div>
        )}

        {transactions.length > 0 && (
          <Transactions transactions={transactions} />
        )}
      </>
    </Page>
  );
}
