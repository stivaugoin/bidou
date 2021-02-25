import { ValidatedMethod } from "meteor/mdg:validated-method";
import { ExpenseId, ExpensesCollection } from "..";

export const deleteExpense = new ValidatedMethod({
  name: "expenses.delete",
  validate: null,
  run(expenseId: ExpenseId) {
    ExpensesCollection.remove({
      _id: expenseId,
    });
  },
});
