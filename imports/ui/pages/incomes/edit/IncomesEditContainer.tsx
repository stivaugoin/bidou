import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { IncomeId, IncomesCollection } from "../../../../api/incomes";
import { IncomesEdit } from "./IncomesEdit";
import { deleteIncome } from "/imports/api/incomes/methods/delete";
import { useCategories } from "/imports/ui/hooks/useCategories";

export function IncomesEditContainer(): JSX.Element {
  const history = useHistory();
  const { incomeId } = useParams<{ incomeId: IncomeId }>();

  const categories = useCategories(
    { type: "income" },
    { fields: { _id: 1, name: 1 } }
  );

  const income = useTracker(() => IncomesCollection.findOne(incomeId), [
    incomeId,
  ]);

  const handleClickDelete = () => {
    if (window.confirm("Are you sure you want to delete this income?")) {
      deleteIncome.call(incomeId, (err) => {
        if (err) {
          window.alert(err.message);
        } else {
          history.replace("/incomes");
        }
      });
    }
  };

  const handleReturnToList = () => {
    history.push("/incomes");
  };

  if (!income) {
    return <Redirect to="/incomes" />;
  }

  return (
    <IncomesEdit
      categories={categories}
      income={income}
      onAfterSave={handleReturnToList}
      onClickCancel={handleReturnToList}
      onClickDelete={handleClickDelete}
    />
  );
}
