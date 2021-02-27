import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { ExpenseId, ExpensesCollection } from "../../../../api/expenses";
import { NotFound } from "../../NotFound";
import { ExpensesEdit } from "./ExpensesEdit";
import { useCategories } from "/imports/ui/hooks/useCategories";

export function ExpensesEditContainer(): JSX.Element {
  const history = useHistory();
  const params = useParams<{ expenseId: ExpenseId }>();
  const { expenseId } = params;
  const categories = useCategories({ type: "expense" });

  const { expense } = useTracker(() => {
    return {
      expense: ExpensesCollection.findOne(expenseId),
    };
  }, [expenseId]);

  const handleReturnToList = () => {
    history.push("/expenses");
  };

  if (!expense) {
    return <NotFound />;
  }

  return (
    <ExpensesEdit
      categories={categories}
      expense={expense}
      onAfterSave={handleReturnToList}
      onClickCancel={handleReturnToList}
    />
  );
}
