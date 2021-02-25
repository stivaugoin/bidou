import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { IncomeId, IncomesCollection } from "../../../../api/incomes";
import { NotFound } from "../../NotFound";
import { IncomesEdit } from "./IncomesEdit";
import { CategoriesCollection } from "/imports/api/categories";

export function IncomesEditContainer(): JSX.Element {
  const history = useHistory();
  const params = useParams<{ incomeId: IncomeId }>();
  const { incomeId } = params;

  const { categories, income } = useTracker(() => {
    return {
      income: IncomesCollection.findOne(incomeId),
      categories: CategoriesCollection.find(
        { type: "income" },
        { fields: { _id: 1, name: 1 } }
      ).fetch(),
    };
  }, [incomeId]);

  const handleReturnToList = () => {
    history.push("/incomes");
  };

  if (!income) {
    return <NotFound />;
  }

  return (
    <IncomesEdit
      categories={categories}
      income={income}
      onAfterSave={handleReturnToList}
      onClickCancel={handleReturnToList}
    />
  );
}
