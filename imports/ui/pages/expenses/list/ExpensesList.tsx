import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../../components/Button";
import { Page } from "../../../components/Page";
import { Transactions } from "../../../components/Transactions";
import { IExpense } from "/imports/api/expenses";

type Props = {
  transactions: Array<IExpense>;
};

export function ExpensesList({ transactions }: Props): JSX.Element {
  const history = useHistory();

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
