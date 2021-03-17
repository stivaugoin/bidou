import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../../components/Button";
import { Page } from "../../../components/Page";
import { Transactions } from "../../../components/Transactions";
import { IIncome } from "/imports/api/incomes";

type Props = {
  transactions: Array<IIncome>;
};

export function IncomesList({ transactions }: Props): JSX.Element {
  const history = useHistory();

  return (
    <Page
      header={{
        title: "Incomes",
        actions: [
          <Button
            key="create"
            onClick={() => history.push("/incomes/create")}
            variant="primary"
          >
            NEW INCOME
          </Button>,
        ],
      }}
    >
      <>
        {transactions.length === 0 && (
          <div className="text-center mt-8">
            <h1 className="text-gray-800 text-xl md:text-3xl">
              There is no income yet!
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
