import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { ExpenseId, ExpensesCollection } from "../../../../api/expenses";
import { NotFound } from "../../NotFound";
import { ExpensesEdit } from "./ExpensesEdit";
import { deleteExpense } from "/imports/api/expenses/methods/delete";
import { useCategories } from "/imports/ui/hooks/useCategories";

export function ExpensesEditContainer(): JSX.Element {
  const history = useHistory();
  const { expenseId } = useParams<{ expenseId: ExpenseId }>();
  const categories = useCategories(
    { type: "expense" },
    { fields: { _id: 1, name: 1 } }
  );

  const expense = useTracker(() => ExpensesCollection.findOne(expenseId), [
    expenseId,
  ]);

  const handleClickDelete = () => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      deleteExpense.call(expenseId, (err) => {
        if (err) {
          window.alert(err.message);
        } else {
          history.replace("/expenses");
        }
      });
    }
  };

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
      onClickDelete={handleClickDelete}
    />
  );
}
